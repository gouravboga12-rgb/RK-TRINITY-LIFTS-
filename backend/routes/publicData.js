const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabase, supabaseAdmin } = require('../config/supabase');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// ==========================================
// BANNERS CMS
// ==========================================

/**
 * @route   GET /api/public/banners
 * @desc    Fetch banner slider slides (Public)
 */
router.get('/banners', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   POST /api/public/banners
 * @desc    Add homepage banner (Admin Only)
 */
router.post('/banners', protect, restrictTo('admin'), async (req, res) => {
  const { title, subtitle, imageUrl, actionUrl, sortOrder } = req.body;
  try {
    const { data, error } = await supabaseAdmin
      .from('banners')
      .insert({ title, subtitle, image_url: imageUrl, action_url: actionUrl, sort_order: sortOrder || 0 })
      .select()
      .single();

    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.status(201).json({ success: true, message: 'Banner added.', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


// ==========================================
// TESTIMONIALS CMS
// ==========================================

router.get('/testimonials', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/testimonials', protect, restrictTo('admin'), async (req, res) => {
  const { clientName, companyName, designation, feedback, rating, imageUrl } = req.body;
  try {
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .insert({
        client_name: clientName,
        company_name: companyName,
        designation,
        feedback,
        rating: rating || 5,
        image_url: imageUrl
      })
      .select()
      .single();

    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.status(201).json({ success: true, message: 'Testimonial registered.', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


// ==========================================
// GALLERY CMS
// ==========================================

router.get('/gallery', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/gallery', protect, restrictTo('admin'), async (req, res) => {
  const { title, category, imageUrl, videoUrl, description } = req.body;
  try {
    const { data, error } = await supabaseAdmin
      .from('gallery')
      .insert({
        title,
        category,
        image_url: imageUrl,
        video_url: videoUrl,
        description
      })
      .select()
      .single();

    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.status(201).json({ success: true, message: 'Gallery item added.', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


// ==========================================
// SERVICE REQUESTS / INQUIRIES
// ==========================================

/**
 * @route   POST /api/public/service-requests
 * @desc    Submit public contact/inquiry form (Public)
 */
router.post('/service-requests', [
  body('name').notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Valid email is required.'),
  body('phone').notEmpty().withMessage('Phone is required.'),
  body('message').notEmpty().withMessage('Message details are required.')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, phone, company, message } = req.body;

  try {
    const { data, error } = await supabaseAdmin
      .from('service_requests')
      .insert({
        name,
        email,
        phone,
        company,
        message,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. A representative will contact you soon.',
      data
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /api/public/service-requests
 * @desc    List all public inquiries (Admin Only)
 */
router.get('/service-requests', protect, restrictTo('admin'), async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   PUT /api/public/service-requests/:id/status
 * @desc    Mark inquiry as contacted/resolved (Admin Only)
 */
router.put('/service-requests/:id/status', protect, restrictTo('admin'), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!['pending', 'contacted', 'resolved'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status type.' });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('service_requests')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.json({ success: true, message: 'Inquiry status updated.', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
