import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE_URL,
  TWITTER_SITE,
  PARENT_ORG_NAME,
} from '../site';

const OG_IMAGE = {
  url: OG_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — Intermittent fasting timer`,
};

const ROBOTS_INDEX = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

/** @type {Record<string, { title: string; description: string; path: string; keywords: string }>} */
export const PAGE_SEO = {
  home: {
    title: 'OpenTuwa Fasting | Intermittent Fasting Timer & Metabolic Phases',
    description:
      'OpenTuwa Fasting is an independent intermittent-fasting timer with illustrative metabolic phase estimates, hydration targets, and local-only profile storage.',
    path: '/',
    keywords:
      'intermittent fasting, fasting timer, metabolic phases, OpenTuwa, wellness, 16:8 fasting, autophagy, fasting tracker',
  },
  onboarding: {
    title: 'Profile Setup',
    description:
      'Configure your biological baseline for OpenTuwa Fasting metabolic estimates. Data remains on your device.',
    path: '/onboarding',
    keywords: 'fasting profile, BMR, TDEE, fasting goal, OpenTuwa Fasting setup',
  },
  legal: {
    title: 'Legal & Health Disclaimers',
    description:
      'Terms, health advisory notices, and limitation of liability for OpenTuwa Fasting at fasting.opentuwa.com.',
    path: '/legal',
    keywords: 'OpenTuwa Fasting legal, health disclaimer, terms of use, wellness advisory',
  },
};

/**
 * @param {'home' | 'onboarding' | 'legal'} pageKey
 * @param {{ noIndex?: boolean }} [opts]
 */
export function buildPageMetadata(pageKey, opts = {}) {
  const page = PAGE_SEO[pageKey];
  const canonical = `${SITE_URL}${page.path}`;
  const title =
    pageKey === 'home' ? { absolute: page.title } : page.title;

  return {
    title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical },
    robots: opts.noIndex ? { index: false, follow: true } : ROBOTS_INDEX,
    authors: [{ name: PARENT_ORG_NAME, url: 'https://opentuwa.com' }],
    creator: PARENT_ORG_NAME,
    publisher: PARENT_ORG_NAME,
    category: 'health',
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'website',
      url: canonical,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_SITE,
      title: page.title,
      description: page.description,
      images: [OG_IMAGE_URL],
    },
    other: {
      'application-name': SITE_NAME,
    },
  };
}
