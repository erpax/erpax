import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { chainLeaf, foldToRoot } from '@/merge'

/**
 * metric/face — a figure travels with the command that recomputes it, or it travels as prose.
 *
 * @see ./SKILL.md
 */

export interface MetricRow {
  /** Stable key, so two emissions of one repo can be diffed row by row. */
  readonly key: string
  /** What the figure asserts, in words — the part a reader judges. */
  readonly claim: string
  /** The figure itself, as a string, because a receipt is over bytes and not over a number's type. */
  readonly value: string
  /** How to recompute it WITHOUT this file. A row whose command cannot be run is prose again. */
  readonly command: string
  /** Content-address of this row's own fields, chained to the row before it. */
  readonly receipt: string
}

export interface MetricFace {
  readonly repo: string
  /** What the rows are figures ABOUT — stated once, so no row has to carry the definition. */
  readonly definition: string
  readonly rows: readonly MetricRow[]
  /** The fold of every receipt: it moves when any row does. */
  readonly root: string
}

/** The fields a receipt covers. The `receipt` itself is excluded — it cannot address itself. */
const sealable = (r: Omit<MetricRow, 'receipt'>): Record<string, unknown> => ({
  key: r.key,
  claim: r.claim,
  value: r.value,
  command: r.command,
})

/**
 * Seal a set of measured rows into a face.
 *
 * The chain is order-dependent by construction: each receipt folds in the one before it, so a row
 * moved, dropped or inserted changes every receipt after it and the root with it.
 */
export function sealFace(repo: string, definition: string, rows: readonly Omit<MetricRow, 'receipt'>[]): MetricFace {
  const sealed: MetricRow[] = []
  let prior = ''
  for (const r of rows) {
    prior = chainLeaf(sealable(r), prior)
    sealed.push({ ...r, receipt: prior })
  }
  return { repo, definition, rows: sealed, root: foldToRoot(sealed.map((r) => r.receipt)) }
}

export interface FaceVerdict {
  readonly ok: boolean
  readonly rows: number
  /** Keys whose receipt does not match their own contents. */
  readonly altered: readonly string[]
  readonly rootStated: string
  readonly rootComputed: string
  /**
   * What a green verdict does NOT establish, carried in the result so it cannot be dropped in
   * transit. A receipt proves the row is unchanged since sealing and nothing else.
   */
  readonly boundary: string
}

export const RECEIPT_BOUNDARY =
  'a receipt proves this row is unaltered since it was sealed — it does not make the figure correct, ' +
  'and it does not let a reader verify the figure without running the command in the row'

/**
 * Recompute every receipt and the root FROM THE FILE ALONE.
 *
 * Nothing from the emitting tree is needed, which is what makes a face portable. Altering a value
 * in transit fails and names the row.
 */
export function verifyFace(face: MetricFace): FaceVerdict {
  const altered: string[] = []
  let prior = ''
  for (const r of face.rows) {
    prior = chainLeaf(sealable(r), prior)
    if (prior !== r.receipt) {
      altered.push(r.key)
      prior = r.receipt // continue from the STATED chain, so one bad row does not condemn the rest
    }
  }
  const rootComputed = foldToRoot(face.rows.map((r) => r.receipt))
  return {
    ok: altered.length === 0 && rootComputed === face.root,
    rows: face.rows.length,
    altered,
    rootStated: face.root,
    rootComputed,
    boundary: RECEIPT_BOUNDARY,
  }
}

/** Read and verify a face from disk. A malformed file is a failure, never an empty pass. */
export function verifyFaceFile(path: string): FaceVerdict {
  const parsed = JSON.parse(readFileSync(path, 'utf8')) as MetricFace
  if (!Array.isArray(parsed.rows)) {
    throw new Error(`✖ ${path} carries no rows — a face with nothing to verify is not a passing face`)
  }
  return verifyFace(parsed)
}


/**
 * Run a measurement. A gate that FAILS publishes its failure as the value.
 *
 * Suppressing it would make this face a place where a red gate goes quiet, which is the defect the
 * whole corpus is built against — and a peer's first emission caught its own unwired script that
 * way, which is the strongest argument there is for reporting red.
 */
const run = (cmd: string, cwd: string): string => {
  try {
    return execFileSync('sh', ['-c', cmd], {
      cwd,
      encoding: 'utf8',
      maxBuffer: 1 << 28,
      env: { ...process.env, NODE_OPTIONS: '--no-deprecation --max-old-space-size=8000' },
    }).trim()
  } catch (e) {
    const err = e as { stdout?: string; message?: string }
    const last = String(err.stdout ?? err.message ?? '').trim().split('\n').slice(-1)[0]
    return `FAIL: ${last || 'no output'}`
  }
}

const TSX = 'pnpm exec tsx'

/** key · claim · the command that recomputes the value, from a clean checkout of this repo. */
const MEASURES: readonly (readonly [string, string, string])[] = [
  ['gate-axes-green', 'gate axes at or under their ratcheted ceiling', `${TSX} src/rules/index.ts | grep -c '^✓'`],
  ['gate-axes-red', 'gate axes OVER their ceiling — zero is the only acceptable value', `${TSX} src/rules/index.ts | grep -c '^✗' || true`],
  ['atoms', 'folders under src/ carrying a SKILL.md', "find src -name SKILL.md | wc -l | tr -d ' '"],
  ['source-files', 'TypeScript files the gates judge', "find src -name '*.ts' -o -name '*.tsx' | wc -l | tr -d ' '"],
  ['mirror', 'assertions restating a literal their own module assigns — a proof that cannot fail', `${TSX} src/rules/mirror/index.ts | head -1 | grep -oE '^mirror — [0-9]+' | grep -oE '[0-9]+'`],
  ['forge', 'registered identifiers built from local randomness — zero is a theorem', `${TSX} src/rules/forge/index.ts | grep -oE '— [0-9]+ locally' | grep -oE '[0-9]+'`],
  ['probe', 'tests for a twinned filename that never name the twin', `${TSX} src/rules/probe/index.ts | head -1 | grep -oE '— [0-9]+ blind' | grep -oE '[0-9]+'`],
  ['command', 'paths named by something the repo RUNS that do not exist — zero is a theorem', `${TSX} src/rules/command/index.ts | head -1 | grep -oE '— [0-9]+ dead' | grep -oE '[0-9]+'`],
  ['drift', 'prose claims disagreeing with the matrix they restate — zero is a theorem', `${TSX} src/rules/drift/index.ts | head -1 | grep -oE '— [0-9]+ prose' | grep -oE '[0-9]+'`],
  ['dead-references', 'dead src/… pointers in prose and comments', `${TSX} src/rules/reference/index.ts | head -1 | grep -oE '— [0-9]+ dead' | grep -oE '[0-9]+'`],
  ['import-tangles', 'strongly connected components of the runtime import graph', `${TSX} src/rules/cycle/index.ts | head -1 | grep -oE '— [0-9]+ runtime' | grep -oE '[0-9]+'`],
  ['unraised-kinds', 'declared failure kinds nothing constructs — a check that cannot fire', `${TSX} src/rules/unraised/index.ts | head -1 | grep -oE '^[0-9]+'`],
  ['echo-paths', 'paths restating a meaning-word', `${TSX} src/rules/echo/index.ts | head -1 | grep -oE '— [0-9]+ path' | grep -oE '[0-9]+'`],
  ['boots', 'does the app boot at all — 231 collections or nothing', `${TSX} src/run/load/index.ts >/dev/null 2>&1 && echo OK || echo FAIL`],
] as const

/** What this corpus's figures are figures ABOUT — stated once, so no row carries the definition. */
const ERPAX_DEFINITION =
  'a gate is an executable law: a claim this corpus enforces by blocking its violation, never by asking for compliance'

/** Measure everything, now, and seal it. Values are RUN, never remembered. */
export function measureFace(cwd: string = process.cwd()): MetricFace {
  return sealFace(
    'erpax',
    ERPAX_DEFINITION,
    MEASURES.map(([key, claim, command]) => ({ key, claim, value: run(command, cwd) || 'FAIL: no output', command })),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const target = process.argv[2] ?? `${process.env.HOME ?? '.'}/.erpax/fusion/erpax.metrics.json`
  const face = measureFace()
  writeFileSync(target, `${JSON.stringify(face, null, 2)}\n`)
  const v = verifyFace(face)
  for (const r of face.rows) console.log(`${r.key.padEnd(18)} ${r.value}`)
  console.log(`\nwrote ${target}`)
  console.log(`root ${face.root} · rows ${v.rows} · self-verify ${v.ok ? 'ok' : 'FAILED'}`)
  console.log(`boundary: ${v.boundary}`)
}
