/**
 * Seed script for blog data
 * 
 * Bu script, mockData.js dosyasındaki blog verilerini MongoDB veritabanına ekler.
 * Çalıştırmak için: node src/scripts/seed-blogs.js
 */

import { connectToDatabase } from '../lib/db.js';
import Blog from '../models/Blog.js';

// Mock veri kaynağı - doğrudan mockData.js'den blogData'yı import ediyoruz
import { blogData } from '../utils/mockData.js';

// mockData.js'deki blog verilerini veritabanı formatına dönüştür
const prepareBlogsForDB = (blogs) => {
  return blogs.map(blog => {
    // Blog slug'ı oluştur
    const slug = generateSlug(blog.title);
    
    // Blog verisini MongoDB formatına dönüştür
    return {
      title: {
        tr: blog.title,
        en: blog.title
      },
      slug: slug,
      excerpt: {
        tr: blog.excerpt,
        en: blog.excerpt
      },
      content: {
        tr: blog.content,
        en: blog.content
      },
      image: blog.image,
      author: blog.author,
      date: new Date(blog.date),
      category: blog.category,
      readTime: blog.readTime,
      isPublished: true,
      // SEO alanını ekle
      seo: {
        pageTitle: {
          tr: `${blog.title} | Latek Mimarlık Blog`,
          en: `${blog.title} | Latek Architecture Blog`
        },
        metaDescription: {
          tr: blog.excerpt || "",
          en: blog.excerpt || ""
        },
        keywords: {
          tr: `${blog.category || ""}, mimarlık, blog, tasarım`,
          en: `${blog.category || ""}, architecture, blog, design`
        }
      }
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

// Ana fonksiyon
const seedDatabase = async () => {
  try {
    console.log('Veritabanına bağlanılıyor...');
    await connectToDatabase();
    console.log('MongoDB bağlantısı başarılı');
    
    // Mevcut verileri temizle
    console.log('Mevcut blog verileri siliniyor...');
    await Blog.deleteMany({});
    
    // Blog yazılarını hazırlayıp veritabanına ekle
    const preparedBlogs = prepareBlogsForDB(blogData);
    console.log(`${preparedBlogs.length} adet blog verisi eklenecek...`);
    const blogs = await Blog.insertMany(preparedBlogs);
    
    console.log('Blog yazıları başarıyla eklendi!');
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
