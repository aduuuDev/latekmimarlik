import { connectToDatabase } from '@/lib/db';
import mongoose from 'mongoose';
import { getSessionWithAuth } from "@/utils/authHelpers";

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

// Yetki kontrolü fonksiyonu
async function isAuthenticated() {
  const session = await getSessionWithAuth();
  
  if (!session || !session.user) {
    return { success: false, message: 'Unauthorized' };
  }
  
  // Sadece admin ve editörler ayarları değiştirebilir
  if (!['admin', 'editor'].includes(session.user.role)) {
    return { success: false, message: 'Permission denied' };
  }
  
  return {
    success: true,
    user: session.user
  };
}

export async function GET(req) {
  try {
    // Yetki kontrolü
    const auth = await isAuthenticated();
    if (!auth.success) {
      return Response.json({ success: false, message: auth.message }, { status: 401 });
    }

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

export async function POST(req) {
  try {
    // Yetki kontrolü
    const auth = await isAuthenticated();
    if (!auth.success) {
      return Response.json({ success: false, message: auth.message }, { status: 401 });
    }

    // Veritabanına bağlan
    await connectToDatabase();
    
    // İstek verisini çek
    const data = await req.json();
    
    // Veriyi doğrula
    if (!data) {
      return Response.json({ success: false, message: 'Invalid data' }, { status: 400 });
    }
    
    // Veritabanına kaydet (upsert: true ile varsa güncelle, yoksa ekle)
    const result = await Settings.findOneAndUpdate(
      { type: 'footer' },
      { 
        type: 'footer', 
        data,
        updatedAt: new Date(),
        updatedBy: auth.user.username || auth.user.email
      },
      { upsert: true, new: true }
    );
    
    return Response.json({ 
      success: true, 
      message: 'Footer settings saved successfully', 
      data: result.data 
    });
  } catch (error) {
    console.error('Footer settings save error:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
