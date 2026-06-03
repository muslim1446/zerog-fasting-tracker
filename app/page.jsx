import nextDynamic from 'next/dynamic';
import GraphSchema from './components/GraphSchema';
import FastingFooter from './components/FastingFooter';
import ServerFastingGuide from './components/ServerFastingGuide';
import NoScriptFallback from './components/NoScriptFallback';
import { buildPageMetadata } from '../lib/seo/metadata';

const DashboardClient = nextDynamic(() => import('./components/DashboardClient'), {
  ssr: false,
  loading: () => (
    <div
      className="max-w-2xl mx-auto px-4 py-8 text-center text-tuwa-muted text-sm"
      aria-live="polite"
    >
      Loading fasting timer…
    </div>
  ),
});

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
        <DashboardClient />
      </div>
      <ServerFastingGuide />
      <FastingFooter />
    </>
  );
}
