const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabase, supabaseAdmin } = require('../config/supabase');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// ==========================================
// CATEGORY ROUTES
// ==========================================

/**
 * @route   GET /api/products/categories
 * @desc    Get all product categories (Public)
 */
router.get('/categories', async (req, res) => {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Fetch categories error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching categories.' });
  }
});

/**
 * @route   POST /api/products/categories
 * @desc    Create a product category (Admin Only)
 */
router.post('/categories', protect, restrictTo('admin'), [
  body('name').notEmpty().withMessage('Category name is required.'),
  body('slug').notEmpty().withMessage('Category slug is required.')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, slug, description } = req.body;

  try {
    const { data: category, error } = await supabaseAdmin
      .from('categories')
      .insert({ name, slug, description })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.status(201).json({ success: true, message: 'Category created.', data: category });
  } catch (error) {
    console.error('Create category error:', error);
    return res.status(500).json({ success: false, message: 'Server error creating category.' });
  }
});


// ==========================================
// PRODUCT ROUTES
// ==========================================

/**
 * @route   GET /api/products
 * @desc    Get all products, with optional category filtering (Public)
 */
router.get('/', async (req, res) => {
  const { categorySlug } = req.query;

  try {
    let query = supabase.from('products').select('*, categories(*)');

    if (categorySlug) {
      // Fetch category first
      const { data: cat } = await supabase.from('categories').eq('slug', categorySlug).single();
      if (cat) {
        query = query.eq('category_id', cat.id);
      }
    }

    const { data: products, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.json({ success: true, data: products });
  } catch (error) {
    console.error('Fetch products error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching products.' });
  }
});

/**
 * @route   GET /api/products/:slug
 * @desc    Get a single product details by slug (Public)
 */
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const { data: product, error } = await supabase
      .from('products')
      .select('*, categories(*)')
      .eq('slug', slug)
      .single();

    if (error || !product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    return res.json({ success: true, data: product });
  } catch (error) {
    console.error('Fetch product by slug error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching product details.' });
  }
});

/**
 * @route   POST /api/products
 * @desc    Create a product (Admin Only)
 */
router.post('/', protect, restrictTo('admin'), [
  body('name').notEmpty().withMessage('Product name is required.'),
  body('slug').notEmpty().withMessage('Product slug is required.'),
  body('categoryId').notEmpty().withMessage('Category ID is required.'),
  body('description').notEmpty().withMessage('Description is required.')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const {
    name,
    slug,
    categoryId,
    description,
    specifications,
    features,
    applications,
    technicalDetails,
    brochureUrl,
    images
  } = req.body;

  try {
    const { data: product, error } = await supabaseAdmin
      .from('products')
      .insert({
        name,
        slug,
        category_id: categoryId,
        description,
        specifications: specifications || {},
        features: features || [],
        applications: applications || [],
        technical_details: technicalDetails || {},
        brochure_url: brochureUrl,
        images: images || []
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.status(201).json({ success: true, message: 'Product created successfully.', data: product });
  } catch (error) {
    console.error('Create product error:', error);
    return res.status(500).json({ success: false, message: 'Server error creating product.' });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product (Admin Only)
 */
router.put('/:id', protect, restrictTo('admin'), async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  // Map categoryId to category_id
  if (updateFields.categoryId) {
    updateFields.category_id = updateFields.categoryId;
    delete updateFields.categoryId;
  }
  if (updateFields.technicalDetails) {
    updateFields.technical_details = updateFields.technicalDetails;
    delete updateFields.technicalDetails;
  }
  if (updateFields.brochureUrl) {
    updateFields.brochure_url = updateFields.brochureUrl;
    delete updateFields.brochureUrl;
  }

  try {
    const { data: product, error } = await supabaseAdmin
      .from('products')
      .update(updateFields)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.json({ success: true, message: 'Product updated successfully.', data: product });
  } catch (error) {
    console.error('Update product error:', error);
    return res.status(500).json({ success: false, message: 'Server error updating product.' });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product (Admin Only)
 */
router.delete('/:id', protect, restrictTo('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.json({ success: true, message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Delete product error:', error);
    return res.status(500).json({ success: false, message: 'Server error deleting product.' });
  }
});

module.exports = router;
