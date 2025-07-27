import mongoose from 'mongoose';

// Define logo schema
const PlatformLogoSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      default: 'platformLogo',
      enum: ['platformLogo'],
    },
    light: { 
      type: String, 
      default: '/img/logo.png' 
    },
    dark: { 
      type: String, 
      default: '/img/home/logo-white.png' 
    }
  },
  {
    timestamps: true
  }
);

// Create the model if it doesn't exist
export default mongoose.models.PlatformLogo || mongoose.model('PlatformLogo', PlatformLogoSchema);
