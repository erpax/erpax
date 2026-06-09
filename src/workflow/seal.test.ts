import { describe, it, expect } from 'vitest'
import { mkdtempSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { sealWorkflow, listSealedWorkflows } from './seal'
describe('workflow/seal', () => {
  it('writes', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'wf-'))
    try { expect(sealWorkflow({ name: 't', targetCollection: 'workflow-instances', triggerEvent: 'manual', steps: [{ order: 1, name: 'S', kind: 'human' }] }, cwd).created).toBe(true); expect(listSealedWorkflows(cwd)).toContain('t') }
    finally { rmSync(cwd, { recursive: true, force: true }) }
  })
})
