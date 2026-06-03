import nextDynamic from 'next/dynamic';
import GraphSchema from '../components/GraphSchema';
import FastingFooter from '../components/FastingFooter';
import ServerOnboardingGuide from '../components/ServerOnboardingGuide';
import NoScriptFallback from '../components/NoScriptFallback';
import { buildPageMetadata } from '../../lib/seo/metadata';

const OnboardingClient = nextDynamic(() => import('../components/OnboardingClient'), {
  ssr: false,
  loading: () => (
    <div className="max-w-md mx-auto py-8 text-center text-tuwa-muted text-sm">
      Loading profile form…
    </div>
  ),
});

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata = buildPageMetadata('onboarding');

export default function OnboardingPage() {
  return (
    <>
      <GraphSchema type="onboarding" />
      <div className="bg-red-600 h-[3px] w-full" aria-hidden="true" />
      <NoScriptFallback />
      <div className="flex-1 flex flex-col py-8 px-4 sm:px-6 lg:px-8 font-sans">
        <ServerOnboardingGuide />
        <div className="max-w-md w-full mx-auto mt-8 border-t border-white/10 pt-8">
          <h2 className="text-center text-xs font-bold text-white uppercase tracking-widest mb-6">
            Interactive form
          </h2>
          <OnboardingClient />
        </div>
      </div>
      <FastingFooter compact />
    </>
  );
}
