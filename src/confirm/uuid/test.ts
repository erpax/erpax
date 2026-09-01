import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { gateFolders, IMPORT_PURITY_BASELINE } from '@/confirm/uuid'

const ROOT = process.cwd()
const AXES = [
  'gateAura',
  'gateFolders',
  'gateImports',
  'gateTypecheck',
  'gateReadme',
  'gateBoundary',
  'gateDiamond',
  'gateCloudflareAi',
  'gateTypography',
] as const

describe('confirm/uuid — the substrate-independent stack', () => {
  it('forbids Payload typegen in the uuid lane', () => {
    const src = readFileSync(join(ROOT, 'src/confirm/uuid/index.ts'), 'utf8')
    expect(src).not.toMatch(/execSync\([^)]*payload generate:types/)
    expect(src).not.toMatch(/execSync\([^)]*payload-verify-types/)
    expect(src).toMatch(/all is passed with uuids without payload/)
  })

  it('uuidGates runs every mandated axis — a dropped lane is a check that cannot fire', () => {
    const src = readFileSync(join(ROOT, 'src/confirm/uuid/index.ts'), 'utf8')
    const block = src.slice(src.indexOf('export function uuidGates'), src.indexOf('uuidConfirm'))
    for (const axis of AXES) expect(block).toContain(axis)
  })

  it('the compile probe is loaded, never this stack — a probe may not prove itself', () => {
    const src = readFileSync(join(ROOT, 'src/confirm/uuid/index.ts'), 'utf8')
    expect(src).toContain('src/confirm/probe/index.ts')
    expect(src).not.toMatch(/tsx -e "import .\/src\/confirm\/uuid/)
  })

  it('import purity is a theorem at zero, not a ratchet toward it', () => {
    expect(IMPORT_PURITY_BASELINE).toBe(0)
  })

  // ONE cheap lane, not all nine: uuidGates spawns a typecheck and scans the corpus,
  // and a proof that costs minutes is a proof that gets skipped ([[rules]]).
  it('a lane returns a real verdict — an axis and a reason, never a bare boolean', () => {
    const g = gateFolders()
    expect(g.axis).toBe('folders')
    expect(typeof g.ok).toBe('boolean')
    expect(g.reason.length).toBeGreaterThan(0)
  })
})
