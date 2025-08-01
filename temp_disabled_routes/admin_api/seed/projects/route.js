import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  return NextResponse.json({
    message: 'Projects Seed API',
    usage: {
      method: 'POST',
      description: 'Seeds the database with project data',
      authentication: 'Admin login required',
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

    const projectsCollection = db.collection("projects");
    
    // Sample project data
    const sampleProjects = [
      {
        id: "project1",
        title: "Modern Villa Projesi",
        slug: "modern-villa-projesi",
        category: "Konut",
        location: "İstanbul, Türkiye",
        year: "2024",
        area: "450 m²",
        client: "Özel Müşteri",
        description: "Modern çizgiler ve geniş cam yüzeylerle tasarlanmış lüks villa projesi...",
        images: ["/img/projects/project1-1.jpg", "/img/projects/project1-2.jpg", "/img/projects/project1-3.jpg"],
        featured: true
      },
      {
        id: "project2",
        title: "Kurumsal Ofis Kompleksi",
        slug: "kurumsal-ofis-kompleksi",
        category: "Ticari",
        location: "Ankara, Türkiye",
        year: "2023",
        area: "3500 m²",
        client: "ABC Holding",
        description: "Sürdürülebilir ve modern bir yaklaşımla tasarlanmış kurumsal ofis binası...",
        images: ["/img/projects/project2-1.jpg", "/img/projects/project2-2.jpg"],
        featured: true
      },
      {
        id: "project3",
        title: "Şehir Meydanı Yenileme Projesi",
        slug: "sehir-meydani-yenileme-projesi",
        category: "Kentsel Tasarım",
        location: "İzmir, Türkiye",
        year: "2025",
        area: "12000 m²",
        client: "İzmir Belediyesi",
        description: "Tarihi dokuyu koruyarak modern ihtiyaçlara cevap veren şehir meydanı tasarımı...",
        images: ["/img/projects/project3-1.jpg", "/img/projects/project3-2.jpg", "/img/projects/project3-3.jpg"],
        featured: false
      }
    ];

    await projectsCollection.deleteMany({});
    const result = await projectsCollection.insertMany(sampleProjects);

    client.close();

    return NextResponse.json({
      message: `Successfully seeded ${result.insertedCount} projects`,
      success: true,
    });
  } catch (error) {
    console.log("Error Seeding: ", error);
    return NextResponse.json({
      message: "Failed to seed projects",
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
