/**
 * Routes Cards
 * Toutes les routes pour la gestion des cartes
 */

import { Router } from 'express';
import {
  getAllCards,
  getUserCards,
  getCardById,
  createCard,
  updateCard,
  likeCard,
  updateBizNumber,
  exportCardPdf,
  deleteCard
} from '../controllers/cards.controller';
import {
  createCardSchema,
  updateCardSchema,
  updateBizNumberSchema
} from '../validators/card.validator';
import validate from '../middleware/validate';
import { auth, isBusiness, isAdmin } from '../middleware/auth';

const router = Router();

// Routes publiques
router.get('/', getAllCards);

// Routes protégées - /my-cards DOIT être avant /:id
router.get('/my-cards', auth, getUserCards);

// Routes publiques avec paramètres
router.get('/:id', getCardById);
router.get('/:id/export', exportCardPdf);

// Routes protégées
router.post('/', auth, isBusiness, validate(createCardSchema), createCard);
router.put('/:id', auth, validate(updateCardSchema), updateCard);
router.patch('/:id/like', auth, likeCard);
router.patch('/:id/biz-number', auth, isAdmin, validate(updateBizNumberSchema), updateBizNumber);
router.delete('/:id', auth, deleteCard);

export default router;
