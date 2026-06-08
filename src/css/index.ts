/**
 * css — the styling diamond pipeline (glyph ⊕ style).
 *
 * Each stylesheet is content-addressed and sealed; Node recognizes `.css` /
 * `.scss` as on-ring facets via `load-hook.mjs` (typegen stub, not execution).
 *
 *   tsx src/css/index.ts src/app/(frontend)/globals.css
 *
 * @see ./SKILL.md — ../diamond/projection — ./load-hook.mjs
 */
import { readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { uuid, jcsCanonicalize } from '@/integrity'
import {
  stageUuid,
  computationUuid,
  type DiamondComputationStage,
} from '@/diamond'

export interface CssDiamondInput {
  readonly path: string
  readonly content?: string
  readonly cwd?: string
}

export interface CssDiamondSeal {
  readonly contentUuid: string
  readonly byteLength: number
}

export interface CssDiamondResult {
  /** Src-relative stylesheet path — the diamond address. */
  readonly path: string
  readonly seal: CssDiamondSeal
  readonly stages: readonly DiamondComputationStage[]
  readonly computationUuid: string
}

function pushStage(
  stages: DiamondComputationStage[],
  stage: string,
  input: unknown,
  output: unknown,
): void {
  stages.push({ stage, input, output, stageUuid: stageUuid(stage, input, output) })
}

/** Resolve a filesystem or src-relative path to an absolute file + src-relative key. */
export function resolveCssPath(path: string, cwd: string = process.cwd()): { rel: string; abs: string } {
  const norm = path.replace(/\\/g, '/')
  const srcRoot = join(cwd, 'src')
  let abs: string
  if (norm.startsWith('/')) {
    abs = norm
  } else if (/^[A-Za-z]:\//.test(norm)) {
    abs = norm
  } else {
    abs = join(cwd, norm)
  }
  let rel = relative(srcRoot, abs).replace(/\\/g, '/')
  if (rel.startsWith('..')) {
    rel = norm.replace(/^src\//, '')
    abs = join(srcRoot, rel)
  }
  return { rel, abs }
}

/** Content-uuid of stylesheet bytes under a stable src-relative path. */
export function cssContentUuid(path: string, content: string): string {
  return uuid(jcsCanonicalize({ path, content }))
}

/**
 * Canonical css diamond — path → content seal → uuid fold.
 * Same bytes at the same path ⇒ same contentUuid (merge-safe).
 */
export function computeCssDiamond(input: CssDiamondInput): CssDiamondResult {
  const cwd = input.cwd ?? process.cwd()
  const { rel, abs } = resolveCssPath(input.path, cwd)
  const content = input.content ?? readFileSync(abs, 'utf8')
  const contentUuid = cssContentUuid(rel, content)
  const byteLength = Buffer.byteLength(content, 'utf8')

  const stages: DiamondComputationStage[] = []
  pushStage(stages, 'path', { path: input.path, cwd }, { path: rel })
  pushStage(stages, 'content', { path: rel }, { contentUuid, byteLength })
  pushStage(stages, 'seal', { path: rel }, { sealed: true, impurities: [] as string[] })
  pushStage(stages, 'uuid', { path: rel, contentUuid }, { contentUuid })

  return {
    path: rel,
    seal: { contentUuid, byteLength },
    stages,
    computationUuid: computationUuid(stages),
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const target = process.argv[2] ?? 'app/(frontend)/globals.css'
  const result = computeCssDiamond({ path: target })
  console.log(`css — ${result.path}`)
  console.log(`  contentUuid: ${result.seal.contentUuid}`)
  console.log(`  computation: ${result.computationUuid} (${result.stages.length} stages)`)
}
