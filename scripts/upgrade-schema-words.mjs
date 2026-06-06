// Seal the legacy schema.org vocab words — the upgrade wave.
// The first schema.org encoding left ~1000 word-atoms in the old format (a quoted "X: a schema.org
// component word" description, no **Law, no "Use when" trigger), which drags the lawful and triggered
// conventions down. This wave rewrites each in place to the sealed format — a "Use when" description
// (raises triggered) + a **Law line (raises lawful) — without disturbing its fused-from provenance or
// its resolving links. Computed, idempotent, re-runnable (the endless wave: skips any already sealed).
//
//   node scripts/upgrade-schema-words.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'

const SRC = 'src'
let upgraded = 0
const walk = (d) => {
  for (const e of readdirSync(d)) {
    if (e === 'node_modules' || e.startsWith('.')) continue
    const p = join(d, e)
    const st = statSync(p)
    if (st.isDirectory()) { walk(p); continue }
    if (e !== 'SKILL.md') continue
    let s = readFileSync(p, 'utf8')
    // a schema.org word-atom — by the body phrase OR the @standard banner (catches the custom-gloss ones)
    if (!/a schema\.org (component|vocabulary) word/.test(s) && !/the type vocabulary, collided to single words/.test(s)) continue
    if (/\*\*Law/.test(s)) continue // already sealed
    const name = basename(dirname(p))
    // 1. "Use when" description — ONLY for the generic legacy line; keep custom glosses (e.g. produces) intact
    if (/^description:\s*"[^"]*:\s*a schema\.org component word/m.test(s)) {
      const desc =
        `description: Use when reasoning about ${name} as a schema.org vocabulary word — the single word collided from the schema.org terms that contain it, content-addressed into the corpus.`
      s = s.replace(/^description:.*$/m, desc)
    }
    // 2. a **Law line, inserted before the @standard banner (or appended if none)
    const law =
      `**Law — [[law]]: ${name} is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**\n\n`
    if (/^@standard /m.test(s)) s = s.replace(/^@standard /m, law + '@standard ')
    else s = s.trimEnd() + '\n\n' + law.trimEnd() + '\n'
    writeFileSync(p, s)
    upgraded++
  }
}
walk(SRC)
console.log('sealed ' + upgraded + ' legacy schema.org vocab words (Use-when description + **Law)')
