/**
 * Configuration MongoDB
 * Gère la connexion à la base de données
 */

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Utilise MONGODB_URI_PROD en production, sinon MONGODB_URI
    const mongoUri = process.env.NODE_ENV === 'production' 
      ? process.env.MONGODB_URI_PROD 
      : process.env.MONGODB_URI;

    const conn = await mongoose.connect(mongoUri || 'mongodb://127.0.0.1:27017/facework');

    // Log connection success in production-ready format
    if (process.env.NODE_ENV !== 'production') {
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    }
    
    // Gestion des événements
    mongoose.connection.on('error', (err) => {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`❌ MongoDB error: ${err}`);
      }
    });

    mongoose.connection.on('disconnected', () => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('⚠️ MongoDB disconnected');
      }
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      if (process.env.NODE_ENV !== 'production') {
        console.log('MongoDB connection closed through app termination');
      }
      process.exit(0);
    });

  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
