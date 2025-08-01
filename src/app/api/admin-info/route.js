import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Admin kullanıcısını bul
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      return Response.json({
        success: false,
        message: 'Admin kullanıcısı bulunamadı'
      });
    }
    
    return Response.json({
      success: true,
      admin: {
        username: adminUser.username,
        name: adminUser.name,
        role: adminUser.role,
        createdAt: adminUser.createdAt
      },
      message: 'Admin kullanıcısı bulundu'
    });
  } catch (error) {
    console.error('Admin bilgisi alma hatası:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
