import ts from 'typescript'
import { describe, expect, it } from 'vitest'
import { cutInertDeclarations, cutUnusedImports, isInert, orphansFrom, stillAModule, sweepFile } from '@/rules/orphan'

/** A file still parses — the only question that matters after an automated cut. */
const parses = (text: string): boolean =>
  (ts.createSourceFile('x.tsx', text, ts.ScriptTarget.ESNext, true) as unknown as { parseDiagnostics?: unknown[] })
    .parseDiagnostics?.length === 0

describe('rules/orphan — the linter decides, this atom only cuts', () => {
  it('reads unused symbols out of a lint report and ignores every other rule', () => {
    const o = orphansFrom([
      {
        filePath: '/a.ts',
        messages: [
          { ruleId: '@typescript-eslint/no-unused-vars', message: "'dualOf' is defined but never used. Allowed…" },
          { ruleId: '@typescript-eslint/no-unused-vars', message: "'X' is assigned a value but never used." },
          { ruleId: 'no-console', message: "'console' is bad" },
        ],
      },
    ])
    expect(o.map((x) => x.name)).toEqual(['dualOf', 'X'])
  })
})

describe('rules/orphan — the bug that broke a build', () => {
  // TWO ADJACENT DEAD SPECIFIERS. Splicing them out by offset leaves `{ a, , d }` — a PARSE error,
  // not a warning. It reached src/dashboard/index.tsx and turned a cleanup into a red build.
  it('cuts adjacent specifiers without leaving a stray comma', () => {
    const before = "import {\n  a,\n  b,\n  c,\n  d,\n} from './m'\nexport const use = [a, d]\n"
    const after = cutUnusedImports(before, new Set(['b', 'c']))
    expect(after).not.toMatch(/,\s*,/)
    expect(parses(after)).toBe(true)
    expect(after).toContain('a')
    expect(after).toContain('d')
    expect(after).not.toContain('b,')
  })

  it('removes the whole import when every specifier dies', () => {
    const after = cutUnusedImports("import { a, b } from './m'\nexport const x = 1\n", new Set(['a', 'b']))
    expect(after).not.toContain("from './m'")
    expect(parses(after)).toBe(true)
  })

  it('keeps a default import even when every named specifier dies', () => {
    const after = cutUnusedImports("import d, { a } from './m'\nexport const x = d\n", new Set(['a']))
    expect(after).toContain('import d')
    expect(parses(after)).toBe(true)
  })
})

describe('rules/orphan — what it refuses', () => {
  it('cuts an inert constant', () => {
    const r = cutInertDeclarations("const DEAD = /x/i\nexport const y = 1\n", new Set(['DEAD']))
    expect(r.text).not.toContain('DEAD')
    expect(r.refused).toEqual([])
  })

  // A call may DO something. Deleting it is a behaviour change, so it is named, not cut.
  it('REFUSES a declaration whose initializer is a call', () => {
    const r = cutInertDeclarations("const REG = register()\nexport const y = 1\n", new Set(['REG']))
    expect(r.text).toContain('REG')
    expect(r.refused[0]).toMatch(/initializer is a call/)
  })

  // An exported symbol is a FACE. rules/unfolded judges those, with the published-package boundary
  // this atom does not know about.
  it('never touches an exported symbol', () => {
    const src = 'export const FACE = 1\n'
    expect(cutInertDeclarations(src, new Set(['FACE'])).text).toBe(src)
  })

  it('isInert reads through as-expressions and refuses calls', () => {
    const parse = (expr: string): ts.Expression =>
      ((ts.createSourceFile('x.ts', `const a = ${expr}`, ts.ScriptTarget.ESNext, true).statements[0] as ts.VariableStatement)
        .declarationList.declarations[0]!).initializer!
    expect(isInert(parse('[1, 2] as const'))).toBe(true)
    expect(isInert(parse('{ a: 1 }'))).toBe(true)
    expect(isInert(parse('makeIt()'))).toBe(false)
  })
})

describe('rules/orphan — one sweep, both kinds', () => {
  it('cuts the import and the declaration it orphaned, and still parses', () => {
    const before = "import { helper } from './m'\nconst UNUSED = 42\nexport const live = 1\n"
    const r = sweepFile(before, new Set(['helper', 'UNUSED']))
    expect(r.text).not.toContain('helper')
    expect(r.text).not.toContain('UNUSED')
    expect(r.text).toContain('export const live = 1')
    expect(parses(r.text)).toBe(true)
  })
})

// THE MASS LESSON, 2026-09-20. One sweep emptied FOURTEEN files. An empty file is not a module, so
// `export * from './x'` against it fails with "is not a module" — which no lint rule reports and no
// unit test reaches; only tsc sees it, and only because an importer exists. A file swept to nothing
// is a DELETION, and deleting capability is a human's decision, not a cleanup's.
describe('rules/orphan — it will not empty a file', () => {
  it('refuses the sweep that would leave no statements, and says so', () => {
    const before = "import { dead } from './m'\nconst alsoDead = 1\n"
    const r = sweepFile(before, new Set(['dead', 'alsoDead']))
    expect(r.text).toBe(before)
    expect(r.refused.join(' ')).toMatch(/would empty this file/)
  })

  it('still sweeps a file that keeps something', () => {
    const before = "import { dead } from './m'\nexport const live = 1\n"
    const r = sweepFile(before, new Set(['dead']))
    expect(r.text).not.toContain('dead')
    expect(r.text).toContain('export const live = 1')
    expect(r.refused).toEqual([])
  })

  it('stillAModule is the question asked — statements, not bytes', () => {
    expect(stillAModule('// only a comment\n')).toBe(false)
    expect(stillAModule('export const a = 1\n')).toBe(true)
  })
})
