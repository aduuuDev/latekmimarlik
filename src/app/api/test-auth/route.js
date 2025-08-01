export async function GET() {
  try {
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV,
      MONGODB_URI: !!process.env.MONGODB_URI,
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    };

    console.log("Environment check:", envCheck);

    // Auth helper'ı test et
    let authHelperStatus = "not_available";
    try {
      const authHelpers = await import("@/utils/authHelpers");
      if (authHelpers && authHelpers.getSessionWithAuth) {
        authHelperStatus = "available";
        
        // Session test et
        try {
          const session = await authHelpers.getSessionWithAuth();
          authHelperStatus = session ? "session_found" : "no_session";
        } catch (sessionError) {
          authHelperStatus = "session_error: " + sessionError.message;
        }
      } else {
        authHelperStatus = "function_missing";
      }
    } catch (importError) {
      authHelperStatus = "import_error: " + importError.message;
    }

    return Response.json({
      success: true,
      environment: envCheck,
      authHelper: authHelperStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
