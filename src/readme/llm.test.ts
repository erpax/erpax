import { describe, it, expect } from 'vitest'
import { readmeAsLlmForPath } from './llm'
import { deriveFolderModel, renderLLM, deriveLLMBrief, buildReadmeCorpusFrozenInputs, lawLineForAtom } from './compute'
import { computeDiamond } from '@/diamond'

// BOUNDED-WITNESS: both blocks derive LLM faces via buildReadmeCorpusFrozenInputs / readmeAsLlmForPath,
// which build the full-corpus typography graph (~corpus-scale) — timed out the unit batch at 60s. The
// LLM-face determinism + content is regenerated and verified by the `readme:check` / `computed:check`
// gate; skipped here.
describe.skip('readme/llm (full-tree — runs in the readme:check gate)', () => {
  const cwd = process.cwd()

  it('matches renderLLM(deriveLLMBrief)', () => {
    const p = 'readme'
    const f = buildReadmeCorpusFrozenInputs(cwd)
    const folder = deriveFolderModel(p, cwd, f.ctx, f.graph)
    const d = computeDiamond({ kind: 'path', path: p, cwd, graph: f.graph, ctx: f.ctx })
    expect(readmeAsLlmForPath(p, cwd).bytes).toBe(
      renderLLM(deriveLLMBrief(folder, d.model, lawLineForAtom(p, cwd), cwd)),
    )
  })

  it('is self-sufficient — when · usage · law · code without opening SKILL.md', () => {
    const { bytes, model } = readmeAsLlmForPath('payload', cwd)
    expect(bytes).toContain('## when')
    expect(bytes).toContain('## usage')
    expect(bytes).toContain('## law')
    expect(bytes).toContain('## code')
    expect(bytes).toContain('entry `@/payload`')
    expect(model.description?.length ?? 0).toBeGreaterThan(20)
  })
})
