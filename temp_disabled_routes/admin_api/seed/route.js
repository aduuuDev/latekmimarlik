import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { servicesData, blogData, getAllSimpleProjects } from '@/utils/mockData.js';

// Slug oluşturma fonksiyonu
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET() {
  return NextResponse.json({
    message: 'Seed API Entry Point',
    availableEndpoints: {
      '/api/admin/seed/blogs': 'Seeds the blogs collection',
      '/api/admin/seed/projects': 'Seeds the projects collection',
      '/api/admin/seed/services': 'Seeds the services collection'
    },
    usage: {
      method: 'POST',
      authentication: 'Admin login required',
      note: 'Use a POST request to this endpoint to seed all collections, or to a specific endpoint to seed just that collection'
    }
  });
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (session.user.email !== process.env.ADMIN_EMAIL) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const results = {};

    // mockData.js verileri yukarıda import edildi
    // Blog verilerini formatlama
    const sampleBlogs = blogData.map(blog => {
      return {
        id: String(blog.id),
        title: {
          tr: blog.title,
          en: blog.title
        },
        slug: blog.slug || generateSlug(blog.title),
        excerpt: {
          tr: blog.excerpt || "",
          en: blog.excerpt || ""
        },
        content: {
          tr: blog.content || "",
          en: blog.content || ""
        },
        author: blog.author || "",
        date: blog.date ? new Date(blog.date) : new Date(),
        image: blog.image || "",
        category: blog.category || "",
        tags: blog.tags || [blog.category],
        isPublished: true
      };
    });

    // Proje verilerini formatlama
    const projectData = getAllSimpleProjects();
    const sampleProjects = projectData.map(project => {
      return {
        id: String(project.id),
        title: {
          tr: project.title,
          en: project.title
        },
        slug: project.slug,
        category: project.category,
        location: project.location,
        year: project.year,
        client: project.client || "",
        area: project.area || "",
        description: {
          tr: project.excerpt || project.description || "",
          en: project.excerpt || project.description || ""
        },
        image: project.image || project.coverImage || "",
        images: project.images || [project.image || project.coverImage || ""],
        featured: project.isFeatured || false,
        isActive: true
      };
    });

    // Servis verilerini formatlama
    const sampleServices = servicesData.map(service => {
      return {
        id: String(service.id),
        title: {
          tr: service.title,
          en: service.title
        },
        slug: service.slug || generateSlug(service.title),
        shortDescription: {
          tr: service.description || "",
          en: service.description || ""
        },
        description: {
          tr: service.detailContent?.description || service.description || "",
          en: service.detailContent?.description || service.description || ""
        },
        content: {
          tr: service.detailContent?.content || "",
          en: service.detailContent?.content || ""
        },
        image: service.detailContent?.image || "",
        isPublished: true
      };
    });
    
    // generateSlug fonksiyonu yukarıda tanımlandı

    // Seed blogs
    try {
      const blogsCollection = db.collection("blogs");
      await blogsCollection.deleteMany({});
      const blogsResult = await blogsCollection.insertMany(sampleBlogs);
      results.blogs = { 
        success: true, 
        message: `Successfully seeded ${blogsResult.insertedCount} blogs` 
      };
    } catch (error) {
      results.blogs = { 
        success: false, 
        message: `Failed to seed blogs: ${error.message}` 
      };
    }

    // Seed projects
    try {
      const projectsCollection = db.collection("projects");
      await projectsCollection.deleteMany({});
      const projectsResult = await projectsCollection.insertMany(sampleProjects);
      results.projects = { 
        success: true, 
        message: `Successfully seeded ${projectsResult.insertedCount} projects` 
      };
    } catch (error) {
      results.projects = { 
        success: false, 
        message: `Failed to seed projects: ${error.message}` 
      };
    }

    // Seed services
    try {
      const servicesCollection = db.collection("services");
      await servicesCollection.deleteMany({});
      const servicesResult = await servicesCollection.insertMany(sampleServices);
      results.services = { 
        success: true, 
        message: `Successfully seeded ${servicesResult.insertedCount} services` 
      };
    } catch (error) {
      results.services = { 
        success: false, 
        message: `Failed to seed services: ${error.message}` 
      };
    }

    client.close();

    // Determine overall success
    const allSuccess = Object.values(results).every(result => result.success);

    return NextResponse.json({
      message: allSuccess ? 'All collections seeded successfully' : 'Some collections failed to seed',
      success: allSuccess,
      results: results
    });
  } catch (error) {
    console.log("Error Seeding All Collections: ", error);
    return NextResponse.json({
      message: "Failed to seed collections",
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
