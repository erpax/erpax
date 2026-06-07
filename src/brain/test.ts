import { describe, it, expect } from 'vitest'
import {
  NEURONS,
  SYNAPSES,
  synapsesPerNeuron,
  pathLength,
  smallWorld,
  sparsity,
  efficientWiring,
  connectomeScale,
  brainConnectome,
  integrates,
} from '@/brain'

describe('brain — small-world (short paths across 86 billion neurons)', () => {
  it('average path length is a handful of hops (~log N / log k)', () => {
    expect(pathLength()).toBeLessThan(5)
    expect(pathLength()).toBeGreaterThan(1)
  })
  it('dense local degree (~1744 synapses/neuron)', () => {
    expect(synapsesPerNeuron()).toBeGreaterThan(1000)
    expect(smallWorld()).toBe(true)
  })
})

describe('brain — sparse wiring (maximal reach, minimal cost)', () => {
  it('each neuron wires to a vanishing fraction yet stays reachable', () => {
    expect(sparsity()).toBeLessThan(1e-6)
    expect(efficientWiring()).toBe(true)
  })
})

describe('brain — connectome scale (the cross-check)', () => {
  it('neurons × synapses-per-neuron = the synapse count', () => {
    expect(NEURONS * synapsesPerNeuron()).toBeCloseTo(SYNAPSES, 0)
    expect(connectomeScale()).toBe(true)
  })
})

describe('brain — the conjunction', () => {
  it('every connectome claim is true', () => {
    for (const [k, v] of Object.entries(brainConnectome())) expect(v, k).toBe(true)
  })
  it('the brain is the integrated connectome', () => {
    expect(integrates()).toBe(true)
  })
})
