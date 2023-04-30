import React, { useEffect } from 'react';
import './styles/global.css';
import { ThemeProvider } from './helpers/ThemeProvider';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/pages/Login/Login.jsx';
import Register from './components/pages/Register/Register.jsx';
import 'react-toastify/dist/ReactToastify.css';
import ForgatPassword from './components/pages/ForgatPassword/ForgatPassword';
import Verified from './components/pages/Verified/Verified';
import AppNavbar from './components/layout/Navbar/AppNavbar';
import ResetPassword from './components/pages/ResetPassword/ResetPassword';
import Home from './components/pages/Home/Home.jsx';
import authHandler from './helpers/AuthHandler';
import Logout from './components/layout/Logout';
import ProductView from './components/pages/ProductView/ProductView';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = !!localStorage.getItem('user');

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
}

function App() {
  useEffect(() => {
    authHandler();
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const showNavbar = !['/login', '/register', '/forgat-password', '/reset-password', '/verified'].includes(location.pathname);

  return (
    <>
      {showNavbar && <AppNavbar />}
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgat-password" element={<ForgatPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verified" element={<Verified />} />
          <Route path="/home" element={<PrivateRoute component={Home} />} />
          <Route exact path="/products/:id" component={ProductView} />
          <Route path="/logout" element={<PrivateRoute component={Logout} />} />
          {/* <Route path="/*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;



import React from 'react';
import styles from './ProductCard.module.css';
import headphone from "../../../images/headphone.png";
import { Link } from 'react-router-dom';


const ProductCard = ({ product }) => {
  const primaryImage = product.images.find((image) => image.isPrimary);

  return (
    <div className={styles.card}>
        <Link to={`/products/${product._id}`} className={styles.link}> <div className={styles.imageContainer}>
        <img src={primaryImage.url?primaryImage.url:headphone} alt={product.product_name} className={styles.image} />
      </div>
      <div className={styles.detailsContainer}>
        <h3 className={styles.name}>{product.product_name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.price}>Price: ${product.price}</div>
        <div className={styles.stock}>In Stock: {product.quantity}</div>
      </div>
      <button className={styles.button}>Add to Cart</button></Link>

    </div>
  );
};

export default ProductCard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './ProductView.module.css';

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const {
    product_name,
    description,
    price,
    quantity,
    images
  } = product;

  return (
    <div className={styles.productView}>
      <h2 className={styles.name}>{product_name}</h2>
      <div className={styles.imageContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={product_name}
            className={styles.image}
          />
        ))}
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.price}>Price: ${price}</div>
      <div className={styles.stock}>In Stock: {quantity}</div>
    </div>
  );
};

export default ProductView;


Error-->story.ts:487 Matched leaf route at location "/products/644bf9de650c4f1f8da7f22f" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.
w
