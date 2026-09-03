import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { importSpecifiersOf } from '@/syntax'
import { stateUuids } from './index'

describe('rodin/state — the vortex states as content-uuids carry them', () => {
  it('reports a count per vortex digit from the live matrix', () => {
    const states = stateUuids()
    expect(states.length).toBeGreaterThan(0)
    expect(states.reduce((s, x) => s + x.count, 0)).toBeGreaterThan(0)
    for (const s of states) if (s.sample) expect(s.sample.uuid).toMatch(/^[0-9a-f-]{36}$/)
  })
})

/*
 * THE CUT, from the other side: the ARITHMETIC must not reach the matrix. `orbit` is what a
 * key-derivation function wants, and it was carrying 3,411 node literals to a Cloudflare Worker.
 */
describe('rodin/state — the parent stays arithmetic', () => {
  it('../index imports no matrix', () => {
    const text = readFileSync(join(import.meta.dirname, '..', 'index.ts'), 'utf8')
    expect(importSpecifiersOf('index.ts', text)).not.toContain('@/uuid/matrix')
  })
})
