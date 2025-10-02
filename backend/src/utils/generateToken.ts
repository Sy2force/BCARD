/**
 * Génération de token JWT
 */

import jwt, { SignOptions } from 'jsonwebtoken';

const generateToken = (userId: string, isBusiness: boolean, isAdmin: boolean): string => {
  const options: SignOptions = {
    expiresIn: '7d'
  };
  
  return jwt.sign(
    { id: userId, isBusiness, isAdmin },
    process.env.JWT_SECRET as string,
    options
  );
};

export default generateToken;
