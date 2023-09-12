// src/redux/dataReducer.js

const initialState = {
    products: [], // An array to hold the fetched products
    currentPage: 1, // Track the current page in Redux
    totalPages: 1, // Total number of pages received from the API
    searchString: "",
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS_SUCCESS':
        return {
          ...state,
          products: action.payload, // Update the 'products' state with the fetched data
        };
      case 'SET_CURRENT_PAGE':
        return {
          ...state,
          currentPage: action.payload, // Update the 'currentPage' state
        };
      case 'SET_TOTAL_PAGES':
        return {
          ...state,
          totalPages: action.payload, // Update the 'totalPages' state
        };
        case 'SET_SEARCH_STRING':
          return {
            ...state,
            searchString: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default dataReducer;