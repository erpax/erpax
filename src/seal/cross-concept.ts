/**
 * cross-concept — education gate when agents violate corpus law.
 *
 * Rule violation = agent failed to understand **cross** (finishedIdeaCrossed axes:
 * path · time/matrix · trinity · horo · deployment · 2D partition · gap/seal eb).
 * Not punishment — must realise skills + cross law before retry.
 *
 * @see ./index.ts — finishedIdeaCrossed · ../rules — ../agent/strict-apply
 */
import { jcsCanonicalize, uuid } from '@/integrity'
import { issueReceipt, type Decision, type Receipt } from '@/receipt'

/** Cross dimension — mirrors finishedIdeaCrossed impurity families. */
export type CrossDimension =
  | 'path'
  | 'time-matrix'
  | 'trinity'
  | 'horo'
  | 'deployment'
  | '2d-partition'
  | 'gap-seal-eb'

/** Normalized violation input — rules axis, monitor source, or finished-idea impurity. */
export interface CrossConceptInput {
  readonly axis?: string
  readonly source?: string
  readonly detail?: string
  readonly law?: string
  readonly atomPath?: string
}

export interface CrossConceptVerdict {
  readonly understood: boolean
  readonly dimension: CrossDimension
  readonly axis: string
  readonly reason: string
  readonly crossEducation: string
  readonly impurities: readonly string[]
}

/** Realtime notification payload — education markdown + uncrossed axes for monitor/agent chat. */
export interface CrossConceptNotificationPayload {
  readonly event: 'monitor:cross:violation'
  readonly atomPath: string
  readonly accountCode: string
  readonly axis: string
  readonly dimension: CrossDimension
  readonly uncrossedAxes: readonly string[]
  readonly crossEducation: string
  readonly primer: string
  readonly reason: string
  readonly toastTitle: string
  readonly toastDescription: string
  readonly agentChatEnvelope: {
    readonly kind: 'agent.cross.education'
    readonly gate: 'strict-apply' | 'scan'
    readonly acknowledgeAction: 'agent.cross.acknowledge'
  }
}

export interface CrossUnderstandVerdict {
  readonly allowed: boolean
  readonly reason?: string
  readonly pending: readonly CrossConceptVerdict[]
  readonly crossEducation?: string
}

export interface AssertAgentUnderstandsCrossOpts {
  readonly violations: readonly CrossConceptInput[]
  readonly acknowledgedAxes?: ReadonlySet<string>
}

/** Map rules:check axis → finishedIdeaCrossed cross dimension. */
export const RULE_AXIS_CROSS: Readonly<Record<string, CrossDimension>> = {
  'folder-name': 'trinity',
  'folder-trinity': 'trinity',
  'alphanumeric-name': '2d-partition',
  'stray-ts': 'trinity',
  'multi-segment-file': '2d-partition',
  'accounting-structure': 'path',
  'forbidden-intermediate': 'path',
  'diamond-membership': 'trinity',
  'import-purity': 'path',
  'path-follow': 'path',
  'finished-idea-cross': 'trinity',
  'gap-eb': 'gap-seal-eb',
  'logic-concentration': 'deployment',
  'word-matter': 'deployment',
  'word-without-code': 'trinity',
  'word-without-logic': 'deployment',
  'word-incomplete-diamond': 'trinity',
  'seal-debt': 'deployment',
  'bypass-math': 'deployment',
}

const SOURCE_TO_AXIS: Readonly<Record<string, string>> = {
  'folder-law': 'folder-trinity',
  'alphanumeric-name': 'alphanumeric-name',
  'rules-stray-ts': 'stray-ts',
  'rules-multi-segment': 'multi-segment-file',
  'rules-accounting': 'accounting-structure',
  'import-boundary': 'import-purity',
  'path-follow': 'path-follow',
  'finished-idea-cross': 'finished-idea-cross',
  'gap-eb': 'gap-eb',
  'diamond-stray': 'diamond-membership',
  'entanglement': 'finished-idea-cross',
  'logic-concentration': 'logic-concentration',
  'word-matter': 'word-matter',
  'word-without-code': 'word-without-code',
  'word-without-logic': 'word-without-logic',
  'word-incomplete-diamond': 'word-incomplete-diamond',
  'seal-debt': 'seal-debt',
  'bypass-math': 'bypass-math',
}

const LAW_TO_AXIS: Readonly<Record<string, string>> = {
  'stray-ts': 'stray-ts',
  'multi-segment-file': 'multi-segment-file',
  'accounting-structure': 'accounting-structure',
  'forbidden-intermediate': 'forbidden-intermediate',
  'stray-dir': 'folder-trinity',
  'logic-concentration': 'logic-concentration',
  'word-matter': 'word-matter',
  'word-without-code': 'word-without-code',
  'word-without-logic': 'word-without-logic',
  'word-incomplete-diamond': 'word-incomplete-diamond',
  'seal-debt': 'seal-debt',
  'bypass-math': 'bypass-math',
}

const DIMENSION_PRIMER: Readonly<Record<CrossDimension, string>> = {
  path: 'path axis — ancestor chain sealed; every prefix atom holds trinity; path lattice walked and ledger-recorded (`sealPropagatedFromAncestors`, `assertPathFollowed`).',
  'time-matrix':
    'time/matrix axis — `coordinateAddress` binds path·horo·uuid; `verifyBind` intact; ≥2 matrix crosses (parent/prev/next); reciprocal bonds (`bindingOf` both ways).',
  trinity: 'trinity axis — form·code·proof complete (SKILL.md · index.ts · test.ts); one-word atom folders; no stray `.ts` at atom root.',
  horo: 'horo axis — atom on the imperial-ratio ring (`HORO_DIGITS`); horo digit matches lattice band.',
  deployment: 'deployment axis — executable code materialises at least one face (worker/plugin/pwa).',
  '2d-partition':
    '2D partition plane — typography graph binds `coordinateAddress`; no multi-segment filenames at atom root; diamond membership faces only.',
  'gap-seal-eb':
    'gap/seal eb balance — every impurity posts a gap debit; every seal credit traceable; net eb = Σgap − Σseal on the entropy sheet.',
}

const DIMENSION_SAMPLE_IMPURITIES: Readonly<Record<CrossDimension, readonly string[]>> = {
  path: [
    'path axis: ancestor chain unsealed',
    'path lattice: 3 path(s) not followed (98.42% coverage)',
    'path ledger: 1 path(s) not canonically recorded',
  ],
  'time-matrix': [
    'matrix: coordinate bind broken (agent · 8/crest · 1d6237db)',
    'matrix: <2 coordinate crosses (seal · 1/base · fb3c1c26)',
    'matrix: bond agent→seal lacks reciprocal',
  ],
  trinity: [
    'trinity.form missing (SKILL.md)',
    'trinity.code missing (index.ts)',
    'trinity.proof missing (test.ts)',
  ],
  horo: ['horo 3 off-ring'],
  deployment: [
    'deployment: no materialised face (worker/plugin/pwa)',
    'deployment: logic concentrated in hub index.ts — split to child atoms',
    'deployment: verbose identifier — shorten or distribute to child atom',
    'literary-word: no code logic (120 readme words · 0 loc · 0 importers)',
  ],
  '2d-partition': ['partition: typography plane unbound (rules · 8/crest · c330b472)', 'partition: multiple domains in one index.ts — nest as child atoms'],
  'gap-seal-eb': [
    'entropy: 2 gap(s) not on balance sheet',
    'entropy: 1 seal credit(s) untraced',
  ],
}

const impurityDimension = (detail: string): CrossDimension | null => {
  const d = detail.toLowerCase()
  if (d.includes('path axis') || d.includes('path lattice') || d.includes('path ledger') || d.startsWith('path ')) {
    return 'path'
  }
  if (d.includes('matrix:') || d.includes('coordinate bind') || d.includes('reciprocal')) {
    return 'time-matrix'
  }
  if (d.includes('trinity.') || d.includes('one-word') || d.includes('skill.md') || d.includes('index.ts') || d.includes('test.ts')) {
    return 'trinity'
  }
  if (d.includes('horo') && d.includes('off-ring')) return 'horo'
  if (d.includes('deployment:')) return 'deployment'
  if (
    d.includes('logic concentrated') ||
    d.includes('logic-concentration') ||
    d.includes('re-export ratio') ||
    d.includes('word-matter') ||
    d.includes('literary-word') ||
    d.includes('prose-heavy') ||
    d.includes('orphan-export') ||
    d.includes('comment-bloat') ||
    d.includes('verbose-name') ||
    d.includes('long-identifier')
  ) {
    return 'deployment'
  }
  if (d.includes('partition:') || d.includes('typography plane') || d.includes('domain imports')) {
    return '2d-partition'
  }
  if (d.includes('entropy:') || d.includes('gap') || d.includes('seal credit')) return 'gap-seal-eb'
  return null
}

/** Resolve canonical rules axis from heterogeneous violation shapes. */
export function resolveViolationAxis(violation: CrossConceptInput): string {
  if (violation.axis) return violation.axis
  if (violation.law && LAW_TO_AXIS[violation.law]) return LAW_TO_AXIS[violation.law]!
  if (violation.source && SOURCE_TO_AXIS[violation.source]) return SOURCE_TO_AXIS[violation.source]!
  if (violation.detail) {
    const fromImpurity = impurityDimension(violation.detail)
    if (fromImpurity === 'path') return 'path-follow'
    if (fromImpurity === 'time-matrix') return 'finished-idea-cross'
    if (fromImpurity === 'trinity') return 'folder-trinity'
    if (fromImpurity === 'horo') return 'finished-idea-cross'
    if (fromImpurity === 'deployment') return 'finished-idea-cross'
    if (fromImpurity === '2d-partition') return 'multi-segment-file'
    if (fromImpurity === 'gap-seal-eb') return 'gap-eb'
  }
  return 'folder-trinity'
}

/** Stable axis fingerprint for cross-acknowledgement receipts. */
export function violationCrossFingerprint(violation: CrossConceptInput): string {
  const axis = resolveViolationAxis(violation)
  const dimension = crossConceptForViolation({ ...violation, axis }).dimension
  return uuid(jcsCanonicalize({ axis, dimension, atomPath: violation.atomPath ?? '' }))
}

/** Static cross primer — what "crossed in ALL directions" means. */
export function crossPrimerMarkdown(): string {
  const lines = [
    '## Cross concept — finished idea crossed in ALL directions',
    '',
    'A **finished idea** holds iff `finishedIdeaCrossed(model)` — sealed diamond crossed on every axis:',
    '- **path** — ancestors sealed; lattice walked; ledger recorded',
    '- **time/matrix** — `coordinateAddress` binds path·horo·uuid; ≥2 crosses; reciprocal bonds',
    '- **trinity** — form·code·proof (SKILL · index · test)',
    '- **horo** — on-ring imperial digit',
    '- **deployment** — worker/plugin/pwa face materialised',
    '- **2D partition** — typography plane bound (`coordinateAddress`)',
    '- **gap/seal eb** — impurities debited; seal credits traced',
    '',
    'Rule violation = one axis **uncrossed**. Read skills + cross law; issue `agent.cross.acknowledge` receipt before retry.',
  ]
  return lines.join('\n')
}

/** Build education markdown from impurities + uncrossed dimension. */
export function crossEducationMarkdown(
  verdict: Pick<CrossConceptVerdict, 'dimension' | 'axis' | 'impurities'>,
): string {
  const lines = [
    '## CrossConceptVerdict — education gate (not punishment)',
    '',
    `**Uncrossed axis:** \`${verdict.axis}\` → **${verdict.dimension}**`,
    '',
    DIMENSION_PRIMER[verdict.dimension],
    '',
    '**Sample impurities on this axis:**',
    ...verdict.impurities.map((i) => `- ${i}`),
    '',
    '**Before retry:** realise `realiseSkillsForPath` / seal·thought·agent SKILL law; acknowledge cross with receipt `agent.cross.acknowledge`.',
  ]
  return lines.join('\n')
}

/**
 * Map one violation → cross dimension + education markdown.
 * Returns `CrossConceptVerdict` explaining what cross means and which axis uncrossed.
 */
export function crossConceptForViolation(violation: CrossConceptInput): CrossConceptVerdict {
  const axis = resolveViolationAxis(violation)
  let dimension = RULE_AXIS_CROSS[axis] ?? 'trinity'

  if (violation.detail) {
    const fromDetail = impurityDimension(violation.detail)
    if (fromDetail) dimension = fromDetail
  }

  const samples = DIMENSION_SAMPLE_IMPURITIES[dimension]
  const impurities =
    violation.detail && impurityDimension(violation.detail)
      ? [violation.detail, ...samples.filter((s) => s !== violation.detail).slice(0, 2)]
      : samples.slice(0, 3)

  const reason =
    `Rule violation on axis \`${axis}\` — ${dimension} uncrossed. ` +
    'Cross means finishedIdeaCrossed: sealed diamond crossed in ALL directions ' +
    '(path·horo·uuid reciprocal bonds; gap/seal eb balance).'

  const crossEducation = crossEducationMarkdown({ dimension, axis, impurities })

  return {
    understood: false,
    dimension,
    axis,
    reason,
    crossEducation,
    impurities,
  }
}

/**
 * Blocks persist when violations are present without cross-acknowledgement receipt.
 * Education gate — agent must realise cross law before retry.
 */
export function assertAgentUnderstandsCross(
  opts: AssertAgentUnderstandsCrossOpts,
): CrossUnderstandVerdict {
  const { violations, acknowledgedAxes } = opts
  if (violations.length === 0) {
    return { allowed: true, pending: [] }
  }

  const acked = acknowledgedAxes ?? new Set<string>()
  const pending: CrossConceptVerdict[] = []

  for (const v of violations) {
    const axis = resolveViolationAxis(v)
    if (acked.has(axis) || acked.has(violationCrossFingerprint(v))) continue
    pending.push(crossConceptForViolation(v))
  }

  if (pending.length === 0) {
    return { allowed: true, pending: [] }
  }

  const crossEducation = [
    crossPrimerMarkdown(),
    '',
    ...pending.map((p) => p.crossEducation),
  ].join('\n')

  return {
    allowed: false,
    reason: `cross-education gate: ${pending.length} axis uncrossed — ${pending.map((p) => p.axis).join(', ')}`,
    pending,
    crossEducation,
  }
}

export interface IssueCrossAcknowledgementOpts {
  readonly violation: CrossConceptInput
  readonly actor: string
  readonly timestampIso: string
  readonly head: { leafUuid: string; seq: number } | null
}

/** Issue append-only receipt that the agent acknowledged cross law for one violation axis. */
export function issueCrossAcknowledgementReceipt(
  opts: IssueCrossAcknowledgementOpts,
): { receipt: Receipt; axis: string; fingerprint: string } {
  const axis = resolveViolationAxis(opts.violation)
  const fingerprint = violationCrossFingerprint(opts.violation)
  const decision: Decision = {
    action: 'agent.cross.acknowledge',
    actor: opts.actor,
    outcome: 'allow',
    tier: 'corpus',
    capabilities: ['read'],
  }
  const receipt = issueReceipt({
    decision,
    head: opts.head,
    timestampIso: opts.timestampIso,
  })
  void fingerprint
  return { receipt, axis, fingerprint }
}

/**
 * Map violation → notification payload for monitor toast, wave emit, and agent chat.
 * Coordinates e91c6593 cross education module with fb3c1c26 improve/monitor loop.
 */
export function crossConceptNotificationPayload(
  violation: CrossConceptInput,
  opts?: { readonly accountCode?: string; readonly gate?: 'strict-apply' | 'scan' },
): CrossConceptNotificationPayload {
  const verdict = crossConceptForViolation(violation)
  const atomPath = violation.atomPath ?? 'rules'
  const accountCode = opts?.accountCode ?? atomPath
  const gate = opts?.gate ?? 'scan'
  return {
    event: 'monitor:cross:violation',
    atomPath,
    accountCode,
    axis: verdict.axis,
    dimension: verdict.dimension,
    uncrossedAxes: [verdict.axis],
    crossEducation: verdict.crossEducation,
    primer: crossPrimerMarkdown(),
    reason: verdict.reason,
    toastTitle: `Cross uncrossed — ${verdict.dimension}`,
    toastDescription: `${verdict.axis} · ${atomPath} — realise cross law before retry`,
    agentChatEnvelope: {
      kind: 'agent.cross.education',
      gate,
      acknowledgeAction: 'agent.cross.acknowledge',
    },
  }
}

/** Build violation inputs from unsealed rules axes (rulesOf snapshot). */
export function violationsFromUnsealedAxes(
  axes: readonly { axis: string; violations: number; baseline: number }[],
): CrossConceptInput[] {
  return axes
    .filter((a) => a.violations > a.baseline)
    .map((a) => ({ axis: a.axis, detail: `${a.axis}: ${a.violations} > baseline ${a.baseline}` }))
}
