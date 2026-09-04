#!/usr/bin/env node
/**
 * WORKLOG entry appender
 *
 * Usage:
 *   node log.mjs "What you worked on"
 *   node log.mjs "What you worked on" --commit
 *   node log.mjs "What you worked on" --status="In Progress"
 *   node log.mjs "What you worked on" --files="file1.js, file2.js"
 *   node log.mjs "What you worked on" --next="Next step to take"
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const WORKLOG = './WORKLOG.md';
const args = process.argv.slice(2);

if (!args.length || args[0].startsWith('--')) {
  console.error('Usage: node log.mjs "Entry description" [--commit] [--status="..."] [--files="..."] [--next="..."]');
  process.exit(1);
}

// Parse args
const description = args[0];
const flags = args.slice(1);
const getFlag = (name) => {
  const match = flags.find(f => f.startsWith(`--${name}=`));
  return match ? match.replace(`--${name}=`, '').replace(/^["']|["']$/g, '') : null;
};
const hasFlag = (name) => flags.includes(`--${name}`);

const status = getFlag('status') || '✅ Complete';
const files = getFlag('files') || null;
const next = getFlag('next') || null;
const doCommit = hasFlag('commit');

// Build date
const now = new Date();
const dateStr = now.toISOString().slice(0, 10);
const timeStr = now.toTimeString().slice(0, 5);

// Build entry
let entry = `\n## ${dateStr} — ${timeStr}\n\n`;
entry += `${description}\n\n`;
if (files) entry += `**Files:** ${files}\n\n`;
entry += `**Status:** ${status}\n`;
if (next) entry += `**Next Steps:** ${next}\n`;
entry += `\n---\n`;

// Append to worklog
const existing = readFileSync(WORKLOG, 'utf8');
writeFileSync(WORKLOG, existing + entry);
console.log(`\n✅ Logged to WORKLOG.md:\n${entry}`);

// Git commit if requested
if (doCommit) {
  try {
    execSync(`git add WORKLOG.md && git commit -m "worklog: ${description.slice(0, 72)}"`, { stdio: 'inherit' });
    console.log('✅ Git commit created.');
  } catch (e) {
    console.error('⚠️  Git commit failed:', e.message);
  }
}
