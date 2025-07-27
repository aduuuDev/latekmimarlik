import mongoose from 'mongoose';

// Create schemas for multi-language text fields
const multiLanguageTextSchema = new mongoose.Schema({
  tr: { type: String, default: '' },
  en: { type: String, default: '' },
  de: { type: String, default: '' },
  ar: { type: String, default: '' }
}, { _id: false });

// Blog post schema
const blogSchema = new mongoose.Schema({
  // Blog temel bilgileri
  title: multiLanguageTextSchema,
  slug: { type: String, required: true, unique: true },
  excerpt: multiLanguageTextSchema,
  content: multiLanguageTextSchema,
  image: String,
  author: String,
  date: { type: Date, default: Date.now },
  category: String,
  readTime: String,
  isPublished: { type: Boolean, default: false },
  
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

// Slug oluşturma yardımcı fonksiyonu
export function generateSlug(title) {
  if (!title) return '';
  
  // Başlık İngilizce değilse ve Türkçe varsa Türkçe'yi kullan
  const titleText = typeof title === 'object' ? (title.en || title.tr || '') : title;
  
  return titleText
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Pre-save hook to generate slug
blogSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = generateSlug(this.title);
  }
  this.updatedAt = new Date();
  next();
});

// Eğer model zaten varsa, mevcut modeli kullan, yoksa yeni model oluştur
export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
