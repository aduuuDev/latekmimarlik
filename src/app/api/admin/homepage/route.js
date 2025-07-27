import { connectToDatabase } from '@/lib/db';
import Homepage from '@/models/Homepage';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { createMultiLanguageDocument, homepageSchema } from '@/utils/multiLanguageHelpers';

// GET metodu ile anasayfa verilerini almak
export async function GET() {
  try {
    await connectToDatabase();
    
    // Anasayfa verisini bul veya oluştur
    let homepage = await Homepage.findOne();
    
    // Convert existing homepage data to ensure proper structure
    if (homepage) {
      // Convert to plain object and ensure it has the correct structure
      const homepageObject = homepage.toObject();
      homepage = homepageObject;
    } else {
      homepage = {
        heroBanner: {
          subtitle: {
            tr: "İÇ VE DIŞ MİMARİ TASARIMLAR",
            en: "WE DO INTERIOR & EXTERIOR OF",
            de: "WIR MACHEN INNEN- UND AUSSENARCHITEKTUR VON",
            ar: "نحن نقوم بتصميم داخلي وخارجي"
          },
          title: {
            tr: "Tampere Arena Libeskind",
            en: "Tampere Arena Libeskind",
            de: "Tampere Arena Libeskind",
            ar: "تامبير أرينا ليبسكيند"
          },
          buttonText: {
            tr: "BİZE ULAŞIN",
            en: "CONTACT US",
            de: "KONTAKTIERE UNS",
            ar: "اتصل بنا"
          },
          buttonLink: "/contact-us",
          backgroundImage: "https://picsum.photos/1920/1080",
        },
        numbersSection: {
          subtitle: {
            tr: "SAYILARLA BİZ",
            en: "NUMBERS",
            de: "ZAHLEN",
            ar: "الأرقام"
          },
          title: {
            tr: "Sevgiyle yapıyoruz\nyaptığımız her şeyi.",
            en: "Make with love\nall what we do.",
            de: "Mache mit Liebe\nalles was wir tun.",
            ar: "نصنع بالحب\nكل ما نفعله."
          },
          content: {
            tr: "Ekibimiz, bir fikir ve konsept geliştirmeden gerçekleştirmeye kadar her şeyi üstlenir. Geleneklere inanıyor ve onları yeniliklerimiz içinde birleştiriyoruz. Tüm projelerimiz, benzersiz bir sanatsal imaj ve işlevsel çözümler içerir.\n\nMüşteri, projenin ruhudur. Ana hedefimiz, onun/onların değerlerini ve bireyselliğini göstermektir.",
            en: "Our team takes over everything, from an idea and concept development to realization. We believe in traditions and incorporate them within our innovations. All our projects incorporate a unique artistic image and functional solutions.\n\nClient is the soul of the project. Our main goal is to illustrate his/hers values and individuality.",
            de: "Unser Team übernimmt alles, von einer Idee und Konzeptentwicklung bis zur Realisierung. Wir glauben an Traditionen und integrieren sie in unsere Innovationen. Alle unsere Projekte beinhalten ein einzigartiges künstlerisches Image und funktionale Lösungen.\n\nDer Kunde ist die Seele des Projekts. Unser Hauptziel ist es, seine Werte und Individualität zu illustrieren.",
            ar: "يتولى فريقنا كل شيء، بدءًا من تطوير الفكرة والمفهوم وحتى التحقيق. نحن نؤمن بالتقاليد وندمجها في ابتكاراتنا. تتضمن جميع مشاريعنا صورة فنية فريدة وحلولًا وظيفية.\n\nالعميل هو روح المشروع. هدفنا الرئيسي هو توضيح قيمه وفرديته."
          },
          image: "https://picsum.photos/seed/architecture-numbers/600/400",
        },
        servicesSection: {
          subtitle: {
            tr: "HİZMETLERİMİZ",
            en: "SERVICES",
            de: "DIENSTLEISTUNGEN",
            ar: "الخدمات"
          },
          title: {
            tr: "İşte bizim yaptıklarımız.",
            en: "This is what we do.",
            de: "Das ist was wir machen.",
            ar: "هذا ما نقوم به."
          },
          backgroundImage: "https://picsum.photos/seed/services-banner/1920/468",
          buttonText: {
            tr: "DAHA FAZLA",
            en: "LOAD MORE",
            de: "MEHR LADEN",
            ar: "تحميل المزيد"
          },
          buttonLink: "/services",
        },
        projectsSection: {
          subtitle: {
            tr: "SON PROJELER",
            en: "LAST PROJECTS",
            de: "LETZTE PROJEKTE",
            ar: "آخر المشاريع"
          },
          title: {
            tr: "Tutkuyla yapın.",
            en: "Make it with passion.",
            de: "Machen Sie es mit Leidenschaft.",
            ar: "اصنعه بشغف."
          },
          buttonText: {
            tr: "DAHA FAZLA",
            en: "LOAD MORE",
            de: "MEHR LADEN",
            ar: "تحميل المزيد"
          },
          buttonLink: "/projects",
        },
        blogSection: {
          subtitle: {
            tr: "BLOG",
            en: "BLOG",
            de: "BLOG",
            ar: "مدونة"
          },
          title: {
            tr: "Uzmanlarımızdan En Son İçgörüler.",
            en: "Latest Insights From Our Experts.",
            de: "Neueste Einblicke von unseren Experten.",
            ar: "أحدث رؤى من خبرائنا."
          },
          backgroundImage: "https://picsum.photos/seed/clients-banner/1920/468",
        },
        contactSection: {
          subtitle: {
            tr: "İLETİŞİM",
            en: "CONTACT",
            de: "KONTAKT",
            ar: "اتصل"
          },
          title: {
            tr: "Yeni bir projeye başlayalım.",
            en: "Let's start new project.",
            de: "Lass uns ein neues Projekt starten.",
            ar: "لنبدأ مشروعًا جديدًا."
          },
          description: {
            tr: "Artık kim olduğumuzu görebildiğinize göre, bizimle iletişime geçmek ve yeni ve başarılı bir iş ilişkisinin temellerini atmak size kalmış. Ekibimiz deneyimli uzmanlardan oluşuyor.",
            en: "Now, as you were able to get a picture of who we are, it is up to you to contact us and lay the foundation for a new and successful business relationship. Our team consists of experienced professionals.",
            de: "Nachdem Sie sich ein Bild davon machen konnten, wer wir sind, liegt es an Ihnen, uns zu kontaktieren und den Grundstein für eine neue und erfolgreiche Geschäftsbeziehung zu legen. Unser Team besteht aus erfahrenen Fachleuten.",
            ar: "الآن، بما أنك تمكنت من الحصول على صورة عمن نحن، فالأمر متروك لك للاتصال بنا ووضع الأساس لعلاقة عمل جديدة وناجحة. يتكون فريقنا من محترفين ذوي خبرة."
          },
          phoneTitle: {
            tr: "TELEFON",
            en: "PHONE",
            de: "TELEFON",
            ar: "هاتف"
          },
          phones: [
            { number: "+45 (0)4 79 25 37 98", link: "tel:+45(0)479253798" },
            { number: "+44 (0)4 79 25 37 30", link: "tel:+44(0)479253730" }
          ],
          emailTitle: {
            tr: "E-POSTA",
            en: "EMAIL",
            de: "E-MAIL",
            ar: "البريد الإلكتروني"
          },
          emails: [
            { address: "prague@info.com", link: "mailto:prague@info.com" },
            { address: "prague_arh@gmail.com", link: "mailto:prague_arh@gmail.com" }
          ],
        },
        seo: {
          pageTitle: {
            tr: "Latek Mimarlık - Anasayfa",
            en: "Latek Architecture - Homepage",
            de: "Latek Architektur - Startseite",
            ar: "لاتيك للهندسة المعمارية - الصفحة الرئيسية"
          },
          metaDescription: {
            tr: "Latek Mimarlık - Profesyonel mimari ve tasarım hizmetleri",
            en: "Latek Architecture - Professional architectural and design services",
            de: "Latek Architektur - Professionelle Architektur- und Designdienstleistungen",
            ar: "لاتيك للهندسة المعمارية - خدمات معمارية وتصميم احترافية"
          },
          keywords: {
            tr: "mimarlık, tasarım, iç mimari, dış mimari",
            en: "architecture, design, interior design, exterior design",
            de: "Architektur, Design, Innenarchitektur, Außenarchitektur",
            ar: "الهندسة المعمارية، التصميم، التصميم الداخلي، التصميم الخارجي"
          },
        },
        updatedAt: new Date(),
      };
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: homepage
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Anasayfa verisi getirme hatası:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Anasayfa verisi getirilirken bir hata oluştu',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// PUT handler - Update homepage content
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Yetkilendirme kontrolü
    if (!session || !session.user) {
      return Response.json({ success: false, message: 'Bu işlem için yetkiniz bulunmuyor.' }, { status: 401 });
    }
    
    // Verileri al
    const data = await request.json();
    
    // Veritabanı bağlantısı
    await connectToDatabase();

    // Use our utility function to create a properly structured document
    const homepageData = await createMultiLanguageDocument(data, homepageSchema);
    
    // Add the updated timestamp
    homepageData.updatedAt = new Date();

    // Veritabanında güncelle
    const homepage = await Homepage.findOne();
    
    if (homepage) {
      // Mevcut kaydı güncelle
      await Homepage.findByIdAndUpdate(
        homepage._id,
        homepageData,
        { new: true, runValidators: true }
      );
    } else {
      // Yeni kayıt oluştur
      await Homepage.create(homepageData);
    }
    
    return Response.json({ 
      success: true, 
      message: 'Anasayfa içeriği başarıyla güncellendi.' 
    });
  } catch (error) {
    console.error('Anasayfa güncelleme hatası:', error);
    return Response.json(
      { 
        success: false, 
        message: 'İçerik güncellenirken bir hata oluştu.', 
        error: error.message 
      }, 
      { status: 500 }
    );
  }
}
