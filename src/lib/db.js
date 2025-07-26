import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/latekmimarlik';

// Mongoose bağlantısını başlatan fonksiyon
export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log('MongoDB bağlantısı başarılı');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
    throw new Error('MongoDB bağlantısı kurulamadı');
  }
}

// Bağlantıyı kapatan fonksiyon (gerekirse)
export async function disconnectFromDatabase() {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  try {
    await mongoose.disconnect();
    console.log('MongoDB bağlantısı kapatıldı');
  } catch (error) {
    console.error('MongoDB bağlantısını kapatma hatası:', error);
    throw new Error('MongoDB bağlantısı kapatılamadı');
  }
}
