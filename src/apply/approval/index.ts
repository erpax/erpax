/**
 * apply/approval — package.json-derived agent work approval matrix.
 *
 * Composes payload/approval (types · importmap first) with per-package lanes
 * from package.json dependencies + devDependencies.
 *
 * @see ../payload/approval — ../cli/gate
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { CLI_REGISTRY } from '@/cli/registry'
import {
  payloadApprovalGate,
  payloadApprovalSkipped,
  PAYLOAD_NODE_OPTIONS,
} from '@/payload/approval'

export { PAYLOAD_NODE_OPTIONS }

export interface PackageApprovalRow {
  readonly package: string
  readonly step: string
  readonly command: string | null
  readonly approved: boolean | null
  readonly error?: string
  readonly skipReason?: string
}

export interface PackageApprovalMatrixOpts {
  readonly cwd?: string
  readonly execute?: boolean
  readonly smoke?: boolean
  readonly verifyOnly?: boolean
}

export interface PackageApprovalResult {
  readonly rows: readonly PackageApprovalRow[]
  readonly approved: boolean
  readonly executed: number
  readonly failedStep?: string
}

interface StepSpec {
  readonly step: string
  readonly command: string
  readonly order: number
}

interface DerivedStep {
  readonly step: string
  readonly command: string | null
  readonly skipReason?: string
}

const BIN_PACKAGE_STEPS: Readonly<Record<string, StepSpec>> = {
  eslint: { step: 'eslint:lint-src', command: 'pnpm erpax lint src', order: 40 },
  typescript: {
    step: 'typescript:typecheck',
    command: 'tsc --noEmit -p tsconfig.typecheck.json',
    order: 30,
  },
  vitest: {
    step: 'vitest:smoke',
    command:
      'cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=8000" PAYLOAD_TEST_SKIP_MIGRATE=1 vitest run --config ./vitest.config.mts src/apply/approval/test.ts src/payload/test-approval.ts',
    order: 50,
  },
  wrangler: {
    step: 'wrangler:types',
    command: 'wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts',
    order: 35,
  },
  vitepress: { step: 'vitepress:verify', command: 'pnpm erpax standards', order: 45 },
}

const PAYLOAD_VERIFY_CMD = 'bash scripts/payload-verify-types.sh'

const EXECUTION_LANES: readonly StepSpec[] = [
  { step: 'payload:approval', command: '__payload_gate__', order: 10 },
  { step: 'payload:verify-artefacts', command: PAYLOAD_VERIFY_CMD, order: 12 },
  { step: 'typescript:typecheck', command: BIN_PACKAGE_STEPS.typescript!.command, order: 30 },
  { step: 'wrangler:types', command: BIN_PACKAGE_STEPS.wrangler!.command, order: 35 },
  { step: 'eslint:lint-src', command: BIN_PACKAGE_STEPS.eslint!.command, order: 40 },
  { step: 'vitepress:verify', command: BIN_PACKAGE_STEPS.vitepress!.command, order: 45 },
  { step: 'vitest:smoke', command: BIN_PACKAGE_STEPS.vitest!.command, order: 50 },
]

export function readInstalledPackages(cwd: string = process.cwd()): readonly string[] {
  const raw = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')) as {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
  }
  return [...new Set([...Object.keys(raw.dependencies ?? {}), ...Object.keys(raw.devDependencies ?? {})])].sort(
    (a, b) => a.localeCompare(b),
  )
}

function packageHasBin(name: string, cwd: string): boolean {
  const pkgPath = name.startsWith('@')
    ? join(cwd, 'node_modules', ...name.split('/'), 'package.json')
    : join(cwd, 'node_modules', name, 'package.json')
  if (!existsSync(pkgPath)) return false
  try {
    return Boolean((JSON.parse(readFileSync(pkgPath, 'utf8')) as { bin?: unknown }).bin)
  } catch {
    return false
  }
}

function deriveStepForPackage(pkg: string, cwd: string, smoke: boolean): DerivedStep {
  if (pkg.startsWith('@payloadcms/')) {
    return {
      step: 'payload:covered',
      command: null,
      skipReason: 'covered by payload generate:types + generate:importmap',
    }
  }
  if (pkg === 'payload') {
    return { step: 'payload:approval', command: 'pnpm erpax approve payload' }
  }
  const binStep = BIN_PACKAGE_STEPS[pkg]
  if (binStep) {
    if (pkg === 'vitest' && !smoke) {
      return {
        step: binStep.step,
        command: binStep.command,
        skipReason: 'default gate skips full vitest — use --smoke',
      }
    }
    return { step: binStep.step, command: binStep.command }
  }
  if (packageHasBin(pkg, cwd)) {
    const hit = Object.values(CLI_REGISTRY)
      .flatMap((d) => Object.values(d))
      .find((a) => a.cmd.includes(pkg) && !a.cmd.startsWith('__'))
    if (hit) return { step: `${pkg}:registry`, command: hit.cmd }
    return { step: `${pkg}:bin`, command: null, skipReason: 'bin present — no mapped erpax verify lane' }
  }
  return { step: 'none', command: null, skipReason: 'no provable verify surface' }
}

function runShell(command: string, cwd: string): number {
  const r = spawnSync(command, { shell: true, stdio: 'inherit', cwd, env: process.env })
  return r.status ?? 1
}

function markRowsForStep(
  rows: PackageApprovalRow[],
  step: string,
  approved: boolean,
  error?: string,
): void {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]!
    if (
      row.step === step ||
      (step.startsWith('payload:') && row.step === 'payload:covered') ||
      (step === 'payload:approval' && row.package === 'payload')
    ) {
      rows[i] = { ...row, approved, error }
    }
  }
}

export function packageApprovalMatrix(opts: PackageApprovalMatrixOpts = {}): PackageApprovalResult {
  const cwd = opts.cwd ?? process.cwd()
  const smoke = opts.smoke === true
  const packages = readInstalledPackages(cwd)

  const rows: PackageApprovalRow[] = packages.map((pkg) => {
    const d = deriveStepForPackage(pkg, cwd, smoke)
    return { package: pkg, step: d.step, command: d.command, approved: null, skipReason: d.skipReason }
  })

  if (!opts.execute) return { rows, approved: true, executed: 0 }

  const lanes = EXECUTION_LANES.filter((lane) => {
    if (opts.verifyOnly) {
      return lane.step === 'payload:verify-artefacts' || lane.step === 'typescript:typecheck'
    }
    if (lane.step === 'vitest:smoke' && !smoke) return false
    if (lane.step === 'wrangler:types' && !packages.includes('wrangler')) return false
    if (lane.step === 'eslint:lint-src' && !packages.includes('eslint')) return false
    if (lane.step === 'vitepress:verify' && !packages.includes('vitepress')) return false
    return true
  }).sort((a, b) => a.order - b.order)

  let executed = 0
  for (const lane of lanes) {
    if (lane.command === '__payload_gate__') {
      executed++
      const payload = payloadApprovalGate({ cwd })
      if (!payload.approved) {
        markRowsForStep(rows, lane.step, false, payload.error)
        return { rows, approved: false, executed, failedStep: `payload:${payload.step}` }
      }
      markRowsForStep(rows, lane.step, true)
      continue
    }
    executed++
    const code = runShell(lane.command, cwd)
    if (code !== 0) {
      markRowsForStep(rows, lane.step, false, `exit ${code}`)
      return { rows, approved: false, executed, failedStep: lane.step }
    }
    markRowsForStep(rows, lane.step, true)
  }

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]!
    if (row.skipReason) rows[i] = { ...row, approved: true }
    else if (row.approved === null) rows[i] = { ...row, approved: true }
  }

  return { rows, approved: rows.every((r) => r.approved !== false), executed }
}

export function agentWorkApproved(opts: PackageApprovalMatrixOpts = {}): boolean {
  if (payloadApprovalSkipped()) return packageApprovalMatrix({ ...opts, execute: false }).rows.length > 0
  return packageApprovalMatrix({ ...opts, execute: true }).approved
}

export function formatPackageApprovalMatrix(result: PackageApprovalResult, limit?: number): string {
  const lines: string[] = ['package approval matrix\n']
  const slice = limit ? result.rows.slice(0, limit) : result.rows
  for (const row of slice) {
    const mark =
      row.approved === true ? 'pass' : row.approved === false ? 'FAIL' : row.skipReason ? 'skip' : 'pending'
    lines.push(
      `  ${row.package.padEnd(28)} ${row.step.padEnd(26)} ${mark}${row.skipReason ? ` (${row.skipReason})` : ''}`,
    )
  }
  if (limit && result.rows.length > limit) {
    lines.push(`  … +${result.rows.length - limit} more`)
  }
  lines.push(
    '',
    result.approved
      ? `✓ agent work approved (${result.executed} lane(s))`
      : `✗ agent work NOT approved${result.failedStep ? ` — ${result.failedStep}` : ''}`,
  )
  return lines.join('\n')
}

export function formatDoctorPackageApprovalSection(cwd: string = process.cwd(), limit = 12): string {
  const result = packageApprovalMatrix({ cwd, execute: true, verifyOnly: true })
  const lines: string[] = ['  package-approval (from package.json):']
  for (const row of result.rows.slice(0, limit)) {
    const mark =
      row.approved === true ? 'pass' : row.approved === false ? 'FAIL' : row.skipReason ? 'skip' : 'pending'
    lines.push(`    ${row.package.padEnd(22)} ${row.step.padEnd(22)} ${mark}`)
  }
  if (result.rows.length > limit) lines.push(`    … +${result.rows.length - limit} more`)
  return lines.join('\n')
}

export function runPackageApprovalCli(argv: readonly string[] = process.argv.slice(2)): number {
  const list = argv.includes('--list') || argv.includes('-l')
  const smoke = argv.includes('--smoke')
  const result = packageApprovalMatrix({ execute: !list, smoke })
  console.log(formatPackageApprovalMatrix(result, list ? undefined : 20))
  return result.approved ? 0 : 1
}
