import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE_URL,
  TWITTER_SITE,
  PARENT_ORG_NAME,
} from '../lib/site';
import { PAGE_SEO } from '../lib/seo/metadata';

export const runtime = 'edge';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const home = PAGE_SEO.home;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: home.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: home.description,
  keywords: home.keywords,
  applicationName: SITE_NAME,
  authors: [{ name: PARENT_ORG_NAME, url: 'https://opentuwa.com' }],
  creator: PARENT_ORG_NAME,
  publisher: PARENT_ORG_NAME,
  category: 'health',
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: 'https://opentuwa.com/assets/ui/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        url: 'https://opentuwa.com/assets/ui/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: [
      {
        url: 'https://opentuwa.com/assets/ui/favicon.ico',
        type: 'image/x-icon',
      },
    ],
    apple: [
      {
        url: 'https://opentuwa.com/assets/ui/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: home.title,
    description: home.description,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_SITE,
    title: home.title,
    description: home.description,
    images: [OG_IMAGE_URL],
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: '#0a0a0b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://opentuwa.com" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      </head>
      <body className="font-sans antialiased bg-tuwa-black text-tuwa-text min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
