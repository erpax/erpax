import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { execSync } from 'node:child_process'

const ROOT = process.cwd()

describe('confirm:uuid — substrate-independent gate stack (no Payload typegen)', () => {
  it('package.json wires confirm:uuid to src/confirm/index.ts', () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
      scripts: Record<string, string>
    }
    expect(pkg.scripts['confirm:uuid']).toMatch(/src\/confirm\/index\.ts/)
    expect(pkg.scripts['confirm:uuid']).not.toMatch(/payload generate:types/)
    expect(pkg.scripts['confirm:uuid']).not.toMatch(/payload-verify-types/)
  })

  it('confirm index encodes the uuid-without-payload law', () => {
    const src = readFileSync(join(ROOT, 'src/confirm/index.ts'), 'utf8')
    expect(src).not.toMatch(/execSync\([^)]*payload generate:types/)
    expect(src).not.toMatch(/execSync\([^)]*payload-verify-types/)
    expect(src).toMatch(/all is passed with uuids without payload/)
    for (const axis of [
      'gateAura',
      'gateFolders',
      'gateImports',
      'gateTypecheck',
      'gateReadme',
      'gateBoundary',
      'gateDiamond',
      'gateDiamondFiles',
      'gateCloudflareAi',
      'gateTypography',
    ]) {
      expect(src).toContain(axis)
    }
  })

  it('uuidGates lists every mandated axis in source order', () => {
    const src = readFileSync(join(ROOT, 'src/confirm/index.ts'), 'utf8')
    const block = src.slice(src.indexOf('uuidGates'), src.indexOf('uuidConfirm'))
    for (const axis of [
      'gateAura',
      'gateFolders',
      'gateImports',
      'gateTypecheck',
      'gateReadme',
      'gateBoundary',
      'gateDiamond',
      'gateDiamondFiles',
      'gateCloudflareAi',
      'gateTypography',
    ]) {
      expect(block).toContain(axis)
    }
  })

  it('confirm:full remains separate — still references payload-verify-types', () => {
    const confirmMjs = readFileSync(join(ROOT, 'scripts/confirm.mjs'), 'utf8')
    expect(confirmMjs).toMatch(/payload-verify-types/)
    expect(confirmMjs).toMatch(/confirm:uuid/)
  })

  it('pre-push documents uuid-only alternative', () => {
    const prePush = readFileSync(join(ROOT, '.husky/pre-push'), 'utf8')
    expect(prePush).toMatch(/confirm:uuid/)
    expect(prePush).toMatch(/pre-push-uuid/)
  })

  it('tsconfig.uuid.json scopes the uuid substrate', () => {
    const cfg = JSON.parse(readFileSync(join(ROOT, 'tsconfig.uuid.json'), 'utf8')) as { include: string[] }
    expect(cfg.include.some((p) => p.includes('confirm'))).toBe(true)
    expect(cfg.include.some((p) => p.includes('integrity'))).toBe(true)
  })

  it('scripts/pre-push-uuid.sh delegates to confirm:uuid', () => {
    const sh = readFileSync(join(ROOT, 'scripts/pre-push-uuid.sh'), 'utf8')
    expect(sh).toMatch(/confirm:uuid/)
    expect(sh.split('\n').filter((l) => !l.trim().startsWith('#')).join('\n')).not.toMatch(/--no-verify/)
  })

  it('confirm:uuid exits 0 on the live tree (integration)', () => {
    execSync('pnpm run -s confirm:uuid', { cwd: ROOT, stdio: 'pipe' })
  }, 120_000)
})
