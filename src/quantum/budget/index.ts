import { existsSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { MAX_AGENT_SKILL_CONTEXT_BYTES } from '@/agent/skill-context'

/**
 * quantum/budget — what the corpus costs an agent per turn, measured.
 *
 * @see ./SKILL.md
 */

/** Bytes per token, for turning a file size into the figure that is actually billed. */
const BYTES_PER_TOKEN = 4

export interface FaceCost {
  readonly atoms: number
  /** Bytes by face name, so the expensive one is named rather than averaged away. */
  readonly bytes: Readonly<Record<string, number>>
  readonly totalBytes: number
  readonly totalTokens: number
}

export interface SkillWeight {
  readonly atom: string
  readonly bytes: number
}

/** Every atom that carries a SKILL, with the bytes of each face it offers. */
export function faceCost(
  cwd: string = process.cwd(),
  faces: readonly string[] = ['SKILL.md', 'LLM.md', 'README.md'],
): FaceCost {
  const src = join(cwd, 'src')
  const bytes: Record<string, number> = Object.fromEntries(faces.map((f) => [f, 0]))
  let atoms = 0
  const walk = (d: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(d, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (!e.isDirectory() || e.name.startsWith('.') || e.name === 'node_modules') continue
      const p = join(d, e.name)
      if (existsSync(join(p, 'SKILL.md'))) {
        atoms++
        for (const f of faces) {
          try {
            bytes[f]! += statSync(join(p, f)).size
          } catch {
            /* a face that is not materialised costs nothing */
          }
        }
      }
      walk(p)
    }
  }
  walk(src)
  const totalBytes = Object.values(bytes).reduce((a, b) => a + b, 0)
  return { atoms, bytes, totalBytes, totalTokens: totalBytes / BYTES_PER_TOKEN }
}

/** The SKILL faces, heaviest first — the orientation an agent is actually handed. */
export function skillWeights(cwd: string = process.cwd()): SkillWeight[] {
  const src = join(cwd, 'src')
  const out: SkillWeight[] = []
  const walk = (d: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(d, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (!e.isDirectory() || e.name.startsWith('.') || e.name === 'node_modules') continue
      const p = join(d, e.name)
      const s = join(p, 'SKILL.md')
      if (existsSync(s)) out.push({ atom: relative(src, p), bytes: statSync(s).size })
      walk(p)
    }
  }
  walk(src)
  return out.sort((a, b) => b.bytes - a.bytes)
}

/**
 * What one set of atoms costs if all of it is handed over at once.
 *
 * This is the number a turn is billed, and it is billed AGAIN on the next turn: context is re-sent,
 * so a byte written into an orientation is not paid once but once per turn for the life of the
 * session. That is why the unit here is tokens and not bytes.
 */
export function injectedCost(
  atomPaths: readonly string[],
  cwd: string = process.cwd(),
  faces: readonly string[] = ['SKILL.md', 'LLM.md', 'README.md'],
): FaceCost {
  const bytes: Record<string, number> = Object.fromEntries(faces.map((f) => [f, 0]))
  let atoms = 0
  for (const a of atomPaths) {
    if (!existsSync(join(cwd, 'src', a, 'SKILL.md'))) continue
    atoms++
    for (const f of faces) {
      try {
        bytes[f]! += statSync(join(cwd, 'src', a, f)).size
      } catch {
        /* not materialised */
      }
    }
  }
  const totalBytes = Object.values(bytes).reduce((a, b) => a + b, 0)
  return { atoms, bytes, totalBytes, totalTokens: totalBytes / BYTES_PER_TOKEN }
}

/**
 * How many atoms fit inside the declared ceiling, handed over whole.
 *
 * `MAX_AGENT_SKILL_CONTEXT_BYTES` is 50,000 and it governs `realiseSkillsForPath` — the lazy loader
 * the orientation tells every agent to use. A path that hands over whole faces instead never passes
 * through that trim, so the ceiling binds one door and not the other. This says how far the second
 * door is from the first: at the corpus's mean SKILL size, the budget is worth this many atoms.
 */
export function atomsWithinBudget(cwd: string = process.cwd()): number {
  const w = skillWeights(cwd)
  if (w.length === 0) return 0
  const mean = w.reduce((a, r) => a + r.bytes, 0) / w.length
  return mean === 0 ? 0 : (MAX_AGENT_SKILL_CONTEXT_BYTES / mean) | 0
}

/**
 * Fails closed when a single SKILL face grows past the ceiling.
 *
 * One orientation of 63 KB is a document, not an orientation — and it is re-sent every turn it stays
 * in context. The corpus's own law is minimum prose and maximum code; this is that law with a wall in
 * front of it. The ceiling ratchets DOWN as the heaviest faces are folded into their code.
 */
export function assertSkillFaceBudget(cwd: string = process.cwd(), ceiling: number): void {
  const over = skillWeights(cwd).filter((w) => w.bytes > ceiling)
  if (over.length === 0) return
  throw new Error(
    `✖ agent/budget — ${over.length} SKILL face(s) over ${ceiling} bytes:\n` +
      over.map((w) => `  ${(w.bytes / 1024).toFixed(1).padStart(7)} KB  ${w.atom}`).join('\n'),
  )
}

export interface Efficiency {
  readonly answers: number
  /** Tokens the realised context costs, from the faces actually on disk. */
  readonly contextTokens: number
  /** Answers per thousand context tokens — finite, because the denominator was measured. */
  readonly answersPerKiloToken: number
  readonly finite: boolean
}

/**
 * Efficiency per token, with a denominator that was MEASURED.
 *
 * `ftlMetrics().efficiency` is `answers / tokens`, and `tokens` defaults to 0 — so the machine's
 * headline efficiency is a division by zero, reported as `Infinity` and true of any corpus at all,
 * including an empty one. That is the same vacuity `holds` carries: it is true of work not done.
 *
 * The denominator is not unknowable. Context is re-sent every turn, so what a turn costs is what its
 * realised faces WEIGH, and that is on disk. Feed this number to `ftlMetrics({ tokens })` and the
 * efficiency it reports becomes a quantity rather than a symbol.
 */
export function efficiencyPerToken(
  answers: number,
  atomPaths: readonly string[],
  cwd: string = process.cwd(),
): Efficiency {
  const contextTokens = injectedCost(atomPaths, cwd).totalTokens
  const answersPerKiloToken = contextTokens > 0 ? (answers * 1000) / contextTokens : 0
  return {
    answers,
    contextTokens,
    answersPerKiloToken,
    finite: contextTokens > 0,
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const c = faceCost()
  const w = skillWeights()
  console.log(`agent/budget — ${c.atoms} atoms · ${(c.totalBytes / 1024 / 1024).toFixed(1)} MB of faces on disk`)
  for (const [f, b] of Object.entries(c.bytes).sort((a, x) => x[1] - a[1])) {
    console.log(`  ${f.padEnd(12)} ${(b / 1024 / 1024).toFixed(2).padStart(6)} MB   ~${(b / BYTES_PER_TOKEN / 1e6).toFixed(2)}M tokens`)
  }
  console.log(`\ndeclared ceiling ${MAX_AGENT_SKILL_CONTEXT_BYTES} bytes — worth ${atomsWithinBudget()} atoms at the mean SKILL size`)
  console.log(`heaviest SKILL faces:`)
  for (const x of w.slice(0, 8)) console.log(`  ${(x.bytes / 1024).toFixed(1).padStart(6)} KB  ~${(x.bytes / BYTES_PER_TOKEN / 1000).toFixed(1)}k tok  ${x.atom}`)
}

/** @index-cross.foldback child=quantum/budget parent=quantum — this cross folds back into its parent. */
