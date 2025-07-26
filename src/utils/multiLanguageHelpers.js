/**
 * A helper utility for handling multi-language fields in the application
 */
import mongoose from 'mongoose';

// Cache for active languages to avoid redundant database queries
let activeLanguagesCache = null;
let cacheTime = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Retrieves all active languages from the database
 * @returns {Array} - Array of language codes
 */
export async function getActiveLanguages() {
  // Check if we have valid cached data
  if (activeLanguagesCache && cacheTime && (Date.now() - cacheTime < CACHE_TTL)) {
    return activeLanguagesCache;
  }
  
  try {
    // Try to get Language model if it's been registered
    const Language = mongoose.models.Language;
    
    if (Language) {
      // Get all active languages ordered by their defined order
      const languages = await Language.find({ isActive: true })
        .sort({ order: 1, name: 1 })
        .select('code isDefault')
        .lean();

      if (languages && languages.length > 0) {
        activeLanguagesCache = languages.map(lang => lang.code);
        cacheTime = Date.now();
        return activeLanguagesCache;
      }
    }
  } catch (error) {
    console.error("Error fetching active languages:", error);
  }
  
  // Fallback to default languages if we couldn't get from DB
  activeLanguagesCache = ['tr', 'en', 'de', 'ar'];
  cacheTime = Date.now();
  return activeLanguagesCache;
}

/**
 * Gets the default language code
 * @returns {String} - Default language code
 */
export async function getDefaultLanguage() {
  try {
    const Language = mongoose.models.Language;
    
    if (Language) {
      const defaultLang = await Language.findOne({ isDefault: true }).select('code').lean();
      if (defaultLang) {
        return defaultLang.code;
      }
    }
  } catch (error) {
    console.error("Error fetching default language:", error);
  }
  
  // Default fallback
  return 'tr';
}

/**
 * Invalidates the language cache, forcing a refresh on next query
 */
export function invalidateLanguageCache() {
  activeLanguagesCache = null;
  cacheTime = null;
}

/**
 * Ensures all required languages are present in a multi-language object
 * @param {Object} multiLangObject - The object containing language values
 * @param {Array} languages - Array of language codes to ensure exist
 * @returns {Object} - Object with all required languages
 */
export async function ensureAllLanguages(multiLangObject, languages = null) {
  // Get languages if not provided
  if (!languages) {
    languages = await getActiveLanguages();
  }

  if (!multiLangObject || typeof multiLangObject !== 'object') {
    // If not an object, create a new one with the value in all languages
    const value = multiLangObject || '';
    return languages.reduce((obj, lang) => {
      obj[lang] = value;
      return obj;
    }, {});
  }

  // Ensure all languages exist in the object
  const result = { ...multiLangObject };
  languages.forEach(lang => {
    if (result[lang] === undefined) {
      result[lang] = '';
    }
  });

  return result;
}

/**
 * Creates a properly structured content document with multi-language fields
 * @param {Object} data - The input data containing all sections
 * @param {Object} schema - Schema definition specifying which fields should be multi-language
 * @returns {Object} - Properly structured document
 */
export async function createMultiLanguageDocument(data, schema) {
  const result = {};
  // Get languages once to use for all fields
  const languages = await getActiveLanguages();

  // Process each section according to schema
  for (const section of Object.keys(schema)) {
    if (!data[section]) {
      result[section] = {};
      continue;
    }

    result[section] = {};

    // Process multi-language fields
    if (schema[section].multiLanguageFields) {
      for (const field of schema[section].multiLanguageFields) {
        if (data[section][field] !== undefined) {
          result[section][field] = await ensureAllLanguages(data[section][field], languages);
        }
      }
    }

    // Process normal fields
    if (schema[section].fields) {
      for (const field of schema[section].fields) {
        if (data[section][field] !== undefined) {
          result[section][field] = data[section][field];
        }
      }
    }

    // Process array fields
    if (schema[section].arrayFields) {
      for (const arrayField of Object.keys(schema[section].arrayFields)) {
        if (Array.isArray(data[section][arrayField])) {
          result[section][arrayField] = [];
          
          for (const item of data[section][arrayField]) {
            const arrayItem = {};
            
            // Process array item fields
            if (schema[section].arrayFields[arrayField].fields) {
              for (const field of schema[section].arrayFields[arrayField].fields) {
                if (item[field] !== undefined) {
                  arrayItem[field] = item[field];
                }
              }
            }
            
            // Process array item multi-language fields
            if (schema[section].arrayFields[arrayField].multiLanguageFields) {
              for (const field of schema[section].arrayFields[arrayField].multiLanguageFields) {
                if (item[field] !== undefined) {
                  arrayItem[field] = await ensureAllLanguages(item[field], languages);
                }
              }
            }
            
            result[section][arrayField].push(arrayItem);
          }
        } else {
          result[section][arrayField] = [];
        }
      }
    }
  }

  return result;
}

/**
 * Homepage schema definition
 */
export const homepageSchema = {
  heroBanner: {
    multiLanguageFields: ['subtitle', 'title', 'buttonText'],
    fields: ['buttonLink', 'backgroundImage']
  },
  numbersSection: {
    multiLanguageFields: ['subtitle', 'title', 'content'],
    fields: ['image']
  },
  servicesSection: {
    multiLanguageFields: ['subtitle', 'title', 'buttonText'],
    fields: ['buttonLink', 'backgroundImage']
  },
  projectsSection: {
    multiLanguageFields: ['subtitle', 'title', 'buttonText'],
    fields: ['buttonLink']
  },
  blogSection: {
    multiLanguageFields: ['subtitle', 'title'],
    fields: ['backgroundImage']
  },
  contactSection: {
    multiLanguageFields: ['subtitle', 'title', 'description', 'phoneTitle', 'emailTitle'],
    fields: [],
    arrayFields: {
      phones: {
        fields: ['number', 'link']
      },
      emails: {
        fields: ['address', 'link']
      }
    }
  },
  seo: {
    multiLanguageFields: ['pageTitle', 'metaDescription', 'keywords'],
    fields: []
  }
};
