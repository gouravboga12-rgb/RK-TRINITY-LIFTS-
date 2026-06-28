const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabase, supabaseAdmin } = require('../config/supabase');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

/**
 * @route   GET /api/amc
 * @desc    Fetch AMC subscriptions (Customer: own, Admin: all)
 */
router.get('/', async (req, res) => {
  const { id: userId, role } = req.user;

  try {
    let result;
    if (role === 'admin') {
      result = await supabaseAdmin
        .from('amc_subscriptions')
        .select('*, profiles:customer_id(full_name, email, phone), customer_lifts:lift_id(lift_name, location)');
    } else {
      result = await supabase
        .from('amc_subscriptions')
        .select('*, customer_lifts:lift_id(lift_name, location)')
        .eq('customer_id', userId);
    }

    if (result.error) {
      return res.status(400).json({ success: false, message: result.error.message });
    }

    return res.json({ success: true, data: result.data });
  } catch (error) {
    console.error('Fetch AMC error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching AMC details.' });
  }
});

/**
 * @route   POST /api/amc/subscribe
 * @desc    Register a lift under an AMC subscription
 */
router.post('/subscribe', [
  body('liftId').isUUID().withMessage('Valid Lift ID is required.'),
  body('planName').notEmpty().withMessage('Plan name is required.'),
  body('amount').isNumeric().withMessage('Subscription price must be numeric.'),
  body('durationYears').isInt({ min: 1 }).withMessage('Duration must be at least 1 year.')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { liftId, planName, amount, durationYears } = req.body;
  const customerId = req.user.id;

  try {
    // 1. Verify lift belongs to customer
    const { data: lift, error: liftError } = await supabase
      .from('customer_lifts')
      .select('*')
      .eq('id', liftId)
      .eq('customer_id', customerId)
      .single();

    if (liftError || !lift) {
      return res.status(404).json({ success: false, message: 'Lift not found.' });
    }

    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(startDate.getFullYear() + Number(durationYears));

    // 2. Create subscription
    const { data: sub, error: subError } = await supabase
      .from('amc_subscriptions')
      .insert({
        customer_id: customerId,
        lift_id: liftId,
        plan_name: planName,
        amount: parseFloat(amount),
        start_date: startDate.toISOString().split('T')[0],
        expiry_date: expiryDate.toISOString().split('T')[0],
        status: 'active'
      })
      .select()
      .single();

    if (subError) {
      return res.status(400).json({ success: false, message: subError.message });
    }

    // 3. Update customer_lifts amc status
    await supabaseAdmin
      .from('customer_lifts')
      .update({
        amc_status: 'active',
        amc_expiry_date: expiryDate.toISOString().split('T')[0]
      })
      .eq('id', liftId);

    // 4. Generate invoice for the AMC subscription
    const invoiceNum = `INV-AMC-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const tax = amount * 0.18;
    const totalAmount = Number(amount) + tax;

    await supabaseAdmin
      .from('invoices')
      .insert({
        customer_id: customerId,
        amc_subscription_id: sub.id,
        invoice_number: invoiceNum,
        amount,
        tax,
        total_amount: totalAmount,
        status: 'paid', // Assumed paid for subscription setup
        due_date: startDate.toISOString().split('T')[0]
      });

    return res.status(201).json({
      success: true,
      message: 'Lift subscribed to AMC successfully.',
      data: sub
    });
  } catch (error) {
    console.error('AMC subscription error:', error);
    return res.status(500).json({ success: false, message: 'Server error processing AMC subscription.' });
  }
});

module.exports = router;
