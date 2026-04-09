'use client';

import Box from '@mui/joy/Box';
import Navigation from './Navigation';
import Footer from './Footer';
import FloatingBinary from '../effects/FloatingBinary';

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.body',
        position: 'relative',
      }}
    >
      <FloatingBinary />
      <Navigation />
      <Box
        component="main"
        sx={{
          flex: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
