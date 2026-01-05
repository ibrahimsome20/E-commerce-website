import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/products');
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products', error);
            // Fallback/Mock Data if backend empty/fail for demo
            // setProducts([...]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-20">Loading products...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-tokyo-primary">Latest Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? products.map((product) => (
                    <motion.div
                        key={product._id}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col"
                    >
                        <div className="h-48 overflow-hidden bg-gray-200">
                            <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold mb-2 text-tokyo-fg">{product.name}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-xl font-bold text-tokyo-secondary">${product.price}</span>
                                <button
                                    onClick={() => addToCart(product._id)}
                                    className="btn-primary text-sm px-3 py-1.5"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )) : (
                    <p>No products found. Start the backend and seed some data!</p>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
