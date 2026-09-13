import { execSync, spawnSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { spawnGroupSync } from '@/timeout/group'

/** pids of live processes whose command line carries the marker — the tree the command started. */
const survivors = (marker: string): number[] =>
  execSync('ps -Ao pid=,command=', { encoding: 'utf8' })
    .split('\n')
    .filter((l) => l.includes(marker))
    .map((l) => Number(l.trim().split(/\s+/)[0]))
    .filter((pid) => Number.isFinite(pid) && pid !== process.pid)

const settle = (ms: number): void => {
  spawnSync('sleep', [String(ms / 1000)])
}

/** A shell whose two children outlive any short bound: one backgrounded, one in the foreground. */
const treeCommand = (marker: string): string => {
  const child = `node -e "setInterval(() => {}, 1000)" ${marker}`
  return `${child} & ${child}; wait`
}

describe.skipIf(process.platform === 'win32')('timeout/group — a bound ends the whole command', () => {
  // THE DEFECT, replayed: the pattern every laddered lane used. It reports the timeout and leaves the
  // command running. If this ever stops holding, the test below proves nothing and must be revisited.
  it('the old pattern — spawnSync kills the shell, and the children survive it', () => {
    const marker = `erpax-ladder-old-${randomUUID()}`
    const r = spawnSync(treeCommand(marker), { shell: true, stdio: 'ignore', timeout: 1500, killSignal: 'SIGKILL' })
    settle(300)
    const left = survivors(marker)
    try {
      expect(r.signal).toBe('SIGKILL')
      expect(left.length).toBeGreaterThan(0)
    } finally {
      for (const pid of left) {
        try {
          process.kill(pid, 'SIGKILL')
        } catch {
          /* already gone */
        }
      }
    }
  })

  it('on the bound, no process from the command tree survives — and it still reads as a timeout', () => {
    const marker = `erpax-ladder-new-${randomUUID()}`
    const started = Date.now()
    const r = spawnGroupSync(treeCommand(marker), { stdio: 'ignore', timeout: 1500 })
    const elapsed = Date.now() - started
    settle(300)
    const left = survivors(marker)
    for (const pid of left) {
      try {
        process.kill(pid, 'SIGKILL')
      } catch {
        /* already gone */
      }
    }
    expect(left).toEqual([])
    expect(r.signal).toBe('SIGKILL')
    // the OOM-versus-timeout reading compares elapsed with the bound: a timeout must land near it
    expect(elapsed).toBeGreaterThanOrEqual(1500 * 0.9)
  })

  it('a normal exit passes its status through, and output is still captured', () => {
    const r = spawnGroupSync('echo landed; exit 3', { stdio: 'pipe', timeout: 5000 })
    expect(r.signal).toBeNull()
    expect(r.status).toBe(3)
    expect(String(r.stdout)).toContain('landed')
  })

  it("a child's own signal is re-raised, so it never reads as the clock", () => {
    const started = Date.now()
    const r = spawnGroupSync('kill -TERM $$', { stdio: 'ignore', timeout: 5000 })
    expect(r.signal).toBe('SIGTERM')
    expect(Date.now() - started).toBeLessThan(5000 * 0.9)
  })
})
