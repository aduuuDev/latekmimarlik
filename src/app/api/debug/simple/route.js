// Simple debug endpoint
export const runtime = 'nodejs';

export async function GET() {
  try {
    return Response.json({
      success: true,
      message: "Simple debug endpoint working",
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        hasVercel: !!process.env.VERCEL,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
