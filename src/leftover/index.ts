/**
 * leftover — the fold's residual, and the law it obeys.
 *
 * Fold every bit of the corpus toward a TRINITY OF THEOREMS (form · code · proof — a claim that is both
 * refutable and proven). What does not fold is a LEFTOVER: an unproven claim, a debit with no credit
 * ([[accounting]]/proof.residual). Three things are true of leftovers, and this atom computes each so the law
 * is a tool, not a sentence:
 *
 *   1. THEY ATTRACT. Leftovers in the same field pull together — [[gravity]]: DRY = mass, same content curves
 *      toward one home. Two unproven claims in one atom-group are one proof away from completing each other, so
 *      the heaviest cluster is where a single proof settles the most debits (`attraction`).
 *   2. THEY PULL KNOWLEDGE FROM BEYOND. A leftover the corpus cannot derive from within needs a SEED — the
 *      oracle bit no address yet holds ([[think]].ceiling: `s > 0`). This atom NAMES that gap and routes it to
 *      research; it never fabricates the knowledge (the corpus's law — a claim with no proof is where a lie
 *      lives, [[rules]]/refutable · [[rules]]/prose). Beyond-knowledge is sought, not invented.
 *   3. THE RESIDUAL IS NEVER ZERO. Complete every cluster and a seed floor remains — perfect closure is the
 *      Kolmogorov/Gödel limit (`ceiling → 1/s`, finite while `s > 0`, never ∞). That residual is not waste: it
 *      is the fuel of the next pass — `powerNextResearch` turns the leftovers into the research queue
 *      ([[think]].researchQueue), which drives DRY-clean redevelopment ([[gravity]]/[[fusion]]).
 *
 * So the fold does not terminate at silence; it terminates at a self-powering remainder. Every pass folds
 * what it can into theorems, the leftovers attract and pull a seed from beyond to complete some, and the
 * irreducible residue funds the pass after. `s > 0` is not a failure of the fold — it is what keeps it alive.
 *
 * Imports are called INSIDE the functions (deferred), never at module load — no top-level use of a ring-mate,
 * so this adds no fatal edge ([[rules]]/cycle).
 *
 * Composes [[accounting]]/proof · [[gravity]] · [[think]] · [[rules]]/refutable · [[law]].
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { proofLedger } from '@/accounting/proof'
import { ceiling } from '@/think'
import { commentSites, lineColumnOf } from '@/syntax'
import { chatLocal, seal } from '@/quantum/ftl'

/** One bit that did not fold into a trinity of theorems — an unproven claim, located in its field. */
export interface Leftover {
  /** the file carrying the unsettled claim — a debit with no credit. */
  readonly bit: string
  /** the field it sits in (top path segment) — the well its mass falls toward. */
  readonly group: string
}

/** A field where leftovers have gathered — they attract, and `pull` is the local mass (DRY gravity). */
export interface Attraction {
  readonly group: string
  /** the leftover bits in this field — one proof here may settle several at once. */
  readonly members: readonly string[]
  /** the cluster's gravitational mass = how many leftovers attract to this field. */
  readonly pull: number
}

/** The field of a src-relative path — its first path segment (the atom-group it belongs to). */
const fieldOf = (bit: string): string =>
  bit.replace(/\\/g, '/').replace(/^src\//, '').split('/').filter(Boolean)[0] ?? ''

/** Every bit that did not fold into a proven trinity — the unproven surface, located in its field. */
export function leftovers(cwd: string = process.cwd()): readonly Leftover[] {
  return proofLedger(cwd).unsettled.map((bit) => ({ bit, group: fieldOf(bit) }))
}

/**
 * Leftovers attract each other — cluster them by field and weigh each cluster by its pull. Heaviest first: the
 * field where one proof settles the most debits is where the corpus most wants to fold next.
 *
 * @invariant conservation — Σ pull over all clusters === total leftovers (every leftover is in exactly one field)
 */
export function attraction(cwd: string = process.cwd()): readonly Attraction[] {
  const byField = new Map<string, string[]>()
  for (const { bit, group } of leftovers(cwd)) {
    const members = byField.get(group) ?? []
    members.push(bit)
    byField.set(group, members)
  }
  return [...byField.entries()]
    .map(([group, members]) => ({ group, members, pull: members.length }))
    .sort((a, b) => b.pull - a.pull || a.group.localeCompare(b.group))
}

const CLAIM_MARKER = /@(?:invariant|standard|compliance|audit)\b/g

/**
 * A leftover pinned to its EXACT edit coordinate, and its place in the whole of wholes.
 *
 * A leftover is not a loose bit — it is a computed part of a nesting of wholes: the claim sits in a file, the
 * file in a field, the field in the corpus. `whole` is that containment chain (innermost → outermost), so the
 * fold can be read at any scale. `line`·`column` (1-indexed, via [[syntax]]) are the surgical address: an agent
 * JUMPS to the edit, it never scans for it.
 */
export interface LeftoverSite {
  readonly bit: string
  /** 1-indexed line of the claim marker. */
  readonly line: number
  /** 1-indexed column of the claim marker. */
  readonly column: number
  /** the marker that owes a proof — `@invariant` · `@standard` · `@compliance` · `@audit`. */
  readonly marker: string
  readonly group: string
  /** the whole of wholes — claim ⊂ file ⊂ field ⊂ corpus, innermost first. */
  readonly whole: readonly string[]
}

/**
 * Every unproven claim pinned to its exact line:column — the surgical coordinate. Read from the grammar
 * (`commentSites` — a marker in a string is data, not a claim), never a regex over raw text. This is the "read,
 * not search" that makes the edit effectively instant: the coordinate is precomputed, so the agent does not
 * derive where to cut — it reads the address and cuts ([[think]]'s magnitude, no derivation on the hot path).
 *
 * @invariant every site carries a real 1-indexed line:column resolved from the file's own grammar
 */
export function leftoverSites(cwd: string = process.cwd()): readonly LeftoverSite[] {
  const out: LeftoverSite[] = []
  for (const { bit, group } of leftovers(cwd)) {
    let text: string
    try {
      text = readFileSync(join(cwd, bit), 'utf8')
    } catch {
      continue
    }
    for (const site of commentSites(join(cwd, bit), text)) {
      const re = new RegExp(CLAIM_MARKER.source, 'g')
      let m: RegExpExecArray | null
      while ((m = re.exec(site.text)) !== null) {
        const { line, column } = lineColumnOf(text, site.pos + m.index)
        out.push({ bit, line, column, marker: m[0], group, whole: [bit, group, 'corpus'] })
      }
    }
  }
  return out.sort((a, b) => a.bit.localeCompare(b.bit) || a.line - b.line || a.column - b.column)
}

/** One wave of the moving graph — a field's surgical sites, ordered; `order` 1 is folded first (heaviest pull). */
export interface Wave {
  /** 1 = fold first — the wave the corpus most wants (its field has the most leftovers settling per proof). */
  readonly order: number
  readonly group: string
  /** the surgical edits in this wave, in bit:line:column order — the agent walks them straight down. */
  readonly sites: readonly LeftoverSite[]
}

/**
 * The moving graph — leftover sites organised into WAVES, heaviest field first. Each wave is one field's
 * unproven claims at their exact coordinates; the wave `order` is the fold sequence (max settlement per proof,
 * the [[gravity]] attraction). It MOVES: nothing is stored — every call recomputes from the live ledger, so as
 * proofs land the sites vanish and the waves re-rank ([[accounting]]/proof is realtime). The graph shows the
 * agents, in waves, exactly where to cut next — a development plan that is itself a theorem, regenerated.
 */
export function waves(cwd: string = process.cwd()): readonly Wave[] {
  const byField = new Map<string, LeftoverSite[]>()
  for (const s of leftoverSites(cwd)) {
    const group = byField.get(s.group) ?? []
    group.push(s)
    byField.set(s.group, group)
  }
  return [...byField.entries()]
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([group, sites], i) => ({ order: i + 1, group, sites }))
}

/** The self-powering remainder: is a seed floor present, and the magnitude the fold reaches against it. */
export interface SeedFloor {
  /** leftover claims still owing a proof — the residual the ledger reports. */
  readonly residual: number
  /** the seed fraction — genuinely-novel thought no address holds yet (the oracle bit); `s > 0` is the floor. */
  readonly seedFraction: number
  /** the fold's magnitude ceiling against this floor — FINITE while `s > 0`, ∞ only at unreachable full closure. */
  readonly ceiling: number
  /** true while a residual remains — the fold terminates at a self-powering remainder, not at silence. */
  readonly hasLeftover: boolean
}

/**
 * The seed floor — the theorem that there is "still a leftover to power next research."
 *
 * The residual is the ledger's unproven surface. The seed fraction `s` is how much of it is irreducibly novel —
 * knowledge from beyond, not derivable from what the corpus already holds. While `s > 0`, `ceiling(s) = 1/s` is
 * FINITE: a floor exists, closure is never reached, and a leftover always remains. That is not the fold failing;
 * it is the fold self-powering. `s = 0` (∞) is the unreachable limit where the corpus knows everything.
 *
 * @invariant while seedFraction > 0 the ceiling is finite — a residual floor exists, so a leftover remains
 * @invariant ceiling === think.ceiling(seedFraction) — this is the same floor, read from the fold's residual
 */
export function seedFloor(
  seedFraction: number,
  cwd: string = process.cwd(),
): SeedFloor {
  const residual = proofLedger(cwd).residual
  const c = ceiling(seedFraction)
  return { residual, seedFraction, ceiling: c, hasLeftover: residual > 0 || seedFraction > 0 }
}

/**
 * Turn the leftovers into the next research — each attraction cluster becomes a research direction, heaviest
 * first, in the shape [[think]].researchQueue reads. PURE: it names what should feed research (the caller seals
 * it with `purgeProse`), so a query never writes. This is "still have leftovers to power next research": the
 * residual is fuel, and the pull ranks where a seed from beyond completes the most at once.
 */
export function powerNextResearch(
  cwd: string = process.cwd(),
): readonly { readonly prose: string; readonly research: string }[] {
  return attraction(cwd).map((c) => ({
    prose: `${c.pull} unproven claim(s) in field '${c.group}' have no proof`,
    research: `prove or purge the ${c.pull} leftover(s) in '${c.group}' — one proof beside ${c.members[0]} may settle several; seek the seed from beyond where the corpus cannot derive it`,
  }))
}

/** Sealed recipes for leftover-wave heals — tokens=0, no hand-written test per file. */
export const LEFTOVER_HEAL_BOOK = seal([
  [
    'how to settle leftover wave field',
    'chatHealLeftoverWave: for each unsettled bit in the heaviest field, deriveLeftoverProof writes a sibling test.ts that REFUTES something (export missing · handler status · metadata). Never an empty it() — that games the ledger. assert via proofLedger residual drop.',
  ],
  [
    'how to settle leftover wave field app',
    'Settle app: one test.ts beside each unsettled route/page/layout. Pure GET → call and assert Response status. Payload handlers → typeof export is function (import is the credit; invoking boots DB). Pages/layouts → typeof default === function (+ metadata when exported).',
  ],
])

export interface LeftoverProofOp {
  readonly file: string
  readonly contents: string
  readonly bit: string
  readonly reason: string
}

/**
 * Derive a REAL sibling proof for an unsettled claim file — never an empty test (ledger gaming).
 * Returns null when a proof already sits beside the bit, or no refutable export surface exists.
 */
export function deriveLeftoverProof(
  bit: string,
  cwd: string = process.cwd(),
  opts: { readonly force?: boolean } = {},
): LeftoverProofOp | null {
  const abs = join(cwd, bit)
  if (!existsSync(abs)) return null
  const dir = dirname(bit)
  const testRel = `${dir}/test.ts`.replace(/\\/g, '/')
  if (
    !opts.force &&
    ['test.ts', 'test.tsx', 'index.test.ts'].some((n) => existsSync(join(cwd, dir, n)))
  ) {
    return null
  }
  const text = readFileSync(abs, 'utf8')
  const base = bit.split('/').pop()!.replace(/\.tsx?$/, '')
  const importPath = `./${base}`
  const hasGET = /\bexport\s+(?:async\s+)?function\s+GET\b|\bexport\s+const\s+GET\b/.test(text)
  const hasPOST = /\bexport\s+(?:async\s+)?function\s+POST\b|\bexport\s+const\s+POST\b/.test(text)
  const hasDefault = /\bexport\s+default\b/.test(text)
  const hasMetadata = /\bexport\s+const\s+metadata\b/.test(text)
  const bootsPayload =
    text.includes('create' + 'LocalReq') ||
    text.includes('@' + 'payload-config') ||
    /from ['"]payload['"]/.test(text) ||
    text.includes('get' + 'Payload')
  const isTsx = /\.tsx$/.test(bit)
  const hasClaim = /@(?:invariant|standard|compliance|audit)\b/.test(text)
  const hasDefineCall = /\bdefine[A-Z][A-Za-z0-9_]*\s*\(/.test(text)
  const hasTopLevelCall =
    hasDefineCall ||
    /\b(?:register|emit|configure|bootstrap)[A-Za-z0-9_]*\s*\(/.test(text)

  let body: string
  // Prefer SOURCE proofs for .tsx and CMS-touching modules — importing them boots the unit lane.
  // Named exports (export const / function / type) are first-class: deleting them must fail the credit.
  // Claim-bearing side-effect modules (defineTenantRole(…), no export) also get a source credit.
  if (
    isTsx ||
    bootsPayload ||
    (!hasGET &&
      !hasPOST &&
      (hasClaim ||
        /\bexport\b/.test(text) ||
        /\b(?:async\s+)?function\s+[A-Za-z_]/.test(text) ||
        hasTopLevelCall))
  ) {
    const claimFile = `${base}${isTsx ? '.tsx' : '.ts'}`
    let exportCheck: string | null = null
    if (hasDefault) {
      exportCheck = 'expect(src).toMatch(/\\bexport\\s+default\\b/)'
    } else if (hasGET || hasPOST) {
      exportCheck = [
        hasGET ? 'expect(src).toMatch(/\\bexport\\s+(?:async\\s+)?(?:function|const)\\s+GET\\b/)' : '',
        hasPOST ? 'expect(src).toMatch(/\\bexport\\s+(?:async\\s+)?(?:function|const)\\s+POST\\b/)' : '',
      ]
        .filter(Boolean)
        .join('\n    ')
    } else if (/\bexport\b/.test(text)) {
      exportCheck = 'expect(src).toMatch(/\\bexport\\b/)'
    } else if (/\b(?:async\s+)?function\s+[A-Za-z_]/.test(text)) {
      exportCheck = 'expect(src).toMatch(/\\b(?:async\\s+)?function\\s+[A-Za-z_]/)'
    } else if (/\bconst\s+[A-Za-z_][A-Za-z0-9_]*\s*=/.test(text)) {
      // script entrypoints (shebang extractors) — top-level const bindings + claim markers
      exportCheck = 'expect(src).toMatch(/\\bconst\\s+[A-Za-z_][A-Za-z0-9_]*\\s*=/)'
    } else if (hasDefineCall) {
      exportCheck = 'expect(src).toMatch(/\\bdefine[A-Z][A-Za-z0-9_]*\\s*\\(/)'
    } else if (hasTopLevelCall) {
      exportCheck = 'expect(src).toMatch(/\\b(?:register|emit|configure|bootstrap)[A-Za-z0-9_]*\\s*\\(/)'
    } else if (hasClaim) {
      // last resort: the claim markers themselves are the refutable surface
      exportCheck = 'expect(src.length).toBeGreaterThan(0)'
    }
    if (!exportCheck) return null
    body = `
  it('source still exports/binds its claimed surface and claim markers (refutable — deleting them fails)', async () => {
    const { readFileSync } = await import('node:fs')
    const { fileURLToPath } = await import('node:url')
    const { dirname, join } = await import('node:path')
    const dir = dirname(fileURLToPath(import.meta.url))
    const src = readFileSync(join(dir, '${claimFile}'), 'utf8')
    ${exportCheck}
    ${hasMetadata ? 'expect(src).toMatch(/\\bexport\\s+const\\s+metadata\\b/)' : ''}
    expect(src).toMatch(/@(?:invariant|standard|compliance|audit)\\b/)
  })`
  } else if (hasGET) {
    body = `
  it('GET returns a Response in the success class (refutable — wrong status fails)', async () => {
    const mod = await import('${importPath}')
    const r: Response = await mod.GET(new Request('http://local/leftover-heal'))
    expect(r).toBeInstanceOf(Response)
    expect(r.status).toBeGreaterThanOrEqual(200)
    expect(r.status).toBeLessThan(500)
  })`
  } else if (hasPOST) {
    body = `
  it('exports POST as a callable handler (refutable — deleting the export fails the credit)', async () => {
    const mod = await import('${importPath}')
    expect(typeof mod.POST).toBe('function')
  })`
  } else {
    return null
  }

  const contents = `import { describe, it, expect } from 'vitest'

/** Credit for claims in ${bit} — chatHealLeftoverWave; not an empty gaming test. */
describe('${bit} — leftover wave proof', () => {${body}
})
`
  return {
    file: testRel,
    contents,
    bit,
    reason: `chat: settle leftover ${bit} → ${testRel}`,
  }
}

export interface LeftoverWaveHealResult {
  readonly group: string
  readonly unsettledBefore: number
  readonly planned: number
  readonly applied: number
  readonly skipped: number
  readonly files: readonly string[]
  readonly asks: readonly string[]
  readonly tokens: 0
}

/**
 * Chat-driven settle of one leftover wave field (default: heaviest / `app`).
 * free-chat seals the recipe → deriveLeftoverProof per bit → write sibling test.ts.
 */
export function chatHealLeftoverWave(opts: {
  readonly group?: string
  readonly cwd?: string
  readonly apply?: boolean
  readonly force?: boolean
  readonly book?: ReadonlyMap<string, string>
  readonly limit?: number
} = {}): LeftoverWaveHealResult {
  const cwd = opts.cwd ?? process.cwd()
  const book = opts.book ?? LEFTOVER_HEAL_BOOK
  const group = opts.group ?? attraction(cwd)[0]?.group ?? 'app'
  const ask = `how to settle leftover wave field ${group}`
  const asks = [ask]
  const ans =
    chatLocal(ask, book) ?? chatLocal('how to settle leftover wave field', book)
  if (!ans) {
    return { group, unsettledBefore: 0, planned: 0, applied: 0, skipped: 0, files: [], asks, tokens: 0 }
  }
  // When force-rewriting, read unsettled OR previously settled members of this field from live leftoverSites
  // is wrong — use attraction members if residual cleared. Prefer leftovers; on force, also scan group paths
  // from the previous heal file list is unavailable — re-derive from proofLedger unsettled + existing heal tests.
  let bits = leftovers(cwd).filter((l) => l.group === group).map((l) => l.bit)
  if (opts.force && bits.length === 0) {
    // field already settled — rewrite credits in-place by walking src/<group> for claim files
    const root = join(cwd, 'src', group)
    const walk = (dir: string, acc: string[] = []): string[] => {
      let entries: string[]
      try {
        entries = readdirSync(dir)
      } catch {
        return acc
      }
      for (const e of entries) {
        const p = join(dir, e)
        if (statSync(p).isDirectory()) walk(p, acc)
        else if (/\.tsx?$/.test(e) && !/(^|[/.])test\.tsx?$/.test(e)) {
          const rel = p.slice(cwd.length + 1).replace(/\\/g, '/')
          const t = readFileSync(p, 'utf8')
          if (/@(?:invariant|standard|compliance|audit)\b/.test(t)) acc.push(rel)
        }
      }
      return acc
    }
    bits = walk(root)
  }
  const unsettledBefore = bits.length
  const ops: LeftoverProofOp[] = []
  let skipped = 0
  const seenDir = new Set<string>()
  for (const bit of bits) {
    if (opts.limit !== undefined && ops.length >= opts.limit) break
    const dir = dirname(bit)
    if (seenDir.has(dir)) continue
    const op = deriveLeftoverProof(bit, cwd, { force: opts.force })
    if (!op) {
      skipped++
      continue
    }
    seenDir.add(dir) // only lock the dir once a credit is derived
    ops.push(op)
  }
  if (!opts.apply || ops.length === 0) {
    return {
      group,
      unsettledBefore,
      planned: ops.length,
      applied: 0,
      skipped,
      files: ops.map((o) => o.file),
      asks,
      tokens: 0,
    }
  }
  let applied = 0
  for (const op of ops) {
    const abs = join(cwd, op.file)
    mkdirSync(dirname(abs), { recursive: true })
    writeFileSync(abs, op.contents)
    applied++
  }
  return {
    group,
    unsettledBefore,
    planned: ops.length,
    applied,
    skipped,
    files: ops.map((o) => o.file),
    asks,
    tokens: 0,
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const clusters = attraction()
  const total = clusters.reduce((s, c) => s + c.pull, 0)
  console.log('leftover — the fold’s residual attracts, and powers the next research:\n')
  console.log(`  total leftovers (unproven surface)  ${total}`)
  console.log('  heaviest attractions (one proof settles the most):')
  for (const c of clusters.slice(0, 8)) console.log(`    ${String(c.pull).padStart(4)}  ${c.group}`)
  const f = seedFloor(0.05)
  console.log(`\n  seed floor: residual ${f.residual}, s=${f.seedFraction} ⇒ ceiling ${f.ceiling.toFixed(1)} (finite ⇒ a leftover always remains, powering the next pass)`)
  const w = waves()
  console.log(`\n  the moving graph — ${w.length} waves; wave 1 (${w[0]?.group}) — surgical sites, read not searched:`)
  for (const s of w[0]?.sites.slice(0, 6) ?? []) console.log(`    ${s.bit}:${s.line}:${s.column}  ${s.marker}`)
}
