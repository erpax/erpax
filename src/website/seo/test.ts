import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { listFaces } from './index'

describe('website/seo — the leaf that let @/integrity out of the tangle', () => {
  it('ZERO IMPORTS — the property the cut depends on', () => {
    // integrity/uuid-stream took listFaces from the @/website barrel, which dragged the whole
    // page/agent/spec subtree into the module that exports uuid to the corpus (rules/cycle).
    const src = readFileSync(join(process.cwd(), 'src/website/seo/index.ts'), 'utf8')
    expect(src).not.toMatch(/^\s*import\s/m)
  })

  it('listFaces returns the registry as an array, stably', () => {
    // The registry is populated by registration at runtime, so an empty result is the correct
    // answer here — asserting non-empty would be asserting that some OTHER module already ran.
    const a = listFaces()
    expect(Array.isArray(a)).toBe(true)
    expect(listFaces()).toEqual(a)
  })

  it('the public surface is unchanged — @/website still re-exports it', async () => {
    const { listFaces: viaBarrel } = await import('@/website')
    expect(typeof viaBarrel).toBe('function')
    expect(viaBarrel()).toEqual(listFaces())
  })
})
