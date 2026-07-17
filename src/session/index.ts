/**
 * session — self-building and self-healing, automated by [[self]]/improve and MEASURED per session.
 *
 * The improvement loop is closed and local ([[self]]/improve); this atom is its meter. Every session does two
 * kinds of work on the corpus, and it reads both from the only honest record — the commits:
 *
 *   - SELF-BUILDING — new matter: atoms and proofs ADDED (git status `A`). The fold grows.
 *   - SELF-HEALING  — existing matter REPAIRED: proofs added beside old claims, dead refs fixed, entropy
 *                     removed (git status `M` / `D`). A gap closed, not a thing created.
 *
 * And it splits every session's work by WHERE the computation happened — the [[think]] axis:
 *
 *   - LOCAL  — the automated, in-tree computations: every file the gates verified, every seal, every test that
 *              ran without leaving the corpus. Deterministic, read-cheap, self-hosted.
 *   - REMOTE — the SEEDS: the irreducible novel reasoning, the oracle bit no address yet held, paid once per
 *              commit ([[think]].ceiling `s > 0`). One sealed intent, one seed.
 *
 * The magnitude is the session's self-sufficiency: `ceiling(seedFraction)` ([[think]]) — how much the corpus
 * did itself per remote seed. High magnitude ⇒ the session was mostly local: automated build/heal on top of a
 * few seeds. This is the same measure `think` uses for reasoning, turned on a session's own development work.
 *
 * Honest boundary: `local`/`remote` here are COUNTS derived from the commit record (files verified locally vs
 * commits as seeds), a faithful proxy — not an instruction-level tally of CPU. It measures the SHAPE of a
 * session (mostly-local self-improvement vs mostly-seed novelty), which is what "measured per session" asks;
 * it does not claim a wall-clock of every gate. The git reader is injected, so the measure is provable
 * hermetically and the same numbers come from a real repo or a fixture.
 *
 * Composes [[self]]/improve · [[think]] · [[leftover]] · [[accounting]] · [[law]].
 */
import { ceiling } from '@/think'

/** One commit's file record — added (self-building) vs modified/deleted (self-healing). */
export interface CommitRecord {
  readonly sha: string
  /** files ADDED (git `A`) — new matter, self-building. */
  readonly added: readonly string[]
  /** files MODIFIED (git `M`) — existing matter repaired, self-healing. */
  readonly modified: readonly string[]
  /** files DELETED (git `D`) — entropy removed, also self-healing. */
  readonly deleted?: readonly string[]
}

/** The per-session measure of self-building and self-healing, split by local vs remote computation. */
export interface SessionMeasure {
  /** sealed intents this session — one seed each (the remote count). */
  readonly commits: number
  /** new atom/proof files added — self-building. */
  readonly built: number
  /** existing files repaired or removed — self-healing. */
  readonly healed: number
  /** LOCAL computations: every file the gates verified in-tree (built + healed), automated and self-hosted. */
  readonly local: number
  /** REMOTE computations: the seeds — one per commit, the model price paid once ([[think]] `s > 0`). */
  readonly remote: number
  /** remote / (local + remote) — the fraction of the session that was irreducible seed. */
  readonly seedFraction: number
  /** the session's self-sufficiency — `ceiling(seedFraction)` ([[think]]): local work done per remote seed. */
  readonly magnitude: number
}

/**
 * Measure a session from its commit records — self-building, self-healing, and the local/remote split.
 *
 * @invariant local === built + healed — every touched file was verified locally by the gates
 * @invariant remote === commits — one seed per sealed intent
 * @invariant magnitude === think.ceiling(seedFraction) — the same self-sufficiency measure, per session
 */
export function measureSession(commits: readonly CommitRecord[]): SessionMeasure {
  let built = 0
  let healed = 0
  for (const c of commits) {
    built += c.added.length
    healed += c.modified.length + (c.deleted?.length ?? 0)
  }
  const local = built + healed
  const remote = commits.length
  const total = local + remote
  const seedFraction = total === 0 ? 1 : remote / total
  return { commits: remote, built, healed, local, remote, seedFraction, magnitude: ceiling(seedFraction) }
}

/** Parse `git log --name-status --pretty=format:%H` output into commit records — the CLI's real reader. */
export function parseGitLog(text: string): readonly CommitRecord[] {
  const commits: CommitRecord[] = []
  let cur: { sha: string; added: string[]; modified: string[]; deleted: string[] } | null = null
  for (const raw of text.split('\n')) {
    const line = raw.trimEnd()
    if (/^[0-9a-f]{7,40}$/.test(line)) {
      if (cur) commits.push(cur)
      cur = { sha: line, added: [], modified: [], deleted: [] }
    } else if (cur && line) {
      const [status, ...rest] = line.split('\t')
      const file = rest.join('\t')
      if (!file) continue
      if (status?.startsWith('A')) cur.added.push(file)
      else if (status?.startsWith('D')) cur.deleted.push(file)
      else if (status?.startsWith('M') || status?.startsWith('R')) cur.modified.push(file)
    }
  }
  if (cur) commits.push(cur)
  return commits
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const { execSync } = await import('node:child_process')
  const range = process.argv[2] ?? '@{u}..HEAD'
  let log = ''
  try {
    log = execSync(`git log ${range} --name-status --pretty=format:%H`, { encoding: 'utf8' })
  } catch {
    /* no upstream / not a repo */
  }
  const m = measureSession(parseGitLog(log))
  console.log(`session — self-building and self-healing, measured (${range}):\n`)
  console.log(`  commits (sealed intents)     ${m.commits}`)
  console.log(`  BUILT  (new atoms/proofs)    ${m.built}`)
  console.log(`  HEALED (repaired/removed)    ${m.healed}`)
  console.log(`  LOCAL  computations          ${m.local}`)
  console.log(`  REMOTE seeds                 ${m.remote}`)
  console.log(`  seed fraction                ${m.seedFraction.toFixed(3)}`)
  console.log(`  self-sufficiency magnitude   ${m.magnitude.toFixed(1)}×  (local work per remote seed)`)
}
