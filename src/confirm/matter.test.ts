import { describe, it, expect } from 'vitest'
import { join } from 'node:path'
import { BUILD_GATE_CHECKS, folderNameWarnings } from './matter'

describe('confirm/matter — scoped + full gate', () => {
  it('BUILD_GATE_CHECKS matches package.json check chain', () => {
    const labels = BUILD_GATE_CHECKS.map(([l]) => l)
    expect(labels).toContain('standards')
    expect(labels).toContain('test:int')
    expect(labels.length).toBe(9)
  })

  it('folderNameWarnings flags non-one-word segments', () => {
    const warns = folderNameWarnings([join(process.cwd(), 'src/trading-apis/foo.ts')])
    expect(warns.some((w) => w.includes('trading-apis'))).toBe(true)
  })
})
