import Link from 'next/link';
import {
  FASTING_PHASES,
  FASTING_PROTOCOLS,
  METRICS_EXPLAINED,
  FAQ,
  HOME_LEAD,
  HOW_IT_WORKS,
} from '../../lib/seo/crawler-content';
import { HEALTH_CLAIMS } from '../../lib/copy';
import { SITE_NAME, SITE_URL, PARENT_SITE_URL } from '../../lib/site';

export default function ServerFastingGuide() {
  return (
    <article
      className="max-w-2xl mx-auto px-4 sm:px-6 py-10 font-sans text-tuwa-muted"
      id="fasting-guide"
    >
      <header className="mb-10">
        <h1 className="text-3xl font-heading font-bold text-white tracking-tight mb-4">
          {SITE_NAME} — Intermittent fasting timer
        </h1>
        <p className="text-base leading-relaxed text-tuwa-muted">{HOME_LEAD}</p>
        <p className="mt-4 text-sm leading-relaxed">
          <Link href="/onboarding" className="text-tuwa-accent hover:text-white font-medium">
            Set up your biological baseline
          </Link>
          {' · '}
          <Link href="/legal" className="text-tuwa-accent hover:text-white font-medium">
            Read legal &amp; health disclaimers
          </Link>
          {' · '}
          <a
            href={PARENT_SITE_URL}
            className="text-tuwa-accent hover:text-white font-medium"
            rel="noopener noreferrer"
          >
            OpenTuwa News
          </a>
        </p>
      </header>

      <section className="mb-10" aria-labelledby="how-heading">
        <h2
          id="how-heading"
          className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2"
        >
          How it works
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-sm leading-relaxed">
          {HOW_IT_WORKS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="mt-4 text-sm">
          The interactive timer and progress ring on this page require JavaScript. Everything
          below is available to search engines and AI crawlers without executing scripts.
        </p>
      </section>

      <section className="mb-10" aria-labelledby="protocols-heading">
        <h2
          id="protocols-heading"
          className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2"
        >
          Fasting protocols supported
        </h2>
        <ul className="space-y-5">
          {FASTING_PROTOCOLS.map((p) => (
            <li key={p.name} className="text-sm leading-relaxed">
              <h3 className="text-white font-semibold font-heading">{p.name}</h3>
              <p className="mt-1">{p.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10" aria-labelledby="phases-heading">
        <h2
          id="phases-heading"
          className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2"
        >
          Metabolic phases (illustrative timeline)
        </h2>
        <p className="text-sm leading-relaxed mb-6">
          Phase titles shown on the dashboard change as hours elapsed increase. Timing compresses
          slightly for very active users. These descriptions are educational—not clinical staging.
        </p>
        <ul className="space-y-5">
          {FASTING_PHASES.map((phase) => (
            <li key={phase.title} className="text-sm leading-relaxed border-l-2 border-tuwa-accent/40 pl-4">
              <h3 className="text-white font-semibold font-heading">{phase.title}</h3>
              <p className="text-xs text-tuwa-muted/80 mt-0.5 uppercase tracking-wide">{phase.window}</p>
              <p className="mt-2">{phase.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10" aria-labelledby="metrics-heading">
        <h2
          id="metrics-heading"
          className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2"
        >
          Dashboard metrics explained
        </h2>
        <ul className="space-y-4">
          {METRICS_EXPLAINED.map((m) => (
            <li key={m.name} className="text-sm leading-relaxed">
              <h3 className="text-white font-medium">{m.name}</h3>
              <p className="mt-1">{m.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[11px] text-white/30">{HEALTH_CLAIMS.estimatesNote}</p>
      </section>

      <section className="mb-10" aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2"
        >
          Frequently asked questions
        </h2>
        <dl className="space-y-6">
          {FAQ.map((item) => (
            <div key={item.q}>
              <dt className="text-white font-medium text-sm">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-6" aria-labelledby="health-heading">
        <h2
          id="health-heading"
          className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2"
        >
          {HEALTH_CLAIMS.lawTitle}
        </h2>
        <p className="text-sm leading-relaxed mb-3">{HEALTH_CLAIMS.lawP1}</p>
        <p className="text-sm leading-relaxed mb-3">{HEALTH_CLAIMS.lawP2}</p>
        <p className="text-[11px] leading-relaxed text-white/25">{HEALTH_CLAIMS.safeHarbor}</p>
      </section>

      <p className="text-xs text-tuwa-muted/60">
        Canonical URL:{' '}
        <a href={SITE_URL} className="text-tuwa-accent hover:text-white">
          {SITE_URL}
        </a>
      </p>
    </article>
  );
}
