/**
 * scalpel/document — a refactoring is a document, and erpax applies it.
 *
 * The scalpel already makes a mass edit safe: every cut matches exactly once or refuses, carries a
 * reason, and a batch that fails the ring is restored to the byte. What it lacked was a door, so
 * refactorings were done with throwaway scripts beside it. The door is a document: a nested page
 * under `refactors` whose body states why and carries the cuts in one JSON block. The same text is
 * a file in a checkout and a page in Payload, so a refactoring can be written, reviewed and stored
 * through the site, then fetched by slug and applied here.
 *
 * Run: pnpm erpax refactor <file.md | slug> [--url <origin>] [--apply] [--verify "<command>"]
 *      (dry run by default: every refusal is named and nothing is touched)
 *
 * @invariant a document with no JSON block, or a block that is not a list of cuts, is refused whole
 * @invariant without --apply nothing is written; with it, a red ring restores the batch and stops
 * @see ./SKILL.md
 */
import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { applyScalpel, type ScalpelOp, type ScalpelResult } from '@/scalpel'
import { pageRows, slugOf, type PageRow } from '@/seed/content'

/** A refactoring as a document: what it is called, why it is done, and the cuts. */
export interface Refactoring {
  readonly name: string
  readonly why: string
  readonly ops: readonly ScalpelOp[]
}

const isOp = (x: unknown): x is ScalpelOp => {
  const o = x as Partial<ScalpelOp> | null
  return !!o && typeof o.file === 'string' && typeof o.find === 'string' && typeof o.replace === 'string' && typeof o.reason === 'string'
}

/** The cuts a document carries: its first JSON block, which must be a list of well-formed cuts. */
export function manifestOf(markdown: string): ScalpelOp[] {
  const block = /```json\n([\s\S]*?)\n```/.exec(markdown)?.[1]
  if (block === undefined) throw new Error('refactoring document carries no ```json block of cuts')
  let parsed: unknown
  try {
    parsed = JSON.parse(block)
  } catch (e) {
    throw new Error(`refactoring document's JSON block does not parse: ${(e as Error).message}`)
  }
  if (!Array.isArray(parsed) || !parsed.every(isOp)) throw new Error('refactoring document: the JSON block must be a list of { file, find, replace, reason }')
  return parsed
}

/** A refactoring written out as its document — what `manifestOf` reads back. */
export function refactoringMarkdown(r: Refactoring): string {
  return [`# ${r.name}`, '', r.why.trim(), '', `${r.ops.length} cut(s). Each matches exactly once or the whole plan refuses.`, '', '```json', JSON.stringify(r.ops, null, 2), '```'].join('\n')
}

/** Where a refactoring's page lives: `refactors/<name>`. */
export const refactoringPath = (name: string): string => `refactors/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`

/** Refactorings as nested page rows under one `refactors` page — loaded like any other seed. */
export function refactoringRows(all: readonly Refactoring[]): PageRow[] {
  const bodies = new Map<string, string>([
    ['refactors', `# Refactors\n\nEvery mass edit of the corpus, as a document: why, and the cuts. ${all.length} recorded.`],
    ...all.map((r): [string, string] => [refactoringPath(r.name), refactoringMarkdown(r)]),
  ])
  return pageRows([...bodies.keys()].map((path) => ({ path })), (path) => bodies.get(path))
}

/** One line per refused cut: where, why not. A plan with any refusal is not applied. */
export function refusals(result: ScalpelResult): string[] {
  return result.plan.verdicts
    .filter((v) => v.state !== 'cuts')
    .map((v) => `${v.op.file}: ${v.state}${v.state === 'ambiguous' ? ` (${v.matches} matches)` : ''} — ${v.op.reason || 'no reason given'}`)
}

/**
 * Plan a refactoring document, or apply it. Applying is refused while any cut is refused: a
 * half-applied refactoring is the damage the scalpel exists to prevent.
 */
export function refactor(markdown: string, opts: { cwd?: string; apply?: boolean; verify?: () => boolean } = {}): ScalpelResult & { readonly refused: readonly string[] } {
  const ops = manifestOf(markdown)
  const plan = applyScalpel(ops, { cwd: opts.cwd, apply: false })
  const refused = refusals(plan)
  if (!opts.apply || refused.length > 0) return { ...plan, complete: false, refused }
  return { ...applyScalpel(ops, { cwd: opts.cwd, apply: true, verify: opts.verify }), refused }
}

/** A refactoring document fetched from Payload by its slug, through the search collection. */
export async function fetchRefactoring(origin: string, slug: string, authorization?: string): Promise<string> {
  const { PayloadSDK } = await import('@payloadcms/sdk')
  const sdk = new PayloadSDK({ baseURL: `${origin.replace(/\/$/, '')}/api`, baseInit: authorization ? { headers: { Authorization: authorization } } : {} })
  const res = (await sdk.find({ collection: 'search', where: { slug: { equals: slug } }, select: { markdown: true }, limit: 1, depth: 0 } as never)) as { docs: { markdown?: string | null }[] }
  const markdown = res.docs[0]?.markdown
  if (!markdown) throw new Error(`no refactoring document with slug ${slug} at ${origin}`)
  return markdown
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const argv = process.argv.slice(2)
  const flag = (name: string): string | undefined => {
    const i = argv.indexOf(name)
    return i >= 0 && argv[i + 1] && !argv[i + 1]!.startsWith('--') ? argv[i + 1] : undefined
  }
  const taken = new Set(['--url', '--verify'].map((f) => flag(f)).filter(Boolean))
  const target = argv.find((a) => !a.startsWith('--') && !taken.has(a))
  if (!target) {
    console.error('usage: erpax refactor <file.md | slug> [--url <origin>] [--apply] [--verify "<command>"]')
    process.exit(2)
  }
  const url = flag('--url') ?? process.env.ERPAX_URL
  const markdown = existsSync(target)
    ? readFileSync(target, 'utf8')
    : url
      ? await fetchRefactoring(url, target.startsWith('refactors-') ? target : slugOf(refactoringPath(target)), process.env.ERPAX_AUTHORIZATION)
      : (console.error(`refactor: ${target} is not a file, and no --url was given to fetch it by slug`), process.exit(2))
  const command = flag('--verify') ?? './node_modules/.bin/tsc --noEmit -p .'
  const verify = (): boolean => {
    try {
      execSync(command, { stdio: 'ignore' })
      return true
    } catch {
      return false
    }
  }
  const apply = argv.includes('--apply')
  const result = refactor(markdown, { apply, verify })
  for (const line of result.refused) console.error(`  refused  ${line}`)
  console.log(`refactor — ${result.plan.cuts.length} cut(s), ${result.refused.length} refused · ${apply ? (result.complete ? 'APPLIED and verified' : 'NOT applied') : 'dry run, nothing written'}`)
  process.exit(result.refused.length > 0 || (apply && !result.complete) ? 1 : 0)
}
