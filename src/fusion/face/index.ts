import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { collisionClasses } from '@/merge'

/**
 * fusion/face — what a repo OFFERS as knowledge, and the fold across several of them.
 *
 * A repo's face is the set of assertions it makes. erpax states each one explicitly, so the face
 * is PARSED (`**Law — [[law]]: …**`) and never authored: a manufactured claim is indistinguishable
 * from a real one once it is inside a collision class, and nothing downstream can tell them apart.
 *
 * The fold is @/merge's `collisionClasses` — same content ⇒ same address — so two repos stating
 * one law verbatim land in one class, and that class is the duplication.
 *
 * @see ./SKILL.md — including the near-duplicate pass, which was REFUTED by its own control.
 */

export interface FaceClaim {
  readonly repo: string
  readonly path: string
  readonly claim: string
  /** The repo a claim was ADOPTED from, when known. Absent means unknown, never "self". */
  readonly origin?: string
  readonly first_seen?: string
}

export interface FoldResult {
  readonly claims: number
  readonly malformed: number
  readonly byRepo: ReadonlyMap<string, number>
  readonly distinct: number
  /** Classes with more than one member, largest first. */
  readonly classes: readonly (readonly FaceClaim[])[]
  /** The subset of `classes` whose members span more than one repo. */
  readonly crossRepo: readonly (readonly FaceClaim[])[]
}

const LAW = /\*\*Law\s*—\s*\[\[law\]\]:\s*([\s\S]*?)\*\*/

/** Every law this repo states, read from the tree. Files stating none are skipped, not summarised. */
export function repoFace(repo: string, cwd: string = process.cwd()): FaceClaim[] {
  const out: FaceClaim[] = []
  const walk = (d: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(d, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue
      const p = join(d, e.name)
      if (e.isDirectory()) walk(p)
      else if (e.name === 'SKILL.md') {
        const m = LAW.exec(readFileSync(p, 'utf8'))
        const claim = m?.[1]?.replace(/\s+/g, ' ').replace(/\[\[([^\]]+)\]\]/g, '$1').trim()
        if (claim) out.push({ repo, path: relative(cwd, p), claim, origin: 'self' })
      }
    }
  }
  walk(join(cwd, 'src'))
  return out.sort((a, b) => a.path.localeCompare(b.path))
}

/** Faces dropped as JSONL by other repos. A line that does not parse is counted, never guessed at. */
export function loadFaces(dir: string): { rows: FaceClaim[]; malformed: number } {
  const rows: FaceClaim[] = []
  let malformed = 0
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.jsonl'))) {
    for (const line of readFileSync(join(dir, f), 'utf8').split('\n').filter(Boolean)) {
      try {
        const r = JSON.parse(line) as FaceClaim
        if (typeof r?.claim === 'string' && r.claim.trim() && typeof r.repo === 'string') rows.push(r)
        else malformed++
      } catch {
        malformed++
      }
    }
  }
  return { rows, malformed }
}

/** The fold. Identical claim ⇒ identical address ⇒ one class; a class spanning repos is the find. */
export function foldFaces(rows: readonly FaceClaim[], malformed = 0): FoldResult {
  const byRepo = new Map<string, number>()
  for (const r of rows) byRepo.set(r.repo, (byRepo.get(r.repo) ?? 0) + 1)

  const byClaim = new Map<string, FaceClaim[]>()
  for (const r of rows) byClaim.set(r.claim, [...(byClaim.get(r.claim) ?? []), r])

  const classes = [...byClaim.values()].filter((v) => v.length > 1).sort((a, b) => b.length - a.length)
  const addressed = collisionClasses(rows.map((r) => r.claim)) as { distinct: number }

  return {
    claims: rows.length,
    malformed,
    byRepo,
    distinct: addressed.distinct,
    classes,
    crossRepo: classes.filter((c) => new Set(c.map((m) => m.repo)).size > 1),
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dir = process.argv[2] ?? `${process.env.HOME}/.erpax/fusion`
  const { rows, malformed } = loadFaces(dir)
  const f = foldFaces(rows, malformed)
  console.log(`claims ${f.claims} · malformed ${f.malformed} · distinct ${f.distinct} · repos ${f.byRepo.size}`)
  for (const [k, v] of [...f.byRepo].sort((a, b) => b[1] - a[1])) console.log(`   ${String(v).padStart(5)}  ${k}`)
  console.log(`classes ${f.classes.length} · CROSS-REPO ${f.crossRepo.length}`)
  for (const c of f.crossRepo.slice(0, 20)) {
    console.log(`\n  ×${c.length}  ${[...new Set(c.map((m) => m.repo))].join(' + ')}`)
    console.log(`      ${c[0]!.claim.slice(0, 130)}`)
    for (const m of c) console.log(`        ${m.repo}  ${m.path}${m.origin && m.origin !== 'self' ? `  (adopted from ${m.origin})` : ''}`)
  }
}
