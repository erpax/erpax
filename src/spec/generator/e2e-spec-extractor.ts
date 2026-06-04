/**
 * e2e-spec extractor — harvest per-step "what is happening" descriptions
 * directly from the Playwright e2e specs, where the test author already
 * wrote them in `captureWorkflowStep(...)` / `safeCaptureRoute(...)` /
 * `recordUxGap(...)` calls. The codebase IS the source — there is no
 * better place.
 *
 * Slice CCCCC-cut2-i18n (2026-05-11). User insight: "the multimedia
 * should show what is happening and there is no better place from the
 * codebase." Each capture call's last argument is the canonical caption
 * for that frame; each `recordUxGap` is the canonical UX-gap annotation.
 *
 * Source patterns recognised:
 *
 *   captureWorkflowStep(page, testInfo, WORKFLOW, 'NN-step-id', 'Description')
 *   safeCaptureRoute   (page, testInfo, WORKFLOW, 'NN-step-id', URL, 'Description')
 *   recordUxGap        (testInfo, WORKFLOW, 'NN-step-id', 'severity', 'Gap text')
 *
 * The `WORKFLOW` constant resolves through a single `const WORKFLOW =
 * '<id>'` declaration at the top of the spec (always present in the
 * codebase's e2e files; if missing, the spec is skipped — workflow
 * inference is not guessed).
 *
 * @standard ISO/IEC-29119:2022 software-testing test-evidence
 * @standard ISO 19011:2018 §6.4.6 audit-evidence-spec-traceability
 * @audit single-source-of-truth: spec ↔ generated captions
 */

import { readdirSync, existsSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

export type GapSeverity = 'info' | 'minor' | 'major' | 'blocker' | 'critical'

export interface UxGap {
  readonly stepId: string
  readonly severity: GapSeverity
  readonly description: string
}

export interface E2eStep {
  readonly stepId: string
  /** "What is happening at this frame", harvested from the spec's call. */
  readonly description: string
  /** Optional URL the step navigates to (safeCaptureRoute). */
  readonly url?: string
  /** Source-file location (relative path + line number). */
  readonly sourceLocation: string
}

export interface E2eWorkflowSpec {
  readonly workflow: string
  /** Spec-file path (relative to repo root). */
  readonly filePath: string
  /** Test title (from the first `test('…', …)` call). */
  readonly testTitle?: string
  /** describe-block title (`test.describe('…')`). */
  readonly describeTitle?: string
  readonly steps: ReadonlyArray<E2eStep>
  readonly gaps: ReadonlyArray<UxGap>
}

export interface E2eSpecCorpus {
  readonly specs: ReadonlyArray<E2eWorkflowSpec>
  readonly byWorkflow: ReadonlyMap<string, E2eWorkflowSpec>
  readonly extractedAt: Date
}

const WORKFLOW_DECL = /^\s*const\s+WORKFLOW\s*=\s*['"]([a-z][a-z0-9-]*)['"]/m

/**
 * Permissive matcher for tagged-template-style strings — allows literal
 * single-quote / double-quote / backtick strings AND template literals
 * with `${BASE}`-style interpolation (the description is the human-readable
 * trailing string).
 */
interface SpecCallSite {
  fn: 'captureWorkflowStep' | 'safeCaptureRoute' | 'recordUxGap'
  args: string[]
  line: number
}

/** Crude but reliable tokeniser for the three call shapes we care about. */
function findCallSites(src: string): SpecCallSite[] {
  const out: SpecCallSite[] = []
  // Locate each function call by name; from the `(`, walk until matching `)`
  // tracking nesting + string literals.
  const fnRe = /\b(captureWorkflowStep|safeCaptureRoute|recordUxGap)\s*\(/g
  for (const m of src.matchAll(fnRe)) {
    const fn = m[1] as SpecCallSite['fn']
    const start = m.index! + m[0].length
    let i = start
    let depth = 1
    let buf = ''
    while (i < src.length && depth > 0) {
      const ch = src[i]
      if (ch === '"' || ch === "'" || ch === '`') {
        // Skip string literal verbatim.
        let j = i + 1
        while (j < src.length) {
          if (src[j] === '\\') { j += 2; continue }
          if (src[j] === ch) { j += 1; break }
          j += 1
        }
        buf += src.slice(i, j)
        i = j
        continue
      }
      if (ch === '(') depth += 1
      else if (ch === ')') { depth -= 1; if (depth === 0) break }
      buf += ch
      i += 1
    }
    const args = splitArgs(buf)
    const line = src.slice(0, m.index!).split('\n').length
    out.push({ fn, args, line })
  }
  return out
}

/** Split a captured argument list on top-level commas (string-literal aware). */
function splitArgs(s: string): string[] {
  const out: string[] = []
  let depth = 0
  let buf = ''
  let i = 0
  while (i < s.length) {
    const ch = s[i]
    if (ch === '"' || ch === "'" || ch === '`') {
      let j = i + 1
      while (j < s.length) {
        if (s[j] === '\\') { j += 2; continue }
        if (s[j] === ch) { j += 1; break }
        j += 1
      }
      buf += s.slice(i, j); i = j; continue
    }
    if (ch === '(' || ch === '[' || ch === '{') depth++
    else if (ch === ')' || ch === ']' || ch === '}') depth--
    else if (ch === ',' && depth === 0) { out.push(buf.trim()); buf = ''; i++; continue }
    buf += ch; i++
  }
  if (buf.trim().length > 0) out.push(buf.trim())
  return out
}

/** Strip the outer quotes of a string-literal expression. */
function unwrapString(expr: string): string | undefined {
  const m = expr.match(/^[`'"]([\s\S]*)[`'"]$/)
  if (!m) return undefined
  // Replace `${X}`-style template interpolations with a stable placeholder so
  // the harvested caption reads naturally even when the variable isn't
  // resolved (e.g. `${BASE}/admin/...` → `/admin/...`).
  return m[1].replace(/\$\{([^}]+)\}/g, (_, x) => x.trim() === 'BASE' ? '' : `{${x.trim()}}`)
}

/** Parse one spec file. */
export function parseE2eSpec(absPath: string, repoRoot: string): E2eWorkflowSpec | null {
  const src = readFileSync(absPath, 'utf8')
  const wfMatch = src.match(WORKFLOW_DECL)
  if (!wfMatch) return null
  const workflow = wfMatch[1]
  const filePath = relative(repoRoot, absPath)

  const describeMatch = src.match(/test\.describe\s*\(\s*(['"`])([^`'"]+)\1/)
  const testMatch = src.match(/\btest\s*\(\s*(['"`])([^`'"]+)\1/)

  const steps: E2eStep[] = []
  const gaps: UxGap[] = []
  for (const c of findCallSites(src)) {
    if (c.fn === 'captureWorkflowStep') {
      // (page, testInfo, WORKFLOW, stepId, description)
      const stepId = unwrapString(c.args[3] ?? '')
      const description = unwrapString(c.args[4] ?? '')
      if (stepId && description) {
        steps.push({ stepId, description, sourceLocation: `${filePath}:${c.line}` })
      }
    } else if (c.fn === 'safeCaptureRoute') {
      // (page, testInfo, WORKFLOW, stepId, url, description)
      const stepId = unwrapString(c.args[3] ?? '')
      const url = unwrapString(c.args[4] ?? '')
      const description = unwrapString(c.args[5] ?? '')
      if (stepId && description) {
        steps.push({ stepId, description, url, sourceLocation: `${filePath}:${c.line}` })
      }
    } else if (c.fn === 'recordUxGap') {
      // (testInfo, WORKFLOW, stepId, severity, description)
      const stepId = unwrapString(c.args[2] ?? '')
      const severity = unwrapString(c.args[3] ?? '') as GapSeverity | undefined
      const description = unwrapString(c.args[4] ?? '')
      if (stepId && severity && description) {
        gaps.push({ stepId, severity, description })
      }
    }
  }

  // De-dupe steps by id (keep the first/most-canonical occurrence).
  const seen = new Set<string>()
  const uniqueSteps = steps.filter((s) => { if (seen.has(s.stepId)) return false; seen.add(s.stepId); return true })

  return {
    workflow,
    filePath,
    describeTitle: describeMatch?.[2],
    testTitle: testMatch?.[2],
    steps: uniqueSteps,
    gaps,
  }
}

/** Walk `tests/e2e/` and parse every spec file with a `WORKFLOW = '…'` decl. */
export function extractE2eCorpus(repoRoot: string): E2eSpecCorpus {
  const e2eRoot = join(repoRoot, 'tests/e2e')
  const specs: E2eWorkflowSpec[] = []
  if (existsSync(e2eRoot)) {
    const stack: string[] = [e2eRoot]
    while (stack.length > 0) {
      const dir = stack.pop()!
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        if (e.name.startsWith('.')) continue
        const full = join(dir, e.name)
        if (e.isDirectory()) { stack.push(full); continue }
        if (!e.isFile() || !e.name.endsWith('.spec.ts')) continue
        const stat = statSync(full); if (stat.size === 0) continue
        const parsed = parseE2eSpec(full, repoRoot)
        if (parsed) specs.push(parsed)
      }
    }
  }
  const byWorkflow = new Map<string, E2eWorkflowSpec>()
  for (const s of specs) byWorkflow.set(s.workflow, s)
  return { specs, byWorkflow, extractedAt: new Date() }
}
