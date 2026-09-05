/**
 * Evidence collector — discover Playwright multimedia artefacts and
 * pair them to their source e2e spec + workflow + step.
 *
 * Slice CCCCC-cut2 (2026-05-11): the spec-generator pipeline was blind
 * to the richest evidence ERPax produces — Playwright videos
 * (`*.webm`), per-step screenshots (`*.png`), and trace zips
 * (`trace.zip`). These ARE the audit-evidence trail for ISO 19011
 * §6.4.6 + SOX §404 process walk-through controls; they're also the
 * highest-impact marketing asset (real UI walk-through video vs.
 * synthetic mermaid diagram). This collector indexes them so
 * downstream generators (marketing-page, PDF/A audit-evidence,
 * per-collection README) can embed each artefact next to the
 * `@useCase` JSDoc story it proves.
 *
 * Sources scanned:
 *
 *   tests/evidence/test-results/<sanitized-test-name>/
 *     ├── video.webm                  ← Playwright per-test recording
 *     ├── trace.zip                   ← full Playwright trace
 *     └── test-failed-1.png           ← failure screenshot
 *
 *   public/evidence/admin-pages/<sanitized-route>.png
 *                                     ← curated per-route screenshots
 *                                       (served on the live URL)
 *
 *   tests/evidence/_report/data/<hash>.{webm|png|zip}
 *                                     ← Playwright HTML-reporter blob
 *                                       store; cross-referenced by id
 *                                       in the report's tests.json
 *
 * Workflow inference: each Playwright test sets `const WORKFLOW = '<id>'`
 * (e.g. 'order-to-cash', 'procure-to-pay', 'record-to-report') and
 * passes it into `captureWorkflowStep(page, testInfo, WORKFLOW, ...)`.
 * The sanitized test-result-dir name encodes the workflow as the
 * leading slug; the collector extracts it via regex.
 *
 * @standard ISO/IEC-29119:2022 software-testing test-evidence
 * @standard ISO-19011:2018 §6.4.6 audit-evidence visual-evidence
 * @compliance SOX §404 process-walk-through-controls
 * @audit ISO-27001 A.5.36 conformance-with-policies
 */

import { readdirSync, existsSync, statSync } from 'node:fs'
import { join, relative, basename, extname } from 'node:path'

/** A single discovered artefact (video / screenshot / trace). */
export interface EvidenceArtefact {
  readonly kind: 'video' | 'screenshot' | 'trace'
  /** Repo-relative path. */
  readonly path: string
  /** Inferred workflow id (e.g. 'order-to-cash') — best-effort. */
  readonly workflow?: string
  /** Inferred step id (e.g. '03-quotes-list') — best-effort. */
  readonly stepId?: string
  /** Sanitised label / route slug — derived from filename. */
  readonly label?: string
  /** File size in bytes. */
  readonly size: number
  /** Public URL when the artefact lives under public/evidence/. */
  readonly publicUrl?: string
}

/** Per-workflow grouping of artefacts. */
export interface WorkflowEvidence {
  readonly workflow: string
  readonly videos: ReadonlyArray<EvidenceArtefact>
  readonly screenshots: ReadonlyArray<EvidenceArtefact>
  readonly traces: ReadonlyArray<EvidenceArtefact>
  /** Lookup helper: stepId → first screenshot for that step. */
  readonly screenshotByStep: ReadonlyMap<string, EvidenceArtefact>
}

/** Top-level evidence corpus. */
export interface EvidenceCorpus {
  readonly artefacts: ReadonlyArray<EvidenceArtefact>
  readonly byWorkflow: ReadonlyMap<string, WorkflowEvidence>
  readonly collectedAt: Date
}

/** Recursive walk; returns absolute paths. */
function walk(root: string, accept: (name: string) => boolean): string[] {
  const out: string[] = []
  if (!existsSync(root)) return out
  const stack: string[] = [root]
  while (stack.length > 0) {
    const dir = stack.pop()!
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue
      const full = join(dir, entry.name)
      if (entry.isDirectory()) stack.push(full)
      else if (entry.isFile() && accept(entry.name)) out.push(full)
    }
  }
  return out
}

/**
 * Parse the Playwright test-results directory name back into workflow
 * + step. Playwright sanitises the test title into a slug like:
 *
 *   erp-workflows-order-to-cas-b7293-→-order-→-invoice-→-payment-erp-workflows-multimedia
 *   ↑ describe-prefix ↑ workflow ↑ collision-hash ↑ step-labels ↑ project-suffix
 *
 * Best-effort extraction; falls back to undefined when the pattern is
 * unfamiliar.
 */
function parseTestResultDirName(dirName: string): { workflow?: string; stepId?: string } {
  // Workflows we know about.
  const known = ['order-to-cash', 'procure-to-pay', 'record-to-report']
  for (const wf of known) {
    if (dirName.includes(wf.slice(0, 12))) return { workflow: wf }
  }
  // Generic ERP-workflows pattern.
  const m = dirName.match(/erp-workflows-([\w-]+?)-[a-f0-9]{5,}/)
  if (m) return { workflow: m[1] }
  return {}
}

/**
 * Parse `public/evidence/admin-pages/<workflow>__<step>-<label>.png`
 * back into (workflow, stepId, label). Falls back gracefully when the
 * filename doesn't follow the convention.
 */
function parsePublicEvidenceName(name: string): { workflow?: string; stepId?: string; label?: string } {
  const stem = basename(name, extname(name))
  // Convention: `<workflow>__<NN-step>__<route-slug>` but historic files
  // use `__` for path-separators. Try a permissive parse.
  const parts = stem.split('__')
  if (parts.length >= 3) {
    return { workflow: parts[0], stepId: parts[1], label: parts.slice(2).join('__') }
  }
  if (parts.length === 2) {
    return { workflow: parts[0], label: parts[1] }
  }
  return { label: stem }
}

/**
 * Collect every multimedia artefact under tests/evidence/ + public/evidence/
 * and group by inferred workflow.
 */
export function collectEvidence(repoRoot: string): EvidenceCorpus {
  const artefacts: EvidenceArtefact[] = []

  // ── tests/evidence/test-results/ ────────────────────────────────────
  const trDir = join(repoRoot, 'tests/evidence/test-results')
  if (existsSync(trDir)) {
    for (const entry of readdirSync(trDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      const dirName = entry.name
      const { workflow } = parseTestResultDirName(dirName)
      const dirAbs = join(trDir, dirName)
      for (const f of readdirSync(dirAbs)) {
        const abs = join(dirAbs, f)
        const stat = statSync(abs)
        const ext = extname(f).toLowerCase()
        let kind: EvidenceArtefact['kind'] | null = null
        if (ext === '.webm' || ext === '.mp4') kind = 'video'
        else if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') kind = 'screenshot'
        else if (ext === '.zip' && f.startsWith('trace')) kind = 'trace'
        if (!kind) continue
        artefacts.push({
          kind,
          path: relative(repoRoot, abs),
          workflow,
          label: basename(f, ext),
          size: stat.size,
        })
      }
    }
  }

  // ── public/evidence/ ────────────────────────────────────────────────
  const peDir = join(repoRoot, 'public/evidence')
  if (existsSync(peDir)) {
    for (const abs of walk(peDir, (n) => /\.(png|jpg|webm|mp4|zip)$/i.test(n))) {
      const stat = statSync(abs)
      const ext = extname(abs).toLowerCase()
      let kind: EvidenceArtefact['kind'] | null = null
      if (ext === '.webm' || ext === '.mp4') kind = 'video'
      else if (ext === '.png' || ext === '.jpg') kind = 'screenshot'
      else if (ext === '.zip') kind = 'trace'
      if (!kind) continue
      const { workflow, stepId, label } = parsePublicEvidenceName(basename(abs))
      const rel = relative(repoRoot, abs)
      artefacts.push({
        kind,
        path: rel,
        workflow,
        stepId,
        label,
        size: stat.size,
        publicUrl: '/' + relative(join(repoRoot, 'public'), abs),
      })
    }
  }

  // ── tests/evidence/_report/data/ ────────────────────────────────────
  // Reporter blob store — opaque hashes; we surface them as
  // workflow-less artefacts for forensic completeness.
  const reportDir = join(repoRoot, 'tests/evidence/_report/data')
  if (existsSync(reportDir)) {
    for (const f of readdirSync(reportDir)) {
      const abs = join(reportDir, f)
      const stat = statSync(abs)
      const ext = extname(f).toLowerCase()
      let kind: EvidenceArtefact['kind'] | null = null
      if (ext === '.webm' || ext === '.mp4') kind = 'video'
      else if (ext === '.png' || ext === '.jpg') kind = 'screenshot'
      else if (ext === '.zip') kind = 'trace'
      if (!kind) continue
      artefacts.push({ kind, path: relative(repoRoot, abs), label: basename(f, ext), size: stat.size })
    }
  }

  // Group by workflow.
  const byWorkflow = new Map<string, {
    videos: EvidenceArtefact[]
    screenshots: EvidenceArtefact[]
    traces: EvidenceArtefact[]
    screenshotByStep: Map<string, EvidenceArtefact>
  }>()
  for (const a of artefacts) {
    if (!a.workflow) continue
    let bucket = byWorkflow.get(a.workflow)
    if (!bucket) {
      bucket = { videos: [], screenshots: [], traces: [], screenshotByStep: new Map() }
      byWorkflow.set(a.workflow, bucket)
    }
    if (a.kind === 'video') bucket.videos.push(a)
    else if (a.kind === 'screenshot') {
      bucket.screenshots.push(a)
      if (a.stepId && !bucket.screenshotByStep.has(a.stepId)) bucket.screenshotByStep.set(a.stepId, a)
    }
    else if (a.kind === 'trace') bucket.traces.push(a)
  }

  const grouped = new Map<string, WorkflowEvidence>()
  for (const [wf, b] of byWorkflow) {
    grouped.set(wf, {
      workflow: wf,
      videos: b.videos,
      screenshots: b.screenshots,
      traces: b.traces,
      screenshotByStep: b.screenshotByStep,
    })
  }

  return { artefacts, byWorkflow: grouped, collectedAt: new Date() }
}
