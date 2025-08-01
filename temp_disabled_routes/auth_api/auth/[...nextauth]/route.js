import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        await connectToDatabase();
        
        try {
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
