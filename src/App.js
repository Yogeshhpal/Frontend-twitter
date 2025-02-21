import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/UserSlice';
import Context from './context';
import SummaryApi from './common';
import routes from './routes/index';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const [cartData, setCartData] = useState([]);

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include',
      });

      if (!dataResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi?.data));
      }
    } catch (error) {
      console.error('Fetch user details failed:', error);
    }
  };

  const fetchCartData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        }
      });
      const responseData = await response.json();
      if (responseData.success) {
        setCartData(responseData.data);
      }
    } catch (error) {
      console.error('Fetch cart data failed:', error);
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: 'include',
      });

      if (!dataResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const dataApi = await dataResponse.json();
      // console.log("dataApi", dataApi);
      setCartProductCount(dataApi?.data);
    } catch (error) {
      console.error('Fetch cart product count failed:', error);
    }
  };



  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
    fetchCartData();
  }, []);


  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      const { path, element, children, index: isIndex } = route;
      if (children) {
        return (
          <Route key={index} path={path} element={element}>
            {renderRoutes(children)}
          </Route>
        );
      }
      return isIndex ? (
        <Route key={index} index element={element} />
      ) : (
        <Route key={index} path={path} element={element} />
      );
    });
  };

  return (
    <Context.Provider value={{ fetchUserDetails, cartProductCount, fetchUserAddToCart, cartData }}>
      <ToastContainer position='top-center' />
      <BrowserRouter>
        <Routes>
          {renderRoutes(routes)}
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;