import { describe, expect, it } from 'vitest'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { assertSurfacesRead, corpusSurfaces, gateSources, surfacesRead, unreadSurfaces } from '@/rules/domain'

const tree = (files: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-domain-'))
  for (const [rel, body] of Object.entries(files)) {
    const p = join(root, 'src', rel)
    mkdirSync(join(p, '..'), { recursive: true })
    writeFileSync(p, body)
  }
  return root
}

describe('rules/domain — a law is enforced on the surfaces its checker reads', () => {
  it('fires on a PLANTED blind surface: a file class present, and no gate naming it', () => {
    const root = tree({
      'rules/index.ts': "import { x } from '@/rules/only'\n",
      'rules/only/index.ts': "export const x = (f: string) => f.endsWith('.ts')\n",
      'a/thing.ts': 'export const a = 1\n',
      'a/style.scss': '.a { color: red }\n',
    })
    expect(unreadSurfaces(root).map((s) => s.extension)).toEqual(['.scss'])
    expect(() => assertSurfacesRead(root, 0)).toThrow(/no wired gate reads/)
    expect(() => assertSurfacesRead(root, 1)).not.toThrow()
  })

  it('a surface stops being blind the moment some gate names it', () => {
    const root = tree({
      'rules/index.ts': "import { x } from '@/rules/only'\n",
      'rules/only/index.ts': "export const x = (f: string) => f.endsWith('.ts') || f.endsWith('.scss')\n",
      'a/style.scss': '.a { color: red }\n',
    })
    expect(unreadSurfaces(root)).toEqual([])
  })

  it('an OPAQUE surface is exempt in the open, not silently skipped', () => {
    // the fixture's own gate must name `.ts`, or `.ts` is (correctly) blind and swamps the case
    const root = tree({ 'rules/index.ts': "export const g = (f: string) => f.endsWith('.ts')\n", 'a/logo.webp': 'x' })
    expect(corpusSurfaces(root).get('.webp')).toBe(1)
    expect(unreadSurfaces(root)).toEqual([]) // declared opaque — a text gate cannot judge it
  })

  // The instrument's FIRST version resolved only the registry's direct imports and reported
  // `.md` as blind, while rules/prose and rules/reference plainly read it. That is the very
  // defect this atom names, committed by the atom itself, so it is pinned here.
  it('counts a rules CHILD as a reader even when the registry does not import it directly', () => {
    const root = tree({
      'rules/index.ts': "// imports nothing, but is itself a reader of '.ts'\n",
      'rules/prose/index.ts': "export const p = (f: string) => f.endsWith('.md')\n",
      'a/doc.md': '# a\n',
    })
    expect(gateSources(root).some((f) => f.includes('rules/prose'))).toBe(true)
    expect(surfacesRead(root).get('.md')).toEqual(['rules/prose'])
    expect(unreadSurfaces(root)).toEqual([])
  })

  it('the live corpus is at or under its ceiling, and .lean is no longer blind', () => {
    const blind = unreadSurfaces(process.cwd()).map((s) => s.extension)
    expect(blind).not.toContain('.lean') // proof/accepted reads it — the reflexive gate closed this
    expect(blind).not.toContain('.tsx')
    expect(blind.length).toBeLessThanOrEqual(5)
  })
})
