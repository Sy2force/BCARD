/**
 * Modèle User
 * Schéma conforme au PDF HackerU
 */

import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  email: string;
  password: string;
  phone: string;
  image?: {
    url?: string;
    alt?: string;
  };
  address: {
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip?: number;
  };
  isBusiness: boolean;
  isAdmin: boolean;
  loginAttempts?: number;
  lockUntil?: Date;
  isLocked?: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
  incLoginAttempts(): Promise<void>;
  resetLoginAttempts(): Promise<void>;
}

const userSchema = new Schema<IUser>({
  name: {
    first: { 
      type: String, 
      required: true, 
      minlength: 2, 
      maxlength: 256 
    },
    middle: { 
      type: String, 
      maxlength: 256 
    },
    last: { 
      type: String, 
      required: true, 
      minlength: 2, 
      maxlength: 256 
    }
  },
  phone: { 
    type: String, 
    required: true,
    match: /^0[2-9]\d{7,8}$/
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: { 
    type: String, 
    required: true,
    minlength: 8
  },
  image: {
    url: { type: String },
    alt: { type: String }
  },
  address: {
    state: { type: String, maxlength: 256 },
    country: { type: String, required: true, maxlength: 256 },
    city: { type: String, required: true, maxlength: 256 },
    street: { type: String, required: true, maxlength: 256 },
    houseNumber: { type: Number, required: true, min: 1 },
    zip: { type: Number }
  },
  isAdmin: { type: Boolean, default: false },
  isBusiness: { type: Boolean, default: false },
  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date }
}, {
  timestamps: true
});

// Index pour performance (email déjà unique dans le schéma)
// userSchema.index({ email: 1 }); // Supprimé pour éviter la duplication

// Hash password avant sauvegarde
userSchema.pre('save', async function(next): Promise<void> {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as any);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Méthode pour gérer les tentatives de connexion
userSchema.methods.incLoginAttempts = function() {
  // Reset si le lock a expiré
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  }
  
  const updates: any = { $inc: { loginAttempts: 1 } };
  const maxAttempts = Number(process.env.MAX_LOGIN_ATTEMPTS) || 5;
  const lockTime = Number(process.env.LOCKOUT_TIME) || 24; // heures
  
  // Lock après 5 tentatives
  if ((this.loginAttempts || 0) + 1 >= maxAttempts && !this.lockUntil) {
    updates.$set = { lockUntil: Date.now() + lockTime * 60 * 60 * 1000 };
  }
  
  return this.updateOne(updates);
};

// Reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: 1 }
  });
};

// Virtual pour vérifier si le compte est verrouillé
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > new Date());
});

// Transformation JSON (enlever password)
userSchema.set('toJSON', {
  transform: function(doc, ret: any) {
    delete ret.password;
    delete ret.__v;
    delete ret.loginAttempts;
    return ret;
  }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
