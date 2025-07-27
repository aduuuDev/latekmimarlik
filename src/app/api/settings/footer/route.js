import { connectToDatabase } from '@/lib/db';
import mongoose from 'mongoose';

// Settings modeli
const settingsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: String
  }
});

// Eğer model zaten varsa, mevcut modeli kullan, yoksa yeni model oluştur
const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);

export async function GET(req) {
  try {
    // Veritabanına bağlan
    await connectToDatabase();
    
    // Settings koleksiyonundan footer ayarlarını çek
    const footerSettings = await Settings.findOne({ type: 'footer' });
    
    return Response.json({ success: true, data: footerSettings?.data || {} });
  } catch (error) {
    console.error('Footer settings fetch error:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
