import { useEffect, useState } from 'react';
import axios from 'axios';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/orders/myorders', { withCredentials: true });
                setOrders(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-tokyo-primary">My Orders</h1>
            <div className="space-y-4">
                {orders.map(order => (
                    <div key={order._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <span className="font-bold">Order ID:</span> {order._id}
                            </div>
                            <div className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="space-y-2">
                            {order.orderItems.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                    <span>{item.name} (x{item.qty})</span>
                                    <span>${item.price}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t flex justify-between font-bold">
                            <span>Total</span>
                            <span>${order.totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="mt-2 text-sm text-green-600 font-semibold">
                            Paid on {new Date(order.paidAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderPage;
