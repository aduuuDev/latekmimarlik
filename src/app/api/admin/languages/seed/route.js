import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { seedDefaultLanguages } from '@/utils/seedLanguages';

// GET metodu ile varsayılan dilleri yükle
export async function GET(request) {
  try {
    // Admin yetkisi kontrolü
    const session = await getServerSession(authOptions);
    
    // Yetkisiz erişimleri engelle
    if (!session || !session.user) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Bu işlem için yetkiniz bulunmuyor.'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Force parametresi - eğer true ise, mevcut diller olsa bile varsayılan dilleri yükler
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';
    
    // Varsayılan dilleri yükle
    const result = await seedDefaultLanguages(force);
    
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Dil seed işlemi sırasında hata:', error);
    
    return new Response(JSON.stringify({
      success: false,
      message: 'Dil seed işlemi sırasında bir hata oluştu',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
