import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Kullanıcı adı zorunludur'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Şifre zorunludur'],
    minlength: [6, 'Şifre en az 6 karakter olmalıdır']
  },
  name: {
    type: String,
    required: [true, 'İsim zorunludur']
  },
  role: {
    type: String,
    enum: ['admin', 'editor'],
    default: 'editor'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Şifreyi hashle
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Şifre karşılaştırma methodu
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Eğer model zaten varsa, mevcut modeli kullan, yoksa yeni model oluştur
export default mongoose.models.User || mongoose.model('User', userSchema);
