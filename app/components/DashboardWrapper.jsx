"use client";

import nextDynamic from 'next/dynamic';

const DashboardClient = nextDynamic(() => import('./DashboardClient'), {
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

export default function DashboardWrapper() {
  return <DashboardClient />;
}