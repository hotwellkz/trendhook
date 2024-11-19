import React from 'react';
import { Helmet } from 'react-helmet-async';
import { seoConfig } from '../../config/seo';

interface MetaTagsProps {
  pageName: keyof typeof seoConfig.pages;
}

export function MetaTags({ pageName }: MetaTagsProps) {
  const page = seoConfig.pages[pageName];
  const { siteName, siteUrl } = seoConfig;

  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="keywords" content={page.keywords.join(', ')} />
      
      {/* Канонический URL */}
      <link rel="canonical" href={page.canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={page.ogTitle} />
      <meta property="og:description" content={page.ogDescription} />
      <meta property="og:url" content={page.canonicalUrl} />
      <meta property="og:type" content="website" />
      {page.ogImage && <meta property="og:image" content={page.ogImage} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.ogTitle} />
      <meta name="twitter:description" content={page.ogDescription} />
      {page.ogImage && <meta name="twitter:image" content={page.ogImage} />}
      
      {/* Структурированные данные */}
      {page.structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(page.structuredData)}
        </script>
      )}
    </Helmet>
  );
}
