// Import Express
import express from 'express';

// Import controller functions
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProduct,
  updateProduct,
} from '../controllers/productController.js';

// Create an Express router instance
const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get('/', getProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by ID
 * @access  Public
 */
router.get('/:id', getProduct);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Public
 */
router.post('/', createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update an existing product by ID
 * @access  Public
 */
router.put('/:id', updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product by ID
 * @access  Public
 */
router.delete('/:id', deleteProduct);

// Export router to be used in main app
export default router;
