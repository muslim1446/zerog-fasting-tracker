import Link from 'next/link';
import { HEALTH_CLAIMS, FOOTER } from '../../lib/copy';

export default function FastingFooter({ compact = false }) {
  return (
    <footer className={`mt-auto border-t border-white/5 ${compact ? 'pt-8' : 'pt-12'} pb-8 px-4 sm:px-6`}>
      <section className="max-w-2xl mx-auto">
        <h2 className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2">
          {HEALTH_CLAIMS.lawTitle}
        </h2>
        <p className="text-tuwa-muted text-sm leading-relaxed mb-3">{HEALTH_CLAIMS.lawP1}</p>
        <p className="text-tuwa-muted text-sm leading-relaxed mb-6">{HEALTH_CLAIMS.lawP2}</p>
        <p className="text-white/20 text-[11px] leading-relaxed">{HEALTH_CLAIMS.safeHarbor}</p>
      </section>

      <div className="max-w-2xl mx-auto mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-tuwa-muted">
        <span>{FOOTER.copyright}</span>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="/legal"
            className="font-bold tracking-widest uppercase hover:text-white transition-colors"
          >
            Legal
          </Link>
          <a
            href={FOOTER.mainSite}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold tracking-widest uppercase hover:text-white transition-colors"
          >
            {FOOTER.mainSiteLabel} →
          </a>
        </div>
      </div>
    </footer>
  );
}
