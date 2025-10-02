/**
 * Validation Joi pour les cartes
 */

import Joi from 'joi';

// Schéma de création
const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  phone: Joi.string().pattern(/^0[2-9]\d{7,8}$/).required(),
  email: Joi.string().email().required(),
  web: Joi.string().uri().allow(''),
  image: Joi.object({
    url: Joi.string().uri().allow(''),
    alt: Joi.string().max(256).allow('')
  }).optional(),
  address: Joi.object({
    state: Joi.string().max(256).allow(''),
    country: Joi.string().max(256).required(),
    city: Joi.string().max(256).required(),
    street: Joi.string().max(256).required(),
    houseNumber: Joi.number().min(1).required(),
    zip: Joi.number().optional()
  }).required()
});

// Schéma de mise à jour
const updateCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).optional(),
  subtitle: Joi.string().min(2).max(256).optional(),
  description: Joi.string().min(2).max(1024).optional(),
  phone: Joi.string().pattern(/^0[2-9]\d{7,8}$/).optional(),
  email: Joi.string().email().optional(),
  web: Joi.string().uri().allow(''),
  image: Joi.object({
    url: Joi.string().uri().allow(''),
    alt: Joi.string().max(256).allow('')
  }).optional(),
  address: Joi.object({
    state: Joi.string().max(256).allow(''),
    country: Joi.string().max(256).required(),
    city: Joi.string().max(256).required(),
    street: Joi.string().max(256).required(),
    houseNumber: Joi.number().min(1).required(),
    zip: Joi.number().optional()
  }).optional()
}).min(1);

// Schéma pour bizNumber
const updateBizNumberSchema = Joi.object({
  bizNumber: Joi.number().min(1000000).max(9999999).required()
});

export {
  createCardSchema,
  updateCardSchema,
  updateBizNumberSchema
};
