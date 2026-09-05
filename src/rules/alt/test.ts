import { describe, expect, it } from 'vitest'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { assertNonTextNamed, emptyNameFallbacks, unnamedNonText } from '@/rules/alt'

const tree = (files: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-alt-'))
  for (const [rel, body] of Object.entries(files)) {
    const p = join(root, 'src', rel)
    mkdirSync(join(p, '..'), { recursive: true })
    writeFileSync(p, body)
  }
  return root
}

describe('rules/alt — WCAG 2.2 §1.1.1, non-text content carries a text alternative', () => {
  it('flags a non-text element rendered with no accessible name', () => {
    const root = tree({ 'a/C.tsx': 'export const C = () => <Media resource={r} />\n' })
    expect(unnamedNonText(root)).toEqual([{ file: 'src/a/C.tsx', line: 1, element: 'Media' }])
  })

  it('accepts any of alt · aria-label · aria-labelledby · aria-hidden · role · title', () => {
    for (const attr of ['alt="x"', 'aria-label="x"', 'aria-labelledby="i"', 'aria-hidden', 'role="img"', 'title="x"']) {
      const root = tree({ 'a/C.tsx': `export const C = () => <img src="s" ${attr} />\n` })
      expect(unnamedNonText(root)).toEqual([])
    }
  })

  it('trusts a spread — the name may arrive through it, and flagging it would be noise', () => {
    const root = tree({ 'a/C.tsx': 'export const C = (p) => <Media {...p} />\n' })
    expect(unnamedNonText(root)).toEqual([])
  })

  // The sharper half, and the one invisible at every call site. `alt=""` is VALID WCAG — it
  // declares an image DECORATIVE and a screen reader skips it. So `alt = fromCms || ''` turns
  // "the author left the field blank" into "this image carries no information", silently, for
  // every image in the CMS. Conformance asserted, failure unobservable.
  it('flags an accessible name defaulted to the empty string', () => {
    const root = tree({ 'a/M.tsx': "const alt = altFromResource || ''\nexport const M = () => <img alt={alt} src='s' />\n" })
    expect(emptyNameFallbacks(root)).toHaveLength(1)
    expect(emptyNameFallbacks(root)[0]!.text).toContain("altFromResource || ''")
  })

  it('flags the JSX form too', () => {
    const root = tree({ 'a/M.tsx': "export const M = () => <img alt={x || ''} src='s' />\n" })
    expect(emptyNameFallbacks(root)).toHaveLength(1)
  })

  // The false positive a regex over these lines produces, and why this is parsed.
  it('a page TITLE built with an empty fallback is a string, not an accessible name', () => {
    const root = tree({ 'a/P.tsx': "export const meta = { title: `Posts ${pageNumber || ''}` }\n" })
    expect(emptyNameFallbacks(root)).toEqual([])
  })

  it('a non-empty fallback is a real alternative and is not flagged', () => {
    const root = tree({ 'a/M.tsx': "const alt = fromCms || 'product photo'\n" })
    expect(emptyNameFallbacks(root)).toEqual([])
  })

  it('the live corpus is at or under its ceiling', () => {
    expect(() => assertNonTextNamed(process.cwd(), 10)).not.toThrow()
    expect(unnamedNonText(process.cwd()).length + emptyNameFallbacks(process.cwd()).length).toBeLessThanOrEqual(10)
  })

  it('the two live empty-fallbacks are in the image component, where every CMS image passes', () => {
    const live = emptyNameFallbacks(process.cwd())
    expect(live).toHaveLength(2)
    expect(live.every((f) => f.file.includes('media/image'))).toBe(true)
  })
})
