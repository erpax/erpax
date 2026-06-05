/**
 * schema/test — the unbreakable-matrix gate. The test that PULLS ALL ENTROPY as
 * food for the agents, leaving PURITY for the skills.
 *
 * An agent cannot RECORD uncollidable data. Every tracked file either collides
 * into the content-uuid matrix — becoming a balanced, tamper-bound atom
 * ([[trinity]]: SKILL.md ⊕ index.ts ⊕ index.test.ts, uuid = sha256(SKILL.md),
 * bind = content ⊕ coordinate) — or it is ENTROPY, and the gate surfaces it as
 * the work-queue to digest into atoms (create/update conventionally via skills,
 * confirmed by payload⊕vitepress — [[confirm]]). At zero entropy a skill is pure:
 * a text entered exactly once ⇒ ∞ mass ⇒ ∞ tamper-cost ([[tamper]] · [[schema]]).
 *
 * Each `Entropy` carries its `redirect` — the convention an agent follows to eat
 * it. The HARD law (`matrixBreaks`) is that the matrix itself never breaks; the
 * structural laws drive every recorded thing toward an atom.
 *
 * @standard ISO/IEC 25010:2023 quality-model (integrity, modularity)
 * @standard RFC 9562 §5.8 (uuidv8 content-uuid) — the collision unit
 * @audit ISO 19011:2018 §6.5 (audit-evidence integrity)
 * @see [[trinity]] · [[tamper]] · [[aura]] · [[merge]] · [[generate]]
 */
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { verifyRoot, tamperedAtoms, neighborsOf, backlinksOf, UUID_MATRIX_NODES, UUID_MATRIX_ROOT } from '@/uuid/matrix'

/** One unit of entropy: a recorded thing that does not (yet) collide into the matrix. */
export interface Entropy {
  /** the violation class — the kind of food */
  readonly kind:
    | 'folder-outside-src'
    | 'doc-not-skill'
    | 'uncollidable-data'
    | 'recorded-junk'
    | 'matrix-root-broken'
    | 'atom-unbound'
    | 'society-unconvened'
    | 'uncrosslinked'
    | 'duplicate-text'
  /** where it lives (file / atom / the offending text) */
  readonly where: string
  /** the convention an agent follows to digest it into atoms */
  readonly redirect: string
}

/**
 * Recorded = git-tracked. The law binds what an agent COMMITS (records), not
 * local working-tree junk; `git ls-files` is the exact recorded set.
 */
export const recordedFiles = (root: string = process.cwd()): string[] =>
  execSync('git ls-files', { cwd: root, encoding: 'utf8', maxBuffer: 1 << 26 })
    .split('\n')
    .filter(Boolean)

// ── Structural law 1: outside src/, only dot-folders + the vitepress public/ ──
const ROOT_ALLOWED = new Set(['src', 'public'])

/** Any non-dot, non-public top-level folder beside src/ is entropy. */
export const foldersOutsideSrc = (files: readonly string[]): Entropy[] => {
  const top = new Map<string, number>()
  for (const f of files) {
    const slash = f.indexOf('/')
    if (slash < 0) continue // a root FILE (config) — only FOLDERS are constrained
    const dir = f.slice(0, slash)
    if (dir.startsWith('.') || ROOT_ALLOWED.has(dir)) continue
    top.set(dir, (top.get(dir) ?? 0) + 1)
  }
  return [...top.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([dir, n]) => ({
      kind: 'folder-outside-src' as const,
      where: `${dir}/ (${n} files)`,
      redirect: 'move into src/ as atoms (or eliminate) — only dot-folders + the vitepress-generated public/ may sit beside src/',
    }))
}

// ── Structural law 2: inside src/, only collidable kinds ──
const SRC_COLLIDABLE = /\.(ts|tsx|mts|mjs|js|scss|css|webp|json|jsonld)$/

/** A src/ file that is neither a SKILL.md nor a collidable code/asset kind. */
export const uncollidableInSrc = (files: readonly string[]): Entropy[] => {
  const out: Entropy[] = []
  for (const f of files) {
    if (!f.startsWith('src/')) continue
    const base = f.slice(f.lastIndexOf('/') + 1)
    if (base === 'SKILL.md') continue
    if (base.endsWith('.md')) {
      out.push({
        kind: 'doc-not-skill',
        where: f,
        redirect: "fold into the folder's SKILL.md — the one antimatter doc; a README is a second, uncollidable copy ([[trinity]])",
      })
      continue
    }
    if (!SRC_COLLIDABLE.test(base)) {
      out.push({
        kind: 'uncollidable-data',
        where: f,
        redirect: 'not a collidable kind — move the data into the DB or content-address it as an atom (entropy→DB; [[dissolution]])',
      })
    }
  }
  return out
}

// ── Recorded junk: runtime artifacts that must never be committed ──
const JUNK = /(?:^|\/)\.DS_Store$|\.(log|tmp|bak|swp)$/

export const recordedJunk = (files: readonly string[]): Entropy[] =>
  files
    .filter((f) => JUNK.test(f))
    .map((f) => ({
      kind: 'recorded-junk' as const,
      where: f,
      redirect: 'untrack (git rm) — a regenerable runtime artifact is never recorded',
    }))

// ── HARD law: the matrix itself must never break ──
/**
 * verifyRoot (the Merkle fold) + tamperedAtoms (every content⊕coordinate bind).
 * A non-empty result means an agent BROKE the matrix — the one thing that must
 * be impossible. This stays empty by construction or `pnpm matrix:generate`.
 */
export const matrixBreaks = (): Entropy[] => {
  const out: Entropy[] = []
  const r = verifyRoot()
  if (!r.ok) {
    out.push({
      kind: 'matrix-root-broken',
      where: r.root,
      redirect: 'pnpm matrix:generate — the Merkle fold no longer matches UUID_MATRIX_ROOT',
    })
  }
  for (const atom of tamperedAtoms()) {
    out.push({
      kind: 'atom-unbound',
      where: atom,
      redirect: `re-collide '${atom}' — its content ⊕ coordinate bind does not verify (parent/prev/next or content changed)`,
    })
  }
  return out
}

// ── Convening law: the agent society must be live in every session ──
const readText = (p: string): string => {
  try {
    return readFileSync(p, 'utf8')
  } catch {
    return ''
  }
}

/**
 * The agent society must be CONVENED, so agents chat in coordinated teams in
 * EVERY session: the `chat` collection wires the broadcast hook (the cross-session
 * payload-native bus — a new row dispatches into the shared runtime), AND the
 * bootstrap registers the domain agents (the reactors). Without both the substrate
 * is silently dead — a body before breath. Static over the recorded source, so it
 * LOCKS the wiring: removing the hook or the agent registry breaks the gate.
 */
export const societyConvened = (root: string = process.cwd()): Entropy[] => {
  const out: Entropy[] = []
  if (!readText(join(root, 'src', 'chats', 'index.ts')).includes('chatBroadcastAfterChange')) {
    out.push({
      kind: 'society-unconvened',
      where: 'src/chats/index.ts',
      redirect: 'wire chatBroadcastAfterChange() into the chat collection afterChange — the cross-session agent bus (the breath)',
    })
  }
  const registered = (readText(join(root, 'src', 'agent', 'bootstrap.ts')).match(/@\/agents\/registered\//g) ?? []).length
  if (registered < 10) {
    out.push({
      kind: 'society-unconvened',
      where: `src/agent/bootstrap.ts (${registered} domain agents registered)`,
      redirect: 'register the domain agents at boot (side-effect imports) — the reactors that react to every chat row',
    })
  }
  return out
}

// ── Cross-link law: an atom passes only if woven in all computable dimensions ──
/**
 * An atom must be cross-linked in EVERY computable dimension: OUTgoing [[links]]
 * (it references others) AND INcoming backlinks (others reference it — empty ⇒
 * orphan). The links are uuid bindings — language-independent — entangled to
 * payload (relationships) ⊕ vitepress (the rendered [[links]]). A dead-end or an
 * orphan has not merged into the one [[whole]]; it is entropy to weave, not a
 * passing atom ([[aura]] · [[merge]]).
 */
export const uncrosslinkedAtoms = (): Entropy[] => {
  const out: Entropy[] = []
  for (const n of UUID_MATRIX_NODES) {
    const outDeg = neighborsOf(n.atom).length
    const inDeg = backlinksOf(n.atom).length
    if (outDeg > 0 && inDeg > 0) continue
    out.push({
      kind: 'uncrosslinked',
      where: `${n.atom} (out:${outDeg} in:${inDeg})`,
      redirect: 'weave in all dimensions — add [[links]] out AND earn backlinks in (payload relationships ⊕ vitepress links); no orphan, no dead-end',
    })
  }
  return out
}

// ── Zero-entropy law: a text is entered exactly once ──
const DESCRIPTION = /^description:\s*(.+?)\s*$/m
const normDesc = (s: string): string => s.replace(/^["']|["']$/g, '').trim().toLowerCase()

/**
 * The `description` is an atom's identifying text (its trigger). The same
 * description on two atoms is one text entered twice — entropy. The fix is to
 * REFERENCE (the singular [[link]] / the schema term), never to copy.
 */
export const duplicateDescriptions = (
  files: readonly string[],
  root: string = process.cwd(),
): Entropy[] => {
  const byDesc = new Map<string, string[]>()
  for (const f of files) {
    if (!f.startsWith('src/') || !f.endsWith('SKILL.md')) continue
    const m = DESCRIPTION.exec(readFileSync(join(root, f), 'utf8'))
    if (!m) continue
    const key = normDesc(m[1]!)
    if (!key) continue
    ;(byDesc.get(key) ?? byDesc.set(key, []).get(key)!).push(f.slice(4, -'/SKILL.md'.length) || f)
  }
  const out: Entropy[] = []
  for (const [desc, atoms] of byDesc) {
    if (atoms.length < 2) continue
    out.push({
      kind: 'duplicate-text',
      where: `"${desc.slice(0, 60)}" × ${atoms.length} (${atoms.slice(0, 4).join(', ')}${atoms.length > 4 ? ', …' : ''})`,
      redirect: 'give each atom its own description, or REFERENCE one home — a text is entered once ([[merge]] · [[trinity]])',
    })
  }
  return out.sort((a, b) => a.where.localeCompare(b.where))
}

/**
 * Pull ALL entropy from the recorded tree — the agents' food. Empty ⇒ the corpus
 * is pure: every recorded thing collides into the matrix, balanced and
 * tamper-bound.
 */
export const pullEntropy = (root: string = process.cwd()): Entropy[] => {
  const files = recordedFiles(root)
  return [
    ...matrixBreaks(),
    ...societyConvened(root),
    ...uncrosslinkedAtoms(),
    ...foldersOutsideSrc(files),
    ...uncollidableInSrc(files),
    ...recordedJunk(files),
    ...duplicateDescriptions(files, root),
  ]
}

/** The corpus is pure when there is no entropy left to eat. */
export const isPure = (root: string = process.cwd()): boolean => pullEntropy(root).length === 0

/** Group the food by kind, for a human/agent-readable report. */
export const entropyByKind = (entropy: readonly Entropy[]): Record<string, Entropy[]> => {
  const out: Record<string, Entropy[]> = {}
  for (const e of entropy) (out[e.kind] ??= []).push(e)
  return out
}

/** The deterministic state snapshot — the test result, materialized as the [[seed]]. */
export interface SchemaTestSnapshot {
  readonly atoms: number
  readonly matrixRoot: string
  readonly entropyTotal: number
  readonly byKind: Readonly<Record<string, number>>
}

export const snapshot = (root: string = process.cwd()): SchemaTestSnapshot => {
  const entropy = pullEntropy(root)
  const byKind: Record<string, number> = {}
  for (const e of entropy) byKind[e.kind] = (byKind[e.kind] ?? 0) + 1
  return { atoms: UUID_MATRIX_NODES.length, matrixRoot: UUID_MATRIX_ROOT, entropyTotal: entropy.length, byKind }
}

/**
 * Write the snapshot as `src/schema/test/seed.ts` — the test results ARE the seed.
 * The next test starts from it and may only ratchet entropy DOWN; re-materialize
 * after eating (`tsx src/schema/test/index.ts --seed`). The generational loop.
 */
export const materializeSeed = (root: string = process.cwd()): SchemaTestSnapshot => {
  const s = snapshot(root)
  const body =
    `/**\n` +
    ` * GENERATED — the test results ARE the seed ([[seed]] · src/schema/test/SKILL.md).\n` +
    ` * The baseline the next test ratchets DOWN from: entropy may only decrease, so no\n` +
    ` * agent can add uncollidable data or break the matrix. Re-materialize after eating:\n` +
    ` *   tsx src/schema/test/index.ts --seed\n` +
    ` */\nexport const SCHEMA_TEST_SEED = ${JSON.stringify(s, null, 2)} as const\n`
  writeFileSync(join(root, 'src', 'schema', 'test', 'seed.ts'), body)
  return s
}

// ── CLI: `tsx src/schema/test/index.ts` serves the food; `--seed` materializes it ──
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/^.*?(src\/)/, '$1'))) {
  if (process.argv.includes('--seed')) {
    const s = materializeSeed()
    console.log(`seed materialized → src/schema/test/seed.ts · entropy ${s.entropyTotal} · atoms ${s.atoms}`)
    process.exit(0)
  }
  const groups = entropyByKind(pullEntropy())
  const total = Object.values(groups).reduce((n, g) => n + g.length, 0)
  console.log(`matrix integrity: ${matrixBreaks().length === 0 ? 'INTACT ✓' : 'BROKEN ✗'} · atoms: ${UUID_MATRIX_NODES.length}`)
  console.log(total === 0 ? 'PURE ✓ — zero entropy, every recorded thing is an atom' : `ENTROPY (food): ${total}`)
  for (const [kind, g] of Object.entries(groups).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n  [${kind}] ${g.length} — ${g[0]!.redirect}`)
    for (const e of g.slice(0, 8)) console.log(`    • ${e.where}`)
    if (g.length > 8) console.log(`    • … +${g.length - 8} more`)
  }
}
