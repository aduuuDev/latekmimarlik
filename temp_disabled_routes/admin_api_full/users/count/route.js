import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Kullanıcı sayısını bul
    const count = await User.countDocuments();
    
    return new Response(JSON.stringify({
      success: true,
      count
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Kullanıcı sayısı kontrolü hatası:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Kullanıcı sayısı alınırken bir hata oluştu',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
