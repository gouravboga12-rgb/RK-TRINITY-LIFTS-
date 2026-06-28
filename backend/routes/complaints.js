const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabase, supabaseAdmin } = require('../config/supabase');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

/**
 * @route   GET /api/complaints
 * @desc    Get complaints list based on user role
 */
router.get('/', async (req, res) => {
  const { id: userId, role } = req.user;

  try {
    let result;

    if (role === 'admin') {
      // Admins see all complaints with customer and assignment details
      result = await supabaseAdmin
        .from('complaints')
        .select(`
          *,
          profiles:customer_id (id, full_name, email, phone),
          customer_lifts:lift_id (id, lift_name, location),
          assignments (
            id,
            technician_id,
            status,
            assigned_at,
            technician:technician_id (id, full_name, phone)
          )
        `)
        .order('created_at', { ascending: false });

    } else if (role === 'technician') {
      // Technicians see complaints where they have an assignment
      // We first find assignments of this technician
      const { data: assignments, error: assignError } = await supabase
        .from('assignments')
        .select('complaint_id')
        .eq('technician_id', userId);

      if (assignError) {
        return res.status(400).json({ success: false, message: assignError.message });
      }

      if (!assignments || assignments.length === 0) {
        return res.json({ success: true, data: [] });
      }

      const complaintIds = assignments.map(a => a.complaint_id);

      result = await supabase
        .from('complaints')
        .select(`
          *,
          profiles:customer_id (id, full_name, email, phone),
          customer_lifts:lift_id (id, lift_name, location)
        `)
        .in('id', complaintIds)
        .order('created_at', { ascending: false });

    } else {
      // Customers see only their own complaints
      result = await supabase
        .from('complaints')
        .select(`
          *,
          customer_lifts:lift_id (id, lift_name, location),
          assignments (
            id,
            status,
            technician:technician_id (id, full_name, phone)
          )
        `)
        .eq('customer_id', userId)
        .order('created_at', { ascending: false });
    }

    if (result.error) {
      return res.status(400).json({ success: false, message: result.error.message });
    }

    return res.json({ success: true, data: result.data });
  } catch (error) {
    console.error('Fetch complaints error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching complaints.' });
  }
});

/**
 * @route   POST /api/complaints
 * @desc    File a new complaint (Customer Only)
 */
router.post('/', restrictTo('customer'), [
  body('title').notEmpty().withMessage('Complaint title is required.'),
  body('description').notEmpty().withMessage('Description is required.'),
  body('liftId').notEmpty().withMessage('Lift reference is required.')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { title, description, liftId, priority } = req.body;
  const customerId = req.user.id;

  try {
    // Check if the lift belongs to the customer
    const { data: lift, error: liftError } = await supabase
      .from('customer_lifts')
      .select('id')
      .eq('id', liftId)
      .eq('customer_id', customerId)
      .single();

    if (liftError || !lift) {
      return res.status(404).json({ success: false, message: 'Referenced lift not found or does not belong to you.' });
    }

    const { data: complaint, error } = await supabase
      .from('complaints')
      .insert({
        customer_id: customerId,
        lift_id: liftId,
        title,
        description,
        priority: priority || 'medium',
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    // Auto-create a pending system notification for Admins
    // We'll create user notifications for related events.
    return res.status(201).json({
      success: true,
      message: 'Complaint registered successfully.',
      data: complaint
    });
  } catch (error) {
    console.error('File complaint error:', error);
    return res.status(500).json({ success: false, message: 'Server error filing complaint.' });
  }
});

/**
 * @route   POST /api/complaints/assign
 * @desc    Assign a technician to a complaint (Admin Only)
 */
router.post('/assign', restrictTo('admin'), [
  body('complaintId').isUUID().withMessage('Valid Complaint ID is required.'),
  body('technicianId').isUUID().withMessage('Valid Technician ID is required.')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { complaintId, technicianId } = req.body;

  try {
    // 1. Verify complaint exists
    const { data: complaint, error: compError } = await supabaseAdmin
      .from('complaints')
      .select('*')
      .eq('id', complaintId)
      .single();

    if (compError || !complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found.' });
    }

    // 2. Verify technician is a technician
    const { data: tech, error: techError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', technicianId)
      .eq('role', 'technician')
      .single();

    if (techError || !tech) {
      return res.status(400).json({ success: false, message: 'Selected user is not registered as a technician.' });
    }

    // 3. Create or update assignment
    const { data: assignment, error: assignError } = await supabaseAdmin
      .from('assignments')
      .upsert({
        complaint_id: complaintId,
        technician_id: technicianId,
        status: 'assigned',
        assigned_at: new Date().toISOString()
      }, { onConflict: 'complaint_id' })
      .select()
      .single();

    if (assignError) {
      return res.status(400).json({ success: false, message: assignError.message });
    }

    // 4. Update complaint status to 'assigned'
    await supabaseAdmin
      .from('complaints')
      .update({ status: 'assigned', updated_at: new Date().toISOString() })
      .eq('id', complaintId);

    // 5. Send notification to Technician
    await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: technicianId,
        title: 'New Service Job Assigned',
        message: `You have been assigned to Complaint: ${complaint.title}.`
      });

    // 6. Send notification to Customer
    await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: complaint.customer_id,
        title: 'Technician Assigned',
        message: `A technician has been assigned to address your complaint: "${complaint.title}".`
      });

    return res.json({
      success: true,
      message: 'Technician assigned successfully.',
      data: assignment
    });
  } catch (error) {
    console.error('Assign technician error:', error);
    return res.status(500).json({ success: false, message: 'Server error during assignment.' });
  }
});

/**
 * @route   PUT /api/complaints/:id/status
 * @desc    Update complaint status (Technician / Admin)
 */
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { role, id: userId } = req.user;

  if (!['pending', 'assigned', 'in_progress', 'resolved', 'cancelled'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value.' });
  }

  try {
    // If user is technician, check if they are assigned to this complaint
    if (role === 'technician') {
      const { data: assignment, error: assignError } = await supabase
        .from('assignments')
        .select('*')
        .eq('complaint_id', id)
        .eq('technician_id', userId)
        .single();

      if (assignError || !assignment) {
        return res.status(403).json({ success: false, message: 'Access denied. You are not assigned to this job.' });
      }

      // Update assignment status as well
      await supabase
        .from('assignments')
        .update({ status: status === 'resolved' ? 'completed' : status, updated_at: new Date().toISOString() })
        .eq('complaint_id', id);
    }

    // Update complaint status
    const { data: complaint, error: compError } = await supabaseAdmin
      .from('complaints')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (compError) {
      return res.status(400).json({ success: false, message: compError.message });
    }

    // Send notification to customer
    await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: complaint.customer_id,
        title: `Complaint Status: ${status.replace('_', ' ').toUpperCase()}`,
        message: `Your complaint "${complaint.title}" has been updated to "${status}".`
      });

    return res.json({
      success: true,
      message: 'Complaint status updated successfully.',
      data: complaint
    });
  } catch (error) {
    console.error('Update status error:', error);
    return res.status(500).json({ success: false, message: 'Server error updating status.' });
  }
});

module.exports = router;
