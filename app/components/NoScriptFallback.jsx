import Link from 'next/link';
import { HOME_LEAD } from '../../lib/seo/crawler-content';
import { SITE_NAME } from '../../lib/site';

/** Plain HTML for users and bots with JavaScript disabled. */
export default function NoScriptFallback() {
  return (
    <noscript>
      <div className="max-w-2xl mx-auto px-6 py-8 border border-white/10 bg-tuwa-gray/30 rounded-xl my-6">
        <p className="text-white font-heading font-bold text-lg mb-2">{SITE_NAME}</p>
        <p className="text-tuwa-muted text-sm leading-relaxed mb-4">{HOME_LEAD}</p>
        <p className="text-sm text-tuwa-muted">
          JavaScript is required for the live timer. Read the full guide on this page, or visit{' '}
          <Link href="/legal" className="text-tuwa-accent underline">
            legal &amp; disclaimers
          </Link>
          .
        </p>
      </div>
    </noscript>
  );
}
