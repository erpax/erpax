import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { execSync } from 'node:child_process'
import { LEGACY_ALIASES } from '@/cli/registry'

const ROOT = process.cwd()

describe('confirm:uuid — substrate-independent gate stack (no Payload typegen)', () => {
  it('legacy alias wires confirm:uuid to src/confirm/index.ts', () => {
    expect(LEGACY_ALIASES['confirm:uuid']).toBe('erpax confirm uuid')
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
      scripts: Record<string, string>
    }
    expect(pkg.scripts['erpax']).toMatch(/src\/cli\/index\.ts/)
  })

  it('the hub holds no matter — confirm/index.ts is a barrel over its lanes', () => {
    const src = readFileSync(join(ROOT, 'src/confirm/index.ts'), 'utf8')
    // A re-export names where the matter lives; a `function`/`const` here would be
    // matter in a hub ([[rules]]/concentration), which is what this split removed.
    expect(src).toMatch(/export \{[\s\S]*\} from '\.\/uuid'/)
    expect(src).toMatch(/export \{[\s\S]*\} from '\.\/matter'/)
    expect(src).not.toMatch(/^export (function|const|class) /m)
  })

  it('every lane is a child atom with its own proof beside it', () => {
    for (const lane of ['uuid', 'matter', 'probe', 'push']) {
      for (const leg of ['index.ts', 'test.ts', 'SKILL.md']) {
        expect(existsSync(join(ROOT, 'src/confirm', lane, leg))).toBe(true)
      }
    }
  })

  it('confirm:full remains separate — still references payload-verify-types', () => {
    const matter = readFileSync(join(ROOT, 'src/confirm/matter/index.ts'), 'utf8')
    expect(matter).toMatch(/payload-verify-types/)
    expect(readFileSync(join(ROOT, 'src/confirm/index.ts'), 'utf8')).toMatch(/confirm:uuid/)
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

  // BOUNDED-WITNESS: `pnpm erpax confirm uuid` is a CORPUS-SCALE scan (>90s on the live tree),
  // so shelling out to it from a unit suite via a synchronous execSync HANGS the whole batch
  // (execSync blocks the JS thread, so vitest's async timeout can't interrupt it — this one
  // suite was the con* region's 15-min timeout all along). The full command is already run by
  // the pre-push hook (asserted above, line ~65), so the unit suite verifies the WIRING, not
  // the corpus-scale execution. Skipped here; the hook + gate carry the integration.
  it.skip('confirm:uuid exits 0 on the live tree (integration — runs in the pre-push hook, not the unit batch)', () => {
    execSync('pnpm erpax confirm uuid', { cwd: ROOT, stdio: 'pipe', timeout: 90_000 })
  }, 120_000)
})
