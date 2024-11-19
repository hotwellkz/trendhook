import React from 'react';
import { MetaTags } from './SEO/MetaTags';
import { Navigation } from './Navigation';
import { HeroSection } from './HeroSection';
import { ScriptFeatures } from './ScriptFeatures';
import { ScriptExamples } from './ScriptExamples';
import { ScriptBenefits } from './ScriptBenefits';
import { ScriptFAQ } from './ScriptFAQ';
import { CTASection } from './CTASection';
import { RelatedLinks } from './RelatedLinks';
import { Footer } from './Footer';

export function HomePage() {
  return (
    <>
      <MetaTags pageName="home" />
      <Navigation />
      <main>
        <HeroSection />
        <ScriptFeatures />
        <ScriptExamples />
        <ScriptBenefits />
        <ScriptFAQ />
        <CTASection />
        <RelatedLinks />
      </main>
      <Footer />
    </>
  );
}
