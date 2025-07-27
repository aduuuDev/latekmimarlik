/**
 * Seed script for projects data
 * 
 * Bu script, mockData.js dosyasındaki proje verilerini MongoDB veritabanına ekler.
 * Çalıştırmak için: node src/scripts/seed-projects.js
 */

import { connectToDatabase } from '../lib/db.js';
import Project from '../models/Project.js';

// Mock veri kaynağı - doğrudan mockData.js'den getAllSimpleProjects'i import ediyoruz
import { getAllSimpleProjects } from '../utils/mockData.js';

// mockData.js'deki proje verilerini veritabanı formatına dönüştür
const prepareProjectsForDB = (projects) => {
  return projects.map(project => {
    // Proje verisini MongoDB formatına dönüştür
    return {
      title: {
        tr: project.title,
        en: project.title
      },
      slug: project.slug,
      excerpt: {
        tr: project.excerpt || "",
        en: project.excerpt || ""
      },
      category: project.category,
      location: project.location,
      year: project.year,
      image: project.image,
      isActive: true,
      // SEO alanını ekle
      seo: {
        pageTitle: {
          tr: `${project.title} | Latek Mimarlık Projeleri`,
          en: `${project.title} | Latek Architecture Projects`
        },
        metaDescription: {
          tr: project.excerpt || "",
          en: project.excerpt || ""
        },
        keywords: {
          tr: `${project.category || ""}, mimarlık, proje, tasarım`,
          en: `${project.category || ""}, architecture, project, design`
        }
      }
    };
  });
};

// Ana fonksiyon
const seedDatabase = async () => {
  try {
    console.log('Veritabanına bağlanılıyor...');
    await connectToDatabase();
    console.log('MongoDB bağlantısı başarılı');
    
    // Mevcut verileri temizle
    console.log('Mevcut proje verileri siliniyor...');
    await Project.deleteMany({});
    
    // Projeleri hazırlayıp veritabanına ekle
    const simpleProjectsData = getAllSimpleProjects();
    const preparedProjects = prepareProjectsForDB(simpleProjectsData);
    console.log(`${preparedProjects.length} adet proje verisi eklenecek...`);
    const projects = await Project.insertMany(preparedProjects);
    
    console.log('Projeler başarıyla eklendi!');
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
