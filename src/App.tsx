import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAuth } from './hooks/useAuth';
import { ChatWidget } from './components/ChatWidget';
import { HomePage } from './components/HomePage';
import { AuthPage } from './components/AuthPage';
import { SignUpPage } from './components/SignUpPage';
import { Dashboard } from './components/Dashboard';
import { BillingPage } from './components/BillingPage';
import { ProfileEditPage } from './components/ProfileEditPage';
import { PartnersPage } from './components/PartnersPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { CookiesPolicy } from './components/CookiesPolicy';
import { TermsConditions } from './components/TermsConditions';
import { SiteStructure } from './components/SiteStructure';
import { AIScriptsPage } from './components/AIScriptsPage';
import SubscribersPage from './components/SubscribersPage';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  const { user } = useAuth();

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-black text-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/profile/edit" element={<ProfileEditPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<CookiesPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/site-structure" element={<SiteStructure />} />
            <Route path="/ai-scripts" element={<AIScriptsPage />} />
            <Route path="/subscribers" element={<SubscribersPage />} />
          </Routes>
          {user && <ChatWidget />}
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
