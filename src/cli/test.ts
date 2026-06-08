import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { GATE_LANES } from './gate'
import { CLI_REGISTRY, LEGACY_ALIASES, AURA_SCAN_PATH, resolveAction } from './registry'
import { suggestNearestDomain, printHelp, DOMAIN_GROUPS } from './help'
import { collectDoctorReport, formatDoctorReport } from './doctor'
import { topFailedAxes, AXIS_FIX_HINTS, formatRulesFailureSummary } from './rules-check'
import { runCli } from './index'

const ROOT = process.cwd()

describe('cli/registry — minimal operational surface', () => {
  it('covers required aspect domains', () => {
    for (const d of [
      'readme',
      'lint',
      'test',
      'rules',
      'monitor',
      'confirm',
      'apply',
      'standards',
      'corpus',
      'gate',
      'doctor',
    ]) {
      expect(CLI_REGISTRY[d]).toBeTruthy()
    }
  })

  it('resolves readme check and waves', () => {
    expect(resolveAction('readme', 'check')?.cmd).toMatch(/--verify --waves/)
    expect(resolveAction('readme', 'waves')?.cmd).toMatch(/--waves/)
  })

  it('rules check routes through cli wrapper', () => {
    expect(resolveAction('rules', 'check')?.cmd).toBe('__rules_check__')
  })

  it('legacy aliases map to erpax invocations', () => {
    expect(LEGACY_ALIASES['readme:check']).toBe('erpax readme check')
    expect(LEGACY_ALIASES['confirm:uuid']).toBe('erpax confirm uuid')
    expect(LEGACY_ALIASES['migrate:production']).toBe('erpax deploy db')
    expect(LEGACY_ALIASES['readme:waves']).toBe('erpax readme waves')
  })

  it('gate lanes cover check aspects', () => {
    const labels = GATE_LANES.map(([l]) => l)
    expect(labels).toContain('standards')
    expect(labels).toContain('lint:imports')
    expect(labels).toContain('test:int')
  })
})

describe('cli/help — grouped help + nearest match', () => {
  it('suggests nearest domain for typos', () => {
    expect(suggestNearestDomain('redme')).toBe('readme')
    expect(suggestNearestDomain('gat')).toBe('gate')
    expect(suggestNearestDomain('zzzzzzz')).toBeUndefined()
  })

  it('groups domains for --help', () => {
    const all = DOMAIN_GROUPS.flatMap((g) => g.domains)
    expect(all).toContain('readme')
    expect(all).toContain('doctor')
    expect(all).toContain('gate')
  })

  it('printHelp does not throw', () => {
    expect(() => printHelp()).not.toThrow()
    expect(() => printHelp('readme')).not.toThrow()
  })
})

describe('cli/doctor — health snapshot', () => {
  it('collects stray-ts, efficiency, and entry skill', () => {
    const report = collectDoctorReport(ROOT)
    expect(report.strayTs.baseline).toBeGreaterThan(0)
    expect(report.entrySkill.path).toBe('.claude/skills/SKILL.md')
    expect(report.entrySkill.exists).toBe(true)
    const text = formatDoctorReport(report)
    expect(text).toContain('stray-ts')
    expect(text).toContain('entry skill')
  })
})

describe('cli/rules-check — failure summary helpers', () => {
  it('maps axes to fix hints', () => {
    expect(AXIS_FIX_HINTS['stray-ts']).toContain('rules ratchet')
    expect(AXIS_FIX_HINTS['import-purity']).toContain('lint imports')
  })

  it('formatRulesFailureSummary renders top axes', () => {
    const text = formatRulesFailureSummary([
      { axis: 'stray-ts', violations: 10, baseline: 5, fix: 'pnpm erpax rules ratchet' },
    ])
    expect(text).toContain('stray-ts')
    expect(text).toContain('pnpm erpax rules ratchet')
  })

  it('topFailedAxes returns sorted failures when unsealed', () => {
    const failed = topFailedAxes(ROOT, 3)
    expect(Array.isArray(failed)).toBe(true)
  })
})

describe('cli/index — router smoke', () => {
  it('returns 0 for help and aliases', () => {
    expect(runCli(['help'])).toBe(0)
    expect(runCli(['aliases'])).toBe(0)
  })

  it('returns 1 for unknown domain with suggestion', () => {
    expect(runCli(['redme'])).toBe(1)
  })

  it('doctor exits 0 when entry skill exists', () => {
    expect(runCli(['doctor'])).toBe(0)
    expect(runCli(['status'])).toBe(0)
  })
})

describe('package.json — minimal scripts', () => {
  it('wires check and erpax to src/cli', () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
      scripts: Record<string, string>
    }
    expect(pkg.scripts['erpax']).toMatch(/src\/cli\/index\.ts/)
    expect(pkg.scripts['check']).toMatch(/src\/cli\/index\.ts gate/)
    const count = Object.keys(pkg.scripts).length
    expect(count).toBeLessThanOrEqual(20)
  })

  it('legacy shims point at legacy-shim.ts', () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
      scripts: Record<string, string>
    }
    expect(pkg.scripts['readme:waves']).toMatch(/legacy-shim\.ts/)
    expect(pkg.scripts['rules:check']).toMatch(/legacy-shim\.ts/)
  })

  it('aura scan canonical path is stable', () => {
    expect(AURA_SCAN_PATH).toBe('src/aura/scan.mjs')
    expect(resolveAction('aura', 'scan')?.cmd).toContain(AURA_SCAN_PATH)
  })
})
