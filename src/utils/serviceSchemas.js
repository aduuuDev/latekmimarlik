/**
 * Services schema definition for multi-language support
 */
export const servicesSchema = {
  // Temel bilgiler
  basicInfo: {
    multiLanguageFields: ['title', 'description'],
    fields: ['slug', 'order', 'isActive']
  },
  
  // Detay sayfası içeriği
  detailContent: {
    multiLanguageFields: ['description', 'content'],
    fields: ['bannerImage', 'featuredImage'],
    arrayFields: {
      gallery: {
        fields: ['url']
      }
    }
  },
  
  // SEO bilgileri
  seo: {
    multiLanguageFields: ['pageTitle', 'metaDescription', 'keywords'],
    fields: []
  }
};

/**
 * Services sayfası için schema definition
 */
export const servicesPageSchema = {
  // Hero Banner Section
  heroBanner: {
    multiLanguageFields: ['title', 'subtitle'],
    fields: ['backgroundImage']
  },
  
  // Content Section
  contentSection: {
    multiLanguageFields: ['title', 'subtitle', 'description'],
    fields: []
  },
  
  // SEO bilgileri
  seo: {
    multiLanguageFields: ['pageTitle', 'metaDescription', 'keywords'],
    fields: []
  }
};

/**
 * Multi-language document oluşturmak için yardımcı fonksiyon
 * @param {Object} data - İşlenecek veri
 * @param {Object} schema - Veri şeması
 * @returns {Object} - İşlenmiş veri
 */
export async function createMultiLanguageDocument(data, schema) {
  if (!data || !schema) {
    return {};
  }
  
  const result = {};
  
  // Her bir bölümü işle
  for (const sectionKey in schema) {
    if (data[sectionKey]) {
      result[sectionKey] = {};
      
      // Çoklu dil alanlarını işle
      if (schema[sectionKey].multiLanguageFields && Array.isArray(schema[sectionKey].multiLanguageFields)) {
        for (const field of schema[sectionKey].multiLanguageFields) {
          if (data[sectionKey][field]) {
            result[sectionKey][field] = data[sectionKey][field];
          }
        }
      }
      
      // Normal alanları işle
      if (schema[sectionKey].fields && Array.isArray(schema[sectionKey].fields)) {
        for (const field of schema[sectionKey].fields) {
          if (data[sectionKey][field] !== undefined) {
            result[sectionKey][field] = data[sectionKey][field];
          }
        }
      }
      
      // Array alanları işle
      if (schema[sectionKey].arrayFields) {
        for (const arrayField in schema[sectionKey].arrayFields) {
          if (data[sectionKey][arrayField] && Array.isArray(data[sectionKey][arrayField])) {
            result[sectionKey][arrayField] = data[sectionKey][arrayField];
          }
        }
      }
    }
  }
  
  return result;
}
