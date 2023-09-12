// reducers/index.js
import { combineReducers } from 'redux';
import dataReducer from '../dataReducer'; // Import all other reducers as well if you have more

const rootReducer = combineReducers({
  data: dataReducer,
  // Add other reducers here if you have more
});

export default rootReducer;