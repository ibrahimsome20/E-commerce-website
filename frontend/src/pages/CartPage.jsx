import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const CartPage = () => {
    const { cart, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const calculateTotal = () => {
        return cart.items.reduce((acc, item) => acc + item.product.price * item.qty, 0).toFixed(2);
    };

    const handleCheckout = async () => {
        try {
            const orderData = {
                orderItems: cart.items.map(item => ({
                    product: item.product._id,
                    name: item.product.name,
                    qty: item.qty,
                    image: item.product.image,
                    price: item.product.price
                })),
                shippingAddress: { address: 'Test St', city: 'Test City', postalCode: '12345', country: 'Test Country' },
                paymentMethod: 'Mock',
                itemsPrice: Number(calculateTotal()),
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: Number(calculateTotal()),
            };

            await axios.post('http://localhost:5000/api/orders', orderData, { withCredentials: true });
            clearCart();
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate('/'); // Or to orders page
            }, 3000);
        } catch (error) {
            alert('Checkout Failed');
            console.error(error);
        }
    };

    if (cart.items.length === 0 && !success) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                <Link to="/" className="text-tokyo-primary underline">Go Shopping</Link>
            </div>
        );
    }

    if (success) {
        return (
            <div className="text-center mt-20 p-8 bg-green-100 rounded-lg max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-green-700">Payment Successful!</h2>
                <p className="mt-2 text-green-600">Thank you for your order.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-tokyo-primary">Shopping Cart</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-4">
                    {cart.items.map((item) => (
                        <div key={item.product._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-4">
                                <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                                <div>
                                    <h3 className="font-semibold">{item.product.name}</h3>
                                    <p className="text-gray-500">${item.product.price} x {item.qty}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="font-bold text-lg">${(item.product.price * item.qty).toFixed(2)}</span>
                                <button onClick={() => removeFromCart(item.product._id)} className="text-red-500 hover:text-red-700">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-md h-fit">
                    <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${calculateTotal()}</span>
                    </div>
                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between font-bold text-lg mb-6">
                            <span>Total</span>
                            <span>${calculateTotal()}</span>
                        </div>
                        <button onClick={handleCheckout} className="w-full btn-primary py-3">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
