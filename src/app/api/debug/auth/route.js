// Debug endpoint for Vercel deployment
export const runtime = 'nodejs';

export async function GET() {
  try {
    return Response.json({
      success: true,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        hasMongoUri: !!process.env.MONGODB_URI,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        nextAuthUrl: process.env.NEXTAUTH_URL,
        mongoUriPrefix: process.env.MONGODB_URI?.substring(0, 20) + '...',
      },
      timestamp: new Date().toISOString(),
      message: 'Debug info for Vercel deployment'
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
