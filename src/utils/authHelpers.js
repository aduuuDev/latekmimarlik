import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

/**
 * İstek yetkilendirmesini kontrol eder
 * @param {Request} req - Next.js API isteği
 * @returns {Object} - Başarı durumu ve kullanıcı bilgisi içeren nesne
 */
export async function isAuthenticated(req) {
  try {
    // Session kontrolü
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return { success: false, message: 'Unauthorized' };
    }

    // Admin kontrolü yapılabilir
    // if (!session.user.isAdmin) {
    //   return { success: false, message: 'Admin permission required' };
    // }

    return {
      success: true,
      user: session.user
    };
  } catch (error) {
    console.error('Auth error:', error);
    return { success: false, message: 'Authentication error' };
  }
}

/**
 * İstekte belirtilen kullanıcının yetki kontrolünü yapar
 * @param {Object} session - Kullanıcı oturumu
 * @param {string} userId - Kontrol edilecek kullanıcı ID'si
 * @returns {boolean} - Kullanıcının yetkili olup olmadığı
 */
export function canManageUser(session, userId) {
  if (!session || !session.user) return false;
  
  // Admin her kullanıcıyı yönetebilir
  if (session.user.role === 'admin') return true;
  
  // Kullanıcılar sadece kendi hesaplarını yönetebilir
  return session.user.id === userId;
}
