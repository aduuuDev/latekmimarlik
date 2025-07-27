import mongoose from 'mongoose';
import fs from 'fs';

// MongoDB bağlantı URI'si
const MONGODB_URI = 'mongodb+srv://seyfisonercetin:2VlGCWozPBE9V4ug@latekmimarlik.5od56xq.mongodb.net/latekmimarlik?retryWrites=true&w=majority';

// Bağlantı seçenekleri
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function exportData() {
  try {
    // MongoDB'ye bağlan
    await mongoose.connect(MONGODB_URI, options);
    console.log('MongoDB bağlantısı başarılı');
    
    // Blog koleksiyonunu çek
    const blogs = await mongoose.connection.collection('blogs').find({}).toArray();
    console.log(`${blogs.length} blog bulundu.`);
    
    // JSON dosyasına kaydet
    fs.writeFileSync('latekmimarlik.blogs.json', JSON.stringify(blogs, null, 2));
    console.log('Blog verileri başarıyla latekmimarlik.blogs.json dosyasına kaydedildi.');

    // Projects koleksiyonunu çek
    const projects = await mongoose.connection.collection('projects').find({}).toArray();
    console.log(`${projects.length} proje bulundu.`);
    
    // JSON dosyasına kaydet
    fs.writeFileSync('latekmimarlik.projects.json', JSON.stringify(projects, null, 2));
    console.log('Proje verileri başarıyla latekmimarlik.projects.json dosyasına kaydedildi.');
    
    // Bağlantıyı kapat
    await mongoose.connection.close();
    console.log('MongoDB bağlantısı kapatıldı');
    process.exit(0);
  } catch (error) {
    console.error('Hata oluştu:', error);
    process.exit(1);
  }
}

// Fonksiyonu çalıştır
exportData();
