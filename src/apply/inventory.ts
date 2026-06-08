/**
 * apply/inventory — walk src/ for session-law coverage (CLI/report only).
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { ATOM_LEDGER_PATHS } from '@/path/hub'
import { nodeOf } from '@/uuid/matrix'
import type { DomainCoverage, SessionLawDomain, SessionLawInventory } from './report'

const SRC = 'src'
const SKIP = new Set(['app', 'migrations'])

const CORE_PATHS = new Set([
  'path',
  'seal',
  'readme',
  'accounting',
  'diamond',
  'entropy',
  'law',
])

const walkSkills = (dir: string): string[] => {
  const out: string[] = []
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (!statSync(p).isDirectory() || SKIP.has(e)) continue
    if (existsSync(join(p, 'SKILL.md'))) out.push(p)
    out.push(...walkSkills(p))
  }
  return out
}

const listAtomPaths = (cwd: string): string[] =>
  walkSkills(join(cwd, SRC))
    .map((sk) => relative(join(cwd, SRC), dirname(sk)).replace(/\\/g, '/'))
    .sort()

const domainOf = (atomPath: string): SessionLawDomain => {
  if (CORE_PATHS.has(atomPath)) return 'core'
  if (atomPath === 'quantum' || atomPath.startsWith('quantum/')) return 'quantum'
  if (atomPath === 'medical' || atomPath.startsWith('medical/') || atomPath === 'monitor') {
    return 'medical'
  }
  if (atomPath === 'computer' || atomPath.startsWith('computer/')) return 'computer'
  if (atomPath === 'body' || atomPath.startsWith('body/')) return 'body'
  if (atomPath.startsWith('agents/')) return 'agents'
  if (atomPath.startsWith('collections/') || atomPath.includes('/collections/')) {
    return 'collections'
  }
  if (!atomPath.includes('/')) return 'vocabulary'
  return 'other'
}

const hasNamedLedgerHook = (atomPath: string, cwd: string): boolean => {
  const fp = join(cwd, SRC, atomPath, 'index.ts')
  if (!existsSync(fp)) return false
  const src = readFileSync(fp, 'utf8')
  return /recordPathVisit|recordOnPath|record\w+OnPath/.test(src)
}

const atomHasTrinity = (atomPath: string, cwd: string): boolean =>
  existsSync(join(cwd, SRC, atomPath, 'SKILL.md')) &&
  existsSync(join(cwd, SRC, atomPath, 'index.ts')) &&
  existsSync(join(cwd, SRC, atomPath, 'test.ts'))

const diamondSealedTrinity = (diamondPath: string): boolean => {
  if (!existsSync(diamondPath)) return false
  try {
    const dj = JSON.parse(readFileSync(diamondPath, 'utf8')) as {
      trinity?: { form?: number; code?: number; proof?: number }
      folded?: boolean
    }
    const t = dj.trinity
    return Boolean(t?.form && t?.code && t?.proof && dj.folded)
  } catch {
    return false
  }
}

const atomPathHasLedger = (atomPath: string, cwd: string): boolean => {
  if (!existsSync(join(cwd, SRC, atomPath, 'index.ts'))) return false
  return ATOM_LEDGER_PATHS.includes(atomPath) || hasNamedLedgerHook(atomPath, cwd)
}

/** Inventory session-law coverage across src/. */
export function inventorySessionLaws(cwd: string = process.cwd()): SessionLawInventory {
  const atoms = listAtomPaths(cwd)
  const byDomain = new Map<SessionLawDomain, string[]>()
  for (const a of atoms) {
    const d = domainOf(a)
    const list = byDomain.get(d) ?? []
    list.push(a)
    byDomain.set(d, list)
  }

  let withIndex = 0
  let withTest = 0
  let trinity = 0
  let ledgerNamedHooks = 0

  for (const a of atoms) {
    if (existsSync(join(cwd, SRC, a, 'index.ts'))) withIndex++
    if (existsSync(join(cwd, SRC, a, 'test.ts'))) withTest++
    if (atomHasTrinity(a, cwd)) trinity++
    if (hasNamedLedgerHook(a, cwd)) ledgerNamedHooks++
  }

  const domains: DomainCoverage[] = []
  for (const [domain, paths] of [...byDomain.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    let dTrinity = 0
    let dLedger = 0
    let dCrossed = 0
    let dFolded = 0
    for (const p of paths) {
      if (atomHasTrinity(p, cwd)) dTrinity++
      if (atomPathHasLedger(p, cwd)) dLedger++
      if (nodeOf(p)?.path) dFolded++
      if (diamondSealedTrinity(join(cwd, SRC, p, 'diamond.json'))) dCrossed++
    }
    const n = paths.length
    domains.push({
      domain,
      atoms: n,
      trinity: dTrinity,
      trinityPct: n > 0 ? (dTrinity / n) * 100 : 0,
      ledgerHooks: dLedger,
      ledgerPct: n > 0 ? (dLedger / n) * 100 : 0,
      crossed: dCrossed,
      crossedPct: n > 0 ? (dCrossed / n) * 100 : 0,
      folded: dFolded,
      foldedPct: n > 0 ? (dFolded / n) * 100 : 0,
    })
  }

  return {
    totalAtoms: atoms.length,
    withIndex,
    withTest,
    trinity,
    trinityPct: atoms.length > 0 ? (trinity / atoms.length) * 100 : 0,
    formOnly: atoms.length - trinity,
    ledgerRegistry: ATOM_LEDGER_PATHS.length,
    ledgerNamedHooks,
    domains,
  }
}
