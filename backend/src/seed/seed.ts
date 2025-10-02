/**
 * Script de seed pour la base de données
 * Crée 3 utilisateurs et 3 cartes
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User';
import Card from '../models/Card';
import usersData from './data/users.json';
import cardsData from './data/cards.json';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connexion à MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/facework';
    await mongoose.connect(mongoUri);
    
    // Nettoyer la base
    await User.deleteMany({});
    await Card.deleteMany({});
    
    // Insérer les utilisateurs (un par un pour déclencher le middleware de hashage)
    const users: any[] = [];
    for (const userData of usersData) {
      const user = new User(userData);
      await user.save();
      users.push(user);
    }
    
    // Insérer les cartes avec références utilisateurs
    const cardsWithUsers = cardsData.map((card: any, index: number) => ({
      ...card,
      user_id: users[index]._id
    }));
    
    const cards = await Card.insertMany(cardsWithUsers);
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('✅ Seed completed successfully!');
      console.log('Test credentials:');
      console.log('  User: user@example.com / User@1234');
      console.log('  Business: biz@example.com / Biz@1234');
      console.log('  Admin: admin@example.com / Admin@1234');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedDatabase();
