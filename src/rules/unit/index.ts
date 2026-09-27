/**
 * rules/unit — a unit conversion has one address, and rounding is part of the conversion.
 *
 * A constant everybody knows is the one everybody retypes. See ./SKILL.md.
 *
 * @standard ISO 80000-3 — time: the day as a unit of measure
 * @standard ISO/IEC 25010:2023 §5.6 — maintainability: a change is made once, not once per copy
 */
import ts from 'typescript'
import { astOf, corpusFiles } from '@/syntax/cache'

/** Millisecond values that name a time unit. DECLARED, in the open — a fact about the calendar. */
const DECLARED_UNITS: ReadonlyMap<number, string> = new Map([
  [60_000, 'minute'],
  [3_600_000, 'hour'],
  [86_400_000, 'day'],
  [604_800_000, 'week'],
])

/**
 * The files allowed to hold the divisor.
 *
 * `utility/calculations.ts` is the one address — it declares `MS_PER_DAY` module-private and exports
 * only day-shaped functions, so no caller ever needs the number. This atom and its proof name the
 * constant to talk about it, which a parser cannot distinguish from using it.
 */
const DECLARED_HOME: readonly string[] = [
  'src/utility/calculations.ts',
  'src/rules/unit/index.ts',
  'src/rules/unit/test.ts',
]

export interface UnitViolation {
  readonly file: string
  readonly line: number
  /** The unit the expression re-derives, e.g. `day`. */
  readonly unit: string
  readonly value: number
  readonly excerpt: string
}

/** The product of a `*`-chain of numeric literals, or null when the node is anything else. */
function literalProduct(node: ts.Node): number | null {
  const inner = ts.isParenthesizedExpression(node) ? node.expression : node
  if (ts.isNumericLiteral(inner)) return Number(inner.text)
  if (!ts.isBinaryExpression(inner)) return null
  if (inner.operatorToken.kind !== ts.SyntaxKind.AsteriskToken) return null
  const l = literalProduct(inner.left)
  const r = literalProduct(inner.right)
  return l === null || r === null ? null : l * r
}

/**
 * Every re-derivation of a declared time unit in hand-written source.
 *
 * Parsed, never matched, and that is load-bearing here: `spec/generator/seed.ts` EMITS
 * `86_400_000` inside a template literal because it generates code that will do date arithmetic.
 * That is a string — data, not arithmetic — and a text scan reports it as a violation. The same
 * refusal `rules/confine` and `rules/bypass` each paid for separately.
 *
 * Tests are exempt: a fixture computing "tomorrow" is not a conversion the product depends on.
 *
 * @invariant a numeric literal inside a string or template is never a finding
 * @invariant the declared home is never a finding, so the one address is not its own violation
 */
export function unitRederivations(cwd: string = process.cwd()): UnitViolation[] {
  const out: UnitViolation[] = []
  const prefix = `${cwd}/`
  for (const abs of corpusFiles(cwd)) {
    if (!abs.endsWith('.ts') && !abs.endsWith('.tsx')) continue
    if (abs.endsWith('test.ts') || abs.endsWith('test.tsx')) continue
    // corpusFiles returns ABSOLUTE paths; the home list and every finding are repo-relative, so the
    // prefix is stripped once here. Comparing the two directly is how the first run of this gate
    // exempted nothing and still reported zero — it had passed `(cwd, file)` to the single-argument
    // `astOf`, which parsed the cwd STRING as source. A wrong instrument answers; it does not error.
    const file = abs.startsWith(prefix) ? abs.slice(prefix.length) : abs
    if (DECLARED_HOME.includes(file)) continue
    const src = astOf(abs)
    if (!src) continue
    const visit = (node: ts.Node): void => {
      // Only an expression that is DIVIDED BY or MULTIPLIED BY the value is a conversion; a bare
      // literal elsewhere (a port, a timeout in a config) is not one.
      if (ts.isBinaryExpression(node)) {
        const op = node.operatorToken.kind
        if (op === ts.SyntaxKind.SlashToken || op === ts.SyntaxKind.AsteriskToken) {
          let flagged = false
          for (const side of [node.left, node.right]) {
            const v = literalProduct(side)
            const unit = v === null ? undefined : DECLARED_UNITS.get(v)
            if (v !== null && unit !== undefined) {
              flagged = true
              const line = src.getLineAndCharacterOfPosition(side.getStart(src)).line + 1
              out.push({ file, line, unit, value: v, excerpt: side.getText(src).slice(0, 60) })
            }
          }
          // ONE conversion is one finding. `ms / (1000 * 60 * 60 * 24)` contains `1000 * 60 * 60`
          // as a sub-product, so descending after a hit reported the day AND an hour inside it —
          // double-counting a single conversion, which a ratchet would then carry forever.
          if (flagged) return
        }
      }
      ts.forEachChild(node, visit)
    }
    ts.forEachChild(src, visit)
  }
  return out
}

/**
 * Fails closed. Zero is a **theorem**: a unit conversion re-derived at a second address is a second
 * implementation whose divergence nothing reports — and the rounding that travels with it is the
 * part that reaches a financial report.
 */
export function assertUnitsSealed(cwd: string = process.cwd(), ceiling = 0): void {
  const found = unitRederivations(cwd)
  if (found.length <= ceiling) return
  const lines = found.map((v) => `  ${v.file}:${v.line} re-derives one ${v.unit} — ${v.excerpt}`)
  throw new Error(
    `rules/unit — ${found.length} re-derivation(s) of a declared time unit, ceiling ${ceiling}:\n` +
      `${lines.join('\n')}\n` +
      'Call the day-shaped helpers in `@/utility` (daysBetween · daysBetweenCeil · daysApart · ' +
      'daysExact · daysOverdue · daysRemaining · daysUntil · addDays) instead of the divisor.',
  )
}
