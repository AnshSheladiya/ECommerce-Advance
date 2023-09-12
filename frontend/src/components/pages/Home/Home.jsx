import React, { useState, useEffect } from 'react';
import '../../../styles/global.css';
import ProductList from '../../organisms/ProductList/ProductList';
import useTheme from '../../../helpers/useTheme';
import HomeStyles from './Home.module.css';
import ImageSliderComponent from '../../molecules/imageSlider/imageSlider';

import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@mui/material';

const Home = () => {
  const { mode, handleModeChange } = useTheme();

  return (
    <div>
      <CssBaseline /> {/* Add CssBaseline to reset default styles */}
      <Container style={{ maxWidth: '100%', padding: 0 }}>
        <div className={HomeStyles['theme']} data-theme={mode}>
          {/* <ImageSliderComponent /> */}
          <ProductList />
        </div>
      </Container>
    </div>
  );
};

export default Home;
