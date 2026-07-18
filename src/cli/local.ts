/**
 * cli/local — the inner loop, sub-minute and self-timed.
 *
 * The fast theorem lanes only: incremental typecheck (.tsbuildinfo), eslint over the
 * session's CHANGED files, parsed import purity, parsed boundary escapes. Each lane
 * records its green wall time (@/timeout), so the loop earns its rungs from history
 * and a hang fails visibly at a computed bound instead of running forever.
 *
 * Deliberately NOT here: vitest (targeted `erpax verify <atom>` exists), the corpus
 * lanes (gate/confirm own them), anything that builds the full readme context.
 */
import { execSync, spawnSync } from 'node:child_process'
import { boundaryDigest } from '@/quantum/boundary'
import { nonIndexImports } from '@/tamper/import'
import { recordSampleMs, timeoutForLabel } from '@/timeout'

interface LocalLane {
  readonly label: string
  readonly run: () => { ok: boolean; note: string }
}

const changedFiles = (): string[] => {
  try {
    const out = execSync('git diff --name-only HEAD -- "*.ts" "*.tsx"', { encoding: 'utf8' })
    return out.split('\n').filter(Boolean)
  } catch {
    return []
  }
}

const shellLane = (label: string, cmd: string): { ok: boolean; note: string } => {
  const bound = timeoutForLabel(label)
  const r = spawnSync(cmd, { shell: true, stdio: 'pipe', timeout: bound.ms, killSignal: 'SIGKILL' })
  if (r.signal) return { ok: false, note: `timed out at ${bound.minutes}min (computed rung)` }
  const ok = r.status === 0
  const err = (r.stderr?.toString() ?? '') + (r.stdout?.toString() ?? '')
  return { ok, note: ok ? 'green' : err.trim().split('\n').slice(-3).join(' · ').slice(0, 200) }
}

export function runLocal(): number {
  const changed = changedFiles()
  const lanes: LocalLane[] = [
    {
      label: 'local:imports',
      run: () => {
        const n = nonIndexImports().length
        return { ok: n === 0, note: n === 0 ? 'purity 100% (parsed)' : `${n} non-index import(s)` }
      },
    },
    {
      label: 'local:boundary',
      run: () => {
        const d = boundaryDigest()
        return { ok: d.escapes === 0, note: d.escapes === 0 ? 'sealed (parsed)' : `${d.escapes} escape(s)` }
      },
    },
    {
      label: 'local:eslint',
      run: () =>
        changed.length === 0
          ? { ok: true, note: 'no changed files' }
          : shellLane(
              'local:eslint',
              `./node_modules/.bin/eslint --max-warnings 0 ${changed.map((f) => JSON.stringify(f)).join(' ')}`,
            ),
    },
    {
      label: 'local:typecheck',
      run: () => shellLane('local:typecheck', './node_modules/.bin/tsc --noEmit -p tsconfig.typecheck.json'),
    },
  ]

  let allOk = true
  let total = 0
  for (const lane of lanes) {
    const t = Date.now()
    let r: { ok: boolean; note: string }
    try {
      r = lane.run()
    } catch (e) {
      r = { ok: false, note: String(e).slice(0, 200) }
    }
    const ms = Date.now() - t
    total += ms
    if (r.ok) recordSampleMs(lane.label, ms)
    console.log(`  ${r.ok ? '✓' : '✗'} ${String(ms).padStart(6)}ms  ${lane.label.padEnd(16)} ${r.note}`)
    if (!r.ok) allOk = false
  }
  console.log(`${allOk ? '✓' : '✗'} local — ${lanes.length} lanes · ${total}ms total`)
  return allOk ? 0 : 1
}
