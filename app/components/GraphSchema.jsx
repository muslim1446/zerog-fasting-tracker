import {
  SITE_URL,
  SITE_NAME,
  PARENT_SITE_URL,
  PARENT_ORG_NAME,
  LOGO_URL,
  CONTACT_EMAIL,
  FOUNDING_DATE,
} from '../../lib/site';
import { HEALTH_CLAIMS } from '../../lib/copy';

function getParentOrgNode() {
  return {
    '@type': 'Organization',
    '@id': `${PARENT_SITE_URL}/#organization`,
    name: PARENT_ORG_NAME,
    url: PARENT_SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
  };
}

function getFastingOrgNode() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: 'OpenTuwa Fasting Tracker',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    foundingDate: FOUNDING_DATE,
    parentOrganization: { '@id': `${PARENT_SITE_URL}/#organization` },
    areaServed: 'Worldwide',
    ethicsPolicy: `${SITE_URL}/legal#health`,
    ownershipFundingInfo: `${PARENT_SITE_URL}/about`,
    knowsAbout: [
      'Intermittent Fasting',
      'Metabolic Health',
      'Time-Restricted Eating',
      'Wellness Education',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT_EMAIL,
      url: PARENT_SITE_URL,
    },
    description: HEALTH_CLAIMS.lawP1,
  };
}

function buildHomeGraph() {
  return [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: 'OpenTuwa Fasting Timer',
      description:
        'Independent intermittent-fasting timer with illustrative metabolic phase estimates.',
      inLanguage: 'en-US',
      publisher: { '@id': `${SITE_URL}/#organization` },
      isPartOf: { '@id': `${PARENT_SITE_URL}/#website` },
    },
    {
      '@type': 'WebApplication',
      '@id': `${SITE_URL}/#app`,
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web',
      browserRequirements: 'Requires JavaScript. Local storage for profile data.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Intermittent fasting timer',
        'Metabolic phase estimates',
        'Hydration target calculator',
        'Local-only profile storage',
      ],
      publisher: { '@id': `${SITE_URL}/#organization` },
      description: HEALTH_CLAIMS.lawP2,
    },
    getFastingOrgNode(),
    getParentOrgNode(),
  ];
}

function buildOnboardingGraph() {
  const pageUrl = `${SITE_URL}/onboarding`;
  return [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: `Profile Setup | ${SITE_NAME}`,
      description: 'Configure biological baseline for metabolic fasting estimates.',
      inLanguage: 'en-US',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Profile Setup' },
      ],
    },
    getFastingOrgNode(),
    getParentOrgNode(),
  ];
}

function buildLegalGraph() {
  const pageUrl = `${SITE_URL}/legal`;
  return [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: `Legal & Health Disclaimers | ${SITE_NAME}`,
      description: HEALTH_CLAIMS.lawP1,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      about: {
        '@type': 'Thing',
        name: 'Health and wellness disclaimer',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Legal' },
      ],
    },
    getFastingOrgNode(),
    getParentOrgNode(),
  ];
}

/**
 * @param {{ type?: 'home' | 'onboarding' | 'legal' }} props
 */
export default function GraphSchema({ type = 'home' }) {
  let graph;
  switch (type) {
    case 'onboarding':
      graph = buildOnboardingGraph();
      break;
    case 'legal':
      graph = buildLegalGraph();
      break;
    case 'home':
    default:
      graph = buildHomeGraph();
      break;
  }

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
