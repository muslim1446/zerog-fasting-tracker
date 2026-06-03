"use client";

import nextDynamic from 'next/dynamic';

const OnboardingClient = nextDynamic(() => import('../components/OnboardingClient'), {
  ssr: false,
  loading: () => (
    <div className="max-w-md mx-auto py-8 text-center text-tuwa-muted text-sm">
      Loading profile form…
    </div>
  ),
});

export default function OnboardingWrapper() {
  return <OnboardingClient />;
}