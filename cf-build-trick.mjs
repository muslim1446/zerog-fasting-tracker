import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const npxArgs = (args) =>
  process.platform === 'win32'
    ? { file: 'cmd.exe', args: ['/c', 'npx', ...args] }
    : { file: 'npx', args };

console.log('Step 1: Building via @cloudflare/next-on-pages...');
try {
  const step1 = npxArgs(['@cloudflare/next-on-pages']);
  execFileSync(step1.file, step1.args, { stdio: 'inherit', cwd: root });
  console.log('Build succeeded on first pass.');
  process.exit(0);
} catch {
  console.log('First pass failed (expected _not-found issue). Cleaning up...');
}

const functionsDir = path.join(root, '.vercel/output/functions');
const badFiles = ['_not-found.rsc.func', '_not-found.func', '_error.func'];

for (const name of badFiles) {
  const p = path.join(functionsDir, name);
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true, force: true });
    console.log(`Removed ${name}`);
  }
}

console.log('Step 3: Resuming Cloudflare build (--skip-build)...');
const step3 = npxArgs(['@cloudflare/next-on-pages', '--skip-build']);
execFileSync(step3.file, step3.args, { stdio: 'inherit', cwd: root });
