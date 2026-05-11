/**
 * Spec extractor — parse JSDoc banners on Payload collection files.
 *
 * Slice CCCCC (2026-05-11): the foundation of the JSDoc-as-spec
 * pipeline. Walks every `*.ts` collection file under the configured
 * roots, finds the leading JSDoc banner, parses every supported tag,
 * and yields a `CollectionSpec`. Pure (no IO except `readFileSync` /
 * `readdirSync`) so it runs in any environment — boot, CI, sandbox.
 *
 * Tag grammar accepted (each one-line unless an @example/@invariant
 * fenced block is opened):
 *
 *   @standard      <body> <id> [free-text]
 *   @accounting    <body> <id> [free-text]      ← alias for @standard
 *   @compliance    <body> <id> [free-text]      ← alias for @standard
 *   @audit         <body> <id> [free-text]      ← alias for @standard
 *   @security      <body> <id> [free-text]      ← alias for @standard
 *   @rfc           <id> [free-text]             ← body inferred as 'RFC'
 *   @chain         <CHAIN_ID> step <N>-of-<M> [— <note>]
 *   @feature       <featureId> [— <label>]
 *   @role          <roleId> — <write|read>
 *   @emits         <eventId> [— <payloadDescription>]
 *   @subscribes    <eventId>
 *   @example       <chainId> / step <N>-of-<M>   ← followed by a ```json fence
 *   @invariant     <natural-language>            ← OR followed by ```ts fence
 *   @useCase       <markdown text>               ← can span multiple lines until next tag
 *   @summary       "<text>"
 *   @slice         <sliceId>
 *   @cron          <rfc-5545 cron expression>
 *   @see           <path-or-url>
 *
 * Rich Markdown / Lexical features outside @-tags (headings, tables,
 * mermaid + math fences, callouts, custom blocks, embeds, footnotes,
 * collapsibles, task lists) are preserved in `description` for the
 * downstream marketing / README / PDF/A renderers.
 *
 * @standard ISO/IEC 25010:2023 §5 modularity-and-maintainability
 * @standard ISO/IEC 12207 software-life-cycle
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'
import type {
  CollectionSpec, SpecCorpus, SpecStandard, SpecChainStep, SpecFeature,
  SpecRole, SpecEmit, SpecSubscribe, SpecExample, SpecInvariant,
  SpecUseCase, SpecSummary, SpecSlice, SpecCron, SpecSee,
} from './types'

const STANDARD_ALIASES = new Set(['standard', 'accounting', 'compliance', 'audit', 'security'])

/** Read a single file safely. */
function readSafe(p: string): string {
  try { return readFileSync(p, 'utf8') } catch { return '' }
}

/**
 * Recursively list every `*.ts` file under a root, skipping `_attic`/
 * `node_modules`/dotdirs. CCCCC update (per "tests also have jsdoc
 * marketing lexical markdown"): tests are first-class spec carriers
 * too — the optional `kind` filter selects 'source' (`*.ts` minus
 * `*.test.ts`), 'test' (`*.test.ts`), or 'all' (default).
 */
function listTs(root: string, kind: 'source' | 'test' | 'all' = 'all'): ReadonlyArray<string> {
  const out: string[] = []
  if (!existsSync(root)) return out
  const stack: string[] = [root]
  while (stack.length > 0) {
    const dir = stack.pop()!
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue
      if (entry.name === 'node_modules' || entry.name === 'dist') continue
      const full = join(dir, entry.name)
      if (entry.isDirectory()) { stack.push(full); continue }
      if (!entry.isFile() || !entry.name.endsWith('.ts') || entry.name.endsWith('.bak')) continue
      const isTest = entry.name.endsWith('.test.ts')
      if (kind === 'source' && isTest) continue
      if (kind === 'test'   && !isTest) continue
      out.push(full)
    }
  }
  return out
}

/**
 * Test files often have NO `slug:` declaration — they reference the
 * collection by import. Infer the slug from the test's basename:
 *   `consignment-cycle.test.ts`            → `consignment-cycle`         (matches a chain id)
 *   `Foo.test.ts`                          → kebab-case of `Foo`         (matches a collection slug)
 *   `chain-id-with-dashes.test.ts`         → as-is
 *
 * The merger downstream tries both interpretations.
 */
function slugCandidatesFromTestPath(filePath: string): ReadonlyArray<string> {
  const m = filePath.match(/\/([^\/]+)\.test\.ts$/)
  if (!m) return []
  const base = m[1]
  // Both raw-base and kebab-case interpretations.
  const kebab = base.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  return base === kebab ? [base] : [base, kebab]
}

/** Extract the leading JSDoc banner block (or the first banner above `const X: CollectionConfig`). */
function findBanner(text: string): string | null {
  // Prefer the banner immediately above the CollectionConfig declaration.
  const aboveConfig = text.match(/(\/\*\*[\s\S]*?\*\/)\s*\n(?:export\s+)?const\s+\w+\s*:\s*CollectionConfig\s*=/)
  if (aboveConfig) return aboveConfig[1]
  // Fallback: first banner in the file.
  const first = text.match(/^\s*(\/\*\*[\s\S]*?\*\/)/)
  return first ? first[1] : null
}

/** Strip the leading ` * ` / `*` decoration from each banner line. */
function uncomment(banner: string): string {
  return banner
    .replace(/^\/\*\*\s*/, '')
    .replace(/\s*\*\/\s*$/, '')
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, ''))
    .join('\n')
    .trim()
}

/** Extract `slug: '<x>'` from the file body (NOT the banner). */
function extractSlug(text: string): string | null {
  const m = text.match(/slug:\s*'([a-z][\w-]*)'/)
  return m ? m[1] : null
}

/**
 * Walk the un-commented banner line-by-line. Recognise tag lines + their
 * bodies (which may continue on subsequent lines until the next tag).
 * Returns the structured spec.
 */
function parseBanner(banner: string, slug: string, filePath: string): CollectionSpec {
  const text = uncomment(banner)
  const lines = text.split('\n')

  let title = ''
  const descLines: string[] = []
  const standards: SpecStandard[] = []
  const chainSteps: SpecChainStep[] = []
  const features: SpecFeature[] = []
  const roles: SpecRole[] = []
  const emits: SpecEmit[] = []
  const subscribes: SpecSubscribe[] = []
  const examples: SpecExample[] = []
  const invariants: SpecInvariant[] = []
  const useCases: SpecUseCase[] = []
  const summaries: SpecSummary[] = []
  const slices: SpecSlice[] = []
  const crons: SpecCron[] = []
  const sees: SpecSee[] = []

  // First non-empty line becomes the title (strip leading H1 marker if present).
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.length > 0) {
      title = trimmed.replace(/^#+\s*/, '')
      break
    }
  }

  // Walk lines; collect tag bodies + free-text into description.
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const tagMatch = line.match(/^@(\w+)\s*(.*)$/)
    if (!tagMatch) {
      descLines.push(line)
      i++
      continue
    }
    const tag = tagMatch[1].toLowerCase()
    let body = tagMatch[2]

    // For tags that may span multiple lines (useCase / example / invariant),
    // greedily consume continuation lines until we hit the next @tag or EOF.
    const isMultiline = tag === 'usecase' || tag === 'example' || tag === 'invariant'
    if (isMultiline) {
      const acc: string[] = body ? [body] : []
      let j = i + 1
      while (j < lines.length) {
        const next = lines[j]
        if (/^@\w+\s*/.test(next)) break
        acc.push(next)
        j++
      }
      body = acc.join('\n').trim()
      i = j
    } else {
      i++
    }

    // Dispatch by tag name.
    if (STANDARD_ALIASES.has(tag)) {
      const m = body.match(/^(\S+)\s+(\S+)(?:\s+(.+))?$/)
      if (m) standards.push({ body: m[1], id: m[2], description: m[3] })
    } else if (tag === 'rfc') {
      const m = body.match(/^(\S+)(?:\s+(.+))?$/)
      if (m) standards.push({ body: 'RFC', id: m[1], description: m[2] })
    } else if (tag === 'chain') {
      const m = body.match(/^([A-Z][A-Z0-9_]*)\s+step\s+(\d+)-of-(\d+)(?:\s+[-—]?\s*(.*))?$/)
      if (m) chainSteps.push({
        chainId: m[1], stepIndex: Number(m[2]), totalSteps: Number(m[3]), note: m[4]?.trim() || undefined,
      })
    } else if (tag === 'feature') {
      const m = body.match(/^([\w-]+)(?:\s+[-—]\s*(.+))?$/)
      if (m) features.push({ id: m[1], label: m[2]?.trim() || undefined })
    } else if (tag === 'role') {
      const m = body.match(/^([\w-]+)\s+[-—]\s*(read|write)\b/)
      if (m) roles.push({ roleId: m[1], access: m[2] as 'read' | 'write' })
    } else if (tag === 'emits') {
      const m = body.match(/^([\w:.-]+)(?:\s+[-—]\s*(.+))?$/)
      if (m) emits.push({ eventId: m[1], payloadDescription: m[2]?.trim() || undefined })
    } else if (tag === 'subscribes') {
      const m = body.match(/^([\w:.-]+)/)
      if (m) subscribes.push({ eventId: m[1] })
    } else if (tag === 'example') {
      // Header: `<chainId> / step <N>-of-<M>` — followed by a ```json fence.
      const headerLine = body.split('\n')[0] ?? ''
      const header = headerLine.match(/^([A-Z][A-Z0-9_]*)\s*\/\s*step\s+(\d+)-of-(\d+)/)
      const fence = body.match(/```json\s*([\s\S]*?)```/)
      if (header && fence) {
        try {
          const payload = JSON.parse(fence[1])
          examples.push({
            chainId: header[1],
            stepIndex: Number(header[2]),
            totalSteps: Number(header[3]),
            payload,
          })
        } catch { /* malformed JSON — skip */ }
      }
    } else if (tag === 'invariant') {
      // Either a natural-language predicate (single line) OR a fenced ts block.
      const tsFence = body.match(/```ts\s*([\s\S]*?)```/)
      if (tsFence) {
        invariants.push({ form: 'ts', tsCode: tsFence[1].trim() })
      } else {
        invariants.push({ form: 'predicate', predicate: body.trim() })
      }
    } else if (tag === 'usecase') {
      useCases.push({ markdown: body })
    } else if (tag === 'summary') {
      const m = body.match(/^"([^"]+)"\s*$/) ?? body.match(/^(.+)$/)
      if (m) summaries.push({ text: m[1] })
    } else if (tag === 'slice') {
      const m = body.match(/^([A-Z]+(?:-[a-z]+)?)/)
      if (m) slices.push({ sliceId: m[1] })
    } else if (tag === 'cron') {
      crons.push({ cron: body.trim() })
    } else if (tag === 'see') {
      sees.push({ target: body.trim() })
    } else {
      // Unrecognised tag — keep as description so the renderer doesn't lose it.
      descLines.push(line)
    }
  }

  return {
    slug,
    filePath,
    title,
    description: descLines.join('\n').trim(),
    standards, chainSteps, features, roles, emits, subscribes,
    examples, invariants, useCases, summaries, slices, crons, sees,
  }
}

/** Find the FIRST JSDoc banner anywhere in a file (test files often have it at top). */
function findAnyBanner(text: string): string | null {
  const m = text.match(/\/\*\*[\s\S]*?\*\//)
  return m ? m[0] : null
}

/**
 * Slug candidates for a non-collection source file: the basename and its
 * kebab-case variant. Used so chain-seed / hook / service files can
 * contribute their banner tags to the spec keyed off the same name as
 * the matching collection / chain / hook.
 */
function slugCandidatesFromSourcePath(filePath: string): ReadonlyArray<string> {
  const m = filePath.match(/\/([^\/]+)\.ts$/)
  if (!m) return []
  const base = m[1].replace(/\.hook$|\.service$/, '')
  const kebab = base.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  return base === kebab ? [base] : [base, kebab]
}

/** Extract the spec for one file (or null if it has no banner). */
export function extractFileSpec(filePath: string, repoRoot: string): CollectionSpec | null {
  const text = readSafe(filePath)
  const isTest = filePath.endsWith('.test.ts')
  const explicitSlug = extractSlug(text)
  const banner = isTest ? findAnyBanner(text) : findBanner(text)
  if (!banner) return null
  // Source-side slug resolution:
  //   1. If the file declares `slug: '...'`, use it (collection files).
  //   2. Else if the banner has at least one @chain / @feature / @standard
  //      tag (i.e. it's a spec carrier), key off the basename.
  //   3. Test files: always key off the basename (paired with source).
  let slug = explicitSlug
  if (!slug && isTest) slug = slugCandidatesFromTestPath(filePath)[0] ?? null
  if (!slug && !isTest) {
    const hasSpecTag = /@(chain|feature|emits|subscribes|cron|standard|accounting|compliance|audit|security|rfc)\b/.test(banner)
    if (hasSpecTag) slug = slugCandidatesFromSourcePath(filePath)[0] ?? null
  }
  if (!slug) return null
  return parseBanner(banner, slug, relative(repoRoot, filePath))
}

/**
 * Merge two specs that share a slug — concatenate every per-tag array.
 * Title + description prefer the source file (collection banner) when
 * non-empty; the test banner contributes its description as a trailing
 * "## Test scenarios" section so marketing doesn't lose context.
 */
function mergeSpecs(source: CollectionSpec | null, test: CollectionSpec | null): CollectionSpec {
  if (source && !test) return source
  if (test && !source) return test
  if (!source || !test) throw new Error('mergeSpecs: at least one input required')
  const desc = source.description
    + (test.description
      ? '\n\n## Test scenarios\n\n' + test.description
      : '')
  return {
    slug: source.slug,
    filePath: source.filePath, // source is canonical for the slug
    title: source.title || test.title,
    description: desc,
    standards:  [...source.standards,  ...test.standards],
    chainSteps: [...source.chainSteps, ...test.chainSteps],
    features:   [...source.features,   ...test.features],
    roles:      [...source.roles,      ...test.roles],
    emits:      [...source.emits,      ...test.emits],
    subscribes: [...source.subscribes, ...test.subscribes],
    examples:   [...source.examples,   ...test.examples],
    invariants: [...source.invariants, ...test.invariants],
    useCases:   [...source.useCases,   ...test.useCases],
    summaries:  [...source.summaries,  ...test.summaries],
    slices:     [...source.slices,     ...test.slices],
    crons:      [...source.crons,      ...test.crons],
    sees:       [...source.sees,       ...test.sees],
  }
}

/**
 * Run the extractor over every source AND test file under standard
 * roots. CCCCC update: per the user directive "tests also have jsdoc
 * marketing lexical markdown", co-located `*.test.ts` files contribute
 * their banners (typically `@invariant` predicates, `@example` payloads,
 * `@useCase` storylines, `@summary` headlines) to the same per-slug
 * spec the collection banner already declares.
 */
export function extractCorpus(repoRoot: string): SpecCorpus {
  const roots = [
    join(repoRoot, 'src/plugins/accounting'),
    join(repoRoot, 'src/collections'),
    join(repoRoot, 'src/services'),
    join(repoRoot, 'src/jobs'),
  ]
  // Pass 1: source files (non-test) — these declare the slug.
  const sourceBySlug = new Map<string, CollectionSpec>()
  for (const root of roots) {
    for (const file of listTs(root, 'source')) {
      const spec = extractFileSpec(file, repoRoot)
      if (spec) sourceBySlug.set(spec.slug, spec)
    }
  }
  // Pass 2: test files — pair to a known slug by basename (canonical or kebab).
  const testBySlug = new Map<string, CollectionSpec>()
  for (const root of roots) {
    for (const file of listTs(root, 'test')) {
      const spec = extractFileSpec(file, repoRoot)
      if (!spec) continue
      const candidates = slugCandidatesFromTestPath(file)
      const matched = candidates.find((s) => sourceBySlug.has(s)) ?? spec.slug
      testBySlug.set(matched, { ...spec, slug: matched })
    }
  }
  // Merge.
  const allSlugs = new Set<string>([...sourceBySlug.keys(), ...testBySlug.keys()])
  const collections: CollectionSpec[] = []
  for (const slug of allSlugs) {
    collections.push(mergeSpecs(sourceBySlug.get(slug) ?? null, testBySlug.get(slug) ?? null))
  }
  return { collections, extractedAt: new Date() }
}
