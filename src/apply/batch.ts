/**
 * apply/batch — run session-law generators per domain batch.
 */
import { execSync } from 'node:child_process'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { publish, sessionApplyPath, subscribe } from '@/agent/communication/realtime'
import { quantumModeDefault } from '@/quantum/bindings'
import { withQuantumContext } from '@/quantum/context'
import type { SessionLawDomain } from './report'

const SRC = 'src'
const SKIP = new Set(['app', 'migrations'])

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

const CORE_PATHS = new Set([
  'path',
  'seal',
  'readme',
  'accounting',
  'diamond',
  'entropy',
  'law',
])

const domainOf = (atomPath: string): SessionLawDomain => {
  if (CORE_PATHS.has(atomPath)) return 'core'
  if (atomPath === 'quantum' || atomPath.startsWith('quantum/')) return 'quantum'
  if (atomPath === 'medical' || atomPath.startsWith('medical/') || atomPath === 'monitor') {
    return 'medical'
  }
  if (atomPath === 'computer' || atomPath.startsWith('computer/')) return 'computer'
  if (atomPath === 'body' || atomPath.startsWith('body/')) return 'body'
  if (atomPath.startsWith('agents/')) return 'agents'
  if (!atomPath.includes('/')) return 'vocabulary'
  return 'other'
}

export interface BatchApplyResult {
  readonly batch: readonly string[]
  readonly hooksRegenerated: boolean
  readonly matrixGenerated: boolean
  readonly skillUpgraded: number
  readonly readmeRegenerated: boolean
  readonly errors: readonly string[]
}

const scopePaths = (batch: readonly string[], cwd: string): string[] => {
  const all = listAtomPaths(cwd)
  if (batch.includes('all')) return all
  const out: string[] = []
  for (const a of all) {
    const d = domainOf(a)
    if (batch.includes(d)) out.push(a)
  }
  return [...new Set(out)].sort()
}

const run = (cmd: string, cwd: string): void => {
  execSync(cmd, { cwd, stdio: 'inherit', env: process.env })
}

/** Run one session-law batch: hooks → matrix → skill upgrade → readme. */
export function applySessionLawBatch(
  batches: readonly string[],
  cwd: string = process.cwd(),
  opts?: { readonly __quantumWrapped?: boolean },
): BatchApplyResult {
  if (quantumModeDefault() && !opts?.__quantumWrapped) {
    return withQuantumContext(
      () => applySessionLawBatch(batches, cwd, { __quantumWrapped: true }),
      {
        path: sessionApplyPath(),
        agentId: 'session:apply',
        label: `batch:${batches.join(',')}`,
      },
    ).result
  }

  const errors: string[] = []
  let hooksRegenerated = false
  let matrixGenerated = false
  let skillUpgraded = 0
  let readmeRegenerated = false
  const wavePath = sessionApplyPath()
  const off = subscribe(wavePath, () => undefined)
  const wave = (phase: string): void => {
    publish(wavePath, { kind: 'generic', payload: { phase, batch: batches } })
  }

  try {
    wave('hooks')
    run('node src/path/hooks.registry.mjs --emit', cwd)
    hooksRegenerated = true
  } catch (e) {
    errors.push(`path:hooks — ${e}`)
  }

  const scope = scopePaths(batches, cwd)
  const quantumScope = scope.filter((p) => p === 'quantum' || p.startsWith('quantum/'))

  if (quantumScope.length > 0 || batches.includes('quantum') || batches.includes('all')) {
    wave('skill-upgrade')
    try {
      const atomArg =
        quantumScope.length > 0 && quantumScope.length < 200
          ? ` --atom ${quantumScope.join(',')}`
          : batches.includes('quantum')
            ? ' --atom quantum'
            : ''
      run(
        `cross-env NODE_OPTIONS="--no-deprecation --import=tsx/esm" tsx src/skill/router/upgrade/index.ts --sync${atomArg}`,
        cwd,
      )
      skillUpgraded = quantumScope.length || 1
    } catch (e) {
      errors.push(`skill:upgrade — ${e}`)
    }
  }

  if (batches.some((b) => ['core', 'quantum', 'medical', 'all'].includes(b))) {
    wave('matrix')
    try {
      run('node src/uuid/matrix/collide.mjs --emit', cwd)
      matrixGenerated = true
    } catch (e) {
      errors.push(`matrix:generate — ${e}`)
    }
  }

  if (batches.length > 0) {
    wave('readme')
    try {
      const foldersOnly = batches.includes('all') ? '' : ' --folders-only'
      run(
        `cross-env NODE_OPTIONS="--no-deprecation --import=tsx/esm" tsx src/readme/index.ts${foldersOnly}`,
        cwd,
      )
      readmeRegenerated = true
    } catch (e) {
      errors.push(`readme — ${e}`)
    }
  }

  off()
  return {
    batch: batches,
    hooksRegenerated,
    matrixGenerated,
    skillUpgraded,
    readmeRegenerated,
    errors,
  }
}
