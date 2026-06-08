#!/usr/bin/env tsx
/**
 * Generates `docs/BUSINESS_CHAINS.md` from `src/services/business-chains/registry.ts`.
 *
 * Slice KKKK (2026-05-10): the registry is the source of truth; this
 * script is the deterministic projection. Re-run via `pnpm exec tsx
 * src/services/business-chains/gen-doc.ts` after registry changes.
 *
 * @audit ISO-19011:2018 audit-trail registry-traceability
 */

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { BUSINESS_CHAINS } from './registry'

const out: string[] = []
out.push('# Business Chains — auto-generated from `src/services/business-chains/registry.ts`')
out.push('')
out.push('> Single source of truth for ERPax\'s end-to-end workflows. Each chain maps a sequence of (collection, action, emitted-event) tuples to a published process standard. Re-run `pnpm exec tsx src/services/business-chains/gen-doc.ts` after editing the registry.')
out.push('')
out.push('## Summary table')
out.push('')
out.push('| Chain | Standards | Feature gate | Wired |')
out.push('|---|---|---|---|')
for (const c of Object.values(BUSINESS_CHAINS)) {
  out.push(`| **${c.name}** | ${c.standards.join('; ')} | ${c.featureGate ?? '_(core)_'} | ${c.socraticCheck.wired} |`)
}
out.push('')
out.push('## Chain-by-chain detail')
out.push('')
for (const c of Object.values(BUSINESS_CHAINS)) {
  out.push(`### ${c.name} — \`${c.id}\``)
  out.push('')
  out.push(c.description)
  out.push('')
  out.push(`**Standards:** ${c.standards.join('; ')}`)
  out.push(`  **Feature gate:** ${c.featureGate ?? '_(core, no gate)_'}`)
  out.push(`  **Seed file:** \`${c.seedFile}\``)
  out.push(`  **Test file:** \`${c.testFile}\``)
  out.push('')
  out.push(`**Socratic check:** canDo=${c.socraticCheck.canDo} · makesSense=${c.socraticCheck.makesSense} · wired=${c.socraticCheck.wired} · isStandard=${c.socraticCheck.isStandard}`)
  if (c.socraticCheck.note) out.push(`  _${c.socraticCheck.note}_`)
  out.push('')
  out.push('| # | Collection | Action | Emits | Requires |')
  out.push('|---|---|---|---|---|')
  c.steps.forEach((s, i) => {
    out.push(`| ${i + 1} | \`${s.collection}\` | ${s.action} | ${s.emits ?? '_(silent)_'} | ${s.requires.length === 0 ? '_(none)_' : s.requires.map((r) => `\`${r}\``).join(', ')} |`)
  })
  out.push('')
}

const target = resolve(process.cwd(), 'docs/BUSINESS_CHAINS.md')
writeFileSync(target, out.join('\n'), 'utf8')
console.log(`Wrote ${out.length} lines to ${target}`)
