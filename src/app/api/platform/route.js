import { connectToDatabase } from '@/lib/db';
import mongoose from 'mongoose';
import PlatformSettings from '@/models/PlatformSettings';
import PlatformLogo from '@/models/PlatformLogo';

export async function GET(req) {
  // Önbelleğe almayı devre dışı bırakalım
  const headers = new Headers();
  headers.append('Cache-Control', 'no-store, max-age=0');
  
  try {
    // Veritabanına bağlan
    await connectToDatabase();
    
    // Varsayılan dil kodunu al (query params'tan veya default 'tr')
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'tr';
    
    // Platform ayarlarını getir
    const platformSettings = await PlatformSettings.findOne({ type: 'platformSettings' });
    
    // Eğer platform ayarları yoksa varsayılan değerleri kullan
    if (!platformSettings) {
      return Response.json({ 
        success: true, 
        data: {
          platformName: { tr: "Latek Mimarlık", en: "Latek Architecture" },
          contactEmail: "",
          contactPhone: "",
          logo: {
            light: "/img/logo.png",
            dark: "/img/home/logo-white.png"
          }
        } 
      });
    }
    
    // Logo bilgisini de al
    const platformLogo = await mongoose.models.PlatformLogo.findOne({ type: 'platformLogo' }) || {
      light: "/img/logo.png",
      dark: "/img/home/logo-white.png"
    };

    
    // Platform adını belirli bir dil için getir
    const platformName = platformSettings?.platformName?.get(lang) || (lang === 'tr' ? 'Latek Mimarlık' : 'Latek Architecture');
    
    // Convert Mongoose Map to a regular object for the response
    const platformNameObj = {};
    if (platformSettings.platformName) {
      platformSettings.platformName.forEach((value, key) => {
        platformNameObj[key] = value;
      });
    }
    

    
    
    
    // Önbelleğe almayı devre dışı bırakan headers ile response döndürelim
    return Response.json({
      success: true,
      data: {
        name: platformName,
        platformName: Object.keys(platformNameObj).length > 0 
          ? platformNameObj 
          : { tr: "Latek Mimarlık", en: "Latek Architecture" },
        contactEmail: platformSettings.contactEmail || "",
        contactPhone: platformSettings.contactPhone || "",
        logo: {
          light: platformLogo.light || "/img/logo.png",
          dark: platformLogo.dark || "/img/home/logo-white.png"
        }
      }
    }, { 
      headers: { 
        'Cache-Control': 'no-store, max-age=0',
        'Content-Type': 'application/json'
      } 
    });
  } catch (error) {
    console.error('Platform settings fetch error:', error);
    return Response.json({ 
      success: false, 
      message: error.message,
      data: {
        name: "Latek Mimarlık",
        platformName: { tr: "Latek Mimarlık", en: "Latek Architecture" },
        logo: {
          light: "/img/logo.png",
          dark: "/img/home/logo-white.png"
        }
      }
    }, { status: 500 });
  }
}
