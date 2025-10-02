import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';

// @desc    Register user
// @route   POST /api/users
// @access  Public
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = new User(req.body);
    await user.save();
    
    const token = generateToken(user._id.toString(), user.isBusiness, user.isAdmin);
    
    res.status(201).json({
      success: true,
      user,
      token
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Connexion
// @route   POST /api/users/login
// @access  Public
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Vérifier si le compte est verrouillé
    if ((user as any).isLocked) {
      return res.status(423).json({ 
        error: 'Account locked due to multiple failed attempts' 
      });
    }
    
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      await user.incLoginAttempts();
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Reset tentatives après succès
    if (user.loginAttempts && user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }
    
    const token = generateToken(user._id.toString(), user.isBusiness, user.isAdmin);
    
    res.json({
      success: true,
      user,
      token
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir tous les utilisateurs
// @route   GET /api/users
// @access  Admin
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir un utilisateur par ID ou profil
// @route   GET /api/users/:id ou GET /api/users/profile
// @access  Private (Owner or Admin)
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Si c'est /profile, utiliser l'ID du token JWT
    const userId = req.params.id === undefined ? (req as any).user?.id : req.params.id;
    
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Mettre à jour un utilisateur
// @route   PUT /api/users/:id
// @access  Private (Owner or Admin)
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updates = req.body;
    delete updates.password;
    delete updates.isAdmin;
    delete updates.email;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle business status
// @route   PATCH /api/users/:id
// @access  Private (Owner or Admin)
export const toggleBusinessStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    user.isBusiness = !user.isBusiness;
    await user.save();
    
    res.json({ 
      success: true, 
      message: `Business status ${user.isBusiness ? 'enabled' : 'disabled'}`,
      user 
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Supprimer un utilisateur
// @route   DELETE /api/users/:id
// @access  Private (Owner or Admin)
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ 
      success: true, 
      message: 'User deleted successfully' 
    });
  } catch (error) {
    next(error);
  }
};

