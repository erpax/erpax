/**
 * standard/truth -- the banner-truth lint (required-witness).
 *
 * "all computed for infinite tampering cost": an @standard / @compliance / @audit
 * banner is a CLAIM, and a claim with no computed witness is a tamperable lie
 * (decoration). This derives, from the live tree, the banners whose witness is
 * missing -- clause-specific, two detectors:
 *
 *   A. CONCEPT  -- a banner naming a concrete data concept (e.g. "biometric")
 *      must have that concept as a field name / enum value. Pure org-posture
 *      banners (SOX, GDPR, ISO-27001, audit-trail, tenant-isolation, ...) are
 *      witnessed by the audit/access infrastructure, not a field -> stoplisted.
 *   B. ENFORCEMENT -- a header sentence that claims active behaviour (MUST /
 *      enforce / immutable / obsolete / "driven by `f`" / "computed") and cites
 *      a backtick field `f` must show `f` inside a hooks / beforeChange /
 *      beforeValidate / access / validate guard -- a bare field declaration +
 *      admin.description is NOT a witness.
 *
 * Verified decorations this catches: src/media/sepa/mandates (EPC130-08 36-month
 * "enforceable ... lastCollectionAt" -- no guard), src/customers/kyc/checks
 * (ISO-19794 biometric -- no biometric field).
 *
 *   tsx src/standard/truth/index.ts
 *
 * @standard ISO-19011:2018 6.4.6 audit-evidence (a citation needs evidence)
 * @audit the banner law is computed from the live tree, never hand-maintained
 * @see ../ (standard) -- ../../audit -- ../../proof
 */
import { readdirSync, readFileSync, lstatSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(process.cwd(), 'src')

/** Org-posture / behavioural concepts witnessed by infra (auditFields, access), not a data field. */
const POSTURE = new Set([
  'internal', 'controls', 'control', 'audit', 'trail', 'evidence', 'tenant', 'isolation',
  'privacy', 'pii', 'lawful', 'basis', 'contract', 'segregation', 'duty', 'duties',
  'retention', 'storage', 'limitation', 'cloud', 'service', 'security', 'anti', 'money',
  'laundering', 'wire', 'transfers', 'identification', 'program', 'customer', 'due',
  'diligence', 'directive', 'recommendation', 'act', 'regulation', 'rulebook', 'data',
  'formats', 'format', 'interchange', 'date', 'time', 'datetime', 'initiation', 'general',
  'instruments', 'financial', 'receivables', 'reporting', 'and', 'the', 'of', 'for',
])
/** A sentence claims active behaviour -> needs an executable guard. */
const ENFORCE = /\b(MUST|immutable|enforce\w*|obsolet\w*|driven by|computed|auto-?state|state-?machine|may not|cannot)\b/i
/** A code identifier appears inside an executable guard (not a bare field decl). */
const guarded = (body: string, id: string): boolean => {
  // any occurrence of the id within ~300 chars after a guard keyword
  const re = new RegExp('(beforeChange|beforeValidate|afterChange|validate\\s*:|access\\s*:|hooks\\s*:)[\\s\\S]{0,300}\\b' + id + '\\b')
  return re.test(body)
}

export interface BannerViolation {
  readonly file: string
  readonly detector: 'concept' | 'enforcement'
  readonly clause: string
}

const isRealDir = (p: string): boolean => {
  try {
    const s = lstatSync(p)
    return s.isDirectory() && !s.isSymbolicLink()
  } catch {
    return false
  }
}

function collections(dir: string = ROOT, out: { file: string; text: string }[] = []): { file: string; text: string }[] {
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const e of entries) {
    if (e === 'node_modules' || e.startsWith('.')) continue
    const p = join(dir, e)
    if (isRealDir(p)) collections(p, out)
    else if (e === 'index.ts') {
      const text = readFileSync(p, 'utf8')
      if (/\bslug\s*:\s*['"]/.test(text)) out.push({ file: p, text })
    }
  }
  return out
}

export function bannerTruthViolations(): BannerViolation[] {
  const out: BannerViolation[] = []
  for (const { file, text } of collections()) {
    const hm = text.match(/^\/\*\*[\s\S]*?\*\//)
    const header = hm ? hm[0] : ''
    if (!header) continue
    // body = code after the header, with admin.description string contents blanked (they restate, not witness)
    const body = text.slice(header.length).replace(/description\s*:\s*(['"`])[\s\S]*?\1/g, 'description:""')
    const bodyWords = new Set((body.match(/[A-Za-z][A-Za-z0-9]+/g) || []).map((w) => w.toLowerCase()))
    const rel = file.slice(ROOT.length + 1)

    // Detector A: concept-witness on each @standard/@compliance banner line.
    for (const m of header.matchAll(/@(?:standard|compliance)\s+(.+)/g)) {
      const tokens = m[1]
        .split(/[\s/\-_.:§]+/)
        .map((t) => t.toLowerCase())
        .filter((t) => t.length >= 4 && !/\d/.test(t) && !POSTURE.has(t))
      if (tokens.length === 0) continue // pure standard-id / posture line
      const witnessed = tokens.some((t) => {
        const stem = t.replace(/(ies|s|ing|ed)$/, '')
        return [...bodyWords].some((w) => w.includes(stem) || stem.includes(w.slice(0, 5)))
      })
      if (!witnessed) out.push({ file: rel, detector: 'concept', clause: m[0].trim() })
    }

    // Detector B: enforcement-witness on backtick fields in enforcement sentences.
    for (const line of header.split('\n')) {
      if (!ENFORCE.test(line)) continue
      for (const fm of line.matchAll(/`([A-Za-z][A-Za-z0-9]+)`/g)) {
        const id = fm[1]!
        if (id.length < 4) continue
        if (!guarded(body, id)) out.push({ file: rel, detector: 'enforcement', clause: id + '  <- ' + line.trim().replace(/^\*\s*/, '').slice(0, 90) })
      }
    }
  }
  return out
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const v = bannerTruthViolations()
  const byFile = new Map<string, number>()
  for (const x of v) byFile.set(x.file, (byFile.get(x.file) ?? 0) + 1)
  const concept = v.filter((x) => x.detector === 'concept').length
  const enforce = v.filter((x) => x.detector === 'enforcement').length
  console.log('standard/truth: ' + v.length + ' decorative banner clause(s) across ' + byFile.size + ' collection(s)  [concept ' + concept + ' / enforcement ' + enforce + ']')
  const sepa = v.filter((x) => x.file.includes('sepa'))
  const kyc = v.filter((x) => x.file.includes('kyc'))
  console.log('  verified hits -> sepa: ' + sepa.length + ' | kyc: ' + kyc.length)
  for (const [f, n] of [...byFile.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20)) console.log('  ' + f + '  (' + n + ')')
}
