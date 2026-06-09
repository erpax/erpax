/**
 * payload/approval — canonical gate before waves, commits, or push.
 */
import { spawnSync } from 'node:child_process'

export const PAYLOAD_NODE_OPTIONS =
  '--no-deprecation --max-old-space-size=8000 --import=./src/css/load-hook.mjs --import=tsx/esm'

export type PayloadApprovalStep =
  | 'generate:importmap'
  | 'generate:types'
  | 'migrate:status'
  | 'skipped'

export interface PayloadApprovalResult {
  readonly approved: boolean
  readonly step: PayloadApprovalStep | 'complete'
  readonly error?: string
}

const SKIP_ENV = 'ERPAX_PAYLOAD_APPROVAL_SKIP'

export function payloadApprovalSkipped(): boolean {
  return process.env[SKIP_ENV] === '1' || process.env.PAYLOAD_TEST_SKIP_MIGRATE === '1'
}

function tailError(text: string, max = 4000): string {
  const t = text.trim()
  return t.length <= max ? t : `…\n${t.slice(-max)}`
}

function runPayloadArgs(args: readonly string[], cwd: string): { readonly code: number; readonly output: string } {
  const r = spawnSync('pnpm', ['exec', 'payload', ...args], {
    cwd,
    env: { ...process.env, NODE_OPTIONS: PAYLOAD_NODE_OPTIONS },
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  })
  return { code: r.status ?? 1, output: `${r.stdout ?? ''}${r.stderr ?? ''}` }
}

export function payloadApprovalGate(opts?: {
  readonly cwd?: string
  readonly skipLive?: boolean
}): PayloadApprovalResult {
  const cwd = opts?.cwd ?? process.cwd()
  if (opts?.skipLive || payloadApprovalSkipped()) {
    return { approved: true, step: 'skipped' }
  }
  const steps: readonly { step: PayloadApprovalStep; args: readonly string[] }[] = [
    { step: 'generate:importmap', args: ['generate:importmap'] },
    { step: 'generate:types', args: ['generate:types'] },
  ]
  for (const { step, args } of steps) {
    const { code, output } = runPayloadArgs(args, cwd)
    if (code !== 0) return { approved: false, step, error: tailError(output) }
  }
  if (!process.env.PAYLOAD_TEST_SKIP_MIGRATE) {
    const migrate = runPayloadArgs(['migrate:status'], cwd)
    if (migrate.code !== 0) {
      return { approved: false, step: 'migrate:status', error: tailError(migrate.output) }
    }
  }
  return { approved: true, step: 'complete' }
}

export function formatPayloadApprovalLine(result: PayloadApprovalResult): string {
  if (result.step === 'skipped') {
    return '  payload        skipped (ERPAX_PAYLOAD_APPROVAL_SKIP / PAYLOAD_TEST_SKIP_MIGRATE)'
  }
  if (result.approved) return '  payload        approved ✓ (importmap · types · migrate:status)'
  return `  payload        DENIED at ${result.step} — run: pnpm erpax approve`
}

export function runPayloadApprovalCli(cwd: string = process.cwd()): number {
  console.log('erpax payload approval — seek approval before waves · commit · push\n')
  const result = payloadApprovalGate({ cwd })
  if (result.approved) {
    console.log(`✓ payload ${result.step === 'skipped' ? 'skipped (env)' : 'approved'}`)
    return 0
  }
  console.error(`✗ payload approval failed at: ${result.step}`)
  if (result.error) console.error(tailError(result.error))
  console.error('\nFix Payload, then: pnpm erpax approve')
  return 1
}
