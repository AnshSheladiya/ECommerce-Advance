// src/redux/store.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import dataReducer from './dataReducer';

const rootReducer = combineReducers({
  data: dataReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;