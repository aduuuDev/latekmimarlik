import { connectToDatabase } from '@/lib/db';
import ServicesPage from '@/models/ServicesPage';

// GET /api/services-page
// Herkese açık API - Servisler sayfası genel içeriğini getir
export async function GET() {
  try {
    await connectToDatabase();
    
    // Servisler sayfası içeriğini getir
    let servicesPage = await ServicesPage.findOne().lean();
    
    // Eğer içerik yoksa varsayılanları döndür
    if (!servicesPage) {
      servicesPage = {
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
    
    return new Response(JSON.stringify({
      success: true,
      data: servicesPage
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Servisler sayfası verileri çekilirken hata:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Servisler sayfası verileri çekilirken bir hata oluştu'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
