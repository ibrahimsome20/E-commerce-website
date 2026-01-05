import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut } from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();

    const cartItemsCount = cart.items.reduce((acc, item) => acc + item.qty, 0);

    return (
        <header className="bg-tokyo-bg/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-700">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-tokyo-primary">
                    TokyoStore
                </Link>

                <nav className="flex items-center space-x-6">
                    <Link to="/" className="hover:text-tokyo-primary transition">Products</Link>

                    {user ? (
                        <>
                            <Link to="/orders" className="hover:text-tokyo-primary transition">Orders</Link>
                            <div className="flex items-center space-x-4">
                                <Link to="/cart" className="relative hover:text-tokyo-primary transition">
                                    <ShoppingCart className="w-6 h-6" />
                                    {cartItemsCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-tokyo-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {cartItemsCount}
                                        </span>
                                    )}
                                </Link>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium">{user.name}</span>
                                    <button onClick={logout} className="text-red-400 hover:text-red-300">
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="hover:text-tokyo-primary transition">Login</Link>
                            <Link to="/register" className="btn-primary">Sign Up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
