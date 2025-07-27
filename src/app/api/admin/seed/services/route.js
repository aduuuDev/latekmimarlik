import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  return NextResponse.json({
    message: 'Services Seed API',
    usage: {
      method: 'POST',
      description: 'Seeds the database with service data',
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

    const servicesCollection = db.collection("services");
    
    // Sample service data
    const sampleServices = [
      {
        id: "service1",
        title: "Mimari Tasarım",
        slug: "mimari-tasarim",
        shortDescription: "Özgün ve fonksiyonel mimari tasarım hizmetleri",
        description: "Müşteri ihtiyaçları, arazi özellikleri ve sürdürülebilirlik ilkeleri doğrultusunda özgün ve fonksiyonel mimari çözümler sunuyoruz.",
        icon: "design-icon",
        image: "/img/services/service1.jpg"
      },
      {
        id: "service2",
        title: "İç Mimari",
        slug: "ic-mimari",
        shortDescription: "Estetik ve fonksiyonel iç mekan tasarımları",
        description: "Yaşam alanlarınızı estetik ve fonksiyonel bir şekilde dönüştürüyoruz. Renk paletleri, malzeme seçimleri ve mekan organizasyonu ile kullanıcı deneyimini en üst düzeye çıkarıyoruz.",
        icon: "interior-icon",
        image: "/img/services/service2.jpg"
      },
      {
        id: "service3",
        title: "Proje Yönetimi",
        slug: "proje-yonetimi",
        shortDescription: "Profesyonel proje yönetimi ve uygulama hizmetleri",
        description: "Tasarımdan uygulamaya kadar tüm süreçleri koordine ederek, projenizin zamanında, bütçesinde ve beklentileriniz doğrultusunda tamamlanmasını sağlıyoruz.",
        icon: "management-icon",
        image: "/img/services/service3.jpg"
      }
    ];

    await servicesCollection.deleteMany({});
    const result = await servicesCollection.insertMany(sampleServices);

    client.close();

    return NextResponse.json({
      message: `Successfully seeded ${result.insertedCount} services`,
      success: true,
    });
  } catch (error) {
    console.log("Error Seeding: ", error);
    return NextResponse.json({
      message: "Failed to seed services",
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
