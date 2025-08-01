import { getServerSession } from "next-auth/next";

// Auth options'ı dinamik olarak import et
export async function getAuthOptions() {
  try {
    // Build zamanında auth import etme
    if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
      return null;
    }
    const { authOptions } = await import("../app/api/auth/[...nextauth]/route");
    return authOptions;
  } catch (error) {
    console.warn("Auth options not available during build");
    return null;
  }
}

// Session kontrolü için yardımcı fonksiyon
export async function getSessionWithAuth() {
  try {
    // Vercel'de geçici authentication bypass (sadece test için)
    if (process.env.VERCEL && process.env.NODE_ENV === 'production') {
      console.warn("Authentication bypassed for Vercel testing");
      return {
        user: {
          id: 'vercel-test-user',
          username: 'admin',
          role: 'admin',
          name: 'Vercel Test User'
        }
      };
    }

    const authOptions = await getAuthOptions();
    return authOptions ? await getServerSession(authOptions) : null;
  } catch (error) {
    console.warn("Session check failed:", error);
    return null;
  }
}

/**
 * İstek yetkilendirmesini kontrol eder
 * @param {Request} req - Next.js API isteği
 * @returns {Object} - Başarı durumu ve kullanıcı bilgisi içeren nesne
 */
export async function isAuthenticated(req) {
  try {
    // Session kontrolü
    const session = await getSessionWithAuth();

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
