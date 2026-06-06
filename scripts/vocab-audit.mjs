#!/usr/bin/env node
// vocab-audit — BULK audit: every atom word must come from the shared vocabulary.
// The shared vocabulary = the English dictionary ∪ the corpus's own atoms (the
// compositional closure) ∪ short standard codes. An atom that is none of these is
// a STRAY word — a typo or an ungrounded invention. A multi-word concatenation is
// a COMPOUND that should be split into its atom-path (path = type).
//
//   node scripts/vocab-audit.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'

const dict = new Set(
  readFileSync('/usr/share/dict/words', 'utf8').split('\n').map((w) => w.toLowerCase().trim()).filter(Boolean),
)
const SRC = join(process.cwd(), 'src')
const atoms = new Set()
const walk = (d) => {
  for (const e of readdirSync(d)) {
    if (e === 'skills' || e === 'node_modules' || e.startsWith('.')) continue
    const p = join(d, e)
    let s
    try { s = statSync(p) } catch { continue }
    if (s.isDirectory()) walk(p)
    else if (e === 'SKILL.md') atoms.add(basename(dirname(p)).toLowerCase().replace(/[-_]/g, ''))
  }
}
walk(SRC)

// inflections: plural + verb forms (-ed/-ing/-es/-s/-d), so approved→approve,
// recognizing→recognize, increases→increase resolve to the dictionary stem.
const SUFFIX = [['ies', 'y'], ['ied', 'y'], ['ing', ''], ['ing', 'e'], ['ed', ''], ['ed', 'e'], ['es', ''], ['s', ''], ['d', ''], ['er', ''], ['er', 'e'], ['ly', '']]
const isWord = (w) => {
  if (dict.has(w)) return true
  for (const [suf, rep] of SUFFIX) {
    if (w.length > suf.length + 2 && w.endsWith(suf) && dict.has(w.slice(0, -suf.length) + rep)) return true
  }
  return false
}
const splits = (a) => {
  for (let i = 3; i <= a.length - 3; i++) {
    const l = a.slice(0, i), r = a.slice(i)
    if ((isWord(l) || atoms.has(l)) && (isWord(r) || atoms.has(r) || splits(r))) return [l, r]
  }
  return null
}

const g = { word: [], compound: [], code: [], flagged: [] }
for (const a of [...atoms].sort()) {
  if (isWord(a)) g.word.push(a)
  else if (/\d/.test(a)) g.code.push(a) // numeric standard code/version (iso 4217, en 16931)
  else if (splits(a)) g.compound.push(a)
  else if (a.length <= 5 && /^[a-z]+$/.test(a)) g.code.push(a)
  else g.flagged.push(a)
}

console.log(`vocabulary audit — ${atoms.size} atoms vs ${dict.size} dictionary words`)
for (const [k, v] of Object.entries(g)) console.log(`  ${k.padEnd(9)} ${v.length}`)
console.log(`\nFLAGGED — not a vocabulary word, not decomposable (typos / ungrounded) [${g.flagged.length}]:\n  ${g.flagged.join(' ')}`)
console.log(`\nCOMPOUND — concatenations to split into an atom-path (path=type) [${g.compound.length}]:\n  ${g.compound.join(' ')}`)
console.log(`\nCODE? — short, review as a standard code/abbreviation [${g.code.length}]:\n  ${g.code.join(' ')}`)
