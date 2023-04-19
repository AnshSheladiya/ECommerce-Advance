/**
 * File Name: JoiValidationSchema.js
 */
const Joi = require('joi');

const registerSchema = Joi.object({
  first_name: Joi.string().required().messages({
    'any.required': 'First Name is required',
  }),
  last_name: Joi.string().required().messages({
    'any.required': 'Last Name required',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).max(20).required().messages({
    'any.required': 'Password is required',
    'string.min': 'Password should be at least 8 characters long',
    'string.max': 'Password should not be longer than 20 characters',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.required': 'Confirm password is required',
    'any.only': 'Password and confirm password should match',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    'any.required': 'Old password is required',
  }),
  newPassword: Joi.string().min(8).max(20).required().messages({
    'any.required': 'New password is required',
    'string.min': 'New password should be at least 8 characters long',
    'string.max': 'New password should not be longer than 20 characters',
  }),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
  }),
});

const resetPasswordSchema = Joi.object({
  resetToken: Joi.string().required().messages({
    'any.required': 'Reset token is required',
  }),
  newPassword: Joi.string().min(8).max(20).required().messages({
    'any.required': 'New password is required',
    'string.min': 'New password should be at least 8 characters long',
    'string.max': 'New password should not be longer than 20 characters',
  }),
});

const profileSchema = Joi.object({
  first_name: Joi.string().required().messages({
    'any.required': 'First name is required',
  }),
  last_name: Joi.string().required().messages({
    'any.required': 'Last name is required',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Address is required',
  }),
  address_2: Joi.string(),
  city: Joi.string().required().messages({
    'any.required': 'City is required',
  }),
  state_province: Joi.string().required().messages({
    'any.required': 'State/Province is required',
  }),
  zip_postal_code: Joi.string().required().messages({
    'any.required': 'Zip/Postal Code is required',
  }),
  country: Joi.string().required().messages({
    'any.required': 'Country is required',
  }),
  phone_number: Joi.string().required().messages({
    'any.required': 'Phone number is required',
  }),
  date_of_birth: Joi.date().required().messages({
    'any.required': 'Date of birth is required',
  }),
});
// const profileSchema = Joi.object({
//   address: Joi.string().optional().empty('').trim(),
//   address_2: Joi.string().optional().empty('').trim(),
//   city: Joi.string().optional().empty('').trim(),
//   state_province: Joi.string().optional().empty('').trim(),
//   zip_postal_code: Joi.string().optional().empty('').trim(),
//   country: Joi.string().optional().empty('').trim(),
//   phone_number: Joi.string().optional().empty('').trim(),
// });

const addAddressSchema = Joi.object({
  label: Joi.string().valid('shipping', 'billing').required().messages({
  'any.required': 'Please specify whether this is a shipping or billing address',
  'any.only': 'The address label must be either "shipping" or "billing"',
  }),
  nickname: Joi.string().messages({
  'string.base': 'The nickname must be a string',
  }),
  address: Joi.string().required().messages({
  'any.required': 'Please enter the address',
  }),
  address_2: Joi.string().messages({
  'string.base': 'The address line 2 must be a string',
  }),
  city: Joi.string().required().messages({
  'any.required': 'Please enter the city',
  }),
  state_province: Joi.string().messages({
  'string.base': 'The state/province must be a string',
  }),
  zip_postal_code: Joi.string().required().messages({
  'any.required': 'Please enter the ZIP/postal code',
  }),
  country: Joi.string().required().messages({
  'any.required': 'Please enter the country',
  }),
  phone_number: Joi.string().required().messages({
  'any.required': 'Please enter the phone number',
  }),
  });

  // schema for updating a shipping or billing address
  const updateAddressSchema = Joi.object({
  nickname: Joi.string().messages({
  'string.base': 'The nickname must be a string',
  }),
  address: Joi.string().messages({
  'string.base': 'The address must be a string',
  }),
  address_2: Joi.string().messages({
  'string.base': 'The address line 2 must be a string',
  }),
  city: Joi.string().messages({
  'string.base': 'The city must be a string',
  }),
  state_province: Joi.string().messages({
  'string.base': 'The state/province must be a string',
  }),
  zip_postal_code: Joi.string().messages({
  'string.base': 'The ZIP/postal code must be a string',
  }),
  country: Joi.string().messages({
  'string.base': 'The country must be a string',
  }),
  phone_number: Joi.string().messages({
  'string.base': 'The phone number must be a string',
  }),
  });

module.exports = {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  profileSchema,
  addAddressSchema,
  updateAddressSchema,
};

