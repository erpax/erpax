import { describe, it, expect, vi } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { runQuantumStatus } from './index'
import { CLI_REGISTRY } from '@/cli/registry'

describe('quantum/status — the path-dispatched entry point', () => {
  it('runs and reports success', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    try {
      expect(runQuantumStatus()).toBe(0)
      expect(log).toHaveBeenCalled()
    } finally {
      log.mockRestore()
    }
  })

  /**
   * The regression this atom exists to prevent.
   *
   * `status.ts` was invoked by the CLI as a SUBPROCESS PATH (`tsx src/quantum/status.ts`), never
   * imported — so both an import-path scan and a symbol scan reported it as having zero references,
   * and deleting it would have silently broken two live commands. A lexical scan cannot see a
   * path dispatch ([[rules]]/unfolded states this limit in its own boundary).
   *
   * So the guard is not "is the symbol referenced" — it is "does every path the CLI dispatches
   * actually exist". A command whose target is missing is a command that cannot run.
   */
  it('every src path the CLI dispatches for quantum EXISTS — a lexical scan cannot see these', () => {
    const cwd = process.cwd()
    const quantum = (CLI_REGISTRY as Record<string, Record<string, { cmd?: string }>>).quantum
    expect(quantum).toBeTruthy()
    const targets = new Set<string>()
    for (const action of Object.values(quantum)) {
      for (const m of (action.cmd ?? '').matchAll(/src\/[\w/.-]+\.tsx?/g)) targets.add(m[0])
    }
    expect(targets.size).toBeGreaterThan(0)
    for (const t of targets) {
      expect(existsSync(join(cwd, t)), `CLI dispatches a missing path: ${t}`).toBe(true)
    }
  })

  it('the quantum status command points at this atom, not a loose sibling', () => {
    const quantum = (CLI_REGISTRY as Record<string, Record<string, { cmd?: string }>>).quantum
    expect(quantum!.status!.cmd).toContain('src/quantum/status/index.ts')
    expect(quantum!.default!.cmd).toContain('src/quantum/status/index.ts')
  })
})
