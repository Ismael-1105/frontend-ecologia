import React from 'react';
import { Box, Container } from '@mui/material';
import Hero from './components/Hero';

const HomePage = () => {
  return (
    <Box>
      <Container maxWidth="lg">
        <Hero />
      </Container>
    </Box>
  );
};

export default HomePage;