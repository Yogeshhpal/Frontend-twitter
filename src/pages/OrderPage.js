import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const OrderPage = () => {
    const [data, setData] = useState([]);
    const user = useSelector((state) => state?.user?.user);

    const fetchOrderDetails = async () => {
        try {
            const response = await fetch(SummaryApi.getOrder.url, {
                method: SummaryApi.getOrder.method,
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const responseData = await response.json();
            setData(responseData.data);
            // console.log('Order list:', responseData);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchOrderDetails();
        }
    }, [user]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
            <div className="bg-white shadow-md rounded-md p-4">
                {data.length > 0 ? (
                    data.map((order) => (
                        <div key={order._id} className="mb-4 p-4 border rounded-md">
                            <h2 className="text-xl font-semibold mb-2">Order ID: {order.orderId}</h2>
                            <p className="mb-1">Amount: {order.amount}</p>
                            <p className="mb-1">Currency: {order.currency}</p>
                            <p className="mb-1">Quantity: {order.quantity}</p>
                            <p className="mb-1">Timestamp: {new Date(order.timestamp).toLocaleString()}</p>
                            <Link
                                to={`/order/${order._id}`}
                                state={order} // Pass entire order object as state
                                className="text-blue-500 hover:underline"
                            >
                                View Details
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default OrderPage;
