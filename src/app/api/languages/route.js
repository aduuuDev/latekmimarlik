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
      languages
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
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
      isDefault: true
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
