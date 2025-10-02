/**
 * Export de carte en PDF et vCard (BONUS)
 * Implémentation complète avec pdfkit et vcards-js
 */

import PDFDocument from 'pdfkit';
const vCard = require('vcards-js');

export const exportToPdf = (cardData: any, userData: any) => {
  try {
    const doc = new PDFDocument();
    
    // En-tête
    doc.fontSize(20).text('Carte de Visite Professionnelle', 50, 50);
    doc.moveDown();
    
    // Informations de la carte
    doc.fontSize(16).text(`${cardData.title}`, 50, 120);
    doc.fontSize(12)
       .text(`${userData.name.first} ${userData.name.last}`, 50, 150)
       .text(`${cardData.subtitle}`, 50, 170)
       .text(`${cardData.description}`, 50, 190)
       .text(`Téléphone: ${cardData.phone}`, 50, 220)
       .text(`Email: ${cardData.email}`, 50, 240)
       .text(`Web: ${cardData.web}`, 50, 260);
    
    // Adresse
    if (cardData.address) {
      doc.text('Adresse:', 50, 290)
         .text(`${cardData.address.street}`, 70, 310)
         .text(`${cardData.address.city}, ${cardData.address.state}`, 70, 330)
         .text(`${cardData.address.country} ${cardData.address.zip}`, 70, 350);
    }
    
    // Numéro d'entreprise
    doc.text(`N° Entreprise: ${cardData.bizNumber}`, 50, 380);
    
    return doc;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`PDF export failed: ${message}`);
  }
};

export const exportToVCard = (cardData: any, userData: any) => {
  try {
    const card = vCard();
    
    // Informations personnelles
    card.firstName = userData.name.first;
    card.lastName = userData.name.last;
    card.organization = cardData.title;
    card.title = cardData.subtitle;
    card.note = cardData.description;
    
    // Contact
    card.cellPhone = cardData.phone;
    card.email = cardData.email;
    card.url = cardData.web;
    
    // Adresse
    if (cardData.address) {
      card.homeAddress.street = cardData.address.street;
      card.homeAddress.city = cardData.address.city;
      card.homeAddress.stateProvince = cardData.address.state;
      card.homeAddress.postalCode = cardData.address.zip.toString();
      card.homeAddress.countryRegion = cardData.address.country;
    }
    
    return card;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`vCard export failed: ${message}`);
  }
};

