/**
 * readme/llm — README-as-LLM from deriveFolderModel (zero extra assumptions).
 */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { computeDiamond } from '@/diamond'
import {
  deriveFolderModel,
  deriveLLMBrief,
  renderLLM,
  llmBriefUuid,
  lawLineForAtom,
  buildReadmeCorpusFrozenInputs,
  type LLMBriefModel,
  type FolderReadmeModel,
} from './compute'

const SRC = 'src'

export interface ReadmeAsLlmResult {
  readonly model: LLMBriefModel
  readonly bytes: string
  readonly contentUuid: string
  readonly folder: FolderReadmeModel
}

export function readmeAsLlm(folderModel: FolderReadmeModel, cwd = process.cwd()): ReadmeAsLlmResult {
  const frozen = buildReadmeCorpusFrozenInputs(cwd)
  const computation = computeDiamond({
    kind: 'path',
    path: folderModel.atomPath,
    cwd,
    graph: frozen.graph,
    ctx: frozen.ctx,
  })
  const model = deriveLLMBrief(folderModel, computation.model, lawLineForAtom(folderModel.atomPath, cwd))
  const bytes = renderLLM(model)
  return { model, bytes, contentUuid: llmBriefUuid(model), folder: folderModel }
}

export function readmeAsLlmForPath(atomPath: string, cwd = process.cwd()): ReadmeAsLlmResult {
  const frozen = buildReadmeCorpusFrozenInputs(cwd)
  return readmeAsLlm(deriveFolderModel(atomPath, cwd, frozen.ctx, frozen.graph), cwd)
}

export function materializeLlmFace(atomPath: string, cwd = process.cwd()): ReadmeAsLlmResult {
  const result = readmeAsLlmForPath(atomPath, cwd)
  writeFileSync(join(cwd, SRC, atomPath, 'LLM.md'), result.bytes, 'utf8')
  return result
}

export function runReadmeLlmCli(argv: string[] = process.argv.slice(2)): number {
  const atomPath = (argv.find((a) => !a.startsWith('-') && a !== 'llm') ?? 'readme').replace(/^src\//, '')
  const result = materializeLlmFace(atomPath)
  console.log(`readme llm — ${atomPath}/LLM.md · ${result.contentUuid}`)
  return 0
}

if (import.meta.url === `file://${process.argv[1]}`) process.exit(runReadmeLlmCli())
