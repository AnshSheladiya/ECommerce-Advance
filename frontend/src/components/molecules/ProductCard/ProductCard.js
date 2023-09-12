import React from 'react';
import styles from './ProductCard.module.css';
import headphone from '../../../images/headphone.png';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  let imageUrl;
  if (product && product.images) {
    const primaryImage = product.images.find((image) => image.isPrimary);
    if (primaryImage && primaryImage.url) {
      // imageUrl= `https://ecommercadvance.onrender.com/proxy-image?imageUrl=${primaryImage.url}`;
      imageUrl = `http://localhost:3000/proxy-image?imageUrl=${primaryImage.url}`;
    }
  }

  return (
    <div className={styles.card}>
      <Link to={`/product-view/${product._id}`} className={styles.link}>
        <h1 className={styles.name}>{product.product_name}</h1>
        <div className={styles.imageContainer}>
          <img src={imageUrl ? imageUrl : headphone} alt={product.product_name} className={styles.image} />
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.price}>Price: ${product.price}</div>
        </div>
        <button className={styles.button}>Add to Cart</button>
      </Link>
    </div>
  );
};

export default ProductCard;
