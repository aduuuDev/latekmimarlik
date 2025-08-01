// Debug endpoint for session testing
export const runtime = 'nodejs';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    return Response.json({
      success: true,
      hasSession: !!session,
      session: session ? {
        user: session.user,
        expires: session.expires
      } : null,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        hasMongoUri: !!process.env.MONGODB_URI,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        nextAuthUrl: process.env.NEXTAUTH_URL,
      },
      headers: {
        cookie: request.headers.get('cookie') ? 'present' : 'missing',
        authorization: request.headers.get('authorization') ? 'present' : 'missing',
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
