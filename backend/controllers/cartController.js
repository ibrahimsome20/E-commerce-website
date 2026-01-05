const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.json(cart);
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
    const { productId, qty } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
        cart.items[itemIndex].qty += Number(qty);
    } else {
        cart.items.push({ product: productId, qty: Number(qty) });
    }

    await cart.save();
    // Populate to return full structure
    cart = await cart.populate('items.product');
    res.json(cart);
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeFromCart = async (req, res) => {
    const productId = req.params.id;
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        await cart.save();
        cart = await cart.populate('items.product');
        res.json(cart);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
};
