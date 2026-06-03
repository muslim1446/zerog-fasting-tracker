import GraphSchema from '../components/GraphSchema';
import OnboardingClient from '../components/OnboardingClient';
import FastingFooter from '../components/FastingFooter';
import SeoPageIntro from '../components/SeoPageIntro';
import { buildPageMetadata } from '../../lib/seo/metadata';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata = buildPageMetadata('onboarding');

export default function OnboardingPage() {
  return (
    <>
      <GraphSchema type="onboarding" />
      <div className="bg-red-600 h-[3px] w-full" aria-hidden="true" />
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <SeoPageIntro variant="onboarding" />
        <OnboardingClient />
      </div>
      <FastingFooter compact />
    </>
  );
}
