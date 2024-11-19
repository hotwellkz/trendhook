import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { AuthPage } from './components/AuthPage';
import { SignUpPage } from './components/SignUpPage';
import { Dashboard } from './components/Dashboard';
import { BillingPage } from './components/BillingPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { CookiesPolicy } from './components/CookiesPolicy';
import { TermsConditions } from './components/TermsConditions';
import { SubscribersPage } from './components/SubscribersPage';
import { ProfileEditPage } from './components/ProfileEditPage';
import { PartnersPage } from './components/PartnersPage';
import { SiteStructure } from './components/SiteStructure';
import { ChatWidget } from './components/ChatWidget';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<CookiesPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/subscribers" element={<SubscribersPage />} />
            <Route path="/profile/edit" element={<ProfileEditPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/site-structure" element={<SiteStructure />} />
          </Routes>
          {user && <ChatWidget />}
        </div>
      </Router>
    </HelmetProvider>
  );
}
