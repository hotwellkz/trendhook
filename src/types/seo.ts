export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  pages: {
    [key: string]: {
      title: string;
      h1: string;
      description: string;
      focusKeyword: string;
      keywords: string[];
      canonicalUrl: string;
      ogTitle: string;
      ogDescription: string;
      ogImage?: string;
      structuredData?: object;
    };
  };
}
