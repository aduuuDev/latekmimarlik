import { connectToDatabase } from '@/lib/db';
import Service from '@/models/Service';

// GET /api/services veya GET /api/services?slug=<service-slug>
// Herkese açık API - Aktif servisleri getir veya belirli bir servisin detayını getir
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    await connectToDatabase();
    
    // Eğer slug parametresi varsa, o servisi getir
    if (slug) {
      // Slug'a göre servisi bul
      const service = await Service.findOne({ slug, isActive: true }).lean();
      
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
    
    // Slug yoksa tüm aktif servisleri getir
    const services = await Service.find({ isActive: true })
      .sort({ order: 1 })
      .select('title slug description detailContent.featuredImage') // Sadece gerekli alanları getir
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
