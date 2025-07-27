import { MongoClient } from 'mongodb';

// MongoDB bağlantı URL'si
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB = process.env.MONGODB_DB || 'latekmimarlık';

// Bağlantı için global değişkenler
let cachedClient = null;
let cachedDb = null;

/**
 * MongoDB'ye bağlan ve veritabanı bağlantısını döndür
 */
export async function connectDb() {
  // Eğer bağlantı önbellekte varsa kullan
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Bağlantı yoksa yeni bir bağlantı oluştur
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);
  
  // Bağlantıyı önbelleğe al
  cachedClient = client;
  cachedDb = db;
  
  return { client, db };
}

/**
 * MongoDB'den bağlantıyı kapat
 */
export async function disconnectDb() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}
