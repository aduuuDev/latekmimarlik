import { connectToDatabase } from '@/lib/db';
import Settings from '@/models/Settings';
import PlatformLogo from '@/models/PlatformLogo';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    
    // Veritabanına bağlan
    await connectToDatabase();
    
    // Platform Logo için özel işlem
    if (type === 'platformLogo') {
      const logo = await PlatformLogo.findOne({ type: 'platformLogo' });
      return Response.json({ success: true, data: logo || {
        light: '/img/logo.png',
        dark: '/img/home/logo-white.png',
        type: 'platformLogo'
      }});
    }
    
    // Belirli bir ayar türü istenirse
    if (type) {
      const settings = await Settings.findOne({ type });
      
      // Platform Logo'yu dahil et
      if (type === 'header' || type === 'footer') {
        const platformLogo = await PlatformLogo.findOne({ type: 'platformLogo' });
        if (platformLogo && settings) {
          settings.logo = {
            light: platformLogo.light || '/img/logo.png',
            dark: platformLogo.dark || '/img/home/logo-white.png'
          };
        }
      }
      
      return Response.json({ success: true, data: settings || {} });
    }
    
    // Tüm ayarları getir
    const settingsResult = await Settings.find({});
    
    // Platform Logo'yu al
    const platformLogo = await PlatformLogo.findOne({ type: 'platformLogo' });
    
    // Ayarları type'a göre grupla
    const settings = {};
    settingsResult.forEach(item => {
      // Her bir ayar nesnesini type anahtarını kullanarak grupluyoruz
      // Header ve footer için logo bilgisini ekle
      if ((item.type === 'header' || item.type === 'footer') && platformLogo) {
        item.logo = {
          light: platformLogo.light || '/img/logo.png',
          dark: platformLogo.dark || '/img/home/logo-white.png'
        };
      }
      settings[item.type] = item;
    });
    
    return Response.json({ success: true, data: settings });
  } catch (error) {
    console.error('Settings fetch error:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
