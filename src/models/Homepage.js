import mongoose from 'mongoose';

// Create schemas for multi-language text fields
const multiLanguageTextSchema = new mongoose.Schema({
  tr: { type: String, default: '' },
  en: { type: String, default: '' },
  de: { type: String, default: '' },
  ar: { type: String, default: '' }
}, { _id: false });

const homepageSchema = new mongoose.Schema({
  // Hero Banner Section
  heroBanner: {
    subtitle: multiLanguageTextSchema,
    title: multiLanguageTextSchema,
    buttonText: multiLanguageTextSchema,
    buttonLink: String, // URLs typically remain the same across languages
    backgroundImage: String,
  },
  
  // Numbers Section
  numbersSection: {
    subtitle: multiLanguageTextSchema,
    title: multiLanguageTextSchema,
    content: multiLanguageTextSchema,
    image: String,
  },
  
  // Services Section
  servicesSection: {
    subtitle: multiLanguageTextSchema,
    title: multiLanguageTextSchema,
    backgroundImage: String,
    buttonText: multiLanguageTextSchema,
    buttonLink: String,
  },
  
  // Projects Section
  projectsSection: {
    subtitle: multiLanguageTextSchema,
    title: multiLanguageTextSchema,
    buttonText: multiLanguageTextSchema,
    buttonLink: String,
  },
  
  // Blog Section
  blogSection: {
    subtitle: multiLanguageTextSchema,
    title: multiLanguageTextSchema,
    backgroundImage: String,
  },
  
  // Contact Section
  contactSection: {
    subtitle: multiLanguageTextSchema,
    title: multiLanguageTextSchema,
    description: multiLanguageTextSchema,
    phoneTitle: multiLanguageTextSchema,
    phones: [{
      number: String,
      link: String,
    }],
    emailTitle: multiLanguageTextSchema,
    emails: [{
      address: String,
      link: String,
    }],
  },
  
  // SEO ve Meta bilgileri
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
export default mongoose.models.Homepage || mongoose.model('Homepage', homepageSchema);
