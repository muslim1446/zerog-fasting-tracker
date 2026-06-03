import Link from 'next/link';
import { ONBOARDING_FIELDS } from '../../lib/seo/crawler-content';
import { HEALTH_CLAIMS, SUBINFO } from '../../lib/copy';
import { SITE_NAME, SITE_URL } from '../../lib/site';

export default function ServerOnboardingGuide() {
  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 pb-8 font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white tracking-tight mb-3">
          Profile setup — {SITE_NAME}
        </h1>
        <p className="text-tuwa-muted text-sm leading-relaxed">{SUBINFO.tagline}</p>
        <p className="text-tuwa-muted text-sm leading-relaxed mt-4">
          Configure your biological baseline so metabolic estimates (BMR, TDEE, hydration, and
          glycogen models) match your physiology. All fields are stored locally in your browser;
          OpenTuwa does not receive this data by default.
        </p>
      </header>

      <section className="mb-8" aria-labelledby="fields-heading">
        <h2
          id="fields-heading"
          className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2"
        >
          Profile fields
        </h2>
        <dl className="space-y-5">
          {ONBOARDING_FIELDS.map((field) => (
            <div key={field.name}>
              <dt className="text-white font-medium text-sm">{field.name}</dt>
              <dd className="mt-1 text-sm text-tuwa-muted leading-relaxed">{field.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-8">
        <h2 className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2">
          After saving
        </h2>
        <p className="text-sm text-tuwa-muted leading-relaxed">
          You will be redirected to the{' '}
          <Link href="/" className="text-tuwa-accent hover:text-white">
            fasting dashboard
          </Link>{' '}
          to start or end fasts and view phase estimates. The interactive form below requires
          JavaScript.
        </p>
      </section>

      <section>
        <p className="text-sm text-tuwa-muted leading-relaxed mb-2">{HEALTH_CLAIMS.lawP1}</p>
        <p className="text-[11px] text-white/25 leading-relaxed">{HEALTH_CLAIMS.safeHarbor}</p>
        <p className="text-xs text-tuwa-muted/60 mt-4">
          <Link href="/legal" className="text-tuwa-accent hover:text-white">
            Full legal page
          </Link>
          {' · '}
          <a href={SITE_URL} className="text-tuwa-accent hover:text-white">
            {SITE_URL}
          </a>
        </p>
      </section>
    </article>
  );
}
