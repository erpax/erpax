#!/usr/bin/env node
/**
 * weave-orphans — land the entropy-attack proposals.
 *
 * Input: a JSON file `{ proposals: [{ orphan, target, reason }] }` (the workflow's
 * output — each is a TRUE relation: the `target` atom genuinely composes the `orphan`).
 * For each, append `· [[orphan]]` to the target SKILL.md's `Composes` line (idempotent),
 * so the orphan gains an incoming link and aura drops it from the WEAVE queue. Both
 * orphan and target are resolved case/hyphen-insensitively to their real folder leaf
 * (the same canonical norm the gates use), so the written link is the clean folder word.
 *
 * Deterministic + safe: no link is invented (the agents proposed only true relations),
 * the aura/docs gates verify nothing dead was added. Skips a proposal whose target is
 * missing, equals the orphan, or already links it.
 *
 *   node scripts/weave-orphans.mjs <proposals.json>
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'

const norm = (s) => String(s).toLowerCase().replace(/[-_]/g, '')

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    let s
    try {
      s = statSync(p)
    } catch {
      continue
    }
    if (s.isDirectory()) walk(p, out)
    else if (e === 'SKILL.md') out.push(p)
  }
  return out
}

// norm(leaf) -> { file, leaf } (original folder word, the clean link form). Last wins (tags/Tags benign).
const index = new Map()
for (const f of walk('src')) {
  const leaf = basename(dirname(f))
  index.set(norm(leaf), { file: f, leaf })
}

const arg = process.argv[2]
if (!arg) {
  console.error('usage: node scripts/weave-orphans.mjs <proposals.json>')
  process.exit(1)
}
const raw = JSON.parse(readFileSync(arg, 'utf8'))
const proposals = Array.isArray(raw) ? raw : raw.proposals || []

let applied = 0
let skipped = 0
const notes = []
for (const p of proposals) {
  if (!p || !p.orphan || !p.target) {
    skipped++
    continue
  }
  if (norm(p.orphan) === norm(p.target)) {
    skipped++
    notes.push(`skip self: ${p.orphan}`)
    continue
  }
  const orphan = index.get(norm(p.orphan))
  const target = index.get(norm(p.target))
  if (!orphan) {
    skipped++
    notes.push(`skip (orphan atom not found): ${p.orphan}`)
    continue
  }
  if (!target) {
    skipped++
    notes.push(`skip (target atom not found): ${p.target}`)
    continue
  }
  let text = readFileSync(target.file, 'utf8')
  const link = `[[${orphan.leaf}]]`
  if (text.includes(link)) {
    skipped++
    continue // already woven — idempotent
  }
  // Append in-place to the existing Composes line (start- OR mid-line, e.g. after
  // "Matter-twin: … Composes: …"), inserting before its trailing period — never a
  // second redundant Composes line. Only treat it as the list line if it carries [[links]].
  const m = text.match(/^.*\bComposes\b[^\n]*$/m)
  if (m && m[0].includes('[[')) {
    let line = m[0]
    line = line.endsWith('.') ? `${line.slice(0, -1)} · ${link}.` : `${line} · ${link}`
    text = text.replace(m[0], line)
  } else {
    text = text.replace(/\n*$/, `\n\nComposes: ${link}.\n`)
  }
  writeFileSync(target.file, text)
  applied++
  notes.push(`woven [[${orphan.leaf}]] ← ${target.leaf}  (${p.reason || ''})`)
}

for (const n of notes) console.log('  ' + n)
console.log(`\nweave-orphans: ${applied} applied, ${skipped} skipped (of ${proposals.length} proposals)`)
