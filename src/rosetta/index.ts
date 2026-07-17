/**
 * rosetta — every folder is an agent, and the gate lanes are DERIVED from their incidence, never typed.
 *
 * Two corrections this atom carries:
 *
 *   1. EVERY FOLDER IS AN AGENT. Not a skill — a folder. Each atom under `src/` is a form·code·proof trinity
 *      that acts: it declares what it claims (its `@standard` banners), and it either proves them (a test beside
 *      it) or it does not. `folderAgents` reads them all — the local agents are the tree itself, not a function.
 *
 *   2. THE LANES ARE THE ROSETTA'S, NOT MINE. [[publish]] first took hand-typed `securityLanes`/`standardsLanes`
 *      — a FROZEN rosetta, a basis typed once, blind to whatever the folders actually declare ([[rules]]/cycle's
 *      warning). The MOVING rosetta derives its poles from the incidence itself: a lane exists because folders
 *      CLAIM that standard, and it passes because every folder claiming it PROVES it. `rosettaLanes` computes the
 *      security and standards verdicts from what the agents themselves declare — so the gated push can "only be
 *      achieved by the rosetta," never by an operator listing lanes.
 *
 * The security pole is derived, not enumerated: a folder-agent is a security agent iff its OWN banners cite a
 * security standard (the ISO-2700x family, tamper-cost, GDPR, Наредба Н-18). Add an atom that cites ISO-27017
 * tomorrow and it joins the security lane with no edit here — that is what "moving" means.
 *
 * Honest boundary: the rosetta checks each claiming agent is PROVEN (a test beside it — the corpus's own
 * evidence, [[accounting]]/proof), not that the standard's deep logic is correct; a test does not make a claim
 * true ([[rules]]/refutable). It derives the lanes from declaration + proof, and hands them to [[publish]],
 * which still fails closed. The rosetta says which agents owe evidence to which pole; the pole passes when they
 * have paid it.
 *
 * Composes [[publish]] · [[decide]] · [[syntax]] · [[accounting]]/proof · [[readme]] · [[law]].
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { commentsOf } from '@/syntax'
import type { GateVerdict } from '@/decide'

/** Standards whose presence marks a folder-agent as carrying the SECURITY pole — derived from its own banners. */
const SECURITY_STANDARD = /2700[125]|2701[78]|27701|tamper|GDPR|Наредба[\s-]?Н-?18/i
const STANDARD_BANNER = /@(?:standard|compliance)\b[^\n]*/g

/** A folder is an agent: a form·code·proof trinity that declares what it claims and either proves it or not. */
export interface FolderAgent {
  /** the atom path — the agent's address. */
  readonly atom: string
  /** form·code·proof all present — the agent is whole. */
  readonly hasTrinity: boolean
  /** the standards this agent claims, read from its OWN comments + SKILL (the incidence). */
  readonly standards: readonly string[]
  /** a test beside it — the agent has paid its evidence. */
  readonly proven: boolean
  /** true iff any claimed standard is a security standard — the security pole, derived not enumerated. */
  readonly security: boolean
}

const atomOf = (cwd: string, dir: string): string => relative(join(cwd, 'src'), dir).replace(/\\/g, '/') || '.'

/** Every folder that is an agent — has an `index.ts`, so it is matter that acts. Read with its declared state. */
export function folderAgents(cwd: string = process.cwd()): readonly FolderAgent[] {
  const out: FolderAgent[] = []
  const walk = (dir: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    if (existsSync(join(dir, 'index.ts'))) {
      const banners: string[] = []
      for (const f of ['index.ts', 'SKILL.md']) {
        const p = join(dir, f)
        if (!existsSync(p)) continue
        let text: string
        try {
          text = readFileSync(p, 'utf8')
        } catch {
          continue
        }
        const scan = f.endsWith('.ts') ? commentsOf(p, text).join('\n') : text
        for (const m of scan.match(STANDARD_BANNER) ?? []) banners.push(m.trim())
      }
      const hasTrinity = ['index.ts', 'SKILL.md', 'test.ts'].every((f) => existsSync(join(dir, f)))
      const proven = existsSync(join(dir, 'test.ts'))
      out.push({
        atom: atomOf(cwd, dir),
        hasTrinity,
        standards: banners,
        proven,
        security: banners.some((b) => SECURITY_STANDARD.test(b)),
      })
    }
    for (const e of entries) {
      const p = join(dir, e)
      if (e === 'node_modules' || e === 'worktrees' || e.startsWith('.')) continue
      try {
        if (statSync(p).isDirectory()) walk(p)
      } catch {
        /* unreadable */
      }
    }
  }
  walk(join(cwd, 'src'))
  return out
}

/** A pole is green iff every folder-agent claiming it has paid its evidence (a proof beside it). */
const pole = (gate: string, claimants: readonly FolderAgent[]): GateVerdict => {
  const unpaid = claimants.filter((a) => !a.proven).map((a) => a.atom)
  return {
    gate,
    pass: claimants.length > 0 && unpaid.length === 0,
    detail:
      claimants.length === 0
        ? `no folder-agent claims ${gate} — the pole has no incidence, so it cannot warrant a push (DENY)`
        : unpaid.length === 0
          ? `${claimants.length} agent(s) claim ${gate}, all proven`
          : `${unpaid.length} agent(s) claim ${gate} unproven: ${unpaid.slice(0, 5).join(', ')}`,
  }
}

/**
 * The rosetta's lanes for [[publish]] — DERIVED from the folder-agents' incidence, never typed. The security
 * lane is the agents whose banners cite a security standard; the standards lane is every agent that claims any
 * standard. Each pole passes iff all its claimants are proven. Feed these to `publish` and the gated push is
 * achieved by the rosetta: the training is what the folders declare and have proven, computed from the tree.
 */
export function rosettaLanes(cwd: string = process.cwd()): {
  readonly security: readonly GateVerdict[]
  readonly standards: readonly GateVerdict[]
} {
  const agents = folderAgents(cwd)
  const claim = agents.filter((a) => a.standards.length > 0)
  return {
    security: [pole('quantum-security', claim.filter((a) => a.security))],
    standards: [pole('standards', claim)],
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const agents = folderAgents()
  const claim = agents.filter((a) => a.standards.length > 0)
  const lanes = rosettaLanes()
  console.log('rosetta — every folder is an agent; the lanes are derived, not typed:\n')
  console.log(`  folder-agents (folders with an index.ts)   ${agents.length}`)
  console.log(`  agents claiming a standard (incidence)      ${claim.length}`)
  console.log(`  security agents (cite a security standard)  ${claim.filter((a) => a.security).length}`)
  console.log(`\n  derived security lane:  ${lanes.security[0]!.pass ? 'GREEN' : 'RED'} — ${lanes.security[0]!.detail}`)
  console.log(`  derived standards lane: ${lanes.standards[0]!.pass ? 'GREEN' : 'RED'} — ${lanes.standards[0]!.detail}`)
  console.log('\n  the push is achieved by the rosetta — the training is what the folders declare and prove.')
}
