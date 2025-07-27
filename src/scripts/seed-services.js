/**
 * Seed script for services data
 * 
 * Bu script, mockData.js dosyasındaki verileri MongoDB veritabanına ekler.
 * Çalıştırmak için: node src/scripts/seed-services.js
 */

// ES Module syntax için package.json'a "type": "module" eklenmeli
// veya .mjs uzantısı kullanılmalı
import { connectToDatabase } from '../lib/db.js';
import Service from '../models/Service.js';
import ServicesPage from '../models/ServicesPage.js';

// Mock veri kaynağı - doğrudan mockData.js'den servicesData'yı import ediyoruz
import { servicesData } from '../utils/mockData.js';

// mockData.js'deki verileri uygun formata dönüştür
const prepareServicesForDB = (services) => {
  return services.map(service => {
    // mockData.js formatından MongoDB formatına dönüştür
    return {
      title: service.title,
      description: service.description,
      slug: generateSlug(service.title),
      content: service.detailContent.content,
      image: service.detailContent.image || '',
      detailDescription: service.detailContent.description || '',
      detailTitle: service.detailContent.title || service.title,
      isActive: true,
      isPublished: true
    };
  });
};

// Slug oluşturma fonksiyonu
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Özel karakterleri kaldır
    .replace(/\s+/g, '-')     // Boşlukları tire ile değiştir
    .replace(/--+/g, '-')     // Çoklu tireleri tek tireye çevir
    .trim()                   // Başta ve sonda boşlukları kaldır
    .replace(/^-+|-+$/g, ''); // Başta ve sonda tireleri kaldır
}

// Servisler sayfası için varsayılan içerik
const createServicesPageContent = () => {
  return {
    heroBanner: {
      title: {
        tr: "HİZMETLERİMİZ",
        en: "OUR SERVICES"
      },
      subtitle: {
        tr: "Sizin için neler yapabiliriz?",
        en: "What can we do for you?"
      },
      backgroundImage: "/img/bottom-view-building-facade.jpg",
    },
    contentSection: {
      title: {
        tr: "Yaptıklarımız.",
        en: "This is what we do."
      },
      subtitle: {
        tr: "Hizmetlerimiz",
        en: "Our Services"
      },
      description: {
        tr: "Modern mimari ve tasarım hizmetlerimizle projelerinizi hayata geçiriyoruz.",
        en: "We bring your projects to life with our modern architectural and design services."
      },
    },
    seo: {
      pageTitle: {
        tr: "Hizmetlerimiz | Latek Mimarlık",
        en: "Our Services | Latek Architecture"
      },
      metaDescription: {
        tr: "Latek Mimarlık olarak sunduğumuz mimari tasarım, iç mimarlık ve danışmanlık hizmetlerimiz hakkında bilgi alın.",
        en: "Learn about architectural design, interior architecture, and consulting services offered by Latek Architecture."
      },
      keywords: {
        tr: "mimari tasarım, iç mimarlık, danışmanlık, planlama, uygulama, proje yönetimi",
        en: "architectural design, interior architecture, consulting, planning, implementation, project management"
      },
    }
  };
};

// Ana fonksiyon
const seedDatabase = async () => {
  try {
    console.log('Veritabanına bağlanılıyor...');
    await connectToDatabase();
    console.log('MongoDB bağlantısı başarılı');
    
    // Mevcut verileri temizle
    console.log('Mevcut servis verileri siliniyor...');
    await Service.deleteMany({});
    await ServicesPage.deleteMany({});
    
    // Servisleri hazırlayıp veritabanına ekle
    const preparedServices = prepareServicesForDB(servicesData);
    console.log(`${preparedServices.length} adet servis verisi eklenecek...`);
    const services = await Service.insertMany(preparedServices);
    
    console.log('Servisler başarıyla eklendi!');
    
    // Servisler sayfası içeriğini oluştur
    console.log('Servisler sayfası içeriği oluşturuluyor...');
    const servicesPageContent = createServicesPageContent();
    await ServicesPage.create(servicesPageContent);
    
    console.log('Servisler sayfası içeriği başarıyla oluşturuldu!');
    console.log('Seed işlemi tamamlandı!');
    
    // İşlem bittiğinde bağlantıyı kapat
    process.exit(0);
  } catch (error) {
    console.error('Seed işlemi sırasında hata oluştu:', error);
    process.exit(1);
  }
};

// Seed işlemini başlat
seedDatabase();
