#!/usr/bin/env tsx
/**
 * spec-extract — dump the parsed JSDoc-as-spec corpus.
 *
 * Slice CCCCC (2026-05-11): smoke / debug entry point for the
 * spec-generator pipeline. Walks every collection file under
 * src/plugins/accounting/collections/ + src/collections/, parses each
 * leading JSDoc banner, and prints a structured report grouped by
 * collection.
 *
 * Usage:
 *   pnpm exec tsx scripts/spec-extract.ts                # full corpus
 *   pnpm exec tsx scripts/spec-extract.ts --slug=consignment-arrangements
 *   pnpm exec tsx scripts/spec-extract.ts --json         # JSON dump
 *
 * @audit ISO-19011:2018 §6.4.6 audit-evidence-spec-traceability
 */

import { resolve } from 'node:path'
import { extractCorpus } from '../src/services/spec-generator'

const repoRoot = resolve(__dirname, '..')
const args = new Set(process.argv.slice(2))
const slugFilter = process.argv.slice(2).find((a) => a.startsWith('--slug='))?.slice(7)
const wantJson = args.has('--json')

const corpus = extractCorpus(repoRoot)
const filtered = slugFilter
  ? corpus.collections.filter((c) => c.slug === slugFilter)
  : corpus.collections

if (wantJson) {
  console.log(JSON.stringify({ collections: filtered, extractedAt: corpus.extractedAt }, null, 2))
  process.exit(0)
}

// Pretty report
console.log(`Spec extraction — ${filtered.length} collection(s) parsed (of ${corpus.collections.length} total)`)
console.log(`Extracted at: ${corpus.extractedAt.toISOString()}`)
console.log('')

const totals = {
  standards: 0, chainSteps: 0, features: 0, roles: 0, emits: 0,
  subscribes: 0, examples: 0, invariants: 0, useCases: 0, summaries: 0,
  slices: 0, crons: 0, sees: 0,
}
for (const c of filtered) {
  totals.standards += c.standards.length
  totals.chainSteps += c.chainSteps.length
  totals.features += c.features.length
  totals.roles += c.roles.length
  totals.emits += c.emits.length
  totals.subscribes += c.subscribes.length
  totals.examples += c.examples.length
  totals.invariants += c.invariants.length
  totals.useCases += c.useCases.length
  totals.summaries += c.summaries.length
  totals.slices += c.slices.length
  totals.crons += c.crons.length
  totals.sees += c.sees.length
}

console.log('=== Tag totals ===')
for (const [k, v] of Object.entries(totals)) {
  console.log(`  ${k.padEnd(12)} ${v}`)
}
console.log('')

if (slugFilter) {
  for (const c of filtered) {
    console.log(`=== ${c.slug} (${c.filePath}) ===`)
    console.log(`title: ${c.title}`)
    console.log(`description (${c.description.length} chars):`)
    console.log(c.description.split('\n').slice(0, 5).map((l) => '  ' + l).join('\n'))
    if (c.description.split('\n').length > 5) console.log('  …')
    console.log('')
    if (c.standards.length) {
      console.log('standards:')
      for (const s of c.standards) console.log(`  - ${s.body} ${s.id}${s.description ? ' — ' + s.description : ''}`)
    }
    if (c.chainSteps.length) {
      console.log('chain steps:')
      for (const s of c.chainSteps) console.log(`  - ${s.chainId} step ${s.stepIndex}-of-${s.totalSteps}${s.note ? ' — ' + s.note : ''}`)
    }
    if (c.features.length) {
      console.log('features:')
      for (const f of c.features) console.log(`  - ${f.id}${f.label ? ' — ' + f.label : ''}`)
    }
    if (c.roles.length) {
      console.log('roles:')
      for (const r of c.roles) console.log(`  - ${r.roleId} (${r.access})`)
    }
    if (c.emits.length) {
      console.log('emits:')
      for (const e of c.emits) console.log(`  - ${e.eventId}${e.payloadDescription ? ' — ' + e.payloadDescription : ''}`)
    }
    if (c.examples.length) {
      console.log('examples:')
      for (const e of c.examples) console.log(`  - ${e.chainId} step ${e.stepIndex}-of-${e.totalSteps} (${Object.keys(e.payload).length} keys)`)
    }
    if (c.invariants.length) {
      console.log('invariants:')
      for (const inv of c.invariants) console.log(`  - [${inv.form}] ${inv.predicate ?? inv.tsCode?.slice(0, 60) + '…'}`)
    }
    if (c.useCases.length) {
      console.log('use cases:')
      for (const u of c.useCases) console.log(`  - ${u.markdown.slice(0, 80)}${u.markdown.length > 80 ? '…' : ''}`)
    }
    if (c.summaries.length) {
      console.log('summaries:')
      for (const s of c.summaries) console.log(`  - "${s.text}"`)
    }
    if (c.slices.length) {
      console.log(`slices: ${c.slices.map((s) => s.sliceId).join(', ')}`)
    }
    console.log('')
  }
} else {
  console.log('=== Per-collection citations ===')
  for (const c of [...filtered].sort((a, b) => a.slug.localeCompare(b.slug))) {
    const tagCount = c.standards.length + c.chainSteps.length + c.features.length
      + c.roles.length + c.emits.length + c.examples.length + c.invariants.length
      + c.useCases.length + c.summaries.length
    console.log(`  ${c.slug.padEnd(34)} ${String(c.standards.length).padStart(2)} std  ${String(c.chainSteps.length).padStart(2)} chain  ${String(c.features.length).padStart(2)} feat  ${String(c.invariants.length).padStart(2)} inv  ${String(c.examples.length).padStart(2)} ex  →  ${tagCount} tags`)
  }
}
