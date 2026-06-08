/**
 * skill/router/upgrade/quantum — parse · generate SKILL.md in the quantum environment.
 *
 * Quantum skills carry superposition (unmeasured bindings) · collapse (Use-when / law /
 * matter-twin triggers) · seal (signatures · content-uuid · path ledger) — not generic
 * markdown. Hook-less frontmatter fields (bonds · neighbors · typography) entangle via
 * the content-uuid fold; drift between wikilink neighbors and body [[links]] is impurity.
 *
 * @see ../index.ts — ../../../../quantum — ../../../../accounting/coa — ../../../../path/record
 */
import { accountCodeOf } from '@/accounting'
import { linksOf } from '@/typography'
import { entangledFieldsFromRegistry } from '@/quantum/entanglement/registry'
import {
  FRONTMATTER,
  stripFrontmatter,
  contentUuidOf,
  renderFrontmatter,
  upgradeSkillText,
  parseSignaturesFromText,
  yamlQuote,
  type ConnectedFrontmatter,
  type FrontmatterSignatures,
} from '../seal'

const LAW_RE = /\*\*Law\s+—\s*\[\[law\]\]:\s*(.+?)\*\*/g
const MATTER_TWIN_RE = /Matter-twin:\s*`([^`]+)`(?:\s*—\s*(.+))?/i
const USE_WHEN_RE = /^description:\s*"(Use when[^"]+)"/m

/** One hook-less frontmatter field and its entangled partners (computed, never hand-set). */
export interface EntangledField {
  readonly field: string
  readonly partners: readonly string[]
  readonly hookless: boolean
  readonly drift: readonly string[]
  readonly superposition?: string
  readonly collapse?: readonly string[]
}

/** Quantum execution context — superposition | collapse | seal. */
export interface QuantumEnvironment {
  readonly superposition: readonly string[]
  readonly collapse: readonly string[]
  readonly seal: {
    readonly sandbox: boolean
    readonly receipt: boolean
    readonly pathFollow: boolean
    readonly canonicalRecord: boolean
    readonly analogResults: boolean
    readonly speechResults: boolean
    readonly signatures: FrontmatterSignatures | null
    readonly contentUuid: string | null
  }
}

/** Parsed quantum SKILL.md — law · bonds · triggers · entangled fields · path account. */
export interface QuantumSkillParsed {
  readonly atomPath: string
  readonly law: string | null
  readonly laws: readonly string[]
  readonly bonds: { readonly in: readonly string[]; readonly out: readonly string[] }
  readonly collapseTriggers: readonly string[]
  readonly entangledFields: readonly EntangledField[]
  readonly pathAccountCode: string
  readonly environment: QuantumEnvironment
  readonly body: string
  readonly contentUuid: string | null
  readonly signatures: FrontmatterSignatures | null
}

/** Model for deterministic quantum SKILL generation. */
export interface QuantumSkillModel {
  readonly connected: ConnectedFrontmatter
  readonly title: string
  readonly bodyProse: string
  readonly law: string
  readonly environment?: Partial<QuantumEnvironment>
  readonly see?: readonly string[]
  readonly audit?: string
  readonly standard?: string
  readonly matterTwin?: string
}

const unquoteYaml = (v: string): string => v.trim().replace(/^["']|["']$/g, '')

const parseFmField = (fm: string, key: string): string | null => {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]?.trim()
  if (!m) return null
  return unquoteYaml(m)
}

const parseYamlSubList = (fm: string, parent: string, key: string): string[] => {
  const parentBlock =
    fm.match(new RegExp(`^${parent}:\\s*\\n([\\s\\S]*?)(?=^[a-zA-Z][a-zA-Z0-9]*:)`, 'm'))?.[1] ?? ''
  const keyRe = new RegExp(`^\\s+${key}:\\s*\\n((?:\\s+-\\s+.+\n?)+)`, 'm')
  const list = parentBlock.match(keyRe)?.[1] ?? ''
  if (!list) {
    if (parentBlock.match(new RegExp(`^\\s+${key}:\\s*\\[\\]`))) return []
  }
  return [...list.matchAll(/^\s+-\s+(.+)$/gm)]
    .map((m) => unquoteYaml(m[1]!))
    .filter(Boolean)
    .sort()
}

const stripQuantumFooter = (body: string): string =>
  body.replace(/\n*<sub>content-uuid\s+`[0-9a-f-]{36}`[\s\S]*?<\/sub>\s*$/i, '').trimEnd()

const lawsOf = (body: string): string[] => {
  const out: string[] = []
  for (const m of body.matchAll(LAW_RE)) out.push(m[1]!.trim())
  return out
}

/** True when the atom lives in the quantum typography partition or path prefix. */
export function isQuantumSkillPath(atomPath: string, partition?: string): boolean {
  if (partition === 'quantum') return true
  return atomPath === 'quantum' || atomPath.startsWith('quantum/')
}

/** Infer collapse triggers — description · laws · matter-twin · @see · banners. */
export function collapseTriggersOf(text: string): string[] {
  const fm = text.match(FRONTMATTER)?.[1] ?? ''
  const body = stripFrontmatter(text)
  const triggers = new Set<string>()
  const desc = parseFmField(fm, 'description')
  if (desc) triggers.add(desc)
  const useWhen = fm.match(USE_WHEN_RE)?.[1]
  if (useWhen) triggers.add(useWhen)
  for (const law of lawsOf(body)) triggers.add(law)
  const twin = body.match(MATTER_TWIN_RE)
  if (twin?.[1]) triggers.add(`matter-twin:${twin[1]}`)
  if (twin?.[2]) triggers.add(twin[2].trim())
  const see = text.match(/^@see\s+(.+)$/m)?.[1]?.trim()
  if (see) for (const part of see.split('·')) triggers.add(part.trim())
  for (const m of text.matchAll(/^@(?:audit|standard)\s+(.+)$/gm)) triggers.add(m[1]!.trim())
  return [...triggers].filter(Boolean).sort()
}

/** Hook-less frontmatter fields entangled with matrix · wikilink · typography peers. */
export function entangledFieldsOf(fmText: string, body: string): EntangledField[] {
  const bondsIn = parseYamlSubList(fmText, 'bonds', 'in')
  const bondsOut = parseYamlSubList(fmText, 'bonds', 'out')
  const wikilink = parseYamlSubList(fmText, 'neighbors', 'wikilink')
  const matrix = parseYamlSubList(fmText, 'neighbors', 'matrix')
  const backlinks = parseYamlSubList(fmText, 'neighbors', 'backlinks')
  const typoNeighbors = parseYamlSubList(fmText, 'typography', 'neighbors')
  const standardsBlock = fmText.match(/^standards:\s*\n((?:\s+-\s+.+\n?)+)/m)?.[1] ?? ''
  const standards = [...standardsBlock.matchAll(/^\s+-\s+(.+)$/gm)]
    .map((x) => unquoteYaml(x[1]!))
    .sort()
  const bodyLinks = linksOf(body)
  const wikilinkSet = new Set(wikilink)
  const bodyOnly = bodyLinks.filter((l) => !wikilinkSet.has(l)).sort()
  const fmOnly = wikilink.filter((l) => !bodyLinks.includes(l)).sort()
  const fields: EntangledField[] = [
    { field: 'bonds.in', partners: bondsIn, hookless: true, drift: [] },
    { field: 'bonds.out', partners: bondsOut, hookless: true, drift: [] },
    {
      field: 'neighbors.wikilink',
      partners: wikilink,
      hookless: true,
      drift: [...bodyOnly.map((b) => `body-missing:${b}`), ...fmOnly.map((f) => `fm-missing:${f}`)],
    },
    { field: 'neighbors.matrix', partners: matrix, hookless: true, drift: [] },
    { field: 'neighbors.backlinks', partners: backlinks, hookless: true, drift: [] },
    { field: 'typography.neighbors', partners: typoNeighbors, hookless: true, drift: [] },
  ]
  if (standards.length > 0) {
    fields.push({ field: 'standards', partners: standards, hookless: true, drift: [] })
  }
  return fields
}

/** Merge frontmatter entanglement with the static collection registry (01a03ea0 audit). */
export function mergeEntangledFields(
  fmText: string,
  body: string,
  atomPath: string,
): EntangledField[] {
  const fmFields = entangledFieldsOf(fmText, body)
  const registryFields = entangledFieldsFromRegistry(atomPath)
  const byField = new Map<string, EntangledField>()
  for (const f of fmFields) byField.set(f.field, f)
  for (const f of registryFields) {
    if (!byField.has(f.field)) byField.set(f.field, f)
  }
  if (atomPath === 'speech' || atomPath === 'speach' || atomPath === 'writing' || atomPath.startsWith('quantum/speech')) {
    byField.set('text.prose', {
      field: 'text.prose',
      partners: ['description', 'contentUuid', 'horo', 'body'],
      hookless: true,
      drift: [],
      superposition: 'hand prose vs computed writing/speech frame',
      collapse: ['computedWritingForPath', 'writingToSpeech', 'computedSpeechForUi'],
    })
  }
  return [...byField.values()].sort((a, b) => a.field.localeCompare(b.field))
}

const parseQuantumSealFlags = (fm: string): Partial<QuantumEnvironment['seal']> => {
  const block = fm.match(/^quantum:\s*\n([\s\S]*?)(?=^(?:version:|\w+:))/m)?.[1] ?? ''
  if (!block) return {}
  const sealBlock = block.match(/^  seal:\s*\n([\s\S]*?)(?=^  \w|$)/m)?.[1] ?? ''
  if (!sealBlock) return {}
  const flag = (key: string): boolean | undefined => {
    if (new RegExp(`^    ${key}:\\s*true`, 'm').test(sealBlock)) return true
    if (new RegExp(`^    ${key}:\\s*false`, 'm').test(sealBlock)) return false
    return undefined
  }
  return {
    sandbox: flag('sandbox'),
    receipt: flag('receipt'),
    pathFollow: flag('pathFollow'),
    canonicalRecord: flag('canonicalRecord'),
    analogResults: flag('analogResults'),
    speechResults: flag('speechResults'),
  }
}

const parseQuantumBlockLists = (fm: string, key: string): string[] => {
  const block = fm.match(/^quantum:\s*\n([\s\S]*?)(?=^version:)/m)?.[1] ?? ''
  const sub = block.match(new RegExp(`^  ${key}:\\s*\\n((?:    - .+\n?)+)`, 'm'))?.[1] ?? ''
  return [...sub.matchAll(/^    - (.+)$/gm)].map((m) => unquoteYaml(m[1]!)).filter(Boolean).sort()
}

/** Infer quantum environment from atom path and parsed skill context. */
export function inferQuantumEnvironment(
  atomPath: string,
  parsed: Pick<QuantumSkillParsed, 'collapseTriggers' | 'bonds' | 'signatures' | 'contentUuid'>,
): QuantumEnvironment {
  const clinical = atomPath.includes('/emr') || atomPath.includes('/device') || atomPath.includes('/readings')
  const vocal =
    atomPath === 'speech' ||
    atomPath === 'speach' ||
    atomPath === 'writing' ||
    atomPath.startsWith('quantum/speech')
  const gated = atomPath.includes('/mcp') || atomPath.includes('/request') || atomPath.includes('/log')
  const superposition = [
    ...parsed.bonds.in.slice(0, 8),
    ...parsed.bonds.out.slice(0, 8),
    'superposition',
  ].filter((v, i, a) => a.indexOf(v) === i)
  const collapse = parsed.collapseTriggers.slice(0, 12)
  return {
    superposition,
    collapse,
    seal: {
      sandbox: gated,
      receipt: gated,
      pathFollow: true,
      canonicalRecord: true,
      analogResults: clinical,
      speechResults: vocal,
      signatures: parsed.signatures,
      contentUuid: parsed.contentUuid,
    },
  }
}

/** Parse SKILL.md in the quantum frame — pure. */
export function parseQuantumSkill(md: string): QuantumSkillParsed {
  const fmText = md.match(FRONTMATTER)?.[1] ?? ''
  const body = stripQuantumFooter(stripFrontmatter(md))
  const atomPath = parseFmField(fmText, 'atomPath') ?? ''
  const laws = lawsOf(body)
  const bonds = {
    in: parseYamlSubList(fmText, 'bonds', 'in'),
    out: parseYamlSubList(fmText, 'bonds', 'out'),
  }
  const collapseTriggers = collapseTriggersOf(md)
  const entangledFields = mergeEntangledFields(fmText, body, atomPath)
  const pathAccountCode = atomPath ? accountCodeOf(atomPath) : ''
  const contentUuid = parseFmField(fmText, 'contentUuid')
  const signatures = parseSignaturesFromText(md)
  const parsedSeal = parseQuantumSealFlags(fmText)
  const superposition = parseQuantumBlockLists(fmText, 'superposition')
  const collapse = parseQuantumBlockLists(fmText, 'collapse')
  const baseEnv = inferQuantumEnvironment(atomPath, { collapseTriggers, bonds, signatures, contentUuid })
  const environment: QuantumEnvironment = {
    superposition: superposition.length > 0 ? superposition : baseEnv.superposition,
    collapse: collapse.length > 0 ? collapse : baseEnv.collapse,
    seal: {
      sandbox: parsedSeal.sandbox ?? baseEnv.seal.sandbox,
      receipt: parsedSeal.receipt ?? baseEnv.seal.receipt,
      pathFollow: parsedSeal.pathFollow ?? baseEnv.seal.pathFollow,
      canonicalRecord: parsedSeal.canonicalRecord ?? baseEnv.seal.canonicalRecord,
      analogResults: parsedSeal.analogResults ?? baseEnv.seal.analogResults,
      speechResults: parsedSeal.speechResults ?? baseEnv.seal.speechResults,
      signatures,
      contentUuid,
    },
  }
  return {
    atomPath,
    law: laws.at(-1) ?? null,
    laws,
    bonds,
    collapseTriggers,
    entangledFields,
    pathAccountCode,
    environment,
    body,
    contentUuid,
    signatures,
  }
}

const renderYamlList = (indent: string, items: readonly string[]): string[] => {
  if (items.length === 0) return [`${indent}[]`]
  return items.map((i) => `${indent}- ${yamlQuote(i)}`)
}

/** Render the `quantum:` frontmatter block (superposition · collapse · seal). */
export function renderQuantumBlock(env: QuantumEnvironment): string[] {
  const L: string[] = ['quantum:']
  L.push('  superposition:')
  L.push(...renderYamlList('    ', env.superposition))
  L.push('  collapse:')
  L.push(...renderYamlList('    ', env.collapse))
  L.push('  seal:')
  L.push(`    sandbox: ${env.seal.sandbox}`)
  L.push(`    receipt: ${env.seal.receipt}`)
  L.push(`    pathFollow: ${env.seal.pathFollow}`)
  L.push(`    canonicalRecord: ${env.seal.canonicalRecord}`)
  L.push(`    analogResults: ${env.seal.analogResults}`)
  L.push(`    speechResults: ${env.seal.speechResults}`)
  if (env.seal.signatures?.computationUuid) {
    L.push(`    computationUuid: ${yamlQuote(env.seal.signatures.computationUuid)}`)
  }
  if (env.seal.contentUuid) {
    L.push(`    contentUuid: ${yamlQuote(env.seal.contentUuid)}`)
  }
  return L
}

export const renderContentUuidFooter = (contentUuid: string, pathAccountCode: string): string =>
  `<sub>content-uuid \`${contentUuid}\` · account \`${pathAccountCode}\` · \`pnpm skill:upgrade\` · \`pnpm computed:check\`</sub>`

/** Insert `quantum:` block before `version:` in upgraded frontmatter. */
export function injectQuantumBlock(text: string, env: QuantumEnvironment): string {
  const m = text.match(FRONTMATTER)
  if (!m) return text
  const fm = m[1]!
  if (/^quantum:/m.test(fm)) {
    const without = fm.replace(/^quantum:[\s\S]*?(?=^version:)/m, '').trimEnd()
    const versionLine = fm.match(/^version:.*$/m)?.[0] ?? 'version: 2'
    const next = `${without}\n${renderQuantumBlock(env).join('\n')}\n${versionLine}`
    return text.replace(FRONTMATTER, `---\n${next}\n---\n`)
  }
  const lines = fm.split('\n')
  const vi = lines.findIndex((l) => l.startsWith('version:'))
  const head = vi >= 0 ? lines.slice(0, vi) : lines
  const tail = vi >= 0 ? lines.slice(vi) : ['version: 2']
  const next = [...head, ...renderQuantumBlock(env), ...tail].join('\n')
  return text.replace(FRONTMATTER, `---\n${next}\n---\n`)
}

/** Emit a full quantum SKILL.md — stage signatures · horo · quantum env · content-uuid footer. */
export function generateQuantumSkill(model: QuantumSkillModel): string {
  const env: QuantumEnvironment = {
    ...inferQuantumEnvironment(model.connected.atomPath, {
      collapseTriggers: [model.law, model.connected.description],
      bonds: model.connected.bonds,
      signatures: model.connected.signatures,
      contentUuid: null,
    }),
    ...model.environment,
    seal: {
      ...inferQuantumEnvironment(model.connected.atomPath, {
        collapseTriggers: [model.law],
        bonds: model.connected.bonds,
        signatures: model.connected.signatures,
        contentUuid: null,
      }).seal,
      ...model.environment?.seal,
      signatures: model.connected.signatures,
    },
  }
  const bodyLines: string[] = [`# ${model.title}`, '', model.bodyProse.trim(), '', `**Law — [[law]]: ${model.law}**`]
  if (model.matterTwin) bodyLines.splice(4, 0, '', model.matterTwin)
  if (model.see?.length) bodyLines.push('', `@see ${model.see.join(' · ')}`)
  if (model.audit) bodyLines.push('', `@audit ${model.audit}`)
  if (model.standard) bodyLines.push('', `@standard ${model.standard}`)
  const bodySuffix = `${bodyLines.join('\n')}\n`
  const base = renderFrontmatter(model.connected) + bodySuffix
  const withQuantum = injectQuantumBlock(base, env)
  const sealed = upgradeSkillText(withQuantum, model.connected)
  const uuid =
    sealed.match(/^contentUuid:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '') ??
    contentUuidOf(sealed)
  const account = accountCodeOf(model.connected.atomPath)
  const finalized = injectQuantumBlock(sealed, {
    ...env,
    seal: { ...env.seal, contentUuid: uuid, signatures: model.connected.signatures },
  })
  const bodyOut = stripQuantumFooter(stripFrontmatter(finalized)).trimEnd()
  const fmPart = finalized.match(FRONTMATTER)?.[0] ?? ''
  return `${fmPart}${bodyOut}\n\n${renderContentUuidFooter(uuid, account)}\n`
}

/** Quantum-aware upgrade — signatures · quantum block · path-account footer. */
export function upgradeQuantumSkillText(text: string, fm: ConnectedFrontmatter): string {
  const parsed = parseQuantumSkill(text)
  const body = parsed.body.trim()
  const env = inferQuantumEnvironment(fm.atomPath, {
    collapseTriggers: parsed.collapseTriggers,
    bonds: fm.bonds,
    signatures: fm.signatures,
    contentUuid: parsed.contentUuid,
  })
  const pass1 = upgradeSkillText(
    injectQuantumBlock(renderFrontmatter(fm) + (body ? `${body}\n` : ''), {
      ...env,
      seal: { ...env.seal, signatures: fm.signatures },
    }),
    fm,
  )
  const uuid = pass1.match(/^contentUuid:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '') ?? ''
  const pass2 = injectQuantumBlock(pass1, {
    ...env,
    seal: { ...env.seal, contentUuid: uuid, signatures: fm.signatures },
  })
  const bodyOut = stripQuantumFooter(stripFrontmatter(pass2)).trimEnd()
  const account = accountCodeOf(fm.atomPath)
  const fmPart = pass2.match(FRONTMATTER)?.[0] ?? `---\n${renderFrontmatter({ ...fm, contentUuid: uuid }).trimEnd()}\n---\n`
  return `${fmPart}${bodyOut}\n\n${renderContentUuidFooter(uuid, account)}\n`
}
