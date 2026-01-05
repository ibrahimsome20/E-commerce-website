import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart({ items: [] });
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('http://localhost:5000/api/cart', { withCredentials: true });
            setCart(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, qty = 1) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/cart', { productId, qty }, { withCredentials: true });
            setCart(data);
        } catch (error) {
            console.error(error);
            alert('Error adding to cart');
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/cart/${productId}`, { withCredentials: true });
            setCart(data);
        } catch (error) {
            console.error(error);
        }
    };

    const clearCart = () => {
        setCart({ items: [] });
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, loading }}>
            {children}
        </CartContext.Provider>
    );
};
