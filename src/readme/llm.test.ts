import { describe, it, expect } from 'vitest'
import { readmeAsLlmForPath } from './llm'
import { deriveFolderModel, renderLLM, deriveLLMBrief, buildReadmeCorpusFrozenInputs, lawLineForAtom } from './compute'
import { computeDiamond } from '@/diamond'
describe('readme/llm', () => {
  it('matches', () => {
    const cwd = process.cwd(); const p = 'readme'; const f = buildReadmeCorpusFrozenInputs(cwd)
    const folder = deriveFolderModel(p, cwd, f.ctx, f.graph)
    const d = computeDiamond({ kind: 'path', path: p, cwd, graph: f.graph, ctx: f.ctx })
    expect(readmeAsLlmForPath(p, cwd).bytes).toBe(renderLLM(deriveLLMBrief(folder, d.model, lawLineForAtom(p, cwd))))
  })
})
