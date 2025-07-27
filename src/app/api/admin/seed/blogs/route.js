import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  return NextResponse.json({
    message: 'Blog Seed API',
    usage: {
      method: 'POST',
      description: 'Seeds the database with blog data',
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

    const blogsCollection = db.collection("blogs");
    
    // Sample blog data
    const sampleBlogs = [
      {
        id: "blog1",
        title: "Modern Mimari Trendleri",
        slug: "modern-mimari-trendleri",
        summary: "2025 yılında öne çıkan mimari tasarım trendlerine genel bakış",
        content: "Modern mimaride sürdürülebilirlik, akıllı ev teknolojileri ve minimalist tasarım öne çıkıyor...",
        author: "Ahmet Yılmaz",
        date: "2025-02-10",
        image: "/img/blog/blog-1.jpg",
        category: "Mimari Trendler",
        tags: ["modern", "mimari", "trend", "2025"]
      },
      {
        id: "blog2",
        title: "Sürdürülebilir Mimari Çözümler",
        slug: "surdurulebilir-mimari-cozumler",
        summary: "Çevre dostu bina tasarımları ve yenilenebilir enerji kullanımı",
        content: "Sürdürülebilir mimari, doğal kaynakların korunması ve çevresel etkilerin azaltılması için...",
        author: "Ayşe Demir",
        date: "2025-03-15",
        image: "/img/blog/blog-2.jpg",
        category: "Sürdürülebilirlik",
        tags: ["sürdürülebilirlik", "yeşil bina", "enerji verimliliği"]
      },
      {
        id: "blog3",
        title: "İç Mekan Tasarım İlkeleri",
        slug: "ic-mekan-tasarim-ilkeleri",
        summary: "Fonksiyonel ve estetik iç mekan tasarımı için temel prensipler",
        content: "İç mekan tasarımında ışık, renk, doku ve alan kullanımı büyük önem taşır...",
        author: "Mehmet Kaya",
        date: "2025-04-20",
        image: "/img/blog/blog-3.jpg",
        category: "İç Mimari",
        tags: ["iç mimari", "tasarım", "dekorasyon"]
      }
    ];

    await blogsCollection.deleteMany({});
    const result = await blogsCollection.insertMany(sampleBlogs);

    client.close();

    return NextResponse.json({
      message: `Successfully seeded ${result.insertedCount} blogs`,
      success: true,
    });
  } catch (error) {
    console.log("Error Seeding: ", error);
    return NextResponse.json({
      message: "Failed to seed blogs",
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
