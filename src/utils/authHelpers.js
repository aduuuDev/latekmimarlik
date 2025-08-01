import { getServerSession } from "next-auth/next";

// Auth options'ı dinamik olarak import et
export async function getAuthOptions() {
  try {
    // Build zamanında veya production'da MONGODB_URI yoksa null döndür
    if (typeof window === 'undefined' &&
        (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI)) {
      return null;
    }

    const { authOptions } = await import("../app/api/auth/[...nextauth]/route");
    return authOptions;
  } catch (error) {
    console.warn("Auth options not available:", error.message);
    return null;
  }
}

// Session kontrolü için yardımcı fonksiyon
export async function getSessionWithAuth() {
  try {
    // Production'da MONGODB_URI yoksa null döndür
    if (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI) {
      console.warn("Database not available in production");
      return null;
    }

    const authOptions = await getAuthOptions();
    if (!authOptions) {
      console.warn("Auth options not available");
      return null;
    }

    return await getServerSession(authOptions);
  } catch (error) {
    console.warn("Session check failed:", error.message);
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
