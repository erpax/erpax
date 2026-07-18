/**
 * cli/local — the inner loop as a horo ring walk, self-timed and gravity-ratcheted.
 *
 * 0 or 1 is LINEAR — a verdict. The walk itself is QUANTUM: lanes sit on the doubling
 * ring 1→2→4→8→7→5 with the 3·6·9 axis closing the breath back to 0/1, so the loop
 * reads as one wave, not a checklist. Each green lane records its wall time (@/timeout)
 * and earns its next rung from its own history.
 *
 * GRAVITY (position 7): recursive folders inverse toward their parents — a one-way A/B
 * without B/A, or a path deeper than the wire, is matter that has not fallen back to src.
 * The lane ratchets: the pull may only go DOWN; a rise fails the loop. (The sibling
 * theorems portal runs ahead of us — this is the local step of the same fold.)
 *
 * Deliberately NOT here: vitest (targeted `erpax verify <atom>`), the corpus lanes
 * (gate/confirm own them), anything that builds the full readme context.
 */
import { execSync, spawnSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathWireViolations } from '@/index/cross'
import { boundaryDigest } from '@/quantum/boundary'
import { nonIndexImports } from '@/tamper/import'
import { recordSampleMs, timeoutForLabel } from '@/timeout'

interface LocalLane {
  readonly horo: number
  readonly label: string
  readonly run: () => { ok: boolean; note: string }
}

const GRAVITY_CACHE = join(process.cwd(), 'node_modules', '.cache', 'erpax', 'gravity.json')

interface GravityState {
  readonly oneWay: number
  readonly deep: number
}

const readGravity = (): GravityState | null => {
  try {
    const parsed: unknown = JSON.parse(readFileSync(GRAVITY_CACHE, 'utf8'))
    if (typeof parsed !== 'object' || parsed === null) return null
    const { oneWay, deep } = parsed as Record<string, unknown>
    if (typeof oneWay !== 'number' || typeof deep !== 'number') return null
    return { oneWay, deep }
  } catch {
    return null
  }
}

const writeGravity = (s: GravityState): void => {
  try {
    mkdirSync(dirname(GRAVITY_CACHE), { recursive: true })
    writeFileSync(GRAVITY_CACHE, JSON.stringify(s))
  } catch {
    /* a lost mark only means re-anchoring next run */
  }
}

/** Gravity ratchet — the pull toward parents may only go DOWN; a rise fails the loop. */
const gravityLane = (): { ok: boolean; note: string } => {
  const v = pathWireViolations()
  const oneWay = v.filter((x) => x.kind === 'one-way-path').length
  const deep = v.filter((x) => x.kind === 'depth-exceeds-wire').length
  const prior = readGravity()
  const total = oneWay + deep
  if (prior === null) {
    writeGravity({ oneWay, deep })
    return { ok: true, note: `anchored — one-way ${oneWay} · deep ${deep} (gravity pulls from here)` }
  }
  const priorTotal = prior.oneWay + prior.deep
  if (total > priorTotal) {
    return {
      ok: false,
      note: `gravity reversed — one-way ${oneWay} (was ${prior.oneWay}) · deep ${deep} (was ${prior.deep}); fold toward parents, never away`,
    }
  }
  if (total < priorTotal) writeGravity({ oneWay, deep })
  return { ok: true, note: `holding — one-way ${oneWay} · deep ${deep}${total < priorTotal ? ' (fell ' + (priorTotal - total) + ' — ratcheted)' : ''}` }
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
  // The doubling breath: 1→2→4→8→7 (…→5 when a sixth lane earns its seat); 3·6·9 stay the axis.
  const lanes: LocalLane[] = [
    {
      horo: 1,
      label: 'local:imports',
      run: () => {
        const n = nonIndexImports().length
        return { ok: n === 0, note: n === 0 ? 'purity 100% (parsed)' : `${n} non-index import(s)` }
      },
    },
    {
      horo: 2,
      label: 'local:boundary',
      run: () => {
        const d = boundaryDigest()
        return { ok: d.escapes === 0, note: d.escapes === 0 ? 'sealed (parsed)' : `${d.escapes} escape(s)` }
      },
    },
    {
      horo: 4,
      label: 'local:eslint',
      run: () =>
        changed.length === 0
          ? { ok: true, note: 'no changed files' }
          : shellLane(
              'local:eslint',
              `./node_modules/.bin/eslint --max-warnings 0 --no-warn-ignored ${changed.map((f) => JSON.stringify(f)).join(' ')}`,
            ),
    },
    {
      horo: 8,
      label: 'local:typecheck',
      run: () => shellLane('local:typecheck', './node_modules/.bin/tsc --noEmit -p tsconfig.typecheck.json'),
    },
    { horo: 7, label: 'local:gravity', run: gravityLane },
  ]

  let allOk = true
  let total = 0
  const ring: string[] = []
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
    ring.push(`${lane.horo}${r.ok ? '' : '̸'}`)
    console.log(`  ${r.ok ? '✓' : '✗'} ${String(ms).padStart(6)}ms  ${lane.horo} ${lane.label.padEnd(16)} ${r.note}`)
    if (!r.ok) allOk = false
  }
  console.log(`${allOk ? '✓' : '✗'} local — ring ${ring.join('→')}→${allOk ? '1' : '0'} · ${total}ms total`)
  return allOk ? 0 : 1
}
