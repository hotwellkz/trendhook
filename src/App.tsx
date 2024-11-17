import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ComparisonSection } from './components/ComparisonSection';
import { HowToSection } from './components/HowToSection';
import { ScriptSection } from './components/ScriptSection';
import { AnalysisSection } from './components/AnalysisSection';
import { ReelsLibrary } from './components/ReelsLibrary';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { SearchSection } from './components/SearchSection';
import { RealTimeDataSection } from './components/RealTimeDataSection';
import { AuthPage } from './components/AuthPage';
import { SignUpPage } from './components/SignUpPage';
import { Dashboard } from './components/Dashboard';

function HomePage() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ComparisonSection />
      <HowToSection />
      <ScriptSection />
      <AnalysisSection />
      <SearchSection />
      <RealTimeDataSection />
      <ReelsLibrary />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;