const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabase } = require('../config/supabase');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Input validators
const validateRegister = [
  body('email').isEmail().withMessage('Please provide a valid email.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  body('fullName').notEmpty().withMessage('Full name is required.'),
  body('phone').notEmpty().withMessage('Phone number is required.')
];

const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email.'),
  body('password').notEmpty().withMessage('Password is required.')
];

/**
 * @route   POST /api/auth/register
 * @desc    Register a new customer account
 */
router.post('/register', validateRegister, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Validation failed.', errors: errors.array() });
  }

  const { email, password, fullName, phone } = req.body;

  try {
    // Signup using Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone
        }
      }
    });

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    if (!data.user) {
      return res.status(400).json({ success: false, message: 'Signup failed. Please try again.' });
    }

    // Since the database trigger automatically copies auth.users to profiles,
    // let's update the phone number in the profiles table if needed.
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ phone, full_name: fullName })
      .eq('id', data.user.id);

    if (profileError) {
      console.error('Failed to update phone number in profile:', profileError);
    }

    return res.status(201).json({
      success: true,
      message: 'Registration successful. Check your email for confirmation link if enabled.',
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          fullName,
          role: 'customer'
        }
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login and return access token
 */
router.post('/login', validateLogin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Validation failed.', errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ success: false, message: error.message });
    }

    // Retrieve full profile information from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError || !profile) {
      return res.status(401).json({ success: false, message: 'Profile details not found.' });
    }

    return res.json({
      success: true,
      message: 'Login successful.',
      data: {
        token: data.session.access_token,
        refreshToken: data.session.refresh_token,
        user: {
          id: profile.id,
          email: profile.email,
          fullName: profile.full_name,
          phone: profile.phone,
          role: profile.role
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile details
 */
router.get('/me', protect, async (req, res) => {
  return res.json({
    success: true,
    message: 'Profile retrieved successfully.',
    data: {
      user: {
        id: req.user.id,
        email: req.user.email,
        fullName: req.user.profile.full_name,
        phone: req.user.profile.phone,
        role: req.user.role
      }
    }
  });
});

module.exports = router;
