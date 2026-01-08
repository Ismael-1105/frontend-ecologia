import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import MainHeader from '../AboutPage/components/MainHeader';
import InfoSection from '../AboutPage/components/InfoSection';
import ValuesSection from '../AboutPage/components/ValuesSection';
import MissionVisionSection from '../AboutPage/components/MissionVisionSection';
import ContactSection from '../AboutPage/components/ContactSection';

/**
 * Landing Page
 * Main entry point for visitors with complete information
 */
const LandingPage = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', overflowX: 'hidden' }}>
      {/* Navbar */}
      <Navbar />

      {/* About Sections */}
      <Box id="about">
        <MainHeader />
        <InfoSection />
        <ValuesSection />
        <MissionVisionSection />
        <ContactSection />
      </Box>
    </Box>
  );
};

export default LandingPage;
