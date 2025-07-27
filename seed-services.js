#!/usr/bin/env node

/**
 * Simple seed script for services data
 */

import { mongoose } from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get directory name correctly in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the mock data directly
import { servicesData } from './src/utils/mockData.js';

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/latekmimarlik';

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Dynamic import for the Service model
async function importServiceModel() {
  const { default: Service } = await import('./src/models/Service.js');
  return Service;
}

// Dynamic import for the ServicesPage model
async function importServicesPageModel() {
  const { default: ServicesPage } = await import('./src/models/ServicesPage.js');
  return ServicesPage;
}

// Dynamic import for the Settings model
async function importSettingsModel() {
  const { default: Settings } = await import('./src/models/Settings.js');
  return Settings;
}

// Format services for database
function formatServicesForDB(services) {
  return services.map(service => ({
    title: {
      tr: service.title,
      en: service.title,
    },
    slug: service.slug,
    description: {
      tr: service.description,
      en: service.description,
    },
    order: service.id,
    isActive: true,
    detailContent: {
      description: {
        tr: service.detailContent.description || '',
        en: service.detailContent.description || '',
      },
      content: {
        tr: service.detailContent.content || '',
        en: service.detailContent.content || '',
      },
      featuredImage: service.detailContent.image || '',
      gallery: []
    },
    seo: {
      pageTitle: {
        tr: service.title + " | Latek Mimarlık",
        en: service.title + " | Latek Architecture",
      },
      metaDescription: {
        tr: service.description,
        en: service.description,
      },
      keywords: {
        tr: service.title + ", mimarlık, tasarım, hizmet",
        en: service.title + ", architecture, design, service",
      }
    }
  }));
}

// Create default header settings
function createHeaderSettings() {
  return {
    type: 'header',
    sticky: true,
    transparent: true,
    logoPosition: "left",
    menuPosition: "right",
    showSearchIcon: true,
    showLanguageSelector: true,
    backgroundColor: "#ffffff",
    textColor: "#333333"
  };
}

// Create default footer settings
function createFooterSettings() {
  return {
    type: 'footer',
    platformName: {
      tr: "LATEK MİMARLIK",
      en: "LATEK ARCHITECTURE"
    },
    logo: {
      light: "/img/logo.png",
      dark: "/img/home/logo-white.png"
    },
    banner: {
      imageUrl: "/img/home/ffa51a33625455.56b20f01c3608.jpg",
      altText: {
        tr: "Footer Banner",
        en: "Footer Banner"
      }
    },
    description: {
      tr: "LATEK Mimarlık, modern ve yenilikçi mimari tasarım çözümleri sunar. Müşterilerimizin vizyonlarını gerçeğe dönüştürmeyi ve beklentilerini aşmayı hedefliyoruz.",
      en: "LATEK Architecture offers modern and innovative architectural design solutions. We aim to turn our clients' visions into reality and exceed their expectations."
    },
    contact: {
      title: {
        tr: "BİZE ULAŞIN",
        en: "GET IN TOUCH"
      },
      phone: "+90 212 345 67 89",
      email: "info@latekmimarlik.com",
      address: {
        tr: "Merkez Mah. Silahşör Cad. No: 42\nŞişli, İstanbul, Türkiye",
        en: "Merkez Mah. Silahşör Cad. No: 42\nŞişli, Istanbul, Turkey"
      }
    },
    copyright: {
      tr: "LATEK MİMARLIK © 2025 TÜM HAKLARI SAKLIDIR",
      en: "LATEK ARCHITECTURE © 2025 ALL RIGHTS RESERVED"
    },
    socialLinks: [
      {
        icon: "fa-facebook",
        url: "https://facebook.com/latekmimarlik"
      },
      {
        icon: "fa-twitter",
        url: "https://twitter.com/latekmimarlik"
      },
      {
        icon: "fa-instagram",
        url: "https://instagram.com/latekmimarlik"
      },
      {
        icon: "fa-linkedin",
        url: "https://linkedin.com/company/latekmimarlik"
      }
    ]
  };
}

// Create default SEO settings
function createSeoSettings() {
  return {
    type: 'seo',
    title: {
      tr: "LATEK Mimarlık | Modern Mimari Tasarım ve Çözümler",
      en: "LATEK Architecture | Modern Architectural Design and Solutions"
    },
    description: {
      tr: "LATEK Mimarlık, konut, ticari ve kurumsal projeler için modern, sürdürülebilir ve yenilikçi mimari tasarım hizmetleri sunar.",
      en: "LATEK Architecture offers modern, sustainable and innovative architectural design services for residential, commercial and institutional projects."
    },
    keywords: {
      tr: "mimarlık, mimari tasarım, iç mimarlık, proje yönetimi, sürdürülebilir mimari, modern tasarım",
      en: "architecture, architectural design, interior design, project management, sustainable architecture, modern design"
    }
  };
}

// Create default services page content
function createServicesPageContent() {
  return {
    heroBanner: {
      title: {
        tr: "HİZMETLERİMİZ",
        en: "OUR SERVICES",
        de: "UNSERE DIENSTLEISTUNGEN",
        ar: "خدماتنا"
      },
      subtitle: {
        tr: "Sizin için neler yapabiliriz?",
        en: "What can we do for you?",
        de: "Was können wir für Sie tun?",
        ar: "ماذا يمكننا أن نفعل لك؟"
      },
      backgroundImage: "/img/bottom-view-building-facade.jpg",
    },
    contentSection: {
      title: {
        tr: "Yaptıklarımız.",
        en: "This is what we do.",
        de: "Das ist, was wir tun.",
        ar: "هذا ما نفعله."
      },
      subtitle: {
        tr: "Hizmetlerimiz",
        en: "Our Services",
        de: "Unsere Dienstleistungen",
        ar: "خدماتنا"
      },
      description: {
        tr: "Modern mimari ve tasarım hizmetlerimizle projelerinizi hayata geçiriyoruz.",
        en: "We bring your projects to life with our modern architectural and design services.",
        de: "Wir erwecken Ihre Projekte mit unseren modernen Architektur- und Designdiensten zum Leben.",
        ar: "نقوم بإحياء مشاريعك من خلال خدماتنا المعمارية والتصميمية الحديثة."
      },
    },
    seo: {
      pageTitle: {
        tr: "Hizmetlerimiz | Latek Mimarlık",
        en: "Our Services | Latek Architecture",
        de: "Unsere Dienstleistungen | Latek Architektur",
        ar: "خدماتنا | لاتك للهندسة المعمارية"
      },
      metaDescription: {
        tr: "Latek Mimarlık olarak sunduğumuz mimari tasarım, iç mimarlık ve danışmanlık hizmetlerimiz hakkında bilgi alın.",
        en: "Learn about architectural design, interior architecture, and consulting services offered by Latek Architecture.",
        de: "Informieren Sie sich über Architekturdesign, Innenarchitektur und Beratungsdienste von Latek Architektur.",
        ar: "تعرف على خدمات التصميم المعماري والهندسة المعمارية الداخلية والاستشارات التي تقدمها لاتك للهندسة المعمارية."
      },
      keywords: {
        tr: "mimari tasarım, iç mimarlık, danışmanlık, planlama, uygulama, proje yönetimi",
        en: "architectural design, interior architecture, consulting, planning, implementation, project management",
        de: "Architekturdesign, Innenarchitektur, Beratung, Planung, Umsetzung, Projektmanagement",
        ar: "التصميم المعماري، الهندسة المعمارية الداخلية، الاستشارات، التخطيط، التنفيذ، إدارة المشاريع"
      },
    }
  };
}

// Main function
async function seedServices() {
  try {
    console.log('Connecting to database...');
    await connectToDatabase();
    
    const Service = await importServiceModel();
    const ServicesPage = await importServicesPageModel();
    const Settings = await importSettingsModel();
    
    // Clear existing services
    console.log('Clearing existing services data...');
    await Service.deleteMany({});
    await ServicesPage.deleteMany({});
    
    // Format and insert services
    const formattedServices = formatServicesForDB(servicesData);
    console.log(`Adding ${formattedServices.length} services...`);
    const services = await Service.insertMany(formattedServices);
    
    console.log('Services successfully added!');
    
    // Create services page content
    console.log('Creating services page content...');
    const servicesPageContent = createServicesPageContent();
    await ServicesPage.create(servicesPageContent);
    
    console.log('Services page content successfully created!');
    
    // Create and insert header settings
    console.log('Creating header settings...');
    const headerSettings = createHeaderSettings();
    await Settings.findOneAndUpdate(
      { type: 'header' },
      headerSettings,
      { upsert: true, new: true }
    );
    console.log('Header settings successfully added!');
    
    // Create and insert footer settings
    console.log('Creating footer settings...');
    const footerSettings = createFooterSettings();
    await Settings.findOneAndUpdate(
      { type: 'footer' },
      footerSettings,
      { upsert: true, new: true }
    );
    console.log('Footer settings successfully added!');
    
    // Create and insert SEO settings
    console.log('Creating SEO settings...');
    const seoSettings = createSeoSettings();
    await Settings.findOneAndUpdate(
      { type: 'seo' },
      seoSettings,
      { upsert: true, new: true }
    );
    console.log('SEO settings successfully added!');
    
    console.log('Seeding completed!');
    
    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

// Run the seed function
seedServices();
