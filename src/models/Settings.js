import mongoose from "mongoose";

// Define mixed schema options for multilingual text
const multiLangText = {
  tr: { type: String, default: "" },
  en: { type: String, default: "" },
  de: { type: String, default: "" },
  ar: { type: String, default: "" },
};

// Define social link schema
const SocialLinkSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  url: { type: String, required: true },
});

// Define contact schema
const ContactSchema = new mongoose.Schema({
  title: multiLangText,
  phone: { type: String, default: "" },
  email: { type: String, default: "" },
  address: multiLangText,
});

// Define banner schema
const BannerSchema = new mongoose.Schema({
  imageUrl: { type: String, default: "" },
  altText: multiLangText,
});

// Define logo schema
const LogoSchema = new mongoose.Schema({
  light: { type: String, default: "/img/logo.png" },
  dark: { type: String, default: "/img/home/logo-white.png" },
});

// Define navigation schema
const NavigationSchema = new mongoose.Schema({
  home: multiLangText,
  about: multiLangText,
  services: multiLangText,
  projects: multiLangText,
  products: multiLangText,
  blog: multiLangText,
  contact: multiLangText,
});

// Define the settings schema
const SettingsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["header", "footer", "seo", "general"],
      unique: true,
    },
    // Header Settings
    sticky: { type: Boolean, default: true },
    transparent: { type: Boolean, default: false },
    logoPosition: {
      type: String,
      enum: ["left", "center", "right"],
      default: "left",
    },
    menuPosition: {
      type: String,
      enum: ["left", "center", "right"],
      default: "right",
    },
    showSearchIcon: { type: Boolean, default: true },
    showLanguageSelector: { type: Boolean, default: true },
    backgroundColor: { type: String, default: "" },
    textColor: { type: String, default: "" },
    navigation: { type: NavigationSchema, default: {} },

    // Footer Settings
    platformName: multiLangText,
    logo: { type: LogoSchema, default: {} },
    banner: { type: BannerSchema, default: {} },
    description: multiLangText,
    contact: { type: ContactSchema, default: {} },
    copyright: multiLangText,
    socialLinks: [SocialLinkSchema],

    // SEO Settings
    title: multiLangText,
    description: multiLangText,
    keywords: multiLangText,

    // Any additional settings can be added here
  },
  {
    timestamps: true,
  }
);

// Create the model if it doesn't exist
export default mongoose.models.Settings ||
  mongoose.model("Settings", SettingsSchema);
