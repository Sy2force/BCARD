/**
 * Génération de numéro unique pour les cartes
 */

import Card from '../models/Card';

const generateBizNumber = async (): Promise<number> => {
  let bizNumber;
  let exists = true;
  
  while (exists) {
    // Générer un nombre à 7 chiffres
    bizNumber = Math.floor(1000000 + Math.random() * 9000000);
    
    // Vérifier l'unicité
    const card = await Card.findOne({ bizNumber });
    exists = !!card;
  }
  
  return bizNumber || 1000000;
};

export const isValidBizNumber = (bizNumber: any): boolean => {
  return /^\d{7}$/.test(bizNumber);
};

export default generateBizNumber;
