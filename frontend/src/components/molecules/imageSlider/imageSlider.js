import React from 'react';
import ImageSlider from 'react-simple-image-slider';
import sliderImage_1 from '../../../images/Slider_1.jpg';
import sliderImage_2 from '../../../images/Slider_2.jpg';
import sliderImage_3 from '../../../images/Slider_3.jpg';
import { Container, Paper } from '@mui/material'; // Import Material-UI components
import './ImageSlider.css';

const images = [
  { url: sliderImage_1 },
  { url: sliderImage_2 },
  { url: sliderImage_3 },
];

const ImageSliderComponent = () => {
  return (
    <Container> {/* Use Material-UI Container for responsiveness */}
      <Paper  > {/* Use Material-UI Paper for styling */}
        <ImageSlider
          showBullets={true}
          showNavs={true}
          autoPlay={true}
          width="100%"
          height={400}
          images={images}
        />
      </Paper>
    </Container>
  );
};

export default ImageSliderComponent;
