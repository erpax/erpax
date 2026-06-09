/**
 * hand-maintained — user law: index holds matter; faces regenerate.
 *
 * Bounded scan (max 30 paths) for README/LLM/diamond drift, hand emit artifacts,
 * duplicate computed markdown lists, and SKILL prose without index proof.
 *
 * @see ./compute — pnpm erpax readme drift
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { materializeComputedFacesForPathsStable, verifyComputedFacesForPaths } from './compute'
import { listAtomPaths } from '@/rules/tightened-scans'
import { verifySkillFrontmatter } from '@/skill/router/upgrade'
import { computeProseLiterals } from './assumption-literals'

const SRC = 'src'

export const SESSION_COMPUTE_ROOTS = [
  'quantum/fold',
  'book',
  'science',
  'navigation',
  'pivot',
] as const

export const MAX_HAND_MAINTAINED_PATHS = 30

export type HandMaintainedFix = 'readme paths' | 'emit' | 'delete'

export type HandMaintainedKind =
  | 'readme-drift'
  | 'llm-drift'
  | 'diamond-drift'
  | 'hand-generated'
  | 'hand-json'
  | 'duplicate-list'
  | 'skill-prose-without-index'
  | 'compute-prose-literal'

export interface HandMaintainedViolation {
  readonly path: string
  readonly kind: HandMaintainedKind
  readonly fix: HandMaintainedFix
  readonly detail: string
}

export interface HandMaintainedAudit {
  readonly pathsScanned: readonly string[]
  readonly violations: readonly HandMaintainedViolation[]
  readonly violationCount: number
}

export interface ComputeTheRestResult {
  readonly paths: readonly string[]
  readonly computed: number
  readonly emitOnly: readonly string[]
  readonly skipped: readonly string[]
}

const DUPLICATE_HEADINGS = ['## pivot', '## trinity', '## horo'] as const

const EMIT_MARKERS = ['AUTO-GENERATED', 'do not edit'] as const

const HAND_RATCHET = join('src', 'law', 'folder', 'ratchet.json')
const HAND_EFFICIENCY = join('src', 'apply', 'efficiency.json')

function handJsonViolations(cwd: string): HandMaintainedViolation[] {
  const out: HandMaintainedViolation[] = []
  if (existsSync(join(cwd, HAND_RATCHET))) {
    out.push({
      path: HAND_RATCHET,
      kind: 'hand-json',
      fix: 'emit',
      detail: 'hand-maintained ratchet.json — delete and run pnpm rules:ratchet',
    })
  }
  if (existsSync(join(cwd, HAND_EFFICIENCY))) {
    out.push({
      path: HAND_EFFICIENCY,
      kind: 'hand-json',
      fix: 'emit',
      detail: 'hand-maintained efficiency.json — delete and run pnpm apply:efficiency-emit',
    })
  }
  return out
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function duplicateListViolations(cwd: string, paths: readonly string[]): HandMaintainedViolation[] {
  const out: HandMaintainedViolation[] = []
  for (const atom of paths) {
    for (const face of ['README.md', 'SKILL.md'] as const) {
      const file = join(cwd, SRC, atom, face)
      if (!existsSync(file)) continue
      const body = readFileSync(file, 'utf8')
      for (const heading of DUPLICATE_HEADINGS) {
        const matches = body.match(new RegExp(escapeRe(heading), 'g'))
        if (matches && matches.length > 1) {
          out.push({ path: `${atom}/${face}`, kind: 'duplicate-list', fix: 'readme paths', detail: heading })
        }
      }
    }
  }
  return out
}

function handGeneratedViolations(cwd: string): HandMaintainedViolation[] {
  const out: HandMaintainedViolation[] = []
  const walk = (dir: string): void => {
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, ent.name)
      if (ent.isDirectory() && ent.name !== 'node_modules') walk(full)
      else if (ent.isFile() && ent.name.endsWith('.generated.ts')) {
        const rel = full.slice(cwd.length + 1)
        const src = readFileSync(full, 'utf8')
        if (!EMIT_MARKERS.some((m) => src.includes(m))) {
          out.push({ path: rel, kind: 'hand-generated', fix: 'emit', detail: ent.name })
        }
      }
    }
  }
  walk(join(cwd, SRC))
  return out
}

export function boundedSessionPaths(
  cwd = process.cwd(),
  roots: readonly string[] = SESSION_COMPUTE_ROOTS,
  max = MAX_HAND_MAINTAINED_PATHS,
): string[] {
  return listAtomPaths(cwd)
    .filter((p) => roots.some((r) => p === r || p.startsWith(`${r}/`)))
    .slice(0, max)
}

export function handMaintainedViolations(opts: { paths?: readonly string[]; cwd?: string } = {}): HandMaintainedAudit {
  const cwd = opts.cwd ?? process.cwd()
  const paths = (opts.paths?.length ? [...opts.paths] : boundedSessionPaths(cwd)).slice(
    0,
    MAX_HAND_MAINTAINED_PATHS,
  )
  const violations: HandMaintainedViolation[] = []

  for (const l of computeProseLiterals(cwd)) {
    violations.push({ path: 'src/readme/compute.ts', kind: 'compute-prose-literal', fix: 'delete', detail: l })
  }
  violations.push(...handJsonViolations(cwd))
  violations.push(...handGeneratedViolations(cwd))

  if (paths.length) {
    const d = verifyComputedFacesForPaths(paths, cwd)
    for (const p of d.readme.drift) {
      violations.push({ path: p, kind: 'readme-drift', fix: 'readme paths', detail: 'README' })
    }
    for (const p of d.llm.drift) {
      violations.push({ path: p, kind: 'llm-drift', fix: 'readme paths', detail: 'LLM' })
    }
    for (const p of d.diamond.drift) {
      violations.push({ path: p, kind: 'diamond-drift', fix: 'readme paths', detail: 'diamond' })
    }
    const s = verifySkillFrontmatter(cwd, paths)
    if (!s.ok) {
      for (const p of s.drift) {
        violations.push({ path: p, kind: 'skill-prose-without-index', fix: 'readme paths', detail: 'SKILL frontmatter' })
      }
    }
    violations.push(...duplicateListViolations(cwd, paths))
    for (const atom of paths) {
      const skill = join(cwd, SRC, atom, 'SKILL.md')
      const index = join(cwd, SRC, atom, 'index.ts')
      if (existsSync(skill) && !existsSync(index)) {
        const b = readFileSync(skill, 'utf8').replace(/^---[\s\S]*?---\n?/, '')
        if (b.split(/\s+/).length >= 40 && /\*\*Law/.test(b)) {
          violations.push({ path: atom, kind: 'skill-prose-without-index', fix: 'delete', detail: 'SKILL without index' })
        }
      }
    }
  }

  return { pathsScanned: paths, violations, violationCount: violations.length }
}

export function pathsForScope(scope: string, cwd = process.cwd(), max = MAX_HAND_MAINTAINED_PATHS): string[] {
  const n = scope.replace(/^src\//, '').replace(/\/$/, '')
  const all = listAtomPaths(cwd)
  const u = all.filter((p) => p === n || p.startsWith(`${n}/`))
  return (u.length ? u : all.includes(n) ? [n] : boundedSessionPaths(cwd, [n], max)).slice(0, max)
}

export function computeTheRest(scope?: string, cwd = process.cwd()): ComputeTheRestResult {
  const paths = scope ? pathsForScope(scope, cwd) : boundedSessionPaths(cwd)
  const rp = paths.filter((p) => existsSync(join(cwd, SRC, p)))
  return {
    paths: rp,
    computed: rp.length ? materializeComputedFacesForPathsStable(rp, cwd) : 0,
    emitOnly: ['law/folder/ratchet.generated.ts'],
    skipped: paths.filter((p) => !rp.includes(p)),
  }
}
