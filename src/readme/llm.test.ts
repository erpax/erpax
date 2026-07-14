import { describe, it, expect } from 'vitest'
import { readmeAsLlmForPath } from './llm'
import { deriveFolderModel, renderLLM, deriveLLMBrief, buildReadmeCorpusFrozenInputs, lawLineForAtom } from './compute'
import { computeDiamond } from '@/diamond'

describe('readme/llm', () => {
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
