import Link from 'next/link';
import { BRAND_SUFFIX, SUBINFO } from '../../lib/copy';

export default function OpenTuwaBrand({ subinfo, href = '/', className = '' }) {
  const detail = subinfo ?? SUBINFO.tagline;

  return (
    <Link href={href} className={`group block ${className}`}>
      <h1 className="text-2xl font-extrabold tracking-tighter font-heading text-white group-hover:text-white/80 transition-colors">
        OpenTuwa
        <span className="font-light"> {BRAND_SUFFIX}</span>
      </h1>
      {detail && (
        <p className="text-[11px] text-tuwa-muted font-medium mt-1 tracking-wide uppercase">
          {detail}
        </p>
      )}
    </Link>
  );
}
