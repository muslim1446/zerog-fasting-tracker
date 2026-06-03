import Link from 'next/link';
import GraphSchema from '../components/GraphSchema';
import FastingFooter from '../components/FastingFooter';
import OpenTuwaBrand from '../components/OpenTuwaBrand';
import { HEALTH_CLAIMS, FOOTER } from '../../lib/copy';
import { buildPageMetadata } from '../../lib/seo/metadata';
import { SITE_URL, SITE_NAME } from '../../lib/site';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata = buildPageMetadata('legal');

export default function LegalPage() {
  return (
    <>
      <GraphSchema type="legal" />
      <div className="bg-red-600 h-[3px] w-full" aria-hidden="true" />
      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 font-sans w-full">
        <OpenTuwaBrand href="/" subinfo="Legal & health disclaimers" className="mb-10" />

        <article id="health">
          <h1 className="text-3xl font-heading font-bold text-white mb-6 tracking-tight">
            Legal & health disclaimers
          </h1>

          <section className="mb-10">
            <h2 className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2">
              {HEALTH_CLAIMS.lawTitle}
            </h2>
            <p className="text-tuwa-muted text-sm leading-relaxed mb-4">{HEALTH_CLAIMS.lawP1}</p>
            <p className="text-tuwa-muted text-sm leading-relaxed mb-4">{HEALTH_CLAIMS.lawP2}</p>
            <p className="text-white/20 text-[11px] leading-relaxed">{HEALTH_CLAIMS.safeHarbor}</p>
          </section>

          <section className="mb-10" id="privacy">
            <h2 className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2">
              Privacy & local storage
            </h2>
            <p className="text-tuwa-muted text-sm leading-relaxed">
              Profile data and fasting timers are stored in your browser&apos;s local storage only.
              OpenTuwa Fasting does not transmit biometric data to our servers by default. Clearing
              site data in your browser removes your profile.
            </p>
          </section>

          <section className="mb-10" id="company">
            <h2 className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2">
              Operator
            </h2>
            <p className="text-tuwa-muted text-sm leading-relaxed mb-4">
              {SITE_NAME} is operated by OpenTuwa Media as an independent wellness utility, separate
              from editorial content on{' '}
              <a
                href={FOOTER.mainSite}
                className="text-tuwa-accent hover:text-white transition-colors"
                rel="noopener noreferrer"
              >
                {FOOTER.mainSiteLabel}
              </a>
              . Canonical URL:{' '}
              <a href={SITE_URL} className="text-tuwa-accent hover:text-white transition-colors">
                {SITE_URL}
              </a>
            </p>
          </section>

          <p className="text-tuwa-muted text-sm">
            <Link href="/" className="text-tuwa-accent hover:text-white transition-colors">
              ← Back to fasting timer
            </Link>
          </p>
        </article>
      </main>
      <FastingFooter compact />
    </>
  );
}
