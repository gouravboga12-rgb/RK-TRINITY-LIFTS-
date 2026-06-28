const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabase, supabaseAdmin } = require('../config/supabase');
const { protect, restrictTo } = require('../middleware/auth');
const { uploadBase64Image } = require('../services/cloudinaryService');

const router = express.Router();

// Apply technician restriction to all routes in this file
router.use(protect);
router.use(restrictTo('technician', 'admin'));

/**
 * @route   GET /api/technician/jobs
 * @desc    Get active assigned jobs for logged-in technician
 */
router.get('/jobs', async (req, res) => {
  const technicianId = req.user.id;

  try {
    const { data: assignments, error } = await supabase
      .from('assignments')
      .select(`
        id,
        status,
        assigned_at,
        complaints:complaint_id (
          id,
          title,
          description,
          status,
          priority,
          created_at,
          profiles:customer_id (id, full_name, email, phone),
          customer_lifts:lift_id (id, lift_name, location, model_no)
        )
      `)
      .eq('technician_id', technicianId)
      .not('status', 'eq', 'completed'); // exclude finished jobs

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.json({ success: true, data: assignments });
  } catch (error) {
    console.error('Fetch technician jobs error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching jobs.' });
  }
});

/**
 * @route   POST /api/technician/reports
 * @desc    Submit service report and auto-generate invoice
 */
router.post('/reports', [
  body('assignmentId').isUUID().withMessage('Valid Assignment ID is required.'),
  body('complaintId').isUUID().withMessage('Valid Complaint ID is required.'),
  body('resolutionNotes').notEmpty().withMessage('Resolution notes are required.')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const {
    assignmentId,
    complaintId,
    checklistCompleted,
    checklistNotes,
    resolutionNotes,
    materialsUsed,
    beforeImages, // Array of base64 strings
    afterImages,  // Array of base64 strings
    customerSignatureUrl, // Base64 signature
    paymentAmount,
    paymentMethod,
    paymentStatus
  } = req.body;

  const technicianId = req.user.id;

  try {
    // 1. Fetch complaint & customer details
    const { data: complaint, error: compError } = await supabaseAdmin
      .from('complaints')
      .select('customer_id')
      .eq('id', complaintId)
      .single();

    if (compError || !complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found.' });
    }

    const customerId = complaint.customer_id;

    // 2. Upload images to Cloudinary in parallel if present
    let uploadedBefore = [];
    if (beforeImages && beforeImages.length > 0) {
      const beforeUploadPromises = beforeImages.map(img => uploadBase64Image(img, 'service_reports/before'));
      uploadedBefore = await Promise.all(beforeUploadPromises);
    }

    let uploadedAfter = [];
    if (afterImages && afterImages.length > 0) {
      const afterUploadPromises = afterImages.map(img => uploadBase64Image(img, 'service_reports/after'));
      uploadedAfter = await Promise.all(afterUploadPromises);
    }

    let signatureSecureUrl = null;
    if (customerSignatureUrl) {
      signatureSecureUrl = await uploadBase64Image(customerSignatureUrl, 'service_reports/signatures');
    }

    // 3. Create service report record
    const { data: report, error: reportError } = await supabaseAdmin
      .from('service_reports')
      .insert({
        assignment_id: assignmentId,
        complaint_id: complaintId,
        technician_id: technicianId,
        customer_id: customerId,
        before_images: uploadedBefore.filter(url => url !== null),
        after_images: uploadedAfter.filter(url => url !== null),
        checklist_completed: checklistCompleted || {},
        checklist_notes: checklistNotes,
        resolution_notes: resolutionNotes,
        materials_used: materialsUsed || [],
        customer_signature_url: signatureSecureUrl,
        payment_status: paymentStatus || 'not_applicable',
        payment_amount: paymentAmount || 0,
        payment_method: paymentMethod || ''
      })
      .select()
      .single();

    if (reportError) {
      return res.status(400).json({ success: false, message: reportError.message });
    }

    // 4. Update complaint status to 'resolved'
    await supabaseAdmin
      .from('complaints')
      .update({ status: 'resolved', updated_at: new Date().toISOString() })
      .eq('id', complaintId);

    // 5. Update assignment status to 'completed'
    await supabaseAdmin
      .from('assignments')
      .update({ status: 'completed', updated_at: new Date().toISOString() })
      .eq('id', assignmentId);

    // 6. Auto-generate invoice
    const amount = parseFloat(paymentAmount || 0);
    const tax = amount * 0.18; // 18% GST standard
    const totalAmount = amount + tax;
    const invoiceNum = `INV-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const { data: invoice, error: invoiceError } = await supabaseAdmin
      .from('invoices')
      .insert({
        customer_id: customerId,
        service_report_id: report.id,
        invoice_number: invoiceNum,
        amount,
        tax,
        total_amount: totalAmount,
        status: paymentStatus === 'collected' ? 'paid' : 'unpaid',
        due_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 15 days due
      })
      .select()
      .single();

    if (invoiceError) {
      console.error('Invoice creation failed:', invoiceError);
    }

    // 7. Send notifications to customer
    await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: customerId,
        title: 'Service Completed & Invoiced',
        message: `Your service request has been resolved. Invoice ${invoiceNum} has been generated.`
      });

    return res.status(201).json({
      success: true,
      message: 'Service report submitted and invoice generated successfully.',
      data: {
        report,
        invoice
      }
    });
  } catch (error) {
    console.error('Submit report error:', error);
    return res.status(500).json({ success: false, message: 'Server error saving report: ' + error.message });
  }
});

module.exports = router;
