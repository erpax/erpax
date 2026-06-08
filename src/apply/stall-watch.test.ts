import { describe, expect, it } from 'vitest'
import { detectStalledProcesses, formatStallTable, parsePsEtime } from './stall-watch'

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
})
