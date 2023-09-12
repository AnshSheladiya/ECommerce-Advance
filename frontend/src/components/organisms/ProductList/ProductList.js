import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ProductCard from '../../molecules/ProductCard/ProductCard';
import styles from './ProductList.module.css';
import { useTranslation } from 'react-i18next'; // Import the i18next translation hook
import SearchBar from "material-ui-search-bar"; // Import the SearchBar component
import ImageSliderComponent from '../../molecules/imageSlider/imageSlider';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsAction } from '../../../actions/actions';

const ProductList = () => {
  // Define the missing state variables and their setters
  const [searchString, setSearchString] = useState(""); // State for the search string
  const [currentPage, setCurrentPage] = useState(1); // State for the current page

  // Fetch products using Redux action
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.products);
  const totalPages = useSelector((state) => state.data.totalPages);
  const pageSize = 16;

  useEffect(() => {
    dispatch(fetchProductsAction(currentPage, pageSize, searchString));
  }, [dispatch, currentPage, searchString]);

  const handlePageChange = (event, page) => {
    // Here, you dispatch an action to update the currentPage state in Redux
    // This will trigger the useEffect above and fetch the products for the new page
    dispatch(fetchProductsAction(page, pageSize, searchString));
  };
  const handleSearch = (value) => {
    setCurrentPage(1); // Reset to the first page when performing a new search
    setSearchString(value);
  };
  const handleSearchRequestClose = () => {
    handleSearch(""); // Clear the search string when the close icon is clicked
  }; 
  // Get the current language and the translation function from useTranslation
  const { t, i18n } = useTranslation(); // Don't forget to import useTranslation
  return (
    <div>
      {/* SearchBar component */}

      <div className={styles.productList}>
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      <div className={styles.pagination}>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            size="large"
          />
        </Stack>
      </div>
    </div>
  );
};

export default ProductList;

