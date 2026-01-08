import React from 'react';
import { Box } from '@mui/material';
import MainHeader from './components/MainHeader';
import InfoSection from './components/InfoSection';
import ValuesSection from './components/ValuesSection';
import MissionVisionSection from './components/MissionVisionSection';

import ContactSection from './components/ContactSection';

const AboutPage = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        overflowX: 'hidden',
        minHeight: '100vh',
      }}
    >
      <MainHeader />
      <InfoSection />
      <ValuesSection />
      <MissionVisionSection />
      <ContactSection />
    </Box>
  );
};

export default AboutPage;
