import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { copyCount, duplicateBodies } from './index'

const tree = (files: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-copy-'))
  for (const [rel, body] of Object.entries(files)) {
    const full = join(root, 'src', rel)
    mkdirSync(join(full, '..'), { recursive: true })
    writeFileSync(full, body)
  }
  return root
}

const big = (extra: string) => `export function f() {
  const a = 1; const b = 2; const c = 3; const d = 4; const e = 5
  const g = [a, b, c, d, e].map((x) => x * 2).filter((x) => x > 2).reduce((s, x) => s + x, 0)
  const h = { a, b, c, d, e, g, ${extra} }
  return Object.keys(h).length + g
}
`

describe('rules/copy — same bytes, same address', () => {
  it('finds one body at two addresses', () => {
    const root = tree({ 'a/index.ts': big('z: 1'), 'b/index.ts': big('z: 1') })
    try {
      const g = duplicateBodies(root, 20)
      expect(g.length).toBe(1)
      expect(g[0]!.sites.map((s) => s.file).sort()).toEqual(['src/a/index.ts', 'src/b/index.ts'])
      expect(copyCount(root, 20)).toBe(1)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  // Comments are data, not code: two identical implementations documented differently are still one.
  it('ignores comments and whitespace — the same code annotated twice is one body', () => {
    const root = tree({
      'a/index.ts': big('z: 1'),
      'b/index.ts': '// a thorough explanation\n' + big('z: 1').replace('const a = 1;', 'const a = 1; /* one */'),
    })
    try {
      expect(copyCount(root, 20)).toBe(1)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  // Identifiers are NOT normalised. A body that reads different names is doing something else until
  // a human says otherwise, and erasing names is how a duplicate report fills with false pairs.
  it('does NOT collapse two bodies that differ only in what they name', () => {
    const root = tree({ 'a/index.ts': big('z: 1'), 'b/index.ts': big('y: 1') })
    try {
      expect(duplicateBodies(root, 20)).toEqual([])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('respects the declared noise floor — a small shared body is not a finding', () => {
    const tiny = 'export const f = () => 1\n'
    const root = tree({ 'a/index.ts': tiny, 'b/index.ts': tiny })
    try {
      expect(duplicateBodies(root, 40)).toEqual([])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('skips generated faces, which restate every symbol', () => {
    const root = tree({ 'a/index.ts': big('z: 1'), 'a/thing.generated.ts': big('z: 1') })
    try {
      expect(duplicateBodies(root, 20)).toEqual([])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('skips tests, where scaffolding legitimately repeats', () => {
    const root = tree({ 'a/index.ts': big('z: 1'), 'a/test.ts': big('z: 1') })
    try {
      expect(duplicateBodies(root, 20)).toEqual([])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('counts copies BEYOND the first — what DRY would actually remove', () => {
    const root = tree({ 'a/index.ts': big('z: 1'), 'b/index.ts': big('z: 1'), 'c/index.ts': big('z: 1') })
    try {
      expect(copyCount(root, 20)).toBe(2)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})

describe('rules/copy — the live corpus', () => {
  it('reports groups largest-first, so the biggest copy is read first', () => {
    const g = duplicateBodies(process.cwd())
    expect(g.length).toBeGreaterThan(0)
    for (let i = 1; i < g.length; i++) {
      expect(g[i]!.nodes * g[i]!.sites.length).toBeLessThanOrEqual(g[i - 1]!.nodes * g[i - 1]!.sites.length)
    }
  })

  it('every group really has two or more distinct sites', () => {
    for (const g of duplicateBodies(process.cwd())) {
      expect(new Set(g.sites.map((s) => `${s.file}:${s.line}`)).size).toBeGreaterThan(1)
    }
  })
})
