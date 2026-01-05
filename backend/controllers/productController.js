const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin (Simply Private for now as per requirements role management is basic)
const createProduct = async (req, res) => {
    const { name, price, description, image, category, stock } = req.body;

    const product = new Product({
        name,
        price,
        description,
        image,
        category,
        stock,
        user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
};
