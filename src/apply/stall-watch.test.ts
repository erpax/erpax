import { describe, expect, it } from 'vitest'
import { detectStalledProcesses, formatStallTable, parsePsEtime, killStalledProcesses } from './stall-watch'

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
