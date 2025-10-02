/**
 * Routes Users
 * Toutes les routes pour la gestion des utilisateurs
 */

import { Router } from 'express';
import validate from '../middleware/validate';
import { auth, isAdmin, isOwnerOrAdmin } from '../middleware/auth';
import loginGuard from '../middleware/loginGuard';
import {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  toggleBusinessStatus,
  deleteUser
} from '../controllers/users.controller';
import {
  registerSchema,
  loginSchema,
  updateUserSchema
} from '../validators/user.validator';

const router = Router();

// Routes publiques
router.post('/', validate(registerSchema), register);
router.post('/login', loginGuard, validate(loginSchema), login);

// Routes protégées
router.get('/', auth, isAdmin, getAllUsers);
router.get('/profile', auth, getUserById);
router.get('/:id', auth, isOwnerOrAdmin, getUserById);
router.put('/:id', auth, isOwnerOrAdmin, validate(updateUserSchema), updateUser);
router.patch('/:id', auth, isOwnerOrAdmin, toggleBusinessStatus);
router.delete('/:id', auth, isOwnerOrAdmin, deleteUser);

export default router;
