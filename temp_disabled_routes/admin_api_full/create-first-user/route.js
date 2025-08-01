import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
  try {
    await connectToDatabase();
    
    // İlk kullanıcı var mı kontrol et
    const userCount = await User.countDocuments();
    
    if (userCount > 0) {
      return new Response(JSON.stringify({
        success: false,
        message: 'İlk kullanıcı zaten oluşturulmuş'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Veriyi al
    const body = await request.json();
    const { username, password, name } = body;
    
    // Basit doğrulama
    if (!username || !password || !name) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Tüm alanlar zorunludur'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // İlk kullanıcıyı admin olarak oluştur
    const newUser = new User({
      username,
      password, // model içinde hash yapılacak
      name,
      role: 'admin' // ilk kullanıcı her zaman admin
    });
    
    await newUser.save();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Admin kullanıcısı başarıyla oluşturuldu'
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Kullanıcı oluşturma hatası:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Kullanıcı oluşturulurken bir hata oluştu',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
