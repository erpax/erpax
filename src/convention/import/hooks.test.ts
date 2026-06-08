import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { AURA_SCAN_PATH, resolveAction } from '@/cli/registry'
import { GATE_LANES } from '@/cli/gate'

const ROOT = process.cwd()
const read = (rel: string): string => readFileSync(join(ROOT, rel), 'utf8')

describe('git hooks reference the canonical, on-disk aura scanner', () => {
  const canonical = AURA_SCAN_PATH

  it('canonical aura scanner exists on disk', () => {
    expect(readFileSync(join(ROOT, canonical), 'utf8').length).toBeGreaterThan(0)
  })

  for (const hook of ['.husky/pre-push', '.husky/pre-commit']) {
    it(`${hook} invokes scan.mjs at a path that exists AND matches cli AURA_SCAN_PATH`, () => {
      const paths = [...read(hook).matchAll(/node\s+(\S+scan\.mjs)/g)].map((m) => m[1]!)
      expect(paths.length, `${hook} should invoke the aura scanner`).toBeGreaterThan(0)
      for (const p of paths) {
        expect(readFileSync(join(ROOT, p), 'utf8').length).toBeGreaterThan(0)
        expect(p).toBe(canonical)
        expect(p).not.toContain('.claude/skills/aura')
      }
    })
  }
})

describe('the import-purity ratchet is wired into the gate (the wire is connected)', () => {
  it('gate lanes include lint imports via erpax', () => {
    const labels = GATE_LANES.map(([l]) => l)
    expect(labels).toContain('lint:imports')
    const cmd = GATE_LANES.find(([l]) => l === 'lint:imports')?.[1] ?? ''
    expect(cmd).toMatch(/erpax lint imports/)
    expect(resolveAction('lint', 'imports')?.cmd).toMatch(/src\/convention\/import\/gate\.mjs/)
  })

  it('check script runs erpax gate', () => {
    const pkg = JSON.parse(read('package.json')) as { scripts: Record<string, string> }
    expect(pkg.scripts['check']).toMatch(/src\/cli\/index\.ts gate/)
  })

  it('.husky/pre-push runs the import-purity gate', () => {
    expect(read('.husky/pre-push')).toMatch(/convention\/import\/gate\.mjs/)
  })
})

describe('confirm:full is a true SUPERSET of `pnpm check` (no docs-only false-green)', () => {
  const matterSrc = read('src/confirm/matter.ts')

  for (const token of ['standards', 'lint:src', 'lint:imports', 'typecheck', 'test:int']) {
    it(`confirm:full references the build gate \`${token}\``, () => {
      expect(matterSrc).toMatch(new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    })
  }

  it('confirm/matter re-exports gate lanes from cli/gate', () => {
    expect(matterSrc).toMatch(/from '@\/cli\/gate'/)
    expect(matterSrc).toMatch(/BUILD_GATE_CHECKS = GATE_LANES/)
    for (const [label] of GATE_LANES) {
      expect(GATE_LANES.some(([l]) => l === label)).toBe(true)
    }
  })
})
