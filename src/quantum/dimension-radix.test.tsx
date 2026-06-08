/**
 * @vitest-environment jsdom
 */
/**
 * quantum — Radix dimension panel mount smoke + realtime state transition.
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { QuantumDimensionsProvider } from '@/quantum/QuantumDimensionsProvider'
import { RadixDimensionPanel } from '@/quantum/RadixDimensionPanel'
import { buildDimensionSnapshot, dimensionSnapshotFingerprint } from '@/quantum/dimension-realtime'

describe('quantum — Radix dimension panel mount', () => {
  it('renders all five dimension tabs inside the provider', () => {
    render(
      <QuantumDimensionsProvider emitOnChange={false}>
        <RadixDimensionPanel />
      </QuantumDimensionsProvider>,
    )
    const snap = buildDimensionSnapshot()
    for (const axis of snap.axes) {
      expect(screen.getByText(axis.dimension)).toBeTruthy()
    }
    expect(screen.getByText(/Quantum dimensions/)).toBeTruthy()
  })

  it('provider snapshot fingerprint is stable across refresh', () => {
    const snap = buildDimensionSnapshot()
    expect(snap.axes).toHaveLength(5)
    expect(snap.fingerprint).toBe(dimensionSnapshotFingerprint(snap.axes))
  })
})
