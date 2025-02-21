// import React from 'react'
// import CategoryList from '../components/CategoryList'
// import BannerProduct from '../components/BannerProduct'
// import HorizontalCardProduct from '../components/HorizontalCardProduct'
// import VerticalCardProduct from '../components/VerticalCardProduct'

// const Home = () => {
//   return (
//     <div>
//       <CategoryList />
//       <BannerProduct />

//       <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
//       <HorizontalCardProduct category={"watches"} heading={"Popular Watches"} />

//       <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
//       <VerticalCardProduct category={"camera"} heading={"Camera And Photography"} />
//       <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
//       <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
//       <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
//       <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
//       <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"} />
//       <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />


//     </div>
//   )
// }

// export default Home



import React, { useState, useEffect } from 'react';
import UploadProduct from '../components/UploadProduct';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/get-product'); // Use correct API URL
      const data = await response.json();
      setProducts(data.data || []); // Extract the 'data' field
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', padding: '20px' }}>
      <button 
        style={{ padding: '10px 20px', color: 'white', backgroundColor: 'blue', borderRadius: '8px', border: 'none', cursor: 'pointer', marginBottom: '20px' }}
        onClick={() => setIsModalOpen(true)}
      >
        Add User
      </button>

      {isModalOpen && <UploadProduct onClose={() => setIsModalOpen(false)} fetchData={fetchProducts} />}

      <div style={{ width: '80%', maxWidth: '400px' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '10px' }}>
              <img src={product.productImage[0]} alt={product.productName} style={{ width: '100%', borderRadius: '8px' }} />
              <h3><strong>First Name:</strong>{product.productName}</h3>
              <p><strong>Last Name:</strong> {product.brandName}</p>
              <p><strong>Gender :</strong> {product.category}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Age :</strong> {product.price}</p>
              <p><strong>Location Pincode :</strong> {product.sellingPrice}</p>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;