import React, { useState, useEffect } from 'react';
import '../../../styles/global.css';
import ProductList from '../../organisms/ProductList/ProductList';
import useTheme from '../../../helpers/useTheme';
import HomeStyles from './Home.module.css';
const Home = () => {
  const { mode, handleModeChange } = useTheme();

  return (
    <div className={HomeStyles['theme']} data-theme={mode}>
      <ProductList/>
    </div>
  );
};

export default Home;
