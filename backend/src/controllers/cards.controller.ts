/**
 * Contrôleur Cards
 * Gère toutes les opérations sur les cartes
 */

import { Request, Response, NextFunction } from 'express';
import Card from '../models/Card';
import generateBizNumber from '../utils/bizNumber';
import { exportToPdf, exportToVCard } from '../utils/exportCardPdf';

// @desc    Obtenir toutes les cartes
// @route   GET /api/cards
// @access  Public
export const getAllCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find()
      .populate('user_id', 'name email')
      .sort('-createdAt');
    
    res.json({ success: true, cards });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir mes cartes
// @route   GET /api/cards/my-cards
// @access  Private
export const getUserCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({ user_id: req.user!._id })
      .populate('user_id', 'name email')
      .sort('-createdAt');
    
    res.json({ success: true, cards });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir une carte par ID
// @route   GET /api/cards/:id
// @access  Public
export const getCardById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findById(req.params.id)
      .populate('user_id', 'name email phone');
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    res.json({ success: true, card });
  } catch (error) {
    next(error);
  }
};

// @desc    Créer une carte
// @route   POST /api/cards
// @access  Business
export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cardData = {
      ...req.body,
      user_id: req.user!._id,
      bizNumber: await generateBizNumber()
    };
    
    const card = new Card(cardData);
    await card.save();
    
    await card.populate('user_id', 'name email');
    
    res.status(201).json({ success: true, card });
  } catch (error) {
    next(error);
  }
};

// @desc    Mettre à jour une carte
// @route   PUT /api/cards/:id
// @access  Private (Owner)
export const updateCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    // Vérifier la propriété
    if (card.user_id.toString() !== req.user!._id.toString() && !req.user!.isAdmin) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    const updates = req.body;
    delete updates.bizNumber;
    delete updates.user_id;
    delete updates.likes;
    
    Object.assign(card, updates);
    await card.save();
    
    await card.populate('user_id', 'name email');
    
    res.json({ success: true, card });
  } catch (error) {
    next(error);
  }
};

// @desc    Like/Unlike carte
// @route   PATCH /api/cards/:id/like
// @access  Private
export const likeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    await card.toggleLike(req.user!._id);
    
    res.json({ 
      success: true, 
      message: 'Like toggled',
      likes: card.likes.length 
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mettre à jour bizNumber
// @route   PATCH /api/cards/:id/biz-number
// @access  Admin
export const updateBizNumber = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bizNumber } = req.body;
    
    // Vérifier l'unicité
    const existing = await Card.findOne({ 
      bizNumber, 
      _id: { $ne: req.params.id } 
    });
    
    if (existing) {
      return res.status(400).json({ error: 'BizNumber already exists' });
    }
    
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { bizNumber },
      { new: true, runValidators: true }
    );
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    res.json({ success: true, card });
  } catch (error) {
    next(error);
  }
};

// @desc    Exporter une carte (BONUS)
// @route   GET /api/cards/:id/export
// @access  Private
export const exportCardPdf = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { format = 'pdf' } = req.query;
    const card = await Card.findById(req.params.id)
      .populate('user_id', 'name email phone');
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    if (format === 'pdf') {
      const pdfDoc = exportToPdf(card, card.user_id);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=card-${card.bizNumber}.pdf`);
      pdfDoc.pipe(res);
      pdfDoc.end();
    } else if (format === 'vcard') {
      const vcard = exportToVCard(card, card.user_id);
      res.setHeader('Content-Type', 'text/vcard');
      res.setHeader('Content-Disposition', `attachment; filename=card-${card.bizNumber}.vcf`);
      res.send(vcard.getFormattedString());
    } else {
      res.status(400).json({ error: 'Format must be pdf or vcard' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Supprimer une carte
// @route   DELETE /api/cards/:id
// @access  Private (Owner or Admin)
export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    // Vérifier la propriété
    if (card.user_id.toString() !== req.user!._id.toString() && !req.user!.isAdmin) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    await card.deleteOne();
    
    res.json({ 
      success: true, 
      message: 'Card deleted successfully' 
    });
  } catch (error) {
    next(error);
  }
};

// Alias pour compatibilité
export const toggleLike = likeCard;
export const exportCardVCard = exportCardPdf;
