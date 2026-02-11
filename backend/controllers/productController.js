import { sql } from '../config/db.js';

/**
 * @desc    Get all products
 * @route   GET /api/products
 */
export const getProducts = async (req, res) => {
  try {
    const products = await sql`SELECT * FROM products`;

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('GET PRODUCTS ERROR:', error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Create a new product
 * @route   POST /api/products
 */
export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  try {
    const [product] = await sql`
      INSERT INTO products (name, price, image)
      VALUES (${name}, ${price}, ${image})
      RETURNING *
    `;

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('CREATE PRODUCT ERROR:', error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get product by ID
 * @route   GET /api/products/:id
 */
export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [product] = await sql`
      SELECT * FROM products WHERE id = ${id}
    `;

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
    console.log(product);
  } catch (error) {
    console.error('GET PRODUCT ERROR:', error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Update product by ID
 * @route   PUT /api/products/:id
 */
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    const [updatedProduct] = await sql`
      UPDATE products
      SET name = ${name},
          price = ${price},
          image = ${image}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error('UPDATE PRODUCT ERROR:', error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Delete product by ID
 * @route   DELETE /api/products/:id
 */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [deletedProduct] = await sql`
      DELETE FROM products WHERE id = ${id}
      RETURNING *
    `;

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('DELETE PRODUCT ERROR:', error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
