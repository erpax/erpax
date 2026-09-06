/**
 * payload/approval — canonical gate before waves, commits, or push.
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { timeoutForLabel } from '@/timeout'

export const PAYLOAD_NODE_OPTIONS =
  '--no-deprecation --max-old-space-size=8000 --import=./src/css/load-hook.mjs --import=tsx/esm'

/** migrate:* — load-hook only (tsx/esm breaks node: built-ins e.g. migrate:create) */
export const PAYLOAD_MIGRATE_NODE_OPTIONS =
  '--no-deprecation --max-old-space-size=8000 --import=./src/css/load-hook.mjs'
export const PAYLOAD_MIGRATE_CREATE_CMD = 'pnpm payload:migrate:create'


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

function runPayloadArgs(
  args: readonly string[],
  cwd: string,
  nodeOptions: string = PAYLOAD_NODE_OPTIONS,
): { readonly code: number; readonly output: string } {
  // Bounded by the computed ladder (@/timeout): unbounded, this spawn waited FOREVER on a
  // D1 lock when a test host held the database — doctor hung at 0% CPU past every rung.
  const bound = timeoutForLabel(`payload:${args[0] ?? 'cmd'}`)
  const r = spawnSync('pnpm', ['exec', 'payload', ...args], {
    cwd,
    env: { ...process.env, NODE_OPTIONS: nodeOptions },
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: bound.ms,
    killSignal: 'SIGKILL',
  })
  if (r.signal) {
    return { code: 1, output: `payload ${args.join(' ')} timed out at ${bound.minutes}min (computed rung) — likely a held database lock` }
  }
  return { code: r.status ?? 1, output: `${r.stdout ?? ''}${r.stderr ?? ''}` }
}

/**
 * The memo the generator steps share with scripts/payload-verify-types.sh.
 *
 * `generate:types` and `generate:importmap` are pure functions of the tracked source and the
 * installed Payload, and they each boot Payload — ~50s apiece. A single push ran them FIVE times
 * for two questions: this gate ran both, and payload-verify-types.sh ran the same two again.
 *
 * The key is computed in one place (scripts/payload-input-key.sh) and a PASS is remembered under
 * it. A hit here means those exact commands already succeeded on these exact inputs. Any edit to
 * any input changes the key, misses, and pays the full boot — which is why this is a memo and not
 * a skip.
 *
 * `migrate:status` is deliberately NOT memoised: it reads the DATABASE, and no hash of this
 * repository can see that.
 */
const generatorsAlreadyApproved = (cwd: string): boolean => {
  if (process.env.PAYLOAD_VERIFY_NOCACHE === '1') return false
  const key = spawnSync('bash', ['scripts/payload-input-key.sh'], { cwd, encoding: 'utf8' })
  if (key.status !== 0) return false
  const digest = (key.stdout ?? '').trim()
  if (digest.length !== 64) return false
  return existsSync(join(process.env.TMPDIR ?? tmpdir(), 'erpax-payload-verify', digest))
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
  if (!generatorsAlreadyApproved(cwd)) {
    for (const { step, args } of steps) {
      const { code, output } = runPayloadArgs(args, cwd)
      if (code !== 0) return { approved: false, step, error: tailError(output) }
    }
  }
  if (!process.env.PAYLOAD_TEST_SKIP_MIGRATE) {
    const migrate = runPayloadArgs(['migrate:status'], cwd, PAYLOAD_MIGRATE_NODE_OPTIONS)
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
  if (result.approved)
    return '  payload        approved ✓ (importmap · types · migrate:status · migrate:create → pnpm payload:migrate:create)'
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
