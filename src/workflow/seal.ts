/**
 * workflow/seal — seal workflow definitions as trinity atoms.
 */
import { existsSync, mkdirSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { computeContentUuid } from '@/integrity'

export interface WorkflowStepDef {
  readonly order: number
  readonly name: string
  readonly kind: 'human' | 'service_task'
  readonly serviceHandler?: string
}

export interface WorkflowSealDefinition {
  readonly name: string
  readonly description?: string
  readonly targetCollection: string
  readonly triggerEvent: string
  readonly steps: readonly WorkflowStepDef[]
}

export interface WorkflowSealResult {
  readonly name: string
  readonly atomPath: string
  readonly contentUuid: string
  readonly files: readonly string[]
  readonly created: boolean
}

const SRC = 'src'
const ROOT = 'workflow/sealed'

const slug = (n: string): string => n.trim().toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 32) || 'workflow'

export function listSealedWorkflows(cwd = process.cwd()): readonly string[] {
  const dir = join(cwd, SRC, ROOT)
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort()
}

export function sealWorkflow(def: WorkflowSealDefinition, cwd = process.cwd()): WorkflowSealResult {
  const leaf = slug(def.name)
  const atomPath = `${ROOT}/${leaf}`
  const dir = join(cwd, SRC, atomPath)
  const created = !existsSync(dir)
  if (created) mkdirSync(dir, { recursive: true })
  const contentUuid = computeContentUuid(def as unknown as Record<string, unknown>, 'workflow/seal')
  writeFileSync(
    join(dir, 'index.ts'),
    `export const workflowName = ${JSON.stringify(def.name)} as const\nexport const workflowContentUuid = ${JSON.stringify(contentUuid)} as const\nexport const workflowDefinition = ${JSON.stringify(def, null, 2)} as const\n`,
  )
  writeFileSync(
    join(dir, 'test.ts'),
    `import { describe, it, expect } from 'vitest'\nimport { workflowDefinition, workflowContentUuid } from './index'\ndescribe('sealed', () => { it('stable', () => { expect(workflowContentUuid).toMatch(/^[0-9a-f-]{36}$/); expect(workflowDefinition.steps.length).toBe(${def.steps.length}) }) })\n`,
  )
  writeFileSync(join(dir, 'definition.json'), `${JSON.stringify({ ...def, contentUuid }, null, 2)}\n`)
  return {
    name: def.name,
    atomPath,
    contentUuid,
    files: [`${atomPath}/index.ts`, `${atomPath}/test.ts`, `${atomPath}/definition.json`],
    created,
  }
}

export function runWorkflowSealCli(argv: string[] = process.argv.slice(2)): number {
  const name = argv.find((a) => !a.startsWith('-') && a !== 'seal') ?? 'self-educate'
  const r = sealWorkflow({
    name,
    targetCollection: 'workflow-instances',
    triggerEvent: 'manual',
    steps: [
      { order: 1, name: 'Scan', kind: 'service_task', serviceHandler: 'agent/educate' },
      { order: 2, name: 'Wave', kind: 'service_task', serviceHandler: 'apply/wave' },
      { order: 3, name: 'Receipt', kind: 'human' },
    ],
  })
  console.log(`workflow seal ${r.atomPath} count=${listSealedWorkflows().length}`)
  return 0
}

if (import.meta.url === `file://${process.argv[1]}`) process.exit(runWorkflowSealCli())
