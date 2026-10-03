/**
 * millennium/data — every Clay statement, crossed with every perspective the corpus reads it from,
 * and tested against every usable public dataset. See SKILL.md.
 *
 * Nothing here proves a Millennium problem; `corpusSolves` stays the literal false. What a public
 * dataset can give is a BOUNDED WITNESS: on these curves the analytic rank equals the algebraic
 * rank, on these zeros the counting formula holds, on these primes the Euler product meets the
 * series. A witness that holds is consistency on a finite sample; a witness that fails would be a
 * counterexample. Where no public dataset can test a statement, that is said, not papered over.
 *
 * @see Riemann 1859 / von Mangoldt 1905 — cited, not conformed to: the zero-counting formula N(T)
 * @see Birch & Swinnerton-Dyer 1965 — cited, not conformed to: ord_{s=1} L(E,s) = rank E(ℚ)
 * @see Euler 1737 — cited, not conformed to: the product over primes equals the Dirichlet series
 */
import ts from 'typescript'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { PI, algebraExp, algebraLog2 } from '@/algebra'
import { MILLENNIUM, type Problem } from '@/millennium'
import { receiptAddress } from '@/outward'
import { citationsIn } from '@/rules/citation'

export type FetchText = (url: string) => Promise<string>

/** The default reader: a browser-shaped UA, because the bare node UA is refused by two of the three hosts. */
export const fetchText: FetchText = async (url) => {
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (erpax millennium/data)', 'accept-language': 'en' } })
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`)
  return res.text()
}

export interface Witness {
  /** The statement held on every sampled point. */
  readonly holds: boolean
  /** How many points were checked. */
  readonly witnesses: number
  /** The worst deviation observed, in the formula's own unit. */
  readonly worst: number
  /** The bound the deviation was held to. */
  readonly bound: number
  readonly note: string
}

export interface DatasetProbe {
  readonly problem: string
  /** The formula under test, as the dataset lets it be stated. */
  readonly formula: string
  readonly source: string
  readonly url: string
  readonly check: (text: string) => Witness
}

/** A statement no public dataset can test — said plainly, never scored. */
export interface Refusal {
  readonly problem: string
  readonly why: string
}

const E = algebraExp(1)
const ln = (x: number): number => algebraLog2(x) / algebraLog2(E)
const TWO_PI = 2 * PI

/**
 * Riemann–von Mangoldt: the number of zeros with 0 < γ ≤ T is (T/2π)·ln(T/2πe) + 7/8 + S(T), with
 * S(T) small — |S(T)| < 1 throughout Odlyzko's first table. Read T between consecutive zeros so the
 * count is unambiguous, and hold the deviation to 1.
 */
export function riemannCounting(text: string): Witness {
  const zeros = text.split('\n').map((l) => Number(l.trim())).filter((t) => Number.isFinite(t) && t > 0)
  let worst = 0
  let increasing = true
  for (let n = 1; n < zeros.length; n++) {
    if (zeros[n]! <= zeros[n - 1]!) increasing = false
    const T = (zeros[n - 1]! + zeros[n]!) / 2
    const main = (T / TWO_PI) * ln(T / (TWO_PI * E)) + 7 / 8
    const dev = n - main
    if (dev > worst) worst = dev
    if (-dev > worst) worst = -dev
  }
  return {
    holds: increasing && zeros.length > 1 && worst < 1,
    witnesses: zeros.length,
    worst,
    bound: 1,
    note: increasing ? 'N(T) = (T/2π)·ln(T/2πe) + 7/8 + S(T), |S(T)| < 1 on the sample' : 'the table is not increasing — not a zero table',
  }
}

/** BSD on LMFDB's curves: the analytic rank LMFDB computed equals the algebraic rank it recorded, curve by curve. */
export function bsdRanks(text: string): Witness {
  const rows = (JSON.parse(text) as { data?: { lmfdb_label: string; rank: number | null; analytic_rank: number | null }[] }).data ?? []
  const compared = rows.filter((r) => r.rank !== null && r.analytic_rank !== null)
  const off = compared.filter((r) => r.rank !== r.analytic_rank)
  return {
    holds: compared.length > 0 && off.length === 0,
    witnesses: compared.length,
    worst: off.length,
    bound: 0,
    note: off.length === 0 ? 'ord_{s=1} L(E,s) = rank E(ℚ) on every sampled curve' : `disagree on ${off.map((r) => r.lmfdb_label).join(', ')}`,
  }
}

/**
 * Euler's product over the OEIS primes against the Dirichlet series it equals: Σ_{n≤P} n⁻² and
 * ∏_{p≤P} (1 − p⁻²)⁻¹ both approximate ζ(2) with tails of order 1/P, so their difference is held to
 * 2/P. No π enters: the identity is between the two sides, not against a constant.
 */
export function eulerProduct(text: string): Witness {
  const parsed = JSON.parse(text) as unknown
  const first = Array.isArray(parsed) ? parsed[0] : (parsed as { results?: unknown[] }).results?.[0]
  const data = String((first as { data?: string } | undefined)?.data ?? '')
  const primes = data.split(',').map((s) => Number(s.trim())).filter((p) => Number.isInteger(p) && p > 1)
  const P = primes[primes.length - 1] ?? 0
  let product = 1
  for (const p of primes) product /= 1 - 1 / (p * p)
  let series = 0
  for (let n = 1; n <= P; n++) series += 1 / (n * n)
  const dev = product > series ? product - series : series - product
  const bound = P > 0 ? 2 / P : 0
  return {
    holds: primes.length > 10 && dev <= bound,
    witnesses: primes.length,
    worst: dev,
    bound,
    note: `∏_{p≤${P}} (1−p⁻²)⁻¹ against Σ_{n≤${P}} n⁻², tails O(1/P)`,
  }
}

/** DECLARED — the datasets the corpus can reach without a credential, and the formula each one tests. */
export const datasets = (): readonly DatasetProbe[] => [
  {
    problem: 'Riemann Hypothesis',
    formula: 'N(T) = (T/2π)·ln(T/2πe) + 7/8 + S(T)',
    source: 'Odlyzko — the first 100,000 zeros of ζ',
    url: 'https://www-users.cse.umn.edu/~odlyzko/zeta_tables/zeros1',
    check: riemannCounting,
  },
  {
    problem: 'Riemann Hypothesis',
    formula: '∏_p (1 − p⁻²)⁻¹ = Σ_n n⁻²',
    source: 'OEIS A000040 — the primes',
    url: 'https://oeis.org/search?q=id:A000040&fmt=json',
    check: eulerProduct,
  },
  {
    problem: 'Birch–Swinnerton-Dyer',
    formula: 'ord_{s=1} L(E,s) = rank E(ℚ)',
    source: 'LMFDB ec_curvedata — rank and analytic_rank',
    url: 'https://www.lmfdb.org/api/ec_curvedata/?_format=json&_fields=lmfdb_label,rank,analytic_rank,conductor&_limit=200',
    check: bsdRanks,
  },
]

/** DECLARED — the statements no public dataset tests, with the reason, so absence reads as a refusal and never as a pass. */
export const refusals = (): readonly Refusal[] => [
  { problem: 'P vs NP', why: 'a separation of complexity classes has no dataset: every instance is consistent with both answers' },
  { problem: 'Navier–Stokes existence & smoothness', why: 'global regularity is a statement about all time; a turbulence database is a finite record of one flow' },
  { problem: 'Yang–Mills existence & mass gap', why: 'lattice glueball spectra are published as papers, not as a public API; and existence is not a measurement' },
  { problem: 'Hodge Conjecture', why: 'no public dataset of Hodge classes and algebraic cycles exists to sample' },
  { problem: 'Poincaré Conjecture', why: 'solved by Perelman; a theorem is not sampled' },
]

export interface DataRow {
  readonly problem: string
  readonly formula: string
  readonly source: string
  readonly reachable: boolean
  readonly witness: Witness | null
  /** `receiptAddress` of the raw dataset text — the answer the witness was computed from, addressed. */
  readonly receipt: string
  readonly note: string
}

/** Run every dataset probe. Unreachable is reported as unreachable — never as a pass, never as a failure of the formula. */
export async function testClayData(fetchImpl: FetchText = fetchText): Promise<DataRow[]> {
  return Promise.all(
    datasets().map(async (d): Promise<DataRow> => {
      try {
        const text = await fetchImpl(d.url)
        const witness = d.check(text)
        return { problem: d.problem, formula: d.formula, source: d.source, reachable: true, witness, receipt: receiptAddress(text), note: witness.note }
      } catch (e) {
        return { problem: d.problem, formula: d.formula, source: d.source, reachable: false, witness: null, receipt: '', note: String((e as Error)?.message ?? e).slice(0, 120) }
      }
    }),
  )
}

export interface Perspective {
  readonly problem: string
  /** Atoms the lens names that exist on disk (a SKILL.md at the path). */
  readonly lensAtoms: readonly string[]
  /** Wikilinks the lens names that resolve to nothing — a lens pointing at a missing atom. */
  readonly danglingLens: readonly string[]
  /** Files that import @/millennium, each with the standards it cites. */
  readonly referrers: readonly { readonly file: string; readonly standards: readonly string[] }[]
  readonly tested: boolean
  readonly refused: string | null
}

const atomExists = (cwd: string, path: string): boolean => existsSync(join(cwd, 'src', path, 'SKILL.md'))

function millenniumReferrers(cwd: string): { file: string; standards: string[] }[] {
  const out: { file: string; standards: string[] }[] = []
  const walk = (d: string): void => {
    for (const e of readdirSync(d)) {
      if (e === 'node_modules' || e.startsWith('.') || e === 'skills') continue
      const p = join(d, e)
      const st = statSync(p)
      if (st.isDirectory()) walk(p)
      else if (/\.tsx?$/.test(e) && !/generated|\.d\.ts$|(^|\/)test\.tsx?$/.test(p)) {
        const text = readFileSync(p, 'utf8')
        if (!text.includes('@/millennium')) continue
        const src = ts.createSourceFile(p, text, ts.ScriptTarget.Latest, true)
        const imports = src.statements.some(
          (s) => ts.isImportDeclaration(s) && ts.isStringLiteral(s.moduleSpecifier) && s.moduleSpecifier.text === '@/millennium',
        )
        const rel = relative(cwd, p)
        if (imports && !rel.startsWith('src/millennium/')) out.push({ file: rel, standards: [...citationsIn(p, text)].sort() })
      }
    }
  }
  walk(join(cwd, 'src'))
  return out.sort((a, b) => a.file.localeCompare(b.file))
}

/** Every problem crossed with the perspectives the corpus reads it from — lens atoms, referrers, dataset or refusal. */
export function perspectives(cwd: string = process.cwd(), problems: readonly Problem[] = MILLENNIUM): Perspective[] {
  const referrers = millenniumReferrers(cwd)
  return problems.map((p) => {
    const links = [...p.lens.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1]!).map((l) => l.replace(/^rules\]\]\//, 'rules/'))
    const lensAtoms = links.filter((l) => atomExists(cwd, l))
    const danglingLens = links.filter((l) => !atomExists(cwd, l))
    return {
      problem: p.name,
      lensAtoms,
      danglingLens,
      referrers,
      tested: datasets().some((d) => d.problem === p.name),
      refused: refusals().find((r) => r.problem === p.name)?.why ?? null,
    }
  })
}

/** Every problem is either tested on a dataset or refused with a reason — never silently neither. */
export function coverageGaps(problems: readonly Problem[] = MILLENNIUM): string[] {
  return problems.filter((p) => !datasets().some((d) => d.problem === p.name) && !refusals().some((r) => r.problem === p.name)).map((p) => p.name)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void (async () => {
    console.log('millennium/data — every Clay statement, crossed and tested where a public dataset exists\n')
    for (const row of await testClayData()) {
      const w = row.witness
      console.log(`  ${row.reachable ? (w?.holds ? 'HOLDS ' : 'FAILS ') : 'UNREACHABLE'} ${row.problem} — ${row.formula}`)
      console.log(`         ${row.source}${w ? ` · ${w.witnesses} witnesses · worst ${w.worst.toExponential(2)} ≤ ${w.bound}` : ''} · receipt ${row.receipt || '—'}`)
      console.log(`         ${row.note}`)
    }
    for (const r of refusals()) console.log(`  REFUSED ${r.problem} — ${r.why}`)
    console.log(`\n  coverage gaps: ${coverageGaps().join(', ') || 'none'}`)
    for (const p of perspectives()) console.log(`  ${p.problem}: lens ${p.lensAtoms.join(' · ') || '—'}${p.danglingLens.length ? ` · dangling ${p.danglingLens.join(' · ')}` : ''}`)
  })()
}
