import React from 'react';
import styles from './ProductCard.module.css';
import headphone from "../../../images/headphone.png";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={headphone} alt={product.product_name} className={styles.image} />
      </div>
      <div className={styles.detailsContainer}>
        <h3 className={styles.name}>{product.product_name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.price}>Price: ${product.price}</div>
        <div className={styles.stock}>In Stock: {product.quantity}</div>
      </div>
      <button className={styles.button}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
