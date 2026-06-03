import GraphSchema from './components/GraphSchema';
import DashboardClient from './components/DashboardClient';
import FastingFooter from './components/FastingFooter';
import SeoPageIntro from './components/SeoPageIntro';
import { buildPageMetadata } from '../lib/seo/metadata';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata = buildPageMetadata('home');

export default function HomePage() {
  return (
    <>
      <GraphSchema type="home" />
      <div className="bg-red-600 h-[3px] w-full" aria-hidden="true" />
      <SeoPageIntro variant="home" />
      <DashboardClient />
      <FastingFooter />
    </>
  );
}
