import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { assertSanitized, sanitizeIn, sanitizeViolations } from '.'

const tree = (files: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-sanitize-'))
  for (const [p, body] of Object.entries(files)) {
    mkdirSync(join(root, 'src', p, '..'), { recursive: true })
    writeFileSync(join(root, 'src', p), body)
  }
  return root
}

const kinds = (root: string): string[] => sanitizeViolations(root).map((v) => v.kind)

describe('rules/sanitize — every shape planted, every shape fires', () => {
  it('strip-once: a one-pass tag strip anywhere but xml/escape', () => {
    const root = tree({
      'a/index.ts': "export const t = (s: string) => s.replace(/<[^>]+>/g, '').trim()\n",
      'xml/escape/index.ts': "export const strip = (s: string) => s.replace(/<[^>]*>/g, '')\n",
    })
    const v = sanitizeViolations(root)
    expect(v.map((x) => [x.kind, x.file])).toEqual([['strip-once', 'src/a/index.ts']])
  })

  it('json-into-code: JSON.stringify interpolated into a template that is code; a wrapper passes', () => {
    const root = tree({
      'gen/index.ts': [
        'export const emit = (title: string, safe: (s: string) => string) => `',
        'import { describe } from "vitest"',
        'describe(${JSON.stringify(title)}, () => {})',
        'describe(${safe(title)}, () => {})',
        '`\n',
        'export const prose = (name: string) => `Hello ${JSON.stringify(name)}`\n',
      ].join('\n'),
    })
    expect(kinds(root)).toEqual(['json-into-code'])
  })

  it('host-substring: includes() and a non-dotted endsWith on a hostname; the dotted form passes', () => {
    const root = tree({
      'u/index.ts': [
        'export const ok = (u: URL) => u.hostname.includes("googleusercontent.com") || u.hostname.endsWith("blogspot.com")',
        'export const good = (u: URL) => u.hostname === "blogspot.com" || u.hostname.endsWith(".blogspot.com")',
        'export const other = (s: string) => s.includes("x")\n',
      ].join('\n'),
    })
    expect(kinds(root)).toEqual(['host-substring', 'host-substring'])
  })

  it('quote-escape: a hand-rolled quote escape; JSON.stringify as a literal is the cure, and is not flagged', () => {
    const root = tree({
      'q/index.ts': [
        "export const bad = (s: string) => `'${s.replace(/'/g, \"\\\\'\")}'`",
        'export const good = (s: string) => JSON.stringify(s)\n',
      ].join('\n'),
    })
    expect(kinds(root)).toEqual(['quote-escape'])
  })

  it('proto-path: a dotted-path writer with no prototype refusal; the guarded one passes', () => {
    const root = tree({
      'p/index.ts': [
        'export function setPath(o: Record<string, unknown>, path: string, v: unknown): void {',
        "  const parts = path.split('.'); let cur = o",
        '  for (let i = 0; i < parts.length - 1; i++) { cur = cur[parts[i]!] as Record<string, unknown> }',
        '  cur[parts[parts.length - 1]!] = v',
        '}',
        'export function guarded(o: Record<string, unknown>, path: string, v: unknown): void {',
        "  const parts = path.split('.'); for (const k of parts) if (k === '__proto__') throw new Error(k)",
        '  o[parts[0]!] = v',
        '}',
        "export const reader = (o: Record<string, unknown>, path: string) => path.split('.').reduce<unknown>((c, k) => (c as Record<string, unknown>)[k], o)\n",
      ].join('\n'),
    })
    expect(kinds(root)).toEqual(['proto-path'])
  })

  it('a test file is the proof, not the population — planted defects there do not count', () => {
    const root = tree({ 'a/test.ts': "export const t = (s: string) => s.replace(/<[^>]+>/g, '')\n" })
    expect(sanitizeViolations(root)).toEqual([])
  })

  it('the write-time twin sees the same defect in a changed file, and the ratchet fails closed', () => {
    const root = tree({ 'a/index.ts': "export const t = (s: string) => s.replace(/<[^>]+>/g, '')\n" })
    expect(sanitizeIn([join(root, 'src/a/index.ts')], root).map((v) => v.kind)).toEqual(['strip-once'])
    expect(() => assertSanitized(root, 0)).toThrow(/strip-once/)
    expect(() => assertSanitized(root, 1)).not.toThrow()
  })
})
