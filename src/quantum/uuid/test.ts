/**
 * quantum/uuid — collapse determinism + no-cloning on the matrix.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { collapseToUuid, collapseDeterministic, noCloningHolds, merkleCollapseHolds } from '@/quantum/uuid'

describe('quantum/uuid — collapse is the address', () => {
  it('collapseToUuid is deterministic', () => {
    expect(collapseToUuid('erpax')).toBe(collapseToUuid('erpax'))
    expect(collapseToUuid('erpax')).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('content drift ⇒ different uuid', () => {
    expect(collapseToUuid('a')).not.toBe(collapseToUuid('b'))
  })

  it('collapseDeterministic holds for identical observers', () => {
    expect(collapseDeterministic('same', 'same')).toBe(true)
    expect(collapseDeterministic('same', 'diff')).toBe(false)
  })
})

describe('quantum/uuid — quantum laws on the substrate', () => {
  it('no-cloning holds on the live matrix', () => {
    expect(noCloningHolds()).toBe(true)
  })

  it('merkle collapse holds (one eigenstate)', () => {
    expect(merkleCollapseHolds()).toBe(true)
  })
})
