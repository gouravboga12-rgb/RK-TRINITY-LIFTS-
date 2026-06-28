const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabase, supabaseAdmin } = require('../config/supabase');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

/**
 * @route   GET /api/lifts
 * @desc    Get registered lifts (Customer: own, Admin: all)
 */
router.get('/', async (req, res) => {
  const { id: userId, role } = req.user;

  try {
    let result;
    if (role === 'admin') {
      result = await supabaseAdmin
        .from('customer_lifts')
        .select('*, profiles:customer_id(full_name, email, phone)')
        .order('created_at', { ascending: false });
    } else {
      result = await supabase
        .from('customer_lifts')
        .select('*')
        .eq('customer_id', userId)
        .order('created_at', { ascending: false });
    }

    if (result.error) {
      return res.status(400).json({ success: false, message: result.error.message });
    }

    return res.json({ success: true, data: result.data });
  } catch (error) {
    console.error('Fetch lifts error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching lifts.' });
  }
});

/**
 * @route   POST /api/lifts
 * @desc    Register a new customer lift
 */
router.post('/', [
  body('liftName').notEmpty().withMessage('Lift nick name is required.'),
  body('location').notEmpty().withMessage('Installation address is required.'),
  body('modelNo').notEmpty().withMessage('Model number is required.')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { liftName, location, modelNo, installationDate } = req.body;
  const customerId = req.user.id;

  try {
    const { data: lift, error } = await supabase
      .from('customer_lifts')
      .insert({
        customer_id: customerId,
        lift_name: liftName,
        location,
        model_no: modelNo,
        installation_date: installationDate || new Date().toISOString().split('T')[0],
        amc_status: 'none'
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.status(201).json({
      success: true,
      message: 'Lift registered successfully.',
      data: lift
    });
  } catch (error) {
    console.error('Register lift error:', error);
    return res.status(500).json({ success: false, message: 'Server error registering lift.' });
  }
});

module.exports = router;
