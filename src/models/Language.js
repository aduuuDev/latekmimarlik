import mongoose from 'mongoose';

const languageSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 5
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  nativeName: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  rtl: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 999
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure only one default language
languageSchema.pre('save', async function(next) {
  if (this.isDefault) {
    // If this language is set as default, remove default status from others
    await this.constructor.updateMany(
      { _id: { $ne: this._id } },
      { $set: { isDefault: false } }
    );
  }
  next();
});

export default mongoose.models.Language || mongoose.model('Language', languageSchema);
