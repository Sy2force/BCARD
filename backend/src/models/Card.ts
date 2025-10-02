/**
 * Modèle Card
 * Schéma conforme au PDF HackerU
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface ICard extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web?: string;
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
  bizNumber: number;
  likes: string[];
  user_id: mongoose.Types.ObjectId;
  toggleLike(userId: string): Promise<void>;
}

const cardSchema = new Schema<ICard>({
  title: { 
    type: String, 
    required: true,
    minlength: 2,
    maxlength: 256
  },
  subtitle: { 
    type: String, 
    required: true,
    minlength: 2,
    maxlength: 256
  },
  description: { 
    type: String, 
    required: true,
    minlength: 2,
    maxlength: 1024
  },
  phone: { 
    type: String, 
    required: true,
    match: /^0[2-9]\d{7,8}$/
  },
  email: { 
    type: String, 
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  web: { 
    type: String,
    match: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
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
  bizNumber: { 
    type: Number, 
    required: true,
    unique: true,
    min: 1000000,
    max: 9999999
  },
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
});

// Index pour performance (bizNumber déjà unique dans le schéma)
// cardSchema.index({ bizNumber: 1 }); // Supprimé pour éviter la duplication
cardSchema.index({ user_id: 1 });
cardSchema.index({ createdAt: -1 });

// Virtual for likes count
cardSchema.virtual('likesCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

// Méthode pour vérifier la propriété
cardSchema.methods.isOwner = function(userId: string): boolean {
  return this.user_id.toString() === userId.toString();
};

// Méthode pour toggle like
cardSchema.methods.toggleLike = function(userId: string): Promise<void> {
  const userIdStr = userId.toString();
  const index = this.likes.findIndex((id: any) => id.toString() === userIdStr);
  
  if (index === -1) {
    this.likes.push(userId);
  } else {
    this.likes.splice(index, 1);
  }
  
  return this.save();
};

// Transformation JSON
cardSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret: any) {
    delete ret.__v;
    return ret;
  }
});

const Card = mongoose.model<ICard>('Card', cardSchema);

export default Card;
