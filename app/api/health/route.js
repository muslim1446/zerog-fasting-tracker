import { NextResponse } from 'next/server';

export const runtime = 'edge';

/** Runtime health check for Cloudflare Pages / monitoring. */
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: 'opentuwa-fasting',
      runtime: 'edge',
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}
