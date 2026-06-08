/**
 * css — proof the styling diamond is content-addressed and deterministic.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { computeCssDiamond, cssContentUuid, resolveCssPath } from '@/css'

describe('css — styling diamond', () => {
  it('cssContentUuid: same path+content ⇒ same uuid', () => {
    const a = cssContentUuid('app/(frontend)/globals.css', 'body { margin: 0; }')
    const b = cssContentUuid('app/(frontend)/globals.css', 'body { margin: 0; }')
    expect(a).toBe(b)
    expect(a).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('cssContentUuid: content drift ⇒ different uuid', () => {
    const a = cssContentUuid('app/globals.css', 'a {}')
    const b = cssContentUuid('app/globals.css', 'b {}')
    expect(a).not.toBe(b)
  })

  it('computeCssDiamond: inline content is deterministic', () => {
    const input = { path: 'app/demo.css', content: '.x { color: red; }', cwd: process.cwd() }
    const a = computeCssDiamond(input)
    const b = computeCssDiamond(input)
    expect(a.seal.contentUuid).toBe(b.seal.contentUuid)
    expect(a.computationUuid).toBe(b.computationUuid)
    expect(a.stages.length).toBeGreaterThan(0)
  })

  it('resolveCssPath: accepts src-relative paths', () => {
    const { rel, abs } = resolveCssPath('src/app/(frontend)/globals.css')
    expect(rel).toBe('app/(frontend)/globals.css')
    expect(abs.endsWith('app/(frontend)/globals.css')).toBe(true)
  })
})
