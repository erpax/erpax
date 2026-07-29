import { PI } from '@/algebra'
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

/** Strip strings + comments so stringified "PI" in docs does not count — code only. */
export function codeOf(text: string): string {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, (m) => ' '.repeat(m.length))
    .replace(/(^|[^:])\/\/.*$/gm, (m) => m.replace(/Math\s*\.\s*[A-Za-z_$][\w$]*/g, (x) => ' '.repeat(x.length)))
    .replace(/(['"`])(?:\\.|(?!\1)[\s\S])*\1/g, (m) => ' '.repeat(m.length))
}

/**
 * Scan ALL first-party code (src/) for host Math.*. Fail-closed: every hit is a violation.
 * `host.ts` itself may mention the regex pattern in a string — stripped by codeOf.
 * Excludes: node_modules, .next, build artifacts, generated files.
 */
export function hostMathViolations(cwd: string = process.cwd()): readonly HostMathViolation[] {
  const out: HostMathViolation[] = []
  const srcRoot = join(cwd, 'src')
  const allFiles = walk(srcRoot)
  
  for (const file of allFiles) {
    const rel = relative(cwd, file).replace(/\\/g, '/')
    
    // gate definition file: allow the scanner source only
    if (rel === 'src/algebra/host/index.ts') continue
    
    // skip generated files
    if (rel.endsWith('.d.ts') || rel.includes('payload-types') || rel.includes('translations.ts')) continue
    
    const raw = readFileSync(file, 'utf8')
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

if (import.meta.url === `file://${process.argv[1]}`) {
  const v = hostMathViolations()
  console.log(`algebra/host — host-math violations: ${v.length} (baseline 0)`)
  for (const x of v.slice(0, 40)) console.log(`  · ${x.reason}`)
  if (v.length > 0) process.exitCode = 1
}
