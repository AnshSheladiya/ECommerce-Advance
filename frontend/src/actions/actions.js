// actions.js
import axios from 'axios';

const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

const fetchProductsSuccess = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
};

const fetchProductsFailure = (error) => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const fetchProductsAction = (currentPage, pageSize, searchString) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(
          `/api/products?pageNumber=${currentPage}&pageSize=${pageSize}&search=${searchString}`
        );
        const productsData = response.data.data;
        dispatch(fetchProductsSuccess(productsData));
        dispatch(setCurrentPageAction(currentPage)); // Dispatch the 'SET_CURRENT_PAGE' action
        dispatch(setTotalPagesAction(response.data.meta.total_pages)); // Dispatch the 'SET_TOTAL_PAGES' action
      } catch (error) {
        console.error('Error fetching products:', error);
        dispatch(fetchProductsFailure(error.response.data.message));
      }
    };
  };

export const setCurrentPageAction = (currentPage) => {
    return {
      type: 'SET_CURRENT_PAGE',
      payload: currentPage,
    };
  };
  
  export const setTotalPagesAction = (totalPages) => {
    return {
      type: 'SET_TOTAL_PAGES',
      payload: totalPages,
    };
  };
  
  export const setSearchStringAction = (searchString) => {
    return {
      type: 'SET_SEARCH_STRING',
      payload: searchString,
    };
  };