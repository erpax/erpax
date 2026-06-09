import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import {
  handMaintainedViolations,
  boundedSessionPaths,
  computeTheRest,
  SESSION_COMPUTE_ROOTS,
} from './hand-maintained'

describe('hand-maintained', () => {
  const root = join(tmpdir(), `hm-${Date.now()}`)
  const src = join(root, 'src')

  beforeAll(() => {
    mkdirSync(join(src, 'pivot'), { recursive: true })
    const skill = ['---', 'name: pivot', '---', '', '**Law — x.**', 'Matter-twin: y', ''].join('\n')
    writeFileSync(join(src, 'pivot/SKILL.md'), skill)
    writeFileSync(join(src, 'pivot/README.md'), '## pivot\n\n## pivot\n')
  })

  afterAll(() => {
    if (existsSync(root)) rmSync(root, { recursive: true, force: true })
  })

  it('audit shape and duplicate-list detection', () => {
    const audit = handMaintainedViolations({ cwd: root, paths: ['pivot'] })
    expect(audit.violationCount).toBe(audit.violations.length)
    expect(audit.violations.some((v) => v.kind === 'duplicate-list')).toBe(true)
    for (const v of audit.violations) {
      expect(v.path).toBeTruthy()
      expect(['readme paths', 'emit', 'delete']).toContain(v.fix)
    }
  })

  it('boundedSessionPaths caps at max', () => {
    expect(boundedSessionPaths(process.cwd(), SESSION_COMPUTE_ROOTS, 3).length).toBeLessThanOrEqual(3)
  })

  it('computeTheRest scopes to fixture path', () => {
    expect(computeTheRest('pivot', root).paths).toContain('pivot')
  })
})
