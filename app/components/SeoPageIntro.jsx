import Link from 'next/link';
import { SUBINFO } from '../../lib/copy';
import { SITE_NAME } from '../../lib/site';

/**
 * Server-rendered intro copy — visible in HTML for crawlers without JavaScript.
 */
export default function SeoPageIntro({ variant = 'home' }) {
  if (variant === 'onboarding') {
    return (
      <section className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <h1 className="text-xl font-heading font-bold text-white tracking-tight">
          {SITE_NAME} — Profile setup
        </h1>
        <p className="text-tuwa-muted text-sm mt-2 leading-relaxed">{SUBINFO.tagline}</p>
      </section>
    );
  }

  if (variant === 'legal') {
    return null;
  }

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 pb-2 border-b border-white/5">
      <h1 className="text-xl font-heading font-bold text-white tracking-tight">
        {SITE_NAME}
      </h1>
      <p className="text-tuwa-muted text-sm mt-2 leading-relaxed max-w-lg">
        {SUBINFO.tagline}. Track intermittent fasting windows, metabolic phases, hydration
        targets, and illustrative calorie estimates — stored locally on your device.
      </p>
      <nav className="mt-3 flex flex-wrap gap-4 text-xs font-bold tracking-widest uppercase text-tuwa-muted">
        <Link href="/onboarding" className="hover:text-white transition-colors">
          Profile setup
        </Link>
        <Link href="/legal" className="hover:text-white transition-colors">
          Legal & disclaimers
        </Link>
        <a
          href="https://opentuwa.com"
          className="hover:text-white transition-colors"
          rel="noopener noreferrer"
        >
          OpenTuwa News
        </a>
      </nav>
    </section>
  );
}
