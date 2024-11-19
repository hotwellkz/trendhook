import React from 'react';
import { MetaTags } from './SEO/MetaTags';
import { Navigation } from './Navigation';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { ComparisonSection } from './ComparisonSection';
import { HowToSection } from './HowToSection';
import { ScriptSection } from './ScriptSection';
import { AnalysisSection } from './AnalysisSection';
import { ReelsLibrary } from './ReelsLibrary';
import { PricingSection } from './PricingSection';
import { FAQSection } from './FAQSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';
import { SearchSection } from './SearchSection';
import { RealTimeDataSection } from './RealTimeDataSection';

export function HomePage() {
  return (
    <>
      <MetaTags pageName="home" />
      <Navigation />
      <main>
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
      </main>
      <Footer />
    </>
  );
}
