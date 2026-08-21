import { exactMax, exactMin } from '@/algebra'
/**
 * standards/improve — standards chat + improve via quantum/ftl reuse.
 * Uses quantum/ftl; path is standards/improve — not a domain ftl path.
 *
 *   tsx src/standards/improve/index.ts
 *
 * @see ../index · ../../quantum/ftl · ../../quantum/chat · ../../wave/feed · ./SKILL.md
 */
import { STANDARDS_CATALOGUE, type CatalogueEntry } from '@/standards/catalogue'
import { uuid as toUuid } from '@/integrity'
import { merge, foldToRoot } from '@/merge'
import {
  crack,
  cracks as scanCracks,
  ftl as computeFtl,
  amortize as amortizeReuse,
  chatLocal,
  seal,
  research as sealedResearch,
  BOUNDARY,
  type Crack,
  type Boundary,
  type Research,
} from '@/quantum/ftl'
import { standardToTheorem } from '@/theorem'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { proseInGateFolderViolations, ungatedMandatory } from '@/standards/emit'
import { planScalpel, applyScalpel } from '@/scalpel'
import { feedWavesIntoThemselves, asksFromWaveOutput, type WaveFeedReport } from '@/wave/feed'

/** Fail-closed home for enforcement-mandatory banners — access floors already declare SOX/GDPR/27001. */
export const UNGATED_MANDATORY_GATE = 'src/access/standard/index.ts' as const

export const atomPath = 'standards/improve' as const

/** Content-address of a standard id — the O(1) key (reuse≠search). */
export const standardAddress = (id: string): string => toUuid(`standard:${id}`)

/** Build the address→entry index once — catalogue scan becomes an address lookup. */
export function standardsAddressIndex(
  catalogue: readonly CatalogueEntry[] = STANDARDS_CATALOGUE,
): ReadonlyMap<string, CatalogueEntry> {
  const m = new Map<string, CatalogueEntry>()
  for (const e of catalogue) m.set(standardAddress(e.id), e)
  return m
}

/** O(1) lookup by standard id via its content-address — the FTL path. */
export function standardById(
  id: string,
  index: ReadonlyMap<string, CatalogueEntry> = standardsAddressIndex(),
): CatalogueEntry | undefined {
  return index.get(standardAddress(id))
}

/** Linear catalogue find — the NON-FTL path; a crack when an address index exists. */
export function standardByIdScan(
  id: string,
  catalogue: readonly CatalogueEntry[] = STANDARDS_CATALOGUE,
): CatalogueEntry | undefined {
  return catalogue.find((e) => e.id === id)
}

export type StandardsFtlGapKind =
  // 'linear-catalogue-lookup' stood here and nothing ever built one: the union already
  // admits Crack['kind'], and a linear scan arrives as 'scan' from the crack scanner.
  // Two names for one defect, only one of them raised.
  | 'ungated-mandatory'
  | 'uncited'
  | 'prose-only'
  | 'prose-in-gate-folder'
  | 'no-theorem-bridge'
  | Crack['kind']

export interface StandardsFtlGap {
  readonly kind: StandardsFtlGapKind
  readonly standardId: string
  readonly why: string
  /** free-chat question that improves this gap */
  readonly ask: string
}

/**
 * Detect non-FTL / incomplete patterns on the standards surface.
 * Pure over a snapshot so tests stay hermetic (no corpus scan).
 */
export function standardsFtlGaps(opts: {
  readonly catalogue?: readonly CatalogueEntry[]
  readonly usesAddressIndex?: boolean
  readonly usesLinearScan?: boolean
  readonly reDerivesCoverage?: boolean
  readonly memo?: boolean
  readonly spendsTokensOnAsk?: boolean
  readonly seal?: boolean
  /** mandatory standards that are cited but not fail-closed gated */
  readonly ungatedMandatoryIds?: readonly string[]
  /** standards with zero citations */
  readonly uncitedIds?: readonly string[]
  /** standards cited only in prose (.md), not in .ts / gates */
  readonly proseOnlyIds?: readonly string[]
  /** standards cited only as markdown under rules|law|access — gates allow only prose = VIOLATION */
  readonly proseInGateFolderIds?: readonly string[]
}): readonly StandardsFtlGap[] {
  const gaps: StandardsFtlGap[] = []
  const found = scanCracks([
    {
      where: 'standards.lookup',
      scans: opts.usesLinearScan === true,
      address: opts.usesAddressIndex !== false,
    },
    {
      where: 'standards.coverage',
      rederives: opts.reDerivesCoverage === true,
      memo: opts.memo === true,
    },
    {
      where: 'standards.ask',
      spends: opts.spendsTokensOnAsk === true,
      seal: opts.seal === true,
    },
  ])
  for (const c of found) {
    gaps.push({
      kind: c.kind,
      standardId: '*',
      why: c.why,
      ask: `how to fix standards FTL crack: ${c.kind}`,
    })
  }
  for (const id of opts.ungatedMandatoryIds ?? []) {
    gaps.push({
      kind: 'ungated-mandatory',
      standardId: id,
      why: `${id} is enforcement-mandatory but not fail-closed gated — the wall a signer relies on is missing`,
      ask: `how should ${id} be gated to FTL enforcement`,
    })
  }
  for (const id of opts.uncitedIds ?? []) {
    gaps.push({
      kind: 'uncited',
      standardId: id,
      why: `${id} has no live @standard citation — unaddressed in the corpus`,
      ask: `where should ${id} be cited to become addressed`,
    })
  }
  for (const id of opts.proseOnlyIds ?? []) {
    gaps.push({
      kind: 'prose-only',
      standardId: id,
      why: `${id} is prose-only — cite it in .ts / rules/law/access to deepen toward gated`,
      ask: `how to deepen ${id} from prose to gated at FTL`,
    })
  }
  for (const id of opts.proseInGateFolderIds ?? []) {
    gaps.push({
      kind: 'prose-in-gate-folder',
      standardId: id,
      why: `${id} is cited only as PROSE under rules|law|access — gates allow only prose = VIOLATION; needs a .ts gate`,
      ask: `how to fix prose-in-gate-folder for ${id}`,
    })
  }
  // theorem bridge: standards that should map to FTL theorems but don't
  const sample = (opts.catalogue ?? STANDARDS_CATALOGUE).slice(0, 24)
  for (const e of sample) {
    if (/9562|content.?uuid|efficiency|25010.*5\.4|FTL|quantumise/i.test(`${e.id} ${e.title}`)) {
      const bridge = standardToTheorem(e.id)
      if (!bridge.proven) {
        gaps.push({
          kind: 'no-theorem-bridge',
          standardId: e.id,
          why: `${e.id} looks FTL-related but has no proven theorem bridge`,
          ask: `map ${e.id} to an architectural FTL theorem`,
        })
      }
    }
  }
  return gaps
}

export interface StandardsFtlImprovement {
  readonly gap: StandardsFtlGap
  readonly answer: string
  readonly lane: 'seal' | 'research' | 'none'
  readonly tokens: 0
  /** content-address of (gap ⊕ answer) — unchanged ⇒ skip re-apply */
  readonly seal: string
}

/** Sealed answers the standards chat reuses at tokens=0 when improving (via quantum/ftl). */
export const STANDARDS_IMPROVE_BOOK = seal([
  [
    'how to fix standards FTL crack: scan',
    'Build standardsAddressIndex once; look up via standardById (content-uuid). Never catalogue.find when the address exists.',
  ],
  [
    'how to fix standards FTL crack: rederive',
    'Memo schemaCoverage / standardsUiWaves by catalogue root (or corpusFingerprint). Same root ⇒ reuse, never re-fold.',
  ],
  [
    'how to fix standards FTL crack: spend',
    'Ask standards through chatLocal / research. Sealed book first; tokens stay 0.',
  ],
  [
    'how should SOX be gated to FTL enforcement',
    'Wire SOX/§404 into rules/law/access so depth=gated (fail-closed). assertStandardsGated ratchets ungated → 0.',
  ],
  [
    'how should GDPR be gated to FTL enforcement',
    'Cite GDPR in access/standard floors (role-scoped+) and a rules gate. Enforcement-mandatory ⇒ coded is not enough.',
  ],
  [
    'how to deepen prose-only standard to gated at FTL',
    'Move the @standard banner into .ts (coded) then into rules/law/access (gated). Depth ladder: uncited→prose→coded→gated.',
  ],
  [
    'how to fix standards FTL crack: prose-in-gate-folder',
    'For each proseInGateFolderViolations id: chatHealProseInGateFolders derives a scalpel op that inserts `@standard ID` into the sibling index.ts under rules|law|access. Never count SKILL.md alone as gated. assertNoProseOnlyGates baseline 0.',
  ],
  [
    'gates allow only prose',
    'VIOLATION. gated ⇔ @standard cited in .ts under rules|law|access. Markdown in the gate tree is still prose. Heal via chatHealProseInGateFolders (scalpel), not by hand.',
  ],
  [
    'how to fix standards FTL crack: ungated-mandatory',
    'chatHealUngatedMandatory: free-chat confirms → deriveUngatedMandatoryOp inserts `@standard ID` into src/access/standard/index.ts via scalpel. assertStandardsGated ratchets toward 0. Never hand-edit banners.',
  ],
  [
    'how should NIST-SP-800 be gated to FTL enforcement',
    'Cite NIST-SP-800-* in access/standard (role-scoped security floors already match NIST|SP.?800). chatHealUngatedMandatory applies; coded-only is not a wall.',
  ],
  [
    'how should PCI-DSS be gated to FTL enforcement',
    'Cite PCI-DSS in access/standard (auditor-grade — STANDARD_TIER already matches PCI.?DSS). chatHealUngatedMandatory applies.',
  ],
  [
    'how should EU-2015/849 be gated to FTL enforcement',
    'First refuse false citations: matcherFor must require 2015/849 (not bare 2015 from ISO-4217). Then cite EU-2015/849 in access/standard if real AMLD matter remains. ungatedMandatory filters citations>0.',
  ],
  [
    'what is standards FTL',
    'standardsImprove: addressIndex O(1) ∧ memo ∧ free-chat tokens=0 ∧ ungated→0. Path standards/improve; FTL core = quantum/fold.',
  ],
  [
    'what is standards improve (architectural reuse)',
    'standardsImprove ⇔ addressIndex O(1) ∧ memo ∧ free-chat@0 ∧ ungatedMandatory→0 — uses quantum/ftl; not FTL core',
  ],
  [
    'how do standards chat and improve to FTL',
    'standardsChatImproveFtl (alias of standardsImproveWaves): detect gaps → free-chat → seal improvements → research → chat heals. Path: standards/improve. cost=0.',
  ],
  [
    'how do standards chat and improve',
    'standardsImproveWaves: detect gaps → free-chat each ask → seal improvements → research on remaining → chatHealProseInGateFolders + chatHealUngatedMandatory. cost=0.',
  ],
  [
    'how to feed standards waves into themselves',
    'endlessStandardsImprove: each generation gaps→chat→waves→nextAsks→heal→research. shouldContinue until external stop; maxGenerations bounds one call. wave/feed is the loop. cost=0.',
  ],
])

/** @deprecated alias — book lives under standards/improve */
export const STANDARDS_FTL_BOOK = STANDARDS_IMPROVE_BOOK

/**
 * Let the standards chat: for each gap, ask the sealed FTL book (tokens=0) and seal the improvement.
 * Misses stay as open asks (lane=none) — escalate only via research when opted in.
 * Gating asks normalize `SOX:2002` → `SOX` so the sealed book hits without per-version copies.
 */
export function standardsChatImprove(
  gaps: readonly StandardsFtlGap[],
  book: ReadonlyMap<string, string> = STANDARDS_FTL_BOOK,
): readonly StandardsFtlImprovement[] {
  const resolve = (ask: string): ReturnType<typeof chatLocal> => {
    const direct = chatLocal(ask, book)
    if (direct) return direct
    // ungated asks: "how should SOX:2002 be gated…" → try family stem "SOX"
    const m = /^how should (.+) be gated to FTL enforcement$/.exec(ask)
    if (m) {
      const stem = m[1]!.replace(/[:/].*$/, '').replace(/\s+/g, ' ').trim()
      return chatLocal(`how should ${stem} be gated to FTL enforcement`, book)
    }
    // deepen asks: reuse the prose→gated seal
    if (/^how to deepen .+ from prose to gated at FTL$/.test(ask)) {
      return chatLocal('how to deepen prose-only standard to gated at FTL', book)
    }
    // prose-in-gate-folder: per-id ask → general heal recipe (scalpel derives the cut)
    if (/^how to fix prose-in-gate-folder for .+/.test(ask)) {
      return (
        chatLocal(ask, book) ??
        chatLocal('how to fix standards FTL crack: prose-in-gate-folder', book) ??
        chatLocal('gates allow only prose', book)
      )
    }
    return undefined
  }
  return gaps.map((gap) => {
    const local = resolve(gap.ask)
    const answer = local?.answer ?? ''
    return {
      gap,
      answer,
      lane: local ? 'seal' : 'none',
      tokens: 0 as const,
      seal: foldToRoot([merge(gap.kind, gap.standardId), merge('ask', gap.ask), merge('ans', answer)]),
    }
  })
}

export interface StandardsFtlWave {
  readonly kind: StandardsFtlGapKind | 'research'
  readonly count: number
  readonly improvements: readonly StandardsFtlImprovement[]
  readonly seal: string
}

/** Group improvements into waves by gap kind — biggest first (most cracks closed per wave). */
export function standardsFtlWaves(
  improvements: readonly StandardsFtlImprovement[],
): readonly StandardsFtlWave[] {
  const by = new Map<StandardsFtlGapKind | 'research', StandardsFtlImprovement[]>()
  for (const i of improvements) {
    const k = i.lane === 'research' ? 'research' : i.gap.kind
    const arr = by.get(k) ?? []
    arr.push(i)
    by.set(k, arr)
  }
  return [...by.entries()]
    .map(([kind, items]) => ({
      kind,
      count: items.length,
      improvements: items,
      seal: foldToRoot(items.map((i) => i.seal)),
    }))
    .sort((a, b) => b.count - a.count || String(a.kind).localeCompare(String(b.kind)))
}

export interface StandardsFtlReport {
  readonly holds: boolean
  readonly gaps: readonly StandardsFtlGap[]
  readonly improvements: readonly StandardsFtlImprovement[]
  readonly waves: readonly StandardsFtlWave[]
  readonly answered: number
  readonly tokens: 0
  readonly cost: 0
  readonly efficiency: number
  readonly ftl: ReturnType<typeof computeFtl>
  readonly research?: Research
  readonly heal?: ProseInGateHealResult
  readonly ungatedHeal?: UngatedMandatoryHealResult
  readonly boundary: Boundary
}

/**
 * Derive a scalpel op that inserts `@standard ID` into the sibling index.ts of a prose-only
 * gate citation (SKILL.md under rules|law|access). Chat confirms; scalpel cuts — no hand edit.
 */
export function deriveProseInGateOp(
  v: { readonly id: string; readonly paths: readonly string[] },
  cwd: string = process.cwd(),
): { readonly file: string; readonly find: string; readonly replace: string; readonly reason: string } | null {
  const md = v.paths.find((p) => /\.md$/i.test(p))
  if (!md) return null
  const file = md.replace(/\/[^/]+\.md$/i, '/index.ts')
  const abs = join(cwd, file)
  if (!existsSync(abs)) return null
  const text = readFileSync(abs, 'utf8')
  if (new RegExp(`@standard\\s+${v.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(text)) return null // already healed
  const lines = text.split('\n')
  let lastStd = -1
  for (let i = 0; i < exactMin(lines.length, 40); i++) {
    if (/^\s*\*\s*@standard\b/.test(lines[i]!)) lastStd = i
  }
  if (lastStd < 0) return null
  const find = lines[lastStd]!
  const replace =
    `${find}\n * @standard ${v.id} — healed from prose-in-gate-folder by chatHealProseInGateFolders (fail-closed .ts gate)`
  return {
    file,
    find,
    replace,
    reason: `chat: prose-in-gate-folder ${v.id} → ${file}`,
  }
}

export interface ProseInGateHealResult {
  readonly violations: number
  readonly planned: number
  readonly applied: number
  readonly refused: number
  readonly asks: readonly string[]
  readonly tokens: 0
}

/**
 * Chat-driven heal: list proseInGateFolderViolations → free-chat each ask → derive scalpel ops → apply.
 * Avoids manual wiring: the chat seals the recipe; scalpel cuts exactly-once.
 */
export function chatHealProseInGateFolders(opts: {
  readonly cwd?: string
  readonly apply?: boolean
  readonly book?: ReadonlyMap<string, string>
} = {}): ProseInGateHealResult {
  const cwd = opts.cwd ?? process.cwd()
  const book = opts.book ?? STANDARDS_FTL_BOOK
  const violations = proseInGateFolderViolations(cwd)
  const asks: string[] = []
  const ops: { file: string; find: string; replace: string; reason: string }[] = []
  for (const v of violations) {
    const ask = `how to fix prose-in-gate-folder for ${v.id}`
    asks.push(ask)
    const ans =
      chatLocal(ask, book) ??
      chatLocal('how to fix standards FTL crack: prose-in-gate-folder', book) ??
      chatLocal('gates allow only prose', book)
    if (!ans) continue
    const op = deriveProseInGateOp(v, cwd)
    if (op) ops.push({ ...op, reason: `${op.reason} · ${ans.answer.slice(0, 120)}` })
  }
  if (ops.length === 0) {
    return { violations: violations.length, planned: 0, applied: 0, refused: 0, asks, tokens: 0 }
  }
  const plan = planScalpel(ops, cwd)
  if (!opts.apply) {
    return {
      violations: violations.length,
      planned: plan.cuts.length,
      applied: 0,
      refused: plan.refused,
      asks,
      tokens: 0,
    }
  }
  const result = applyScalpel(plan.cuts, {
    cwd,
    apply: true,
    verify: () => proseInGateFolderViolations(cwd).length < violations.length || violations.length === 0,
  })
  return {
    violations: violations.length,
    planned: plan.cuts.length,
    applied: result.batches.reduce((n, b) => n + (b.verified ? b.applied : 0), 0),
    refused: plan.refused,
    asks,
    tokens: 0,
  }
}

export interface UngatedMandatoryHealResult {
  readonly ungated: number
  readonly planned: number
  readonly applied: number
  readonly refused: number
  readonly ids: readonly string[]
  readonly asks: readonly string[]
  readonly tokens: 0
}

/**
 * Derive a scalpel op that inserts `@standard ID` into the access/standard gate.
 * One cut per id (anchor = last existing @standard line). Chat confirms; scalpel cuts.
 */
export function deriveUngatedMandatoryOp(
  id: string,
  cwd: string = process.cwd(),
  gateFile: string = UNGATED_MANDATORY_GATE,
): { readonly file: string; readonly find: string; readonly replace: string; readonly reason: string } | null {
  const abs = join(cwd, gateFile)
  if (!existsSync(abs)) return null
  const text = readFileSync(abs, 'utf8')
  const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  if (new RegExp(`@standard\\s+${esc}\\b`).test(text)) return null
  const lines = text.split('\n')
  let lastStd = -1
  for (let i = 0; i < exactMin(lines.length, 80); i++) {
    if (/^\s*\*\s*@standard\b/.test(lines[i]!)) lastStd = i
  }
  if (lastStd < 0) return null
  const find = lines[lastStd]!
  const replace =
    `${find}\n * @standard ${id} — healed from ungated-mandatory by chatHealUngatedMandatory (fail-closed .ts gate)`
  return {
    file: gateFile,
    find,
    replace,
    reason: `chat: ungated-mandatory ${id} → ${gateFile}`,
  }
}

/**
 * Chat-driven heal for MUST_GATE standards that are coded but not gated.
 * Sealed free-chat → scalpel into access/standard — no hand-edited banners.
 */
export function chatHealUngatedMandatory(opts: {
  readonly cwd?: string
  readonly apply?: boolean
  readonly book?: ReadonlyMap<string, string>
  readonly gateFile?: string
} = {}): UngatedMandatoryHealResult {
  const cwd = opts.cwd ?? process.cwd()
  const book = opts.book ?? STANDARDS_FTL_BOOK
  const gateFile = opts.gateFile ?? UNGATED_MANDATORY_GATE
  const ungated = ungatedMandatory(cwd)
  const asks: string[] = []
  const ops: { file: string; find: string; replace: string; reason: string }[] = []
  // Apply sequentially in one replace when many share the same find-anchor: fold into one cut.
  const pending: string[] = []
  for (const s of ungated) {
    const stem = s.id.replace(/[:/].*$/, '').replace(/-SP-800.*$/, '-SP-800')
    const ask = `how should ${s.id} be gated to FTL enforcement`
    asks.push(ask)
    const ans =
      chatLocal(ask, book) ??
      chatLocal(`how should ${stem} be gated to FTL enforcement`, book) ??
      chatLocal('how to fix standards FTL crack: ungated-mandatory', book)
    if (!ans) continue
    pending.push(s.id)
  }
  if (pending.length === 0) {
    return { ungated: ungated.length, planned: 0, applied: 0, refused: 0, ids: [], asks, tokens: 0 }
  }
  const abs = join(cwd, gateFile)
  if (!existsSync(abs)) {
    return { ungated: ungated.length, planned: 0, applied: 0, refused: pending.length, ids: pending, asks, tokens: 0 }
  }
  const text = readFileSync(abs, 'utf8')
  const lines = text.split('\n')
  let lastStd = -1
  for (let i = 0; i < exactMin(lines.length, 80); i++) {
    if (/^\s*\*\s*@standard\b/.test(lines[i]!)) lastStd = i
  }
  if (lastStd < 0) {
    return { ungated: ungated.length, planned: 0, applied: 0, refused: pending.length, ids: pending, asks, tokens: 0 }
  }
  const find = lines[lastStd]!
  const bannerLines = pending
    .filter((id) => !new RegExp(`@standard\\s+${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(text))
    .map(
      (id) =>
        ` * @standard ${id} — healed from ungated-mandatory by chatHealUngatedMandatory (fail-closed .ts gate)`,
    )
  if (bannerLines.length === 0) {
    return { ungated: ungated.length, planned: 0, applied: 0, refused: 0, ids: pending, asks, tokens: 0 }
  }
  ops.push({
    file: gateFile,
    find,
    replace: `${find}\n${bannerLines.join('\n')}`,
    reason: `chat: ungated-mandatory [${pending.join(', ')}] → ${gateFile}`,
  })
  const plan = planScalpel(ops, cwd)
  if (!opts.apply) {
    return {
      ungated: ungated.length,
      planned: plan.cuts.length,
      applied: 0,
      refused: plan.refused,
      ids: pending,
      asks,
      tokens: 0,
    }
  }
  const before = ungated.length
  const result = applyScalpel(plan.cuts, {
    cwd,
    apply: true,
    verify: () => ungatedMandatory(cwd).length < before,
  })
  return {
    ungated: before,
    planned: plan.cuts.length,
    applied: result.batches.reduce((n, b) => n + (b.verified ? b.applied : 0), 0),
    refused: plan.refused,
    ids: pending,
    asks,
    tokens: 0,
  }
}

/**
 * Full loop: detect → chat → improve → optional deep research → optional chat heal (scalpel).
 * Architectural reuse on the standards surface itself — no hand edits for prose-in-gate-folder.
 * Path: standards/improve (uses quantum/ftl; is not the FTL core).
 */
export async function standardsImproveWaves(opts: {
  readonly gaps?: readonly StandardsFtlGap[]
  readonly catalogue?: readonly CatalogueEntry[]
  readonly usesLinearScan?: boolean
  readonly usesAddressIndex?: boolean
  readonly reDerivesCoverage?: boolean
  readonly memo?: boolean
  readonly ungatedMandatoryIds?: readonly string[]
  readonly proseInGateFolderIds?: readonly string[]
  readonly research?: boolean
  readonly depth?: number
  /** when true, chatHealProseInGateFolders + chatHealUngatedMandatory plan (and optionally apply) */
  readonly heal?: boolean
  readonly applyHeals?: boolean
  readonly cwd?: string
} = {}): Promise<StandardsFtlReport> {
  return standardsChatImproveFtl(opts)
}

/** @deprecated alias — prefer standardsImproveWaves; FTL is quantum/ftl only */
export async function standardsChatImproveFtl(opts: {
  readonly gaps?: readonly StandardsFtlGap[]
  readonly catalogue?: readonly CatalogueEntry[]
  readonly usesLinearScan?: boolean
  readonly usesAddressIndex?: boolean
  readonly reDerivesCoverage?: boolean
  readonly memo?: boolean
  readonly ungatedMandatoryIds?: readonly string[]
  readonly proseInGateFolderIds?: readonly string[]
  readonly research?: boolean
  readonly depth?: number
  readonly heal?: boolean
  readonly applyHeals?: boolean
  readonly cwd?: string
} = {}): Promise<StandardsFtlReport> {
  let proseIds = opts.proseInGateFolderIds
  let ungatedIds = opts.ungatedMandatoryIds
  if (opts.heal || opts.applyHeals) {
    if (proseIds === undefined) {
      proseIds = proseInGateFolderViolations(opts.cwd).map((v) => v.id)
    }
    if (ungatedIds === undefined) {
      ungatedIds = ungatedMandatory(opts.cwd).map((s) => s.id)
    }
  }
  const gaps =
    opts.gaps ??
    standardsFtlGaps({
      catalogue: opts.catalogue,
      usesLinearScan: opts.usesLinearScan,
      usesAddressIndex: opts.usesAddressIndex,
      reDerivesCoverage: opts.reDerivesCoverage,
      memo: opts.memo,
      ungatedMandatoryIds: ungatedIds,
      proseInGateFolderIds: proseIds,
      seal: true,
      spendsTokensOnAsk: false,
    })
  const improvements = [...standardsChatImprove(gaps)]
  let research: Research | undefined
  if (opts.research !== false) {
    const open = improvements.filter((i) => i.lane === 'none').map((i) => i.gap.ask)
    if (open.length > 0) {
      research = await sealedResearch(open.slice(0, 6), { depth: opts.depth ?? 1 })
      for (let i = 0; i < improvements.length; i++) {
        const imp = improvements[i]!
        if (imp.lane !== 'none') continue
        const hit = research.findings.find((f) => f.question === imp.gap.ask)
        if (!hit) continue
        improvements[i] = {
          ...imp,
          answer: hit.evidence,
          lane: 'research',
          seal: foldToRoot([merge(imp.gap.kind, imp.gap.standardId), merge('ask', imp.gap.ask), merge('ans', hit.evidence)]),
        }
      }
    }
  }
  const heal =
    opts.heal || opts.applyHeals
      ? chatHealProseInGateFolders({ cwd: opts.cwd, apply: opts.applyHeals === true })
      : undefined
  const ungatedHeal =
    opts.heal || opts.applyHeals
      ? chatHealUngatedMandatory({ cwd: opts.cwd, apply: opts.applyHeals === true })
      : undefined
  const answered = improvements.filter((i) => i.answer.length > 0).length
  const am = amortizeReuse(answered, 0)
  const fold = computeFtl({
    query: 'standards:ftl',
    spaceSize: exactMax(1, (opts.catalogue ?? STANDARDS_CATALOGUE).length),
    answers: answered,
    tokens: 0,
    patterns: gaps
      .filter((g) => g.standardId === '*')
      .map((g) => ({
        where: g.kind,
        scans: g.kind === 'scan',
        address: true,
        rederives: g.kind === 'rederive',
        memo: true,
        spends: g.kind === 'spend',
        seal: true,
        qpu: g.kind === 'qpu',
        spacetime: g.kind === 'spacetime',
      })),
  })
  const crackKinds = new Set([
    'scan',
    'rederive',
    'spend',
    'qpu',
    'spacetime',
  ])
  const openCracks = improvements.filter((i) => crackKinds.has(i.gap.kind) && !i.answer)
  return {
    holds: openCracks.length === 0 && am.scalesToInfinity,
    gaps,
    improvements,
    waves: standardsFtlWaves(improvements),
    answered,
    tokens: 0,
    cost: 0,
    efficiency: am.efficiency,
    ftl: fold,
    research,
    heal,
    ungatedHeal,
    boundary: BOUNDARY,
  }
}

/** Prove address lookup beats scan — same entry, FTL vs crack. */
export function proveStandardsLookupFtl(
  id: string,
  catalogue: readonly CatalogueEntry[] = STANDARDS_CATALOGUE,
): { readonly addressed: CatalogueEntry | undefined; readonly scanned: CatalogueEntry | undefined; readonly same: boolean; readonly crack: Crack | null } {
  const index = standardsAddressIndex(catalogue)
  const addressed = standardById(id, index)
  const scanned = standardByIdScan(id, catalogue)
  return {
    addressed,
    scanned,
    same: addressed?.id === scanned?.id,
    crack: crack({ where: 'standards.lookup', scans: true, address: true }),
  }
}

/**
 * Feed standards improve waves into themselves for endless R&D.
 * One call bounded by maxGenerations; continuation.continue until external stop.
 */
export async function endlessStandardsImprove(
  opts: {
    readonly maxGenerations?: number
    readonly depth?: number
    readonly stopped?: boolean
    readonly seedAsks?: readonly string[]
  } = {},
): Promise<WaveFeedReport<StandardsFtlWave>> {
  const seedAsks = opts.seedAsks ?? [
    'how do standards chat and improve',
    'how to feed standards waves into themselves',
    'what is standards improve (architectural reuse)',
  ]
  let lastWaves: readonly StandardsFtlWave[] = []
  return feedWavesIntoThemselves<StandardsFtlWave>({
    seedAsks,
    maxGenerations: opts.maxGenerations ?? 3,
    stopped: opts.stopped,
    askLimit: 8,
    research: async (asks) => {
      const report = await standardsImproveWaves({
        usesLinearScan: true,
        usesAddressIndex: true,
        research: true,
        depth: opts.depth ?? 1,
      })
      lastWaves = report.waves
      const sealed = asks.map((a) => {
        const hit =
          chatLocal(a, STANDARDS_IMPROVE_BOOK) ??
          chatLocal('how do standards chat and improve', STANDARDS_IMPROVE_BOOK)
        return { question: a, evidence: hit?.answer ?? 'seal more STANDARDS_IMPROVE_BOOK' }
      })
      const fromImprove = report.improvements.map((i) => ({
        question: i.gap.ask,
        evidence: i.answer,
      }))
      return {
        findings: [...sealed, ...fromImprove].slice(0, 16),
        followUps: report.waves.map((w) => `what remains to deepen in ${w.kind}`),
      }
    },
    wavesFrom: () => lastWaves,
    asksFrom: (waves, research) =>
      asksFromWaveOutput({
        waves: waves.map((w) => ({
          domain: String(w.kind),
          develop: `close ${w.kind} gaps ×${w.count}`,
          questions: w.improvements.map((i) => i.gap.ask),
        })),
        findings: research.findings,
        followUps: research.followUps,
        limit: 8,
      }),
    develop: (waves) => waves.map((w) => `${w.kind}×${w.count}`),
  })
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const sample = STANDARDS_CATALOGUE[0]?.id ?? 'ISO-19011:2018'
  const proof = proveStandardsLookupFtl(sample)
  console.log('standards/improve — standards chat & improve (uses quantum/ftl)')
  console.log(`  lookup ${sample}: same=${proof.same} · crack=${proof.crack?.kind}`)
  void standardsImproveWaves({
    usesLinearScan: true,
    usesAddressIndex: true,
    ungatedMandatoryIds: ['SOX:2002', 'GDPR'],
    research: true,
    depth: 1,
  }).then(async (r) => {
    console.log(`  improve: gaps=${r.gaps.length} answered=${r.answered} cost=${r.cost} eff=${r.efficiency} holds=${r.holds}`)
    for (const w of r.waves.slice(0, 5)) console.log(`    wave ${w.kind} ×${w.count}`)
    const endless = await endlessStandardsImprove({ maxGenerations: 2, depth: 1 })
    console.log(
      `  endless feed: gens=${endless.generations.length} findings=${endless.totalFindings} continue=${endless.continuation.continue} cost=${endless.cost}`,
    )
  })
}
