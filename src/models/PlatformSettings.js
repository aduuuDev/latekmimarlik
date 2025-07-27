import mongoose from 'mongoose';

// Define platform settings schema
const PlatformSettingsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      default: 'platformSettings',
      enum: ['platformSettings'],
    },
    platformName: {
      type: Map,
      of: String,
      default: {}
    },
    contactEmail: {
      type: String,
      default: ''
    },
    contactPhone: {
      type: String,
      default: ''
    },
    address: {
      type: Map,
      of: String,
      default: {}
    },
    social: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      youtube: { type: String, default: '' }
    }
  },
  {
    timestamps: true
  }
);

// Create the model if it doesn't exist
export default mongoose.models.PlatformSettings || mongoose.model('PlatformSettings', PlatformSettingsSchema);
