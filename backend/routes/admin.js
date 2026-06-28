const express = require('express');
const { supabaseAdmin } = require('../config/supabase');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// Apply admin protection to all routes in this file
router.use(protect);
router.use(restrictTo('admin'));

/**
 * @route   GET /api/admin/users
 * @desc    Get all user profiles (Admin Only)
 */
router.get('/users', async (req, res) => {
  try {
    const { data: users, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.json({
      success: true,
      message: 'Users retrieved successfully.',
      data: users
    });
  } catch (error) {
    console.error('Admin users fetch error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching users.' });
  }
});

/**
 * @route   PUT /api/admin/users/:id/role
 * @desc    Promote customer to technician or modify user role (Admin Only)
 */
router.put('/users/:id/role', async (req, res) => {
  const { id } = req.params;
  const { role, specialization, experience_years } = req.body; // metadata if promoting to technician

  if (!['customer', 'technician', 'admin'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Invalid role specified.' });
  }

  try {
    // 1. Update the role in the public.profiles table
    const { data: updatedProfile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ role })
      .eq('id', id)
      .select()
      .single();

    if (profileError) {
      return res.status(400).json({ success: false, message: profileError.message });
    }

    // 2. If promoted to technician, ensure a metadata record exists in the public.technicians table
    if (role === 'technician') {
      const { error: techError } = await supabaseAdmin
        .from('technicians')
        .upsert({
          id,
          specialization: specialization || [],
          experience_years: experience_years || 0,
          status: 'available'
        });

      if (techError) {
        console.error('Error updating technician metadata:', techError);
      }
    } else {
      // If demoted from technician, optionally clean up technician metadata table
      const { error: deleteTechError } = await supabaseAdmin
        .from('technicians')
        .delete()
        .eq('id', id);
        
      if (deleteTechError) {
        console.error('Error clearing technician metadata:', deleteTechError);
      }
    }

    // 3. Update the app_metadata in Supabase Auth so RLS/JWT roles are synchronized
    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
      id,
      { app_metadata: { role } }
    );

    if (authError) {
      console.warn('Auth admin role sync warning:', authError.message);
    }

    return res.json({
      success: true,
      message: `User role updated successfully to ${role}.`,
      data: updatedProfile
    });
  } catch (error) {
    console.error('Role update error:', error);
    return res.status(500).json({ success: false, message: 'Server error updating user role.' });
  }
});

/**
 * @route   GET /api/admin/technicians
 * @desc    Get all technicians and their status/metadata (Admin Only)
 */
router.get('/technicians', async (req, res) => {
  try {
    // Join profiles and technicians
    const { data: technicians, error } = await supabaseAdmin
      .from('profiles')
      .select(`
        id,
        email,
        full_name,
        phone,
        role,
        created_at,
        technicians (
          status,
          specialization,
          experience_years,
          rating
        )
      `)
      .eq('role', 'technician');

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    // Format output
    const formattedTechs = technicians.map(t => ({
      id: t.id,
      email: t.email,
      fullName: t.full_name,
      phone: t.phone,
      status: t.technicians?.status || 'offline',
      specialization: t.technicians?.specialization || [],
      experienceYears: t.technicians?.experience_years || 0,
      rating: t.technicians?.rating || 5.0
    }));

    return res.json({
      success: true,
      message: 'Technicians retrieved successfully.',
      data: formattedTechs
    });
  } catch (error) {
    console.error('Admin technicians fetch error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching technicians.' });
  }
});

/**
 * @route   GET /api/admin/analytics
 * @desc    Retrieve high level platform metrics (Admin Only)
 */
router.get('/analytics', async (req, res) => {
  try {
    // Gather counts in parallel using supabaseAdmin
    const [
      { count: usersCount },
      { count: complaintsCount },
      { count: pendingComplaints },
      { count: activeAMCs },
      { data: invoices }
    ] = await Promise.all([
      supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('complaints').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('complaints').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabaseAdmin.from('amc_subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      supabaseAdmin.from('invoices').select('total_amount, status')
    ]);

    const totalRevenue = invoices
      ? invoices
          .filter(inv => inv.status === 'paid')
          .reduce((sum, inv) => sum + parseFloat(inv.total_amount || 0), 0)
      : 0;

    return res.json({
      success: true,
      message: 'Analytics data retrieved.',
      data: {
        totalUsers: usersCount || 0,
        totalComplaints: complaintsCount || 0,
        pendingComplaints: pendingComplaints || 0,
        activeAMCs: activeAMCs || 0,
        totalRevenue: Number(totalRevenue.toFixed(2))
      }
    });
  } catch (error) {
    console.error('Analytics gathering error:', error);
    return res.status(500).json({ success: false, message: 'Server error gathering analytics.' });
  }
});

module.exports = router;
