/**
 * apply/wave-lock — cross-process mutex so only one erpax wave runs at a time.
 *
 * Cursor multitask spawns parallel subagents in separate processes; in-process
 * `waveRunnerActive` is not enough. This file lock is the repo-wide gate.
 */
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { detectStalledProcesses } from './stall-watch'

export const WAVE_LOCK_REL = join('.erpax', 'wave.lock.json')

export type WaveLockName = 'push' | 'seal' | 'wire' | 'readme' | 'wave' | 'automate'

export interface WaveLockState {
  readonly name: WaveLockName
  readonly pid: number
  readonly agentId: string
  readonly acquiredAt: string
}

export interface WaveLockAcquireResult {
  readonly acquired: boolean
  readonly held?: WaveLockState
  readonly reason?: string
}

const lockPath = (cwd: string) => join(cwd, WAVE_LOCK_REL)

export function readWaveLock(cwd = process.cwd()): WaveLockState | null {
  const p = lockPath(cwd)
  if (!existsSync(p)) return null
  try {
    return JSON.parse(readFileSync(p, 'utf8')) as WaveLockState
  } catch {
    return null
  }
}

export function isWaveLockStale(lock: WaveLockState): boolean {
  try {
    process.kill(lock.pid, 0)
    return false
  } catch {
    return true
  }
}

export function acquireWaveLock(name: WaveLockName, agentId: string, cwd = process.cwd()): WaveLockAcquireResult {
  mkdirSync(join(cwd, '.erpax'), { recursive: true })
  const existing = readWaveLock(cwd)
  if (existing && !isWaveLockStale(existing)) {
    return {
      acquired: false,
      held: existing,
      reason: `wave lock held by ${existing.name} pid=${existing.pid} agent=${existing.agentId}`,
    }
  }
  if (existing && isWaveLockStale(existing)) {
    try {
      unlinkSync(lockPath(cwd))
    } catch {
      /* stale lock removal best-effort */
    }
  }
  const state: WaveLockState = {
    name,
    pid: process.pid,
    agentId,
    acquiredAt: new Date().toISOString(),
  }
  try {
    writeFileSync(lockPath(cwd), `${JSON.stringify(state, null, 2)}\n`, { flag: 'wx' })
  } catch {
    const race = readWaveLock(cwd)
    return {
      acquired: false,
      held: race ?? undefined,
      reason: race ? `race — lock held by pid=${race.pid}` : 'failed to acquire wave lock',
    }
  }
  return { acquired: true, held: state }
}

export function releaseWaveLock(cwd = process.cwd(), name?: WaveLockName): boolean {
  const existing = readWaveLock(cwd)
  if (!existing) return true
  if (existing.pid !== process.pid) return false
  if (name && existing.name !== name) return false
  try {
    unlinkSync(lockPath(cwd))
    return true
  } catch {
    return false
  }
}

export interface WaveStatusReport {
  readonly lock: WaveLockState | null
  readonly lockStale: boolean
  readonly queueDebt: number
  readonly stalled: ReturnType<typeof detectStalledProcesses>
  readonly stalledReason: string | null
}

export function collectWaveStatus(
  scanDebt: (cwd: string) => number,
  cwd = process.cwd(),
): WaveStatusReport {
  const lock = readWaveLock(cwd)
  const lockStale = lock ? isWaveLockStale(lock) : false
  const stalled = detectStalledProcesses()
  const dupKinds = new Set(
    stalled.filter((s) => s.status === 'zombie').map((s) => s.kind),
  )
  const stalledReason =
    lock && !lockStale
      ? `active lock ${lock.name} pid=${lock.pid}`
      : dupKinds.size > 0
        ? `duplicate workers: ${[...dupKinds].join(', ')}`
        : stalled.some((s) => s.status === 'dead')
          ? 'dead erpax processes — kill and retry single wave'
          : null
  return {
    lock,
    lockStale,
    queueDebt: scanDebt(cwd),
    stalled,
    stalledReason,
  }
}

export function formatWaveStatus(report: WaveStatusReport): string {
  const lines = ['erpax wave status\n']
  if (report.lock) {
    const mark = report.lockStale ? 'STALE (reclaimable)' : 'ACTIVE'
    lines.push(
      `  lock           ${mark} · ${report.lock.name} pid=${report.lock.pid} agent=${report.lock.agentId}`,
    )
    lines.push(`  acquired       ${report.lock.acquiredAt}`)
  } else {
    lines.push('  lock           none — wave slot free')
  }
  lines.push(
    report.queueDebt < 0
      ? '  queue debt     (skipped — pnpm erpax wave status --full)'
      : `  queue debt     ${report.queueDebt} axis unit(s)`,
  )
  if (report.stalledReason) lines.push(`  stalled        ${report.stalledReason}`)
  if (report.stalled.length) {
    lines.push(`  processes      ${report.stalled.length} long-running erpax job(s)`)
    for (const s of report.stalled.slice(0, 5)) {
      lines.push(`    pid=${s.pid} ${s.kind} ${s.status} — ${s.recommendation}`)
    }
  }
  lines.push('\nLaw: one wave · one lock · payload approves first')
  return lines.join('\n')
}
