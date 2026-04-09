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

import { CreditPage } from '@/features/cs50x-web/credit/CreditPage';
import { ScrabblePage } from '@/features/cs50x-web/scrabble';
import { ReadabilityPage } from '@/features/cs50x-web/readability';
import { CaesarPage } from '@/features/cs50x-web/caesar';
import { SubstitutionPage } from '@/features/cs50x-web/substitution';
import { PluralityPage } from '@/features/cs50x-web/plurality';
import { RunoffPage } from '@/features/cs50x-web/runoff';
import { FilterPage } from '@/features/cs50x-web/filter';
import { InheritancePage } from '@/features/cs50x-web/inheritance';
import { SpellerPage } from '@/features/cs50x-web/speller';
import { DnaPage } from '@/features/cs50x-web/dna';
import { TriviaPage } from '@/features/cs50x-web/trivia';
import { HomepagePage } from '@/features/cs50x-web/homepage';
import { BirthdaysPage } from '@/features/cs50x-web/birthdays';
import { FinancePage } from '@/features/cs50x-web/finance';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<HomePage />} />
      <Route path={PATHS.PROJECTS} element={<ProjectsPage />} />
      
      {/* Individual Feature Routes */}
      <Route path={PATHS.CS50X_WEB.CREDIT} element={<CreditPage />} />
      <Route path={PATHS.CS50X_WEB.SCRABBLE} element={<ScrabblePage />} />
      <Route path={PATHS.CS50X_WEB.READABILITY} element={<ReadabilityPage />} />
      <Route path={PATHS.CS50X_WEB.CAESAR} element={<CaesarPage />} />
      <Route path={PATHS.CS50X_WEB.SUBSTITUTION} element={<SubstitutionPage />} />
      <Route path={PATHS.CS50X_WEB.PLURALITY} element={<PluralityPage />} />
      <Route path={PATHS.CS50X_WEB.RUNOFF} element={<RunoffPage />} />
      <Route path={PATHS.CS50X_WEB.FILTER} element={<FilterPage />} />
      <Route path={PATHS.CS50X_WEB.INHERITANCE} element={<InheritancePage />} />
      <Route path={PATHS.CS50X_WEB.SPELLER} element={<SpellerPage />} />
      <Route path={PATHS.CS50X_WEB.DNA} element={<DnaPage />} />
      <Route path={PATHS.CS50X_WEB.TRIVIA} element={<TriviaPage />} />
      <Route path={PATHS.CS50X_WEB.HOMEPAGE} element={<HomepagePage />} />
      <Route path={PATHS.CS50X_WEB.BIRTHDAYS} element={<BirthdaysPage />} />
      <Route path={PATHS.CS50X_WEB.BIRTHDAY} element={<BirthdaysPage />} />
      <Route path={PATHS.CS50X_WEB.FINANCE} element={<FinancePage />} />
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
