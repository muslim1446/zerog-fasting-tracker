import GraphSchema from './components/GraphSchema';
import FastingFooter from './components/FastingFooter';
import ServerFastingGuide from './components/ServerFastingGuide';
import NoScriptFallback from './components/NoScriptFallback';
import { buildPageMetadata } from '../lib/seo/metadata';
import DashboardWrapper from './components/DashboardWrapper';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata = buildPageMetadata('home');

export default function HomePage() {
  return (
    <>
      <GraphSchema type="home" />
      <div className="bg-red-600 h-[3px] w-full" aria-hidden="true" />
      <NoScriptFallback />
      <div id="fasting-app" className="border-b border-white/5">
        <DashboardWrapper />
      </div>
      <ServerFastingGuide />
      <FastingFooter />
    </>
  );
}