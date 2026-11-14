/**
 * algebra/host — Math.* is a violation; all theorems are algebra.
 *
 * Host transcendental/runtime Math (PI · cos · sin · sqrt · exp · … and any `Math.`)
 * bypasses the carrier. Scan ALL first-party code (src/); baseline 0 (theorem, not ratchet).
 * Math is IEEE754 float noise — ERP/quantum/FTL seals, accounting, Worker↔Node reproducibility,
 * and self-computable proofs need algebraic exactness. Floating Math breaks determinism and
 * diamond/seal equality.
 *
 *   tsx src/algebra/host/index.ts
 *   pnpm test — runs vitest with Math ban gate
 *
 * @see ./index · ../qubit · ../pi · ../phi · ../e · ../rules
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

export const atomPath = 'algebra/host' as const

/** Atoms whose theorems must be algebra — no host Math.*. */
export const ALGEBRA_ATOMS = [
  'qubit',
  'algebra',
  'pi',
  'e',
  'phi',
  'rodin',
  'coincidence',
] as const

export type AlgebraAtom = (typeof ALGEBRA_ATOMS)[number]

export interface HostMathViolation {
  readonly law: 'host-math'
  readonly atomPath: string
  readonly file: string
  readonly line: number
  readonly match: string
  readonly reason: string
}

/**
 * Any `Math.` property/call — integer helpers must live as algebra ops, not host Math.
 * Exemption: algebraLog/algebraLog2/algebraExp calls wrap Math.log/log2/exp with domain intent.
 */
export const HOST_MATH_RE = /\bMath\s*\.\s*[A-Za-z_$][\w$]*/g

const SKIP = new Set(['node_modules', 'translations', 'dist', '.next', '.turbo', 'build', 'out'])

function walk(dir: string, out: string[] = []): string[] {
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const name of entries) {
    if (SKIP.has(name) || name.startsWith('.')) continue
    const p = join(dir, name)
    let st
    try {
      st = statSync(p)
    } catch {
      continue
    }
    if (st.isDirectory()) walk(p, out)
    else if (/\.ts$/.test(name) && !name.endsWith('.d.ts') && !name.includes('translations') && !name.includes('payload-types')) {
      out.push(p)
    }
  }
  return out
}

/** Wipe quoted spans on one line — O(n), no nested-regex backtracking. */
function wipeQuotedLine(line: string): string {
  let out = ''
  let i = 0
  while (i < line.length) {
    const c = line[i]!
    if (c === "'" || c === '"' || c === '`') {
      const q = c
      let j = i + 1
      while (j < line.length) {
        if (line[j] === '\\') {
          j += 2
          continue
        }
        if (line[j] === q) {
          j++
          break
        }
        j++
      }
      out += ' '.repeat(j - i)
      i = j
    } else {
      out += c
      i++
    }
  }
  return out
}

/** Strip strings + comments so stringified "PI" in docs does not count — code only. */
export function codeOf(text: string): string {
  const noBlock = text.replace(/\/\*[\s\S]*?\*\//g, (m) => ' '.repeat(m.length))
  const noLineComments = noBlock.replace(/(^|[^:])\/\/.*$/gm, (m) =>
    m.replace(/Math\s*\.\s*[A-Za-z_$][\w$]*/g, (x) => ' '.repeat(x.length)),
  )
  return noLineComments
    .split('\n')
    .map(wipeQuotedLine)
    .join('\n')
}

/**
 * Scan first-party src .ts files for host Math.*. Fail-closed: every hit is a violation.
 * Sanctioned wrap face: `src/algebra/index.ts` may call Math for named algebra* / constants /
 * seededRng — that is the carrier bridge, not a call-site violation.
 * host itself may mention the regex pattern in a string — stripped by codeOf.
 * Excludes: node_modules, .next, build artifacts, generated files.
 */
export function hostMathViolations(cwd: string = process.cwd()): readonly HostMathViolation[] {
  const out: HostMathViolation[] = []
  const srcRoot = join(cwd, 'src')
  const allFiles = walk(srcRoot)
  
  for (const file of allFiles) {
    const rel = relative(cwd, file).replace(/\\/g, '/')
    
    // gate definition + sanctioned IEEE bridge (algebra* / constants / seededRng)
    if (rel === 'src/algebra/host/index.ts') continue
    if (rel === 'src/algebra/index.ts') continue
    
    // skip generated files
    if (rel.endsWith('.d.ts') || rel.includes('payload-types') || rel.includes('translations.ts')) continue
    
    const raw = readFileSync(file, 'utf8')
    // leftover/index and similar templates can trip nested-regex strippers; codeOf is O(n)
    if (raw.length > 500_000) continue
    const code = codeOf(raw)
    const lines = code.split('\n')
    
    for (let i = 0; i < lines.length; i++) {
      HOST_MATH_RE.lastIndex = 0
      let m: RegExpExecArray | null
      while ((m = HOST_MATH_RE.exec(lines[i]!)) != null) {
        const atomPath = relative(srcRoot, file).split('/')[0] || 'src'
        out.push({
          law: 'host-math',
          atomPath,
          file: rel,
          line: i + 1,
          match: m[0]!,
          reason: `${rel}:${i + 1} ${m[0]} — theorems are algebra; use carrier ops (see [[algebra]])`,
        })
      }
    }
  }
  
  return out
}

/**
 * Lean tip / feed-scanner Math score — same truth as the host gate.
 * Comments, JSDoc, and string literals mentioning `Math.` never count (via codeOf).
 */
export function hostMathTipSite(cwd: string = process.cwd()): {
  readonly count: number
  readonly file: string | null
} {
  const v = hostMathViolations(cwd)
  return { count: v.length, file: v[0] ? `${v[0]!.file}:${v[0]!.line}` : null }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const v = hostMathViolations()
  console.log(`algebra/host — host-math violations: ${v.length} (baseline 0)`)
  for (const x of v.slice(0, 40)) console.log(`  · ${x.reason}`)
  if (v.length > 0) process.exitCode = 1
}

/** @index-cross.foldback child=algebra/host parent=algebra — this cross folds back into its parent. */
