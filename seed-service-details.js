#!/usr/bin/env node

/**
 * Script to seed the database with service details from the mock data
 */

import { mongoose } from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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

// Enhanced format for service details from mock data
function enhanceServiceDetailsForDB(services) {
  return services.map(service => {
    const serviceDetail = {
      // Get title and existing service data
      title: {
        tr: service.title,
        en: service.title,
      },
      
      // Ensure slug is set
      slug: typeof service.slug === 'function' ? service.slug : service.title.toLowerCase().replace(/\s+/g, '-'),
      
      // Description
      description: {
        tr: service.description,
        en: service.description,
      },
      
      // Detail content
      detailContent: {
        // Detail description
        description: {
          tr: service.detailContent.description || '',
          en: service.detailContent.description || '',
        },
        // Main content with HTML
        content: {
          tr: service.detailContent.content || '',
          en: service.detailContent.content || '',
        },
        // Banner image (top of page)
        bannerImage: service.detailContent.bannerImage || '/img/bottom-view-building-facade.jpg',
        // Featured image (in content)
        featuredImage: service.detailContent.image || '',
        // Gallery images - extract from content or create empty array
        gallery: extractGalleryImagesFromContent(service.detailContent.content) || []
      },
      
      // SEO settings
      seo: {
        pageTitle: {
          tr: (service.detailContent.title || service.title) + " | Latek Mimarlık",
          en: (service.detailContent.title || service.title) + " | Latek Architecture",
        },
        metaDescription: {
          tr: service.detailContent.description || service.description,
          en: service.detailContent.description || service.description,
        },
        keywords: {
          tr: service.title + ", mimarlık, tasarım, hizmet, " + (service.detailContent.title || ''),
          en: service.title + ", architecture, design, service, " + (service.detailContent.title || ''),
        }
      }
    };
    
    return serviceDetail;
  });
}

// Extract gallery images from content HTML
function extractGalleryImagesFromContent(contentHtml) {
  if (!contentHtml) return [];
  
  // Simple regex to extract image src from img tags
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  const galleryImages = [];
  let match;
  
  // Find all image sources in the content
  while ((match = imgRegex.exec(contentHtml)) !== null) {
    if (match[1] && !match[1].includes('picsum.photos')) { // Skip placeholder images
      galleryImages.push(match[1]);
    }
  }
  
  // Add some default gallery images if none found
  if (galleryImages.length === 0) {
    galleryImages.push("/img/services/service-detail-1.jpg");
    galleryImages.push("/img/services/service-detail-2.jpg");
  }
  
  return galleryImages;
}

// Main function
async function seedServiceDetails() {
  try {
    console.log('Connecting to database...');
    await connectToDatabase();
    
    const Service = await importServiceModel();
    
    // Get all services first to update them
    const existingServices = await Service.find({});
    console.log(`Found ${existingServices.length} existing services`);
    
    if (existingServices.length === 0) {
      console.log('No existing services found. Please run seed-services.js first.');
      process.exit(1);
    }
    
    // Format service details from mock data
    const enhancedDetails = enhanceServiceDetailsForDB(servicesData);
    
    // Update each service with its enhanced details
    console.log('Updating services with enhanced details...');
    
    for (const mockService of enhancedDetails) {
      const matchingService = existingServices.find(s => 
        (s.slug === mockService.slug) || 
        (s.title.en === mockService.title.en) || 
        (s.title.tr === mockService.title.tr)
      );
      
      if (matchingService) {
        console.log(`Updating service: ${mockService.title.en}`);
        
        // Update the service with enhanced details
        await Service.findByIdAndUpdate(
          matchingService._id,
          {
            $set: {
              'detailContent.description': mockService.detailContent.description,
              'detailContent.content': mockService.detailContent.content,
              'detailContent.bannerImage': mockService.detailContent.bannerImage,
              'detailContent.featuredImage': mockService.detailContent.featuredImage,
              'detailContent.gallery': mockService.detailContent.gallery,
              'seo': mockService.seo
            }
          }
        );
      } else {
        console.log(`No matching service found for: ${mockService.title.en}`);
      }
    }
    
    console.log('Service details enhancement completed!');
    
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
seedServiceDetails();
