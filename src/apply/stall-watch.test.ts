import { describe, expect, it } from 'vitest'
import { detectStalledProcesses, formatStallTable, parsePsEtime, killStalledProcesses, statusFor, gateAncestryPids } from './stall-watch'

describe('apply/stall-watch', () => {
  it('parsePsEtime handles mm:ss and hh:mm:ss', () => {
    expect(parsePsEtime('01:30')).toBe(90)
    expect(parsePsEtime('1:02:03')).toBe(3723)
    expect(parsePsEtime('2-03:04:05')).toBe(2 * 86400 + 3 * 3600 + 4 * 60 + 5)
  })

  it('detectStalledProcesses returns an array', () => {
    const rows = detectStalledProcesses()
    expect(Array.isArray(rows)).toBe(true)
  })

  it('formatStallTable renders header', () => {
    expect(formatStallTable([])).toContain('no long-running')
  })

  it('killStalledProcesses dooms dead + old zombies, spares slow, young, and self', () => {
    const row = (pid: number, status: 'slow' | 'dead' | 'zombie', ageSeconds: number) => ({
      pid, command: 'x', ageSeconds, kind: 'other' as const, status, recommendation: '',
    })
    const doomed = killStalledProcesses([
      row(999999901, 'dead', 5000),
      row(999999902, 'zombie', 300),
      row(999999903, 'zombie', 5), // young duplicate — spared
      row(999999904, 'slow', 9999), // living — spared
      { ...row(process.pid, 'dead', 9999) }, // self — spared
    ])
    expect(doomed.map((r) => r.pid)).toEqual([999999901, 999999902])
  })
})

describe('stall-watch — age is not death (the classifier that killed a live worker, corrected)', () => {
  const RULE = { test: /vitest/, kind: 'vitest' as const, slowAfterSec: 300, deadAfterSec: 1800 }

  it('a process actively burning CPU is SLOW however old — never dead, never zombie', () => {
    expect(statusFor(10_000, RULE, false, { cpuPct: 100 })).toBe('slow')
    expect(statusFor(10_000, RULE, true, { cpuPct: 100 })).toBe('slow') // even a "duplicate" fork
  })

  it('the live gate tree is untouchable — gateAncestor outranks everything', () => {
    expect(statusFor(99_999, RULE, true, { gateAncestor: true })).toBe('slow')
  })

  it('idle age still classifies — the original ladder holds when nothing overrides it', () => {
    expect(statusFor(2_000, RULE, false)).toBe('dead')
    expect(statusFor(400, RULE, false)).toBe('slow')
    expect(statusFor(100, RULE, true)).toBe('zombie')
  })

  it('gateAncestryPids walks the chain — a vitest fork under a live git push is the gate', () => {
    const table = [
      { pid: 1, ppid: 0, command: 'git push origin main' },
      { pid: 2, ppid: 1, command: 'sh .husky/pre-push' },
      { pid: 3, ppid: 2, command: 'node vitest run' },
      { pid: 4, ppid: 3, command: 'node vitest forks worker' },
      { pid: 9, ppid: 0, command: 'node vitest run (orphan)' },
    ]
    const inGate = gateAncestryPids(table)
    expect(inGate.has(4)).toBe(true) // the worker the old classifier killed
    expect(inGate.has(3)).toBe(true)
    expect(inGate.has(9)).toBe(false) // the true orphan stays killable
  })
})
