import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../../molecules/ProductCard/ProductCard';
import styles from './ProductList.module.css';
import useTheme from '../../../helpers/useTheme';
import ProductView from '../../pages/ProductView/ProductView';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.productList}>
      {products.map((product) => (
          <ProductCard product={product} />
      ))}
    </div>
  );
};

export default ProductList;
