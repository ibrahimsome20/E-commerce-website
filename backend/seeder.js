const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

// connectDB(); moved to run()

const products = [
    {
        name: 'Neon Cyber Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
        description: ' immersive sound with neon aesthetics. Perfect for coding late night.',
        category: 'Electronics',
        price: 199.99,
        stock: 10,
    },
    {
        name: 'Mechanical Keyboard 60%',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=60',
        description: 'Clicky blue switches with RGB backlight. The developer choice.',
        category: 'Electronics',
        price: 89.99,
        stock: 15,
    },
    {
        name: 'Ergonomic Gaming Surface',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60',
        description: 'Smooth surface for precision mouse control.',
        category: 'Accessories',
        price: 29.99,
        stock: 50,
    },
    {
        name: '4K Curved Monitor',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60',
        description: 'Immersive viewing experience for gaming and productivity.',
        category: 'Electronics',
        price: 499.99,
        stock: 5,
    },
    {
        name: 'Pro Gaming Laptop',
        image: 'https://images.unsplash.com/photo-1603302576837-590617ee4c2c?w=500&auto=format&fit=crop&q=60',
        description: 'High performance gaming laptop with RTX graphics.',
        category: 'Electronics',
        price: 1299.99,
        stock: 3,
    },
    {
        name: 'Wireless Gaming Mouse',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60',
        description: 'Ultra-lightweight wireless mouse with precision sensor.',
        category: 'Electronics',
        price: 59.99,
        stock: 20,
    },
    {
        name: 'Smart Fitness Watch',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60',
        description: 'Track your health and notifications on the go.',
        category: 'Electronics',
        price: 149.99,
        stock: 12,
    },
    {
        name: 'USB-C Hub Multiport',
        image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&auto=format&fit=crop&q=60',
        description: 'Expand your connectivity with HDMI, USB 3.0, and SD card.',
        category: 'Accessories',
        price: 39.99,
        stock: 25,
    },
];

const importData = async () => {
    try {
        // Only seed if empty to avoid duplicates on restarts (though memory db starts empty)
        const count = await Product.countDocuments();
        if (count > 0) return;

        // await Product.deleteMany(); // Don't delete if we just check count
        // await User.deleteMany();

        // Create Admin User
        const createdUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
            role: 'admin',
        });

        const sampleProducts = products.map((product) => {
            return { ...product, user: createdUser._id };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
    } catch (error) {
        console.error(`${error}`);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const run = async () => {
    await connectDB();
    if (process.argv[2] === '-d') {
        await destroyData();
    } else {
        await importData(); // Don't exit process here, let main handle it or exit
        process.exit();
    }
}

if (require.main === module) {
    run();
}

module.exports = { importData };


