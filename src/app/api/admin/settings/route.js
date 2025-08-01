import { connectToDatabase } from "@/lib/db";
import { getSessionWithAuth } from "@/utils/authHelpers";
import Settings from "@/models/Settings";
import PlatformLogo from "@/models/PlatformLogo";
import PlatformSettings from "@/models/PlatformSettings";

// Yetki kontrolü fonksiyonu
async function isAuthenticated() {
  const session = await getSessionWithAuth();

  if (!session || !session.user) {
    return { success: false, message: "Unauthorized" };
  }

  // Sadece admin ve editörler ayarları değiştirebilir
  if (!["admin", "editor"].includes(session.user.role)) {
    return { success: false, message: "Permission denied" };
  }

  return {
    success: true,
    user: session.user,
  };
}

export async function GET(req) {
  try {
    // Yetki kontrolü
    const auth = await isAuthenticated();
    if (!auth.success) {
      return Response.json(
        { success: false, message: auth.message },
        { status: 401 }
      );
    }

    // Veritabanına bağlan
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    // Platform Logo için özel işlem
    if (type === "platformLogo") {
      const logo = await PlatformLogo.findOne({ type: "platformLogo" });
      return Response.json({
        success: true,
        data: logo || {
          light: "/img/logo.png",
          dark: "/img/home/logo-white.png",
          type: "platformLogo",
        },
      });
    }

    // Platform Settings için özel işlem
    if (type === "platformSettings") {
      const platformSettings = await PlatformSettings.findOne({
        type: "platformSettings",
      });
      return Response.json({
        success: true,
        data: platformSettings || {
          platformName: {},
          contactEmail: "",
          contactPhone: "",
          address: {},
          social: {
            facebook: "",
            twitter: "",
            instagram: "",
            linkedin: "",
            youtube: "",
          },
          type: "platformSettings",
        },
      });
    }

    // Belirli bir ayar türü istenirse
    if (type) {
      const settings = await Settings.findOne({ type });
      // Yeni model yapısında, veriler doğrudan belge içinde
      return Response.json({ success: true, data: settings || {} });
    }

    // Tüm ayarları getir (default olarak footer)
    const footerSettings = await Settings.findOne({ type: "footer" });

    return Response.json({ success: true, data: footerSettings || {} });
  } catch (error) {
    console.error("Settings fetch error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // Yetki kontrolü
    const auth = await isAuthenticated();
    if (!auth.success) {
      return Response.json(
        { success: false, message: auth.message },
        { status: 401 }
      );
    }

    // Veritabanına bağlan
    await connectToDatabase();

    // Gelen veriyi al
    const body = await req.json();
    const { type, data } = body;

    // Veriyi doğrula
    if (!type || !data) {
      return Response.json(
        { success: false, message: "Type and data are required" },
        { status: 400 }
      );
    }

    // Platform Logo için özel işlem
    if (type === "platformLogo") {
      const result = await PlatformLogo.findOneAndUpdate(
        { type: "platformLogo" },
        { light: data.light, dark: data.dark, type: "platformLogo" },
        { upsert: true, new: true }
      );

      return Response.json({
        success: true,
        message: "Platform logo saved successfully",
        data: result,
      });
    }

    // Platform Settings için özel işlem
    if (type === "platformSettings") {
      const result = await PlatformSettings.findOneAndUpdate(
        { type: "platformSettings" },
        {
          platformName: data.platformName || {},
          contactEmail: data.contactEmail || "",
          contactPhone: data.contactPhone || "",
          address: data.address || {},
          social: data.social || {
            facebook: "",
            twitter: "",
            instagram: "",
            linkedin: "",
            youtube: "",
          },
          type: "platformSettings",
        },
        { upsert: true, new: true }
      );

      return Response.json({
        success: true,
        message: "Platform settings saved successfully",
        data: result,
      });
    }

    // Yeni model yapısında tüm verileri tek bir nesne içinde tutuyoruz
    // Verileri kendi alanlarıyla birleştirelim
    const updateData = { ...data, type };

    // Veritabanına kaydet (upsert: true ile varsa güncelle, yoksa ekle)
    const result = await Settings.findOneAndUpdate({ type }, updateData, {
      upsert: true,
      new: true,
    });

    return Response.json({
      success: true,
      message: `${type} settings saved successfully`,
      data: result,
    });
  } catch (error) {
    console.error("Settings save error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
