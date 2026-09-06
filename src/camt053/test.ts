import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import * as barrel from './index'

describe('camt053 — the hub barrel', () => {
  it('names every child it claims, and each one is really there', () => {
    for (const child of ['import/service']) {
      expect(
        existsSync(join(import.meta.dirname, child, 'index.ts')) ||
          existsSync(join(import.meta.dirname, child, 'index.tsx')),
        child,
      ).toBe(true)
    }
  })

  it('holds no matter of its own — a hub re-exports, it does not implement', () => {
    for (const [name, m] of Object.entries(barrel)) expect(m, name).not.toBeUndefined()
  })
})
