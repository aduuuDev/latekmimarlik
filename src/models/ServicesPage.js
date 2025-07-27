import mongoose from 'mongoose';

// Create schemas for multi-language text fields
const multiLanguageTextSchema = new mongoose.Schema({
  tr: { type: String, default: '' },
  en: { type: String, default: '' },
  de: { type: String, default: '' },
  ar: { type: String, default: '' }
}, { _id: false });

const servicesPageSchema = new mongoose.Schema({
  // Hero Banner Section
  heroBanner: {
    title: multiLanguageTextSchema,
    subtitle: multiLanguageTextSchema,
    backgroundImage: String,
  },
  
  // Content Section
  contentSection: {
    title: multiLanguageTextSchema,
    subtitle: multiLanguageTextSchema,
    description: multiLanguageTextSchema,
  },
  
  // SEO bilgileri
  seo: {
    pageTitle: multiLanguageTextSchema,
    metaDescription: multiLanguageTextSchema,
    keywords: multiLanguageTextSchema,
  },
  
  // Son güncelleme zamanı
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

// Eğer model zaten varsa, mevcut modeli kullan, yoksa yeni model oluştur
export default mongoose.models.ServicesPage || mongoose.model('ServicesPage', servicesPageSchema);
