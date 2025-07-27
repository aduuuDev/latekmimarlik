import { connectToDatabase } from '@/lib/db';
import Language from '@/models/Language';

// GET handler - Fetch active languages for frontend
export async function GET() {
  try {
    await connectToDatabase();
    
    // Aktif dilleri sıralı bir şekilde getir
    const languages = await Language.find({ isActive: true })
      .sort({ order: 1 })
      .select('code name nativeName rtl isDefault')
      .lean();
    
    
    
    return new Response(JSON.stringify({
      success: true,
      languages,
      timestamp: new Date().toISOString() // Add timestamp for debugging cache issues
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('Dil verileri getirme hatası:', error);
    
    // Eğer veritabanına erişilemezse, varsayılan dilleri döndür
    const defaultLanguages = [
      { code: 'tr', name: 'Türkçe', nativeName: 'Türkçe', rtl: false, isDefault: true },
      { code: 'en', name: 'English', nativeName: 'English', rtl: false, isDefault: false },
      { code: 'de', name: 'Deutsch', nativeName: 'Deutsch', rtl: false, isDefault: false },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true, isDefault: false }
    ];
    
    return new Response(JSON.stringify({
      success: true,
      languages: defaultLanguages,
      isDefault: true,
      timestamp: new Date().toISOString(),
      error: error.message
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    });
  }
}

// Add headers for Next.js cache configuration
export const dynamic = 'force-dynamic';
export const revalidate = 0;
