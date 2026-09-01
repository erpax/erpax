import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'

const SRC = readFileSync(join(process.cwd(), 'src/confirm/push/index.ts'), 'utf8')

describe('confirm/push — only a green seal lands', () => {
  it('is the wired stop-hook body', () => {
    const hooks = JSON.parse(readFileSync(join(process.cwd(), 'src/hooks.json'), 'utf8')) as {
      hooks?: Record<string, unknown>
    }
    expect(JSON.stringify(hooks)).toContain('src/confirm/push/index.ts')
  })

  it('runs the full seal before it commits — never a bare commit', () => {
    expect(SRC).toMatch(/confirm/)
    const commitAt = SRC.indexOf('git commit')
    const sealAt = SRC.search(/confirm[:\s-]*full|--full/)
    expect(commitAt).toBeGreaterThan(-1)
    expect(sealAt).toBeGreaterThan(-1)
    expect(sealAt).toBeLessThan(commitAt)
  })

  it('takes a lock — two waves may not interleave', () => {
    expect(SRC).toMatch(/lock/i)
  })
})
