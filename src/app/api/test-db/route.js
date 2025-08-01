import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Kullanıcı sayısını kontrol et
    const userCount = await User.countDocuments();
    
    // Admin kullanıcısı var mı kontrol et
    const adminUser = await User.findOne({ role: 'admin' });
    
    return Response.json({
      success: true,
      userCount,
      hasAdmin: !!adminUser,
      adminUsername: adminUser?.username || null,
      message: 'Database bağlantısı başarılı'
    });
  } catch (error) {
    console.error('Database test hatası:', error);
    return Response.json({
      success: false,
      error: error.message,
      message: 'Database bağlantısı başarısız'
    }, { status: 500 });
  }
}
