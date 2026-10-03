import { describe, it, expect } from 'vitest'
import { buildWitnessTools } from './index'

describe('erpax.witness tools — the factory', () => {
  it('offers both tools: run a cross, and discover the crosses', () => {
    expect(buildWitnessTools().map((t) => t.name)).toEqual(['erpax.witness.cross', 'erpax.witness.discover'])
  })

  it('requires a tolerance, because what counts as agreement belongs to the question', () => {
    const cross = buildWitnessTools().find((t) => t.name === 'erpax.witness.cross')!
    expect(Object.keys(cross.parameters)).toContain('tolerance')
  })

  it('names the cost of discovery, which is one fetch per API', () => {
    const d = buildWitnessTools().find((t) => t.name === 'erpax.witness.discover')!
    expect(d.description).toMatch(/EXPENSIVE|СКЪПО|TEUER|COÛTEUX/)
  })

  it('states that discovery is not provability — the richest crosses need keys', () => {
    const d = buildWitnessTools().find((t) => t.name === 'erpax.witness.discover')!
    expect(d.description).toMatch(/not provability|не е доказуемост|keine Beweisbarkeit|n'est pas prouver/)
  })
})

/**
 * A factory test is not a surface test: 8 of 8 tool atoms here once tested only their own factory,
 * so a fully-tested family was wired nowhere and every test passed.
 */
describe('erpax.witness tools — the live surface', () => {
  it('LIVES on the surface the agent actually sees', async () => {
    const { toolsLiveUnder } = await import('@/agents/mcp')
    expect(await toolsLiveUnder('erpax.witness.')).toBe(true)
  }, 300_000)
})
