// NextAuth Node.js runtime'ında çalışır
export const runtime = 'nodejs';

// Build zamanında NextAuth import etme
const isBuilding = process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI;

let NextAuth, CredentialsProvider;

if (!isBuilding) {
  NextAuth = require('next-auth').default;
  CredentialsProvider = require('next-auth/providers/credentials').default;
}

// Auth options factory
function createAuthOptions() {
  if (isBuilding || !CredentialsProvider) {
    return {
      providers: [],
      secret: 'build-time-secret'
    };
  }

  return {
    providers: [
      CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        // Build zamanında auth işlemi yapma
        if (typeof window === 'undefined' && process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI) {
          console.warn('Auth skipped during build');
          return null;
        }

        try {
          // Dinamik import'lar
          const { connectToDatabase } = await import('@/lib/db');
          const User = (await import('@/models/User')).default;
          
          await connectToDatabase();

          // Kullanıcıyı bul
          const user = await User.findOne({ username: credentials.username });
          
          // Kullanıcı bulunamadıysa veya şifre eşleşmiyorsa null döndür
          if (!user || !(await user.comparePassword(credentials.password))) {
            return null;
          }
          
          // Kullanıcıyı döndür (şifre hariç)
          return {
            id: user._id.toString(),
            name: user.name,
            username: user.username,
            role: user.role
          };
        } catch (error) {
          console.error('Giriş hatası:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Kullanıcı bilgilerini token'a ekle
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Session'a kullanıcı bilgilerini ekle
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },
    secret: process.env.NEXTAUTH_SECRET || 'bu-gizli-bir-anahtar-degistirilmeli',
    pages: {
      signIn: '/auth/login',
      error: '/auth/login',
      signOut: '/auth/login'
    }
  };
}

export const authOptions = createAuthOptions();

// Build zamanında NextAuth'u devre dışı bırak
let handler;

try {
  // Build zamanında NextAuth'u başlatma
  if (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI) {
    console.warn('NextAuth disabled during build');
    handler = {
      GET: async () => new Response('Auth not available during build', { status: 503 }),
      POST: async () => new Response('Auth not available during build', { status: 503 })
    };
  } else {
    handler = NextAuth(authOptions);
  }
} catch (error) {
  console.error('NextAuth initialization error:', error);
  handler = {
    GET: async () => new Response('Auth initialization error', { status: 503 }),
    POST: async () => new Response('Auth initialization error', { status: 503 })
  };
}

export const GET = handler.GET || handler;
export const POST = handler.POST || handler;
