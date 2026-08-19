import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, dirname, posix } from 'node:path'
import { importSpecifiersOf } from '@/syntax'
import type { ScalpelOp } from '@/scalpel'
/**
 * rules/hyphen — the hyphen campaign, computed as a MANIFEST instead of swept.
 *
 * 365 `.ts`/`.tsx` stems still carry a hyphen ([[rules]] `alphanumeric-name`). Doing
 * that by hand is the corpus's own documented failure: a mass edit with no manifest
 * is a sweep ([[rules]]/manifest, threshold 8), and a hand-rolled regex sweep already
 * cost this session a dynamic `await import('./x')` that only `tsc` caught.
 *
 * So this atom is the READ-ONLY RESEARCHER of [[scalpel]]: it computes ops and writes
 * nothing. The split it computes is the honest part —
 *
 *   VIABLE   the stem repeats a word its own PATH already says, and removing it
 *            leaves exactly one word. `ai/ai-security.ts` → `ai/security.ts`. The
 *            path is the message and the word was said twice ([[rules]]/echo), so the
 *            rename is mechanical AND correct. No new atom, no SKILL to invent.
 *   NESTING  more than one word survives (`agent/cost-policy.ts`). The lawful form is
 *            a child atom, which needs a SKILL.md stating what it is — a JUDGEMENT.
 *            Generating 300 of those mechanically would be prose with no proof behind
 *            it, which is exactly what [[rules]]/prose refuses. NOT swept here.
 *
 * Specifiers are PARSED (`importSpecifiersOf` — declarations, re-exports AND dynamic
 * `import()`), never pattern-matched: the regex that missed a dynamic import is why
 * this exists at all.
 *
 * @see ../../scalpel · ./test.ts · ../SKILL.md
 */

const SRC = 'src'
const CODE = /\.(ts|tsx)$/
const SKIP_DIR = new Set(['node_modules', 'app', 'migrations'])
/** Machine-written faces — an emitter hardcodes their path, so a rename needs the emitter too. */
const GENERATED = /\.generated\.tsx?$/i

export interface HyphenRename {
  /** repo-relative, e.g. `src/ai/ai-security.ts` */
  readonly from: string
  readonly to: string
  /** the single word that survives — the stem the path did not already say */
  readonly word: string
}

const walk = (dir: string, out: string[] = []): string[] => {
  for (const e of readdirSync(dir).sort()) {
    if (e.startsWith('.') || SKIP_DIR.has(e)) continue
    const p = join(dir, e)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (CODE.test(e)) out.push(p)
  }
  return out
}

/** Every code file under src, repo-relative with forward slashes. */
export function codeFiles(cwd: string = process.cwd()): string[] {
  const root = join(cwd, SRC)
  if (!existsSync(root)) return []
  return walk(root).map((p) => p.slice(cwd.length + 1).split('\\').join('/'))
}

/**
 * The renames the path itself justifies: strip every stem word the file's own
 * directories already say, and take it only when EXACTLY ONE word survives and the
 * target is free. Anything else needs a human ([[rules]]/echo is a judgement call).
 */
export function viableRenames(cwd: string = process.cwd()): HyphenRename[] {
  const out: HyphenRename[] = []
  for (const file of codeFiles(cwd)) {
    const base = file.slice(file.lastIndexOf('/') + 1)
    const isTest = /\.test\.tsx?$/.test(base)
    const ext = base.endsWith('.tsx') ? '.tsx' : '.ts'
    const stem = base.replace(/\.test\.tsx?$/, '').replace(/\.tsx?$/, '')
    if (/^[a-z0-9]+$/.test(stem)) continue
    const dir = file.slice(0, file.lastIndexOf('/'))
    const segs = new Set(dir.split('/'))
    const kept = stem.split(/[-.]/).filter((w) => w && !segs.has(w))
    if (kept.length !== 1) continue
    const word = kept[0]!
    if (!/^[a-z0-9]+$/.test(word)) continue
    const to = `${dir}/${word}${isTest ? '.test' : ''}${ext}`
    if (to === file || existsSync(join(cwd, to))) continue
    out.push({ from: file, to, word })
  }
  return out
}

/**
 * Cluster renames — the SECOND lawful class, and the last mechanical one.
 *
 * When two or more hyphenated siblings share a leading word, that word names a REAL
 * grouping (`rfc/9110/get-document` · `get-globals` · `get-redirects` → `get/`), so
 * the folder is discovered rather than invented and one authored SKILL covers it.
 *
 * Restricted to FLAT clusters — every member must have exactly one word left after
 * the shared one. A deeper member would need intermediate folders that no measurement
 * justifies, and inventing those is the theatre this atom refuses. Measured on the
 * live corpus: 214 first-level folders are proposable, only 21 are shared at all, and
 * only 7 are flat. That ratio IS the finding — the hyphen campaign is mostly
 * per-file judgement, not a sweep.
 */
export function clusterRenames(cwd: string = process.cwd()): HyphenRename[] {
  interface Cell { readonly rest: string; readonly file: string; readonly isTest: boolean; readonly ext: string }
  const clusters = new Map<string, Cell[]>()
  for (const file of codeFiles(cwd)) {
    const base = file.slice(file.lastIndexOf('/') + 1)
    const isTest = /\.test\.tsx?$/.test(base)
    const ext = base.endsWith('.tsx') ? '.tsx' : '.ts'
    const stem = base.replace(/\.test\.tsx?$/, '').replace(/\.tsx?$/, '')
    if (/^[a-z0-9]+$/.test(stem)) continue
    // A GENERATED file is written by an emitter to a path assembled from string
    // fragments (`join(cwd,'src','law','folder','ratchet.generated.ts')`), which no
    // import rewrite can see — moving it would leave the emitter recreating the old
    // path and two divergent copies. The emitter must change in the same diff, and
    // that is a human's call.
    if (GENERATED.test(base)) continue
    const dir = file.slice(0, file.lastIndexOf('/'))
    const segs = new Set(dir.split('/'))
    const kept = stem.split(/[-.]/).filter((w) => w && !segs.has(w))
    if (kept.length < 2) continue
    if (!kept.every((w) => /^[a-z0-9]+$/.test(w))) continue
    const key = `${dir}/${kept[0]}`
    // A member with MORE than one surviving word is recorded with an empty rest so the
    // cluster can be disqualified below — it would need intermediate folders.
    clusters.set(key, [...(clusters.get(key) ?? []), { rest: kept.length === 2 ? kept[1]! : '', file, isTest, ext }])
  }
  const out: HyphenRename[] = []
  for (const [key, cells] of clusters) {
    // NEVER half-migrate a cluster. If any sibling sharing this prefix is deep, moving
    // only the flat ones leaves the rest behind AND mints a folder covering part of a
    // concept — worse than leaving the whole cluster for a human.
    if (cells.some((c) => c.rest === '')) continue
    if (new Set(cells.map((c) => c.rest)).size < 2) continue // one member ⇒ an invented folder
    for (const c of cells) {
      const to = `${key}/${c.rest}${c.isTest ? '.test' : ''}${c.ext}`
      if (to === c.file || existsSync(join(cwd, to))) continue
      out.push({ from: c.file, to, word: c.rest })
    }
  }
  return out
}

/** Resolve an import specifier to the repo-relative file it names, or undefined. */
export function resolveSpec(fromFile: string, spec: string, cwd: string = process.cwd()): string | undefined {
  let base: string
  if (spec.startsWith('@/')) base = `${SRC}/${spec.slice(2)}`
  else if (spec.startsWith('.')) base = posix.normalize(posix.join(dirname(fromFile), spec))
  else return undefined
  // TypeScript's own convention: a `.ts` source is imported under its EMITTED name
  // (`./x.js`). Without this the resolver reports a phantom dangle — and a phantom in
  // the ring's baseline silently grants one free REAL dangle, because the ring compares
  // against a count rather than a set.
  const jsAsTs = base.replace(/\.(js|jsx|mjs|cjs)$/, '')
  const candidates =
    jsAsTs === base
      ? [base, `${base}.ts`, `${base}.tsx`, `${base}/index.ts`, `${base}/index.tsx`]
      : [`${jsAsTs}.ts`, `${jsAsTs}.tsx`, base, `${jsAsTs}/index.ts`, `${jsAsTs}/index.tsx`]
  for (const c of candidates) {
    if (existsSync(join(cwd, c)) && statSync(join(cwd, c)).isFile()) return c
  }
  return undefined
}

/**
 * Re-express `target` as a specifier of the same FORM the author used.
 *
 * Deriving this from the destination PATH is the only correct way. An earlier version
 * spliced the surviving word into the old specifier — which is right only when the
 * file stays in its directory. A cluster rename moves it INTO a folder, so
 * `@/law/folder/ratchet-compute` had to become `@/law/folder/ratchet/compute` and the
 * splice produced `@/law/folder/compute`, a path nobody has. The ring reddened the
 * whole batch and rolled back to the byte, which is how this was caught.
 */
export function specFor(fromFile: string, target: string, alias: boolean): string {
  const bare = target.replace(/\.tsx?$/, '').replace(/\/index$/, '')
  if (alias) return `@/${bare.replace(/^src\//, '')}`
  let rel = posix.relative(dirname(fromFile), bare)
  if (!rel.startsWith('.')) rel = `./${rel}`
  return rel
}

const stemOf = (path: string): string =>
  path.slice(path.lastIndexOf('/') + 1).replace(/\.test\.tsx?$/, '').replace(/\.tsx?$/, '')

/**
 * The scalpel manifest: one op per import specifier that names a renamed file.
 *
 * The op's `find` is the QUOTED specifier, so it is anchored to real syntax rather
 * than a bare word that could appear in prose — and the scalpel refuses it anyway if
 * it does not match exactly once.
 */
export function renameManifest(
  renames: readonly HyphenRename[],
  cwd: string = process.cwd(),
): ScalpelOp[] {
  const byFrom = new Map(renames.map((r) => [r.from, r]))
  const ops: ScalpelOp[] = []
  for (const file of codeFiles(cwd)) {
    let text: string
    try {
      text = readFileSync(join(cwd, file), 'utf8')
    } catch {
      continue
    }
    const lines = text.split('\n')
    const specs = new Set(importSpecifiersOf(file, text))
    const emitted = new Set<string>()
    for (const spec of specs) {
      const target = resolveSpec(file, spec, cwd)
      if (!target) continue
      const r = byFrom.get(target)
      if (!r) continue
      // The importer may ALSO be moving in this batch — express the new specifier
      // from where the importer lands, not from where it sits now.
      const importerAfter = byFrom.get(file)?.to ?? file
      const nextSpec = specFor(importerAfter, r.to, spec.startsWith('@/'))
      if (nextSpec === spec) continue

      // The bare specifier is NOT a safe `find`: the same module is commonly both
      // imported and re-exported, so `'./x'` matches twice and the scalpel refuses
      // (correctly). Anchor on the whole LINE — an import line and an export line
      // differ, so each cut is unique, and a line that genuinely repeats still refuses.
      for (const line of lines) {
        if (!line.includes(`'${spec}'`)) continue
        const key = line
        if (emitted.has(key)) continue
        emitted.add(key)
        ops.push({
          file,
          find: line,
          replace: line.split(`'${spec}'`).join(`'${nextSpec}'`),
          reason: `${target} → ${r.to} — specifier re-expressed from the destination path`,
        })
      }
    }
  }
  return ops
}

/**
 * Ops for the specifiers INSIDE a moved file whose depth changed.
 *
 * The first campaign renamed within one directory (`ai/ai-security.ts` →
 * `ai/security.ts`), so a moved file's own `./x` still resolved. A CLUSTER rename
 * moves the file DOWN a level, and every relative specifier it carries must gain a
 * `../` or it dangles. The ring caught this by reddening a whole batch and rolling
 * back to the byte — which is the argument for having a ring at all.
 *
 * Alias (`@/…`) specifiers are depth-independent and are left alone.
 */
export function depthManifest(
  renames: readonly HyphenRename[],
  cwd: string = process.cwd(),
): ScalpelOp[] {
  const ops: ScalpelOp[] = []
  for (const r of renames) {
    const fromDir = dirname(r.from)
    const toDir = dirname(r.to)
    if (fromDir === toDir) continue
    let text: string
    try {
      text = readFileSync(join(cwd, r.from), 'utf8')
    } catch {
      continue
    }
    const lines = text.split('\n')
    const emitted = new Set<string>()
    for (const spec of new Set(importSpecifiersOf(r.from, text))) {
      if (!spec.startsWith('.')) continue
      const target = resolveSpec(r.from, spec, cwd)
      if (!target) continue
      // Re-express the SAME target from the new directory.
      const next = specFor(r.to, target, false)
      if (next === spec) continue
      for (const line of lines) {
        if (!line.includes(`'${spec}'`) || emitted.has(line)) continue
        emitted.add(line)
        ops.push({
          file: r.to, // the op lands AFTER the move
          find: line,
          replace: line.split(`'${spec}'`).join(`'${next}'`),
          reason: `${r.from} moved to ${r.to}; "${spec}" must be re-expressed from the new depth`,
        })
      }
    }
  }
  return ops
}

/** Every `@/` or relative specifier in src resolves — the ring a batch is verified by. */
export function danglingSpecifiers(cwd: string = process.cwd()): string[] {
  const bad: string[] = []
  for (const file of codeFiles(cwd)) {
    let text: string
    try {
      text = readFileSync(join(cwd, file), 'utf8')
    } catch {
      continue
    }
    for (const spec of importSpecifiersOf(file, text)) {
      if (!spec.startsWith('@/') && !spec.startsWith('.')) continue
      if (!resolveSpec(file, spec, cwd)) bad.push(`${file} → ${spec}`)
    }
  }
  return bad
}

/**
 * Execute the campaign in ring-verified batches.
 *
 * A rename is TWO cuts that must land together: the file moves, and every specifier
 * naming it is rewritten. Batching them separately would leave the tree dangling
 * between batches and the ring would redden on work that is merely half-done — so a
 * batch is a set of RENAMES, and after each one the whole tree is consistent again.
 *
 * The ring is `danglingSpecifiers` against the count that existed BEFORE the run:
 * the corpus already carries 2, and a gate that demands someone else's pre-existing
 * debt be fixed first is a gate nobody can run.
 *
 * `apply: false` (the default) is the contract — nothing is touched and every op is
 * still planned, so refusals surface before a byte moves ([[scalpel]]).
 */
export interface HyphenRunResult {
  readonly batches: readonly {
    readonly batch: number
    readonly renames: readonly HyphenRename[]
    readonly ops: number
    readonly applied: number
    readonly verified: boolean
  }[]
  readonly complete: boolean
  readonly refused: readonly string[]
}

export async function runHyphenCampaign(opts: {
  readonly cwd?: string
  readonly apply?: boolean
  readonly batchSize?: number
  readonly renames?: readonly HyphenRename[]
} = {}): Promise<HyphenRunResult> {
  const cwd = opts.cwd ?? process.cwd()
  const { planScalpel, applyScalpel } = await import('@/scalpel')
  const { renameSync } = await import('node:fs')
  const candidates = opts.renames ?? viableRenames(cwd)
  const size = Math.max(1, opts.batchSize ?? 30)

  // A rename is only in the run if EVERY op it needs cuts cleanly. If one specifier
  // sits on a line that occurs twice, the scalpel refuses it — and moving the file
  // anyway would leave that importer dangling. So the whole rename is withheld and
  // NAMED, never forced: unique-match-or-refuse applied to the campaign, not just
  // the op ([[scalpel]]).
  const withheld: string[] = []
  const all = candidates.filter((r) => {
    const bad = planScalpel(renameManifest([r], cwd), cwd).verdicts.filter((v) => v.state !== 'cuts')
    if (bad.length === 0) return true
    withheld.push(`${r.from} — ${bad.length} op(s) refuse (${bad[0]!.state}); needs a human`)
    return false
  })
  const ringBaseline = danglingSpecifiers(cwd).length

  const batches: Array<HyphenRunResult['batches'][number]> = []
  const refused: string[] = [...withheld]
  let complete = true

  for (let b = 0; b * size < all.length; b++) {
    const slice = all.slice(b * size, (b + 1) * size)
    const moved = new Map(slice.map((r) => [r.from, r.to]))
    const ops = [
      ...renameManifest(slice, cwd).map((op) => ({
        ...op,
        // An op's own file may itself be moving in this batch — aim at where it lands.
        file: moved.get(op.file) ?? op.file,
      })),
      // …and the moved file's OWN relative specifiers, re-expressed from the new depth.
      ...depthManifest(slice, cwd),
    ]

    if (!opts.apply) {
      // Plan against the CURRENT tree: ops on files that are about to move read as
      // missing, which is expected in a dry run and reported rather than hidden.
      const plan = planScalpel(renameManifest(slice, cwd), cwd)
      for (const v of plan.verdicts) if (v.state !== 'cuts') refused.push(`${v.state}: ${v.op.file} ${v.op.find}`)
      batches.push({ batch: b, renames: slice, ops: ops.length, applied: 0, verified: false })
      continue
    }

    for (const r of slice) renameSync(join(cwd, r.from), join(cwd, r.to))
    const res = applyScalpel(ops, {
      cwd,
      apply: true,
      batchSize: Number.MAX_SAFE_INTEGER, // the batch boundary is the RENAME set, not the file set
      verify: () => danglingSpecifiers(cwd).length <= ringBaseline,
    })
    const verified = res.batches.every((x) => x.verified)
    if (!verified) {
      for (const r of slice) renameSync(join(cwd, r.to), join(cwd, r.from)) // undo the moves too
      complete = false
      batches.push({ batch: b, renames: slice, ops: ops.length, applied: 0, verified: false })
      break
    }
    for (const v of res.plan.verdicts) if (v.state !== 'cuts') refused.push(`${v.state}: ${v.op.file} ${v.op.find}`)
    batches.push({ batch: b, renames: slice, ops: ops.length, applied: res.batches.reduce((s, x) => s + x.applied, 0), verified: true })
  }
  return { batches, complete, refused }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  // An async IIFE, NOT top-level await: a top-level await here compiles away
  // under a CJS transform and makes the whole module un-importable — which broke
  // every `tsx -e` that merely wanted to READ the manifest.
  void (async () => {
  const apply = process.argv.includes('--apply')
  const renames = viableRenames()
  console.log(`hyphen — ${renames.length} viable rename(s); dry-run is the default\n`)
  const res = await runHyphenCampaign({ apply })
  for (const b of res.batches) {
    console.log(`  batch ${b.batch}: ${b.renames.length} rename(s) · ${b.ops} import op(s)` + (apply ? ` · applied ${b.applied} · ${b.verified ? 'ring GREEN' : 'ring RED — rolled back'}` : ''))
  }
  if (res.refused.length) {
    console.log(`\n  ${res.refused.length} refusal(s):`)
    for (const r of res.refused.slice(0, 10)) console.log(`    ${r}`)
  }
  console.log(apply ? `\n${res.complete ? '✓ campaign complete' : '✗ a batch reddened — rolled back to the byte'}` : `\n(dry-run) — \`tsx src/rules/hyphen/index.ts --apply\` to cut.`)
  process.exit(res.complete || !apply ? 0 : 1)
  })()
}
