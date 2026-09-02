import { mkdtempSync, mkdirSync, renameSync, rmSync, utimesSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, it, expect, afterAll } from 'vitest'
import {
  buildClosureHash,
  suiteClosureHash,
  sealSuiteReceipt,
  suiteReceiptFresh,
  planSuites,
  corpusScanFold,
  sealedScan,
  sealScan,
} from '@/gate/receipt'

const tmp = mkdtempSync(join(tmpdir(), 'receipt-'))
afterAll(() => rmSync(tmp, { recursive: true, force: true }))

const seed = (): void => {
  mkdirSync(join(tmp, 'src', 'a'), { recursive: true })
  writeFileSync(join(tmp, 'src', 'a', 'index.ts'), 'export const a = 1\n')
  writeFileSync(join(tmp, 'src', 'a', 'test.ts'), "import { a } from './index'\nexport const t = a\n")
}
seed()

describe('gate/receipt — same content ⇒ same verdict; only changed suites re-run', () => {
  it('the closure hash is deterministic and moves when ANY closure member moves', () => {
    const h1 = suiteClosureHash('src/a/test.ts', tmp)
    expect(suiteClosureHash('src/a/test.ts', tmp)).toBe(h1)
    writeFileSync(join(tmp, 'src', 'a', 'index.ts'), 'export const a = 2\n')
    const h2 = suiteClosureHash('src/a/test.ts', tmp)
    expect(h2).not.toBe(h1) // the DEPENDENCY moved — the suite file itself did not
  })

  it('a sealed green receipt covers the suite while the hash stands, and expires when it moves', () => {
    const h = suiteClosureHash('src/a/test.ts', tmp)
    expect(suiteReceiptFresh('src/a/test.ts', h, tmp)).toBe(false)
    sealSuiteReceipt('src/a/test.ts', h, tmp)
    expect(suiteReceiptFresh('src/a/test.ts', h, tmp)).toBe(true)
    writeFileSync(join(tmp, 'src', 'a', 'index.ts'), 'export const a = 3\n')
    expect(suiteReceiptFresh('src/a/test.ts', suiteClosureHash('src/a/test.ts', tmp), tmp)).toBe(false)
  })

  it('planSuites splits the roster — covered receipts are cited, changed suites re-run', () => {
    const h = suiteClosureHash('src/a/test.ts', tmp)
    sealSuiteReceipt('src/a/test.ts', h, tmp)
    const plan = planSuites(['src/a/test.ts'], tmp)
    expect(plan.covered).toEqual(['src/a/test.ts'])
    expect(plan.changed).toEqual([])
  })
})

describe('scan receipt — the corpus answers from its address', () => {
  const fixture = (): string => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-scan-fold-'))
    mkdirSync(join(cwd, 'src', 'atom'), { recursive: true })
    writeFileSync(join(cwd, 'src', 'atom', 'index.ts'), 'export const A = 1\n')
    writeFileSync(join(cwd, 'src', 'atom', 'SKILL.md'), '# atom\n')
    return cwd
  }

  it('same content folds to the same address, and a changed byte does not', () => {
    const cwd = fixture()
    try {
      const before = corpusScanFold(cwd)
      expect(corpusScanFold(cwd)).toBe(before)
      writeFileSync(join(cwd, 'src', 'atom', 'index.ts'), 'export const A = 2\n')
      expect(corpusScanFold(cwd)).not.toBe(before)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('MOVING a file moves the fold — the path is bound, not just the bytes', () => {
    const cwd = fixture()
    try {
      const before = corpusScanFold(cwd)
      renameSync(join(cwd, 'src', 'atom', 'index.ts'), join(cwd, 'src', 'atom', 'moved.ts'))
      // Byte-identical content at a different path. A fold over bytes alone would
      // call this unchanged — and this corpus's most common edit is exactly a move.
      expect(corpusScanFold(cwd)).not.toBe(before)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('a sealed verdict is cited at its fold and REFUSED at any other', () => {
    const cwd = fixture()
    try {
      const fold = corpusScanFold(cwd)
      expect(sealedScan<number>('axis', fold, cwd)).toBeNull()
      sealScan('axis', fold, 7, cwd)
      expect(sealedScan<number>('axis', fold, cwd)).toBe(7)
      // The receipt is addressed, not remembered: at a different fold it is gone,
      // never merely old. A stale answer is the one thing a gate may not give.
      expect(sealedScan<number>('axis', 'ffffffffffffffff', cwd)).toBeNull()
      writeFileSync(join(cwd, 'src', 'atom', 'index.ts'), 'export const A = 3\n')
      expect(sealedScan<number>('axis', corpusScanFold(cwd), cwd)).toBeNull()
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})

describe('gate/receipt — a verdict is portable or it is not an address', () => {
  it('the migration stamp is CONTENT, not mtime — a fresh checkout must not void every receipt', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'erpax-receipt-'))
    mkdirSync(join(tmp, 'src', 'migrations'), { recursive: true })
    mkdirSync(join(tmp, 'src', 'atom'), { recursive: true })
    writeFileSync(join(tmp, 'src', 'migrations', '001.ts'), 'export const up = 1\n')
    writeFileSync(join(tmp, 'src', 'atom', 'index.ts'), 'export const A = 1\n')
    writeFileSync(join(tmp, 'src', 'atom', 'test.ts'), 'export const T = 1\n')

    const before = suiteClosureHash('src/atom/test.ts', tmp)

    // Touch every migration the way `git checkout` does: same bytes, new mtime.
    const future = new Date(Date.now() + 86_400_000)
    utimesSync(join(tmp, 'src', 'migrations', '001.ts'), future, future)
    expect(suiteClosureHash('src/atom/test.ts', tmp)).toBe(before)

    // A real schema change still moves it — the stamp measures content, so it must.
    writeFileSync(join(tmp, 'src', 'migrations', '001.ts'), 'export const up = 2\n')
    expect(suiteClosureHash('src/atom/test.ts', tmp)).not.toBe(before)

    rmSync(tmp, { recursive: true, force: true })
  })
})

/*
 * The build gate's address is where a false GREEN could live: cite a build that would actually
 * fail, and the lane reports OK over a broken compile. So the input set errs WIDE, and the two
 * claims it rests on are asserted here rather than assumed.
 */
describe('gate/receipt — the build is a verdict, and its address covers what compiles', () => {
  const fixture = (): string => {
    const tmp = mkdtempSync(join(tmpdir(), 'erpax-build-'))
    mkdirSync(join(tmp, 'src', 'app', 'page'), { recursive: true })
    writeFileSync(join(tmp, 'next.config.ts'), 'export default {}\n')
    writeFileSync(join(tmp, 'package.json'), '{"name":"x"}\n')
    writeFileSync(join(tmp, 'src', 'app', 'page', 'page.tsx'), "import './style.css'\nexport default () => null\n")
    writeFileSync(join(tmp, 'src', 'app', 'page', 'style.css'), '.a { color: red }\n')
    return tmp
  }

  it('a route module moves the address', () => {
    const tmp = fixture()
    const before = buildClosureHash(tmp)
    writeFileSync(join(tmp, 'src', 'app', 'page', 'page.tsx'), "import './style.css'\nexport default () => 1\n")
    expect(buildClosureHash(tmp)).not.toBe(before)
    rmSync(tmp, { recursive: true, force: true })
  })

  it('CSS IS IN THE ADDRESS — a stylesheet compiles, and the TS resolver cannot see it', () => {
    // `import './style.css'` resolves in TS extensions, so the parsed walk never reaches the
    // stylesheet. Folding src/**/*.css wholesale is what stops a broken stylesheet from being
    // cited green.
    const tmp = fixture()
    const before = buildClosureHash(tmp)
    writeFileSync(join(tmp, 'src', 'app', 'page', 'style.css'), '.a { color: blue }\n')
    expect(buildClosureHash(tmp)).not.toBe(before)
    rmSync(tmp, { recursive: true, force: true })
  })

  it('root config moves it — a build reads these whatever the route graph looks like', () => {
    const tmp = fixture()
    const before = buildClosureHash(tmp)
    writeFileSync(join(tmp, 'next.config.ts'), 'export default { reactStrictMode: true }\n')
    expect(buildClosureHash(tmp)).not.toBe(before)
    rmSync(tmp, { recursive: true, force: true })
  })

  it('the same content is the same address — that is the whole citation', () => {
    const tmp = fixture()
    expect(buildClosureHash(tmp)).toBe(buildClosureHash(tmp))
    rmSync(tmp, { recursive: true, force: true })
  })
})
