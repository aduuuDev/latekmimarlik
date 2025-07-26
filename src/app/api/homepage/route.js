import { connectToDatabase } from '@/lib/db';
import Homepage from '@/models/Homepage';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Anasayfa verisini bul veya varsayılan veri döndür
    let homepage = await Homepage.findOne();
    
    if (!homepage) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Anasayfa verisi bulunamadı'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: homepage
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Anasayfa verisi getirme hatası:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Anasayfa verisi getirilirken bir hata oluştu',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
