import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import LandingHero from './components/LandingHero';
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

      {/* Hero Section */}
      <LandingHero />

      {/* Content Sections */}
      <Box id="about">
        <InfoSection />
        <ValuesSection />
        <MissionVisionSection />
        <ContactSection />
      </Box>
    </Box>
  );
};

export default LandingPage;
