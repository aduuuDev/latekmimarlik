import { connectToDatabase } from '@/lib/db';
import Language from '@/models/Language';
import { getSessionWithAuth } from '@/utils/authHelpers';
import { invalidateLanguageCache } from '@/utils/multiLanguageHelpers';

// GET metodu ile tüm dilleri alma
export async function GET() {
  try {
    await connectToDatabase();
    
    // Dil verilerini al ve sırala
    const languages = await Language.find()
      .sort({ order: 1, name: 1 })
      .lean();
    
    return new Response(JSON.stringify({
      success: true,
      data: languages
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Dil verileri getirme hatası:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Dil verileri getirilirken bir hata oluştu',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// POST - Yeni dil ekleme
export async function POST(request) {
  try {
    const session = await getSessionWithAuth();
    
    // Yetkilendirme kontrolü
    if (!session || !session.user) {
      return Response.json({ success: false, message: 'Bu işlem için yetkiniz bulunmuyor.' }, { status: 401 });
    }
    
    const data = await request.json();
    
    // Zorunlu alanları kontrol et
    if (!data.code || !data.name || !data.nativeName) {
      return Response.json({ 
        success: false, 
        message: 'Dil kodu, isim ve yerel isim alanları zorunludur.' 
      }, { status: 400 });
    }
    
    await connectToDatabase();
    
    // Dil kodunu kontrol et - benzersiz olmalı
    const existingLanguage = await Language.findOne({ code: data.code });
    if (existingLanguage) {
      return Response.json({ 
        success: false, 
        message: 'Bu dil kodu zaten kullanılıyor.' 
      }, { status: 400 });
    }
    
    // Hiç dil yoksa ilk dili varsayılan olarak işaretle
    const languageCount = await Language.countDocuments();
    if (languageCount === 0) {
      data.isDefault = true;
    }
    
    // Yeni dili oluştur
    const newLanguage = await Language.create(data);
    
    // Cache'i temizle
    invalidateLanguageCache();
    
    return Response.json({ 
      success: true, 
      message: 'Yeni dil başarıyla eklendi.', 
      data: newLanguage 
    }, { status: 201 });
  } catch (error) {
    console.error('Dil ekleme hatası:', error);
    return Response.json({ 
      success: false, 
      message: 'Dil eklenirken bir hata oluştu.', 
      error: error.message 
    }, { status: 500 });
  }
}

// PUT - Dil güncelleme
export async function PUT(request) {
  try {
    const session = await getSessionWithAuth();
    
    // Yetkilendirme kontrolü
    if (!session || !session.user) {
      return Response.json({ success: false, message: 'Bu işlem için yetkiniz bulunmuyor.' }, { status: 401 });
    }
    
    const data = await request.json();
    
    if (!data._id) {
      return Response.json({ 
        success: false, 
        message: 'Güncellenecek dil ID\'si belirtilmemiş.' 
      }, { status: 400 });
    }
    
    await connectToDatabase();
    
    // Güncellenecek dili bul
    const language = await Language.findById(data._id);
    if (!language) {
      return Response.json({ 
        success: false, 
        message: 'Belirtilen ID ile bir dil bulunamadı.' 
      }, { status: 404 });
    }
    
    // Alanları güncelle
    if (data.code !== undefined) language.code = data.code;
    if (data.name !== undefined) language.name = data.name;
    if (data.nativeName !== undefined) language.nativeName = data.nativeName;
    if (data.isActive !== undefined) language.isActive = data.isActive;
    if (data.isDefault !== undefined) language.isDefault = data.isDefault;
    if (data.rtl !== undefined) language.rtl = data.rtl;
    if (data.order !== undefined) language.order = data.order;
    
    await language.save();
    
    // Cache'i temizle
    invalidateLanguageCache();
    
    return Response.json({ 
      success: true, 
      message: 'Dil başarıyla güncellendi.', 
      data: language 
    });
  } catch (error) {
    console.error('Dil güncelleme hatası:', error);
    return Response.json({ 
      success: false, 
      message: 'Dil güncellenirken bir hata oluştu.', 
      error: error.message 
    }, { status: 500 });
  }
}

// DELETE - Dil silme
export async function DELETE(request) {
  try {
    const session = await getSessionWithAuth();
    
    // Yetkilendirme kontrolü
    if (!session || !session.user) {
      return Response.json({ success: false, message: 'Bu işlem için yetkiniz bulunmuyor.' }, { status: 401 });
    }
    
    // URL'den ID parametresini al
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return Response.json({ 
        success: false, 
        message: 'Silinecek dil ID\'si belirtilmemiş.' 
      }, { status: 400 });
    }
    
    await connectToDatabase();
    
    // Silinecek dili bul
    const language = await Language.findById(id);
    if (!language) {
      return Response.json({ 
        success: false, 
        message: 'Belirtilen ID ile bir dil bulunamadı.' 
      }, { status: 404 });
    }
    
    // Varsayılan dil silinemez
    if (language.isDefault) {
      return Response.json({ 
        success: false, 
        message: 'Varsayılan dil silinemez. Önce başka bir dili varsayılan olarak ayarlayın.' 
      }, { status: 400 });
    }
    
    await Language.findByIdAndDelete(id);
    
    // Cache'i temizle
    invalidateLanguageCache();
    
    return Response.json({ 
      success: true, 
      message: 'Dil başarıyla silindi.' 
    });
  } catch (error) {
    console.error('Dil silme hatası:', error);
    return Response.json({ 
      success: false, 
      message: 'Dil silinirken bir hata oluştu.', 
      error: error.message 
    }, { status: 500 });
  }
}
