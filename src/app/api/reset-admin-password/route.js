import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
  try {
    const { newPassword } = await request.json();
    
    if (!newPassword || newPassword.length < 6) {
      return Response.json({
        success: false,
        message: 'Şifre en az 6 karakter olmalıdır'
      }, { status: 400 });
    }
    
    await connectToDatabase();
    
    // Admin kullanıcısını bul
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      return Response.json({
        success: false,
        message: 'Admin kullanıcısı bulunamadı'
      }, { status: 404 });
    }
    
    // Şifreyi güncelle
    adminUser.password = newPassword;
    await adminUser.save();
    
    return Response.json({
      success: true,
      message: 'Admin şifresi başarıyla güncellendi',
      username: adminUser.username
    });
  } catch (error) {
    console.error('Şifre sıfırlama hatası:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
