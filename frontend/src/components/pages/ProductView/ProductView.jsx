import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../../styles/global.css';
import styles from './ProductView.module.css';
import useTheme from '../../../helpers/useTheme';

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const { mode, handleModeChange, themes } = useTheme();

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

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleMainImageZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { product_name, description, price, quantity, images } = product;
  const primaryImage = images.find((image) => image.isPrimary);
  // const proxyEndpoint = "https://ecommercadvance.onrender.com/proxy-image";
  const proxyEndpoint = "http://localhost:3000/proxy-image";
  const primaryImageUrl = `${proxyEndpoint}?imageUrl=${primaryImage.url}`;
  const selectedImageUrl = selectedImage ? `${proxyEndpoint}?imageUrl=${selectedImage.url}` : primaryImageUrl;
  console.log("SELECTED: " + selectedImage)
  console.log("URL: " ,selectedImage && selectedImage.url ? selectedImageUrl : primaryImageUrl)
  return (
    <div className={`${styles.productView} ${mode}`} data-theme={mode}>
      <h2 className={styles.name}>{product_name}</h2>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <img
            src={selectedImage && selectedImage.url ? selectedImageUrl : primaryImageUrl}
            alt={product_name}
            className={`${styles.mainImage} ${isZoomed && styles.zoomed}`}
            onClick={handleMainImageZoom}
          />
        </div>
        <div className={styles.smallImagesWrapper}>
          {images.map((image, index) => (
            <img
              key={index}
              src={`${proxyEndpoint}?imageUrl=${image.url}`}
              alt={product_name}
              className={`${styles.smallImage} ${
                selectedImage && selectedImage.url === image.url && styles.active
              }`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      </div>
      {/* <p className={styles.description}>{description}</p>
      <div className={styles.price}>Price: ${price}</div>
      <div className={styles.stock}>In Stock: {quantity}</div> */}
    </div>
  );
}

export default ProductView;

