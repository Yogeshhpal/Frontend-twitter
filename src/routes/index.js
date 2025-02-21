// routes.js
import React from 'react';
import Layout from '../pages/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Signup from '../pages/Signup';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import CheckOut from '../pages/CheckOut';
import OrderConfirmation from '../pages/OrderConfirmation';
import OrderPage from '../pages/OrderPage';

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'forgot-password', element: <ForgotPassword /> },
            { path: 'sign-up', element: <Signup /> },
            { path: 'product-category', element: <CategoryProduct /> },
            { path: 'product/:id', element: <ProductDetails /> },
            { path: 'cart', element: <Cart /> },
            { path: 'search', element: <SearchProduct /> },
            { path: 'cart/checkout', element: <CheckOut /> },
            { path: "order/:orderId", element: <OrderConfirmation /> },
            { path: "order-list", element: <OrderPage /> },
            {
                path: 'admin-panel',
                element: <AdminPanel />,
                children: [
                    { path: 'all-users', element: <AllUsers /> },
                    { path: "all-products", element: <AllProducts /> },
                ],
            },
        ],
    },
];

export default routes;
