import { connectToDatabase } from '@/lib/db';
import mongoose from 'mongoose';
import PlatformSettings from '@/models/PlatformSettings';
import PlatformLogo from '@/models/PlatformLogo';

export async function GET(req) {
  try {
    // Veritabanına bağlan
    await connectToDatabase();
    
    // Platform ayarlarını getir
    const platformSettings = await PlatformSettings.findOne({ type: 'platformSettings' });
    
    // Logo bilgisini de al
    const platformLogo = await mongoose.models.PlatformLogo.findOne({ type: 'platformLogo' });
    
    // Platform name data for all languages
    const platformNameData = {};
    if (platformSettings?.platformName) {
      platformSettings.platformName.forEach((value, key) => {
        platformNameData[key] = value;
      });
    }
    
    return Response.json({
      success: true,
      platformSettings: {
        raw: platformSettings,
        platformNameKeys: platformSettings ? [...platformSettings.platformName.keys()] : [],
        platformNameEntries: platformSettings ? [...platformSettings.platformName.entries()] : [],
        platformNameAsObject: platformNameData
      },
      platformLogo
    });
  } catch (error) {
    console.error('Platform debug fetch error:', error);
    return Response.json({ 
      success: false, 
      message: error.message
    }, { status: 500 });
  }
}
