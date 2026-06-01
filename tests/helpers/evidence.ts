/**
 * E2E test-evidence helpers — full-page screenshot + named-step capture
 * utilities for the admin walk-through spec.
 *
 * The walk-through spec produces durable artifacts that double as audit
 * evidence: one screenshot per canonical admin page, plus a per-test video
 * + trace when `playwright.config.ts` is configured with `video: 'on'` /
 * `trace: 'on'` (the `evidence` project does this by default).
 *
 * Output layout (all under `tests/evidence/`):
 *
 *   admin-pages/<sanitized-route>.png   ← one per route captured
 *   videos/<spec>/<test>.webm           ← per-test recording
 *   traces/<spec>/<test>.zip            ← Playwright trace
 *   _report/                            ← HTML reporter root
 *
 * @standard ISO/IEC-29119:2022 software-testing test-evidence
 * @standard W3C WebDriver-BiDi browser-automation
 * @audit ISO-19011:2018 audit-trail visual-evidence
 * @compliance SOX §404 internal-controls process-walk-through
 * @compliance ISO-27001 A.5.36 conformance-with-policies
 * @see docs/STANDARDS.md §7
 */

import type { Page, TestInfo } from '@playwright/test'

/**
 * Where evidence artifacts land. Resolved relative to repo root. Lives under
 * `public/` so the deployed Worker serves the multimedia evidence as static
 * assets — the captured walk-throughs are accessible at
 * `/<EVIDENCE_ROOT>/...` on the live URL.
 */
export const EVIDENCE_ROOT = 'public/evidence'

/**
 * Convert a URL path or label into a filesystem-safe slug suitable for use
 * inside a screenshot/recording filename.
 *
 *   '/admin/collections/gl-accounts' → 'admin__collections__gl-accounts'
 *   'Login screen'                   → 'login-screen'
 */
export const evidenceSlug = (input: string): string =>
  input
    .trim()
    .toLowerCase()
    .replace(/^\/+/, '')
    .replace(/\/+/g, '__')
    .replace(/[^\w_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'unnamed'

/**
 * Navigate to an admin route and capture a labelled full-page screenshot.
 *
 * The screenshot is saved both as a file under `tests/evidence/admin-pages/`
 * (durable artifact for SOX §404 evidence) and attached to the Playwright
 * test report (so it shows up in HTML + CI traces).
 *
 * @param page         Playwright page handle
 * @param route        Admin URL relative to baseURL (e.g. `/admin/collections/users`)
 * @param testInfo     The active `TestInfo` (always available inside `test()`)
 * @param label        Optional human label; defaults to the route
 */
export async function captureAdminPage(
  page: Page,
  route: string,
  testInfo: TestInfo,
  label?: string,
): Promise<void> {
  await page.goto(route, { waitUntil: 'networkidle' })
  // Payload admin always renders inside <main> — wait for it before snapping
  // to avoid screenshots of the in-flight loading state.
  await page.locator('main').first().waitFor({ state: 'visible', timeout: 15_000 })

  const filename = `${EVIDENCE_ROOT}/admin-pages/${evidenceSlug(label ?? route)}.png`
  const buffer = await page.screenshot({ fullPage: true, path: filename })
  await testInfo.attach(label ?? route, {
    body: buffer,
    contentType: 'image/png',
  })
}

/**
 * Run an inline workflow with a clear label boundary in the trace.
 * Useful for grouping a multi-step admin walk-through into nameable
 * sub-steps that show up cleanly in the Playwright trace viewer.
 */
export async function recordStep<T>(
  testInfo: TestInfo,
  label: string,
  fn: () => Promise<T>,
): Promise<T> {
  return await fn().then(async (result) => {
    testInfo.annotations.push({ type: 'step', description: label })
    return result
  })
}

/**
 * Capture a labelled screenshot mid-workflow + add a `step` annotation.
 *
 * Use inside the ERP-workflow specs (`tests/e2e/erp-workflows/`) at every
 * meaningful UX boundary: form opened, validation surfaced, confirmation
 * dialog rendered, navigation between collections completed. The result is
 * one PNG per UX surface, named after the workflow + step, plus a clean
 * marker in the Playwright trace.
 *
 * @param page         Playwright page handle
 * @param testInfo     The active `TestInfo`
 * @param workflow     Slug for the workflow (e.g. `'order-to-cash'`)
 * @param step         Slug for the step (e.g. `'01-customer-create'`)
 * @param description  Human label shown in the report + trace
 */
export async function captureWorkflowStep(
  page: Page,
  testInfo: TestInfo,
  workflow: string,
  step: string,
  description: string,
): Promise<void> {
  const filename = `${EVIDENCE_ROOT}/workflows/${evidenceSlug(workflow)}/${evidenceSlug(step)}.png`
  const buffer = await page.screenshot({ fullPage: true, path: filename })
  await testInfo.attach(`${workflow} — ${step} — ${description}`, {
    body: buffer,
    contentType: 'image/png',
  })
  testInfo.annotations.push({ type: 'step', description: `${step}: ${description}` })
}

/**
 * Document a UI/UX gap discovered during a workflow walk-through. Adds a
 * `gap` annotation that surfaces in the Playwright HTML report so the
 * reviewer can scan the artifact pack for everything flagged.
 *
 * Doesn't fail the test — the workflow continues, the gap is just recorded.
 *
 * @param testInfo     The active `TestInfo`
 * @param workflow     Slug for the workflow (e.g. `'order-to-cash'`)
 * @param step         Slug for the step where the gap surfaced
 * @param severity     `'info' | 'minor' | 'major' | 'blocker'`
 * @param description  What's missing or broken in the UX
 */
export function recordUxGap(
  testInfo: TestInfo,
  workflow: string,
  step: string,
  severity: 'info' | 'minor' | 'major' | 'blocker',
  description: string,
): void {
  testInfo.annotations.push({
    type: `gap:${severity}`,
    description: `[${workflow} :: ${step}] ${description}`,
  })
}

/**
 * Resilient navigate-and-capture: navigate to `route`, wait for `<main>`,
 * then capture a labelled PNG. If the navigation 404s (the collection
 * doesn't exist) or the page never renders `<main>` (admin error state),
 * record a `gap:blocker` annotation and return `false` instead of failing
 * the test — the walk-through continues so subsequent steps still produce
 * evidence.
 *
 * Returns `true` on success, `false` when the route is missing / broken.
 *
 * @standard ISO/IEC-29119:2022 software-testing test-resilience
 * @audit ISO-19011:2018 audit-trail visual-evidence
 */
/** Options-object form of {@link safeCaptureRoute} (stepId/label aliases). */
export interface SafeCaptureRouteOptions {
  page: Page
  testInfo: TestInfo
  workflow: string
  stepId: string
  label: string
  route: string
}

export async function safeCaptureRoute(opts: SafeCaptureRouteOptions): Promise<boolean>
export async function safeCaptureRoute(
  page: Page,
  testInfo: TestInfo,
  workflow: string,
  step: string,
  route: string,
  description: string,
): Promise<boolean>
export async function safeCaptureRoute(
  a: Page | SafeCaptureRouteOptions,
  b?: TestInfo,
  c?: string,
  d?: string,
  e?: string,
  f?: string,
): Promise<boolean> {
  const isOpts = typeof a === 'object' && a !== null && 'route' in a && 'stepId' in a
  const page = isOpts ? a.page : (a as Page)
  const testInfo = isOpts ? a.testInfo : (b as TestInfo)
  const workflow = isOpts ? a.workflow : (c as string)
  const step = isOpts ? a.stepId : (d as string)
  const route = isOpts ? a.route : (e as string)
  const description = isOpts ? a.label : (f as string)
  try {
    const response = await page.goto(route, { waitUntil: 'networkidle' })
    if (response && response.status() >= 400) {
      recordUxGap(
        testInfo,
        workflow,
        step,
        'blocker',
        `${route} returned HTTP ${response.status()} — collection / route missing or unauthenticated`,
      )
      await captureWorkflowStep(page, testInfo, workflow, step, `${description} (HTTP ${response.status()})`)
      return false
    }
    await page.locator('main').first().waitFor({ state: 'visible', timeout: 15_000 })
    await captureWorkflowStep(page, testInfo, workflow, step, description)
    return true
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    recordUxGap(
      testInfo,
      workflow,
      step,
      'blocker',
      `${route} failed to render <main>: ${message.slice(0, 160)}`,
    )
    // Best-effort screenshot of whatever the page is showing now.
    try {
      await captureWorkflowStep(page, testInfo, workflow, step, `${description} (error state)`)
    } catch {
      /* swallow secondary screenshot failures */
    }
    return false
  }
}
