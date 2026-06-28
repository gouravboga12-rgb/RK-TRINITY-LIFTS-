const express = require('express');
const { supabase, supabaseAdmin } = require('../config/supabase');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

/**
 * @route   GET /api/invoices
 * @desc    Get all invoices (Customer: own, Admin: all)
 */
router.get('/', async (req, res) => {
  const { id: userId, role } = req.user;

  try {
    let result;
    if (role === 'admin') {
      result = await supabaseAdmin
        .from('invoices')
        .select('*, profiles:customer_id(full_name, email, phone)')
        .order('created_at', { ascending: false });
    } else {
      result = await supabase
        .from('invoices')
        .select('*')
        .eq('customer_id', userId)
        .order('created_at', { ascending: false });
    }

    if (result.error) {
      return res.status(400).json({ success: false, message: result.error.message });
    }

    return res.json({ success: true, data: result.data });
  } catch (error) {
    console.error('Fetch invoices error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching invoices.' });
  }
});

/**
 * @route   GET /api/invoices/:id
 * @desc    Get single invoice details
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { id: userId, role } = req.user;

  try {
    const { data: invoice, error } = await supabaseAdmin
      .from('invoices')
      .select(`
        *,
        profiles:customer_id(full_name, email, phone),
        service_reports(
          checklist_completed,
          checklist_notes,
          resolution_notes,
          materials_used,
          technician:technician_id(full_name)
        ),
        amc_subscriptions(plan_name, start_date, expiry_date)
      `)
      .eq('id', id)
      .single();

    if (error || !invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found.' });
    }

    // Customer can only view their own invoices
    if (role !== 'admin' && invoice.customer_id !== userId) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    return res.json({ success: true, data: invoice });
  } catch (error) {
    console.error('Fetch single invoice error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching invoice details.' });
  }
});

module.exports = router;
