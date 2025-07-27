import { connectToDatabase } from '@/lib/db';
import Service from '@/models/Service';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { servicesSchema } from '@/utils/serviceSchemas';
import { revalidatePath } from 'next/cache';
import { generateSlug } from '@/models/Service';

/**
 * Multi-language document oluşturmak için yardımcı fonksiyon
 * @param {Object} data - İşlenecek veri
 * @param {Object} schema - Veri şeması
 * @returns {Object} - İşlenmiş veri
 */
async function createMultiLanguageDocument(data, schema) {
  if (!data || !schema) {
    return {};
  }
  
  const result = {};
  
  // Her bir bölümü işle
  for (const sectionKey in schema) {
    if (data[sectionKey]) {
      result[sectionKey] = {};
      
      // Çoklu dil alanlarını işle
      if (schema[sectionKey].multiLanguageFields && Array.isArray(schema[sectionKey].multiLanguageFields)) {
        for (const field of schema[sectionKey].multiLanguageFields) {
          if (data[sectionKey][field]) {
            result[sectionKey][field] = data[sectionKey][field];
          }
        }
      }
      
      // Normal alanları işle
      if (schema[sectionKey].fields && Array.isArray(schema[sectionKey].fields)) {
        for (const field of schema[sectionKey].fields) {
          if (data[sectionKey][field] !== undefined) {
            result[sectionKey][field] = data[sectionKey][field];
          }
        }
      }
      
      // Array alanları işle
      if (schema[sectionKey].arrayFields) {
        for (const arrayField in schema[sectionKey].arrayFields) {
          if (data[sectionKey][arrayField] && Array.isArray(data[sectionKey][arrayField])) {
            result[sectionKey][arrayField] = data[sectionKey][arrayField];
          }
        }
      }
    }
  }
  
  return result;
}

// GET metodu ile servisleri alma (tek servis veya tüm servisler)
export async function GET(request) {
  try {
    await connectToDatabase();
    
    // URL'den id parametresini al
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Eğer id varsa, o servisi getir
    if (id) {
      const service = await Service.findById(id).lean();
      
      if (!service) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Servis bulunamadı'
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({
        success: true,
        data: service
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // id yoksa tüm servisleri getir
    const services = await Service.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();
    
    return new Response(JSON.stringify({
      success: true,
      data: services
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Servis verileri çekilirken hata:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Servis verileri çekilirken bir hata oluştu'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// POST metodu ile yeni servis ekleme
export async function POST(request) {
  try {
    // Admin yetkisi kontrolü
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Bu işlem için yetkiniz bulunmuyor'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    await connectToDatabase();
    
    const data = await request.json();
    
    // Çoklu dil desteği için dokümanı yapılandır
    const serviceData = await createMultiLanguageDocument(data, servicesSchema);
    
    // Slug oluştur veya mevcut olanı kullan
    if (!serviceData.basicInfo.slug) {
      serviceData.basicInfo.slug = generateSlug(serviceData.basicInfo.title);
    }
    
    // Servis verilerini formatlayarak kaydedelim
    const formattedService = {
      title: serviceData.basicInfo.title,
      slug: serviceData.basicInfo.slug,
      description: serviceData.basicInfo.description,
      order: serviceData.basicInfo.order || 0,
      isActive: serviceData.basicInfo.isActive !== false, // Default true
      
      detailContent: serviceData.detailContent || {
        description: {},
        content: {},
        featuredImage: '',
        gallery: []
      },
      
      seo: serviceData.seo || {
        pageTitle: {},
        metaDescription: {},
        keywords: {}
      }
    };
    
    // Yeni servis oluştur
    const service = new Service(formattedService);
    await service.save();
    
    // Services sayfası ve ilgili sayfaları yeniden doğrula
    revalidatePath('/services');
    revalidatePath(`/services/${service.slug}`);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Servis başarıyla oluşturuldu',
      data: service
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Servis eklenirken hata:', error);
    
    return new Response(JSON.stringify({
      success: false,
      message: 'Servis eklenirken bir hata oluştu',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// PUT metodu ile servis güncelleme
export async function PUT(request) {
  try {
    // Admin yetkisi kontrolü
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Bu işlem için yetkiniz bulunmuyor'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    await connectToDatabase();
    
    const data = await request.json();
    
    // Güncelleme yapılacak servisin ID'sini kontrol et
    if (!data._id) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Servis ID bilgisi eksik'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Servisi bul
    const existingService = await Service.findById(data._id);
    if (!existingService) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Servis bulunamadı'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Çoklu dil desteği için dokümanı yapılandır
    const serviceData = await createMultiLanguageDocument(data, servicesSchema);
    
    // Slug oluştur veya mevcut olanı kullan
    if (serviceData.basicInfo && !serviceData.basicInfo.slug && serviceData.basicInfo.title) {
      serviceData.basicInfo.slug = generateSlug(serviceData.basicInfo.title);
    }
    
    // Servis verilerini güncelle
    if (serviceData.basicInfo) {
      if (serviceData.basicInfo.title) existingService.title = serviceData.basicInfo.title;
      if (serviceData.basicInfo.slug) existingService.slug = serviceData.basicInfo.slug;
      if (serviceData.basicInfo.description) existingService.description = serviceData.basicInfo.description;
      if (serviceData.basicInfo.order !== undefined) existingService.order = serviceData.basicInfo.order;
      if (serviceData.basicInfo.isActive !== undefined) existingService.isActive = serviceData.basicInfo.isActive;
    }
    
    // Detay içerik güncellemeleri
    if (serviceData.detailContent) {
      existingService.detailContent = {
        ...existingService.detailContent || {},
        ...serviceData.detailContent
      };
    }
    
    // SEO bilgileri güncellemeleri
    if (serviceData.seo) {
      existingService.seo = {
        ...existingService.seo || {},
        ...serviceData.seo
      };
    }
    
    // Güncelleme tarihini otomatik olarak şimdi yap
    existingService.updatedAt = new Date();
    
    // Değişiklikleri kaydet
    await existingService.save();
    
    // Services sayfası ve ilgili sayfaları yeniden doğrula
    revalidatePath('/services');
    revalidatePath(`/services/${existingService.slug}`);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Servis başarıyla güncellendi',
      data: existingService
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Servis güncellenirken hata:', error);
    
    return new Response(JSON.stringify({
      success: false,
      message: 'Servis güncellenirken bir hata oluştu',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// DELETE metodu ile servis silme
export async function DELETE(request) {
  try {
    // Admin yetkisi kontrolü
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Bu işlem için yetkiniz bulunmuyor'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Silinecek servis ID bilgisi eksik'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    await connectToDatabase();
    
    // Silinecek servisi bul
    const service = await Service.findById(id);
    if (!service) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Servis bulunamadı'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const serviceSlug = service.slug;
    
    // Servisi sil
    await Service.findByIdAndDelete(id);
    
    // Services sayfası ve ilgili sayfaları yeniden doğrula
    revalidatePath('/services');
    revalidatePath(`/services/${serviceSlug}`);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Servis başarıyla silindi'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Servis silinirken hata:', error);
    
    return new Response(JSON.stringify({
      success: false,
      message: 'Servis silinirken bir hata oluştu',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
