/**
 * ask — a question the law already answers is not a question.
 *
 * User input is the highest cost in an ERP — higher than tokens, higher than the seed. A field that demands
 * a human type a value costs attention, invites error, and must be re-paid on every document, forever. Yet
 * measured across the live config: **874 required fields, of which only 20 carry a `defaultValue` and 8 are
 * computed — 846 bare asks.**
 *
 * Most are not questions at all. A VAT rate is fixed by ЗДДС; a УНП is a gapless per-device sequence
 * ([[naredba]]/n/18); a legal ground is a Кодекс на труда article; a currency is the tenant's; a date is now.
 * Each is a DERIVATION wearing a question's clothes. Predefine it case by case and the user does not type —
 * they **confirm**, or delegate the confirmation entirely. What remains is the irreducible ask: the user's
 * actual intent (which product, how many), the `s > 0` of input.
 *
 * `bareAsks` names them; the ratchet drives them down. Each one closed is a question a human never answers
 * again — the fold applied to attention rather than to tokens.
 *
 * HONEST BOUNDARY: this is a LEXICAL scan of the config source (importing 215 collections exceeds the local
 * budget), so field counts are approximate and a value computed in a `beforeChange` hook it cannot see reads
 * as a bare ask. It names candidates for predefinition — it never decides that a question is answerable.
 * Some asks are the intent itself and must stay.
 *
 * @standard ISO 9241-110:2020 §6.2 — self-descriptiveness / suitability for the task (do not ask what is known)
 *
 * Composes [[rules]] · [[law]].
 */
import { readFileSync, readdirSync, type Dirent } from 'node:fs'
import { join, relative } from 'node:path'

/** A required field with nothing computed for it — the human-typing cost. */
export interface BareAsk {
  readonly collection: string
  readonly field: string
  readonly file: string
}

export interface AskReport {
  readonly collections: number
  readonly required: number
  /** required AND already predefined (defaultValue) or computed (readOnly) — the user confirms, not types. */
  readonly answered: number
  /** required with neither — the bare asks. */
  readonly bare: readonly BareAsk[]
}

const configFiles = (root: string): string[] => {
  const out: string[] = []
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      const p = join(dir, e.name)
      if (e.isDirectory()) {
        if (e.name !== 'node_modules' && e.name !== 'worktrees') walk(p)
        continue
      }
      if (e.name === 'index.ts') out.push(p)
    }
  }
  walk(root)
  return out
}

/** One field declaration's source slice — enough to see its obligations. */
const FIELD_RE = /name: '([a-zA-Z][\w]*)',[\s\S]{0,240}?(?=name: '|\n {2}\],|\n\})/g

/**
 * Every required field with no `defaultValue` and no `readOnly` — a question the system asks a human
 * without first asking itself whether the answer is already determined.
 */
export function bareAsks(cwd: string = process.cwd()): AskReport {
  const bare: BareAsk[] = []
  let collections = 0
  let required = 0
  let answered = 0
  for (const f of configFiles(join(cwd, 'src'))) {
    let t: string
    try {
      t = readFileSync(f, 'utf8')
    } catch {
      continue
    }
    const slug = t.match(/slug: '([a-z-]+)'/)?.[1]
    if (!slug) continue
    collections++
    for (const m of t.matchAll(FIELD_RE)) {
      const decl = m[0]
      if (!/required: true/.test(decl)) continue
      required++
      // Not asked of a human when: predefined (`defaultValue`), computed and shown (`readOnly: true`), or
      // computed and hidden (`disabled: true` — the admin never renders it, a hook stamps it). Missing the
      // last one over-reported: `financial-statements.generatedAt` is auto-stamped and read as a bare ask.
      if (/defaultValue|readOnly: true|disabled: true/.test(decl)) {
        answered++
        continue
      }
      bare.push({ collection: slug, field: m[1]!, file: relative(cwd, f).replace(/\\/g, '/') })
    }
  }
  return { collections, required, answered, bare }
}

/**
 * Gate: the asks may not grow. Ratchets — each bare ask closed by a computed default (the law, the tenant,
 * the sequence, the clock) is a question a human never answers again. The floor is the irreducible intent.
 */
export function assertAsksBounded(cwd: string = process.cwd(), ceiling: number): void {
  const r = bareAsks(cwd)
  if (r.bare.length <= ceiling) return
  throw new Error(
    `✖ ask — ${r.bare.length} bare ask(s) exceeds the ceiling ${ceiling}. If the law, the tenant, the sequence or the clock determines it, predefine it and let the user CONFIRM.`,
  )
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const r = bareAsks()
  console.log(
    `ask — ${r.collections} collections · ${r.required} required · ${r.answered} predefined/computed · ${r.bare.length} BARE ASKS (the human-typing cost)`,
  )
  const byCollection = new Map<string, number>()
  for (const b of r.bare) byCollection.set(b.collection, (byCollection.get(b.collection) ?? 0) + 1)
  for (const [c, n] of [...byCollection.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)) {
    console.log(`  ${String(n).padStart(3)} asks  ${c}`)
  }
}
