import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

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

export const metadata = {
  title: {
    default: 'OpenTuwa Fasting | Metabolic Timing',
    template: '%s | OpenTuwa Fasting',
  },
  description:
    'OpenTuwa Fasting — an independent intermittent-fasting timer with illustrative metabolic phase estimates.',
  metadataBase: new URL('https://fasting.opentuwa.com'),
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
  openGraph: {
    siteName: 'OpenTuwa Fasting',
    type: 'website',
    images: [
      {
        url: 'https://opentuwa.com/assets/ui/web_1200.png',
        width: 1200,
        height: 630,
        alt: 'OpenTuwa Fasting',
      },
    ],
  },
  themeColor: '#0a0a0b',
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
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="OpenTuwa Fasting" />
      </head>
      <body className="font-sans antialiased bg-tuwa-black text-tuwa-text min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
