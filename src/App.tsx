import React from 'react';
import { CssVarsProvider, CssBaseline } from '@mui/joy';
import theme from './lib/theme';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import FloatingBinary from './components/effects/FloatingBinary';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <CssVarsProvider theme={theme} defaultMode="dark">
      <CssBaseline />
      <div className="app">
        <FloatingBinary />
        <Navigation />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </CssVarsProvider>
  );
}

export default App;
