import { connectToDatabase } from '@/lib/db';
import Language from '@/models/Language';

/**
 * Varsayılan dilleri veritabanına ekler
 * Bu fonksiyon, veritabanında hiç dil yoksa varsayılan dilleri ekler
 */
export async function seedDefaultLanguages() {
  try {
    await connectToDatabase();
    
    // Mevcut dil sayısını kontrol et
    const languageCount = await Language.countDocuments();
    
    // Eğer hiç dil yoksa, varsayılan dilleri ekle
    if (languageCount === 0) {
      console.log('Varsayılan diller veritabanına ekleniyor...');
      
      // Varsayılan diller
      const defaultLanguages = [
        {
          code: 'tr',
          name: 'Türkçe',
          nativeName: 'Türkçe',
          isActive: true,
          isDefault: true,  // Türkçe varsayılan dil olarak ayarlanıyor
          rtl: false,
          order: 1
        },
        {
          code: 'en',
          name: 'İngilizce',
          nativeName: 'English',
          isActive: true,
          isDefault: false,
          rtl: false,
          order: 2
        },
        {
          code: 'de',
          name: 'Almanca',
          nativeName: 'Deutsch',
          isActive: true,
          isDefault: false,
          rtl: false,
          order: 3
        },
        {
          code: 'ar',
          name: 'Arapça',
          nativeName: 'العربية',
          isActive: true,
          isDefault: false,
          rtl: true,  // Arapça sağdan sola yazılan bir dil
          order: 4
        }
      ];
      
      // Dilleri veritabanına ekle
      await Language.insertMany(defaultLanguages);
      console.log('Varsayılan diller başarıyla eklendi.');
      return { success: true, message: 'Varsayılan diller başarıyla eklendi.' };
    } else {
      console.log('Veritabanında zaten diller mevcut, işlem yapılmadı.');
      return { success: false, message: 'Veritabanında zaten diller mevcut.' };
    }
  } catch (error) {
    console.error('Varsayılan dilleri eklerken hata oluştu:', error);
    return { success: false, message: 'Hata: ' + error.message };
  }
}

// Standalone olarak çalıştırılabilmesi için
if (require.main === module) {
  seedDefaultLanguages()
    .then(result => console.log(result))
    .catch(error => console.error('Seed işlemi sırasında hata:', error))
    .finally(() => process.exit());
}
