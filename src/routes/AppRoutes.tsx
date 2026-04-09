import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PATHS } from './paths';

// Standard Pages
import HomePage from '../pages/HomePage';
import ProjectsPage from '../pages/ProjectsPage';
import ProjectDetailPage from '../pages/ProjectDetailPage';
import Cs50xWebProjectPage from '../pages/Cs50xWebProjectPage';
import ResumePage from '../pages/ResumePage';
import TechStackPage from '../pages/TechStackPage';
import ContactPage from '../pages/ContactPage';
import CertificationsPage from '../pages/CertificationsPage';

import { CreditPage } from '@/features/cs50x-web/credit';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<HomePage />} />
      <Route path={PATHS.PROJECTS} element={<ProjectsPage />} />
      
      {/* Individual Feature Routes */}
      {/* Currently matching legacy routes, we will refactor these below */}
      <Route path="/projects/cs50x-web/credit" element={<CreditPage />} />
      <Route path={PATHS.CS50X_WEB.PROJECT} element={<Cs50xWebProjectPage />} />
      <Route path="/projects/cs50x-web/:project/*" element={<Cs50xWebProjectPage />} />
      <Route path="/projects/:category/:id" element={<ProjectDetailPage />} />
      
      {/* Fallback Legacy detail path for transition */}
      <Route path="/projects/:id" element={<ProjectDetailPage />} />

      <Route path={PATHS.RESUME} element={<ResumePage />} />
      <Route path={PATHS.TECH_STACK} element={<TechStackPage />} />
      <Route path={PATHS.CONTACT} element={<ContactPage />} />
      <Route path={PATHS.CERTIFICATIONS} element={<CertificationsPage />} />
    </Routes>
  );
}
