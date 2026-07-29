import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
/**
 * bank/research — deep-research global banking via sealed chat waves (tokens=0).
 * Uses quantum/ftl; is not the FTL core.
 *
 *   tsx src/bank/research/index.ts
 *
 * @standard ISO-20022:2022 · ISO-13616-1:2020 iban · ISO-9362:2022 bic
 * @standard PSD2 EU-2015/2366 · SEPA EPC
 * @see ../accounts · ../../iso/20022 · ../../quantum/ftl · ../../quantum/chat · ./SKILL.md
 */
import { merge, foldToRoot } from '@/merge'
import {
  research as sealedResearch,
  chatLocal,
  seal,
  amortize as amortizeReuse,
  ftl as computeFtl,
  BOUNDARY,
  type Seal,
  type Research,
  type Boundary,
} from '@/quantum/ftl'
import { feedWavesIntoThemselves, type WaveFeedReport } from '@/wave/feed'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export const atomPath = 'bank/research' as const

/** One related banking domain the corpus may hold or still owe. */
export type BankingDomain =
  | 'iso-20022-camt'
  | 'iso-20022-pain'
  | 'iso-20022-pacs'
  | 'iban-bic'
  | 'sepa-epc'
  | 'psd2-open-banking'
  | 'swift-mt-mx'
  | 'aml-transfers'
  | 'reconciliation'
  | 'realtime-rails'

/** Corpus path that realises a domain (form·code·proof when present). */
export interface BankingRelated {
  readonly domain: BankingDomain
  readonly title: string
  readonly atoms: readonly string[]
  /** true iff every listed atom path exists on disk */
  readonly present: boolean
  readonly missing: readonly string[]
}

/** Sealed global-banking knowledge — BM25-lite deep research reads this at tokens=0. */
export const GLOBAL_BANKING_CORPUS: readonly Seal[] = [
  {
    id: 'banking-iso-20022',
    text: 'Global banking messaging converges on ISO 20022 MX: camt.052 (intraday), camt.053 (end-of-day statement), camt.054 (debit/credit notification), pain.001 (customer credit transfer), pain.002 (payment status report), pain.008 (direct debit), pacs.008 (FI credit transfer), pacs.004 (payment return). ERP treasury carries semantic subsets, not full XSD wires.',
    followUps: [
      'what is pain.002 payment status report',
      'what is camt.054 notification',
      'how do SEPA and ISO 20022 relate',
    ],
  },
  {
    id: 'banking-iban-bic',
    text: 'Party and account addressing: ISO 13616 IBAN (mod-97 checksum) + ISO 9362 BIC (SWIFT). Country is derivable from IBAN alpha-2. Validate before initiation; never invent a checksum.',
    followUps: ['how should IBAN validation fail closed', 'what is ISO 9362 BIC'],
  },
  {
    id: 'banking-sepa',
    text: 'SEPA (Single Euro Payments Area) overlays ISO 20022 with EPC rulebooks: SCT (pain.001), SDD CORE/B2B (pain.008 + mandate), SCT Inst for realtime. Charge bearer SLEV is the SEPA default. Local instrument CORE|B2B|COR1; sequence FRST|RCUR|OOFF|FNAL.',
    followUps: ['what is SEPA Instant', 'how do pain.001 and pain.008 differ'],
  },
  {
    id: 'banking-psd2-open',
    text: 'PSD2 (EU 2015/2366) + Berlin Group NextGenPSD2: AIS (accounts/balances/transactions) and PIS (payment initiation) via ASPSP APIs with strong customer authentication. Open banking is the API face; ISO 20022 is the message face. PSD3/PSR evolve SCA and open-banking access.',
    followUps: ['what is Berlin Group NextGenPSD2', 'how does open banking relate to camt.053'],
  },
  {
    id: 'banking-swift',
    text: 'SWIFT: MT (legacy FIN) coexists with MX (ISO 20022). Cross-border gpi tracks; CBPR+ migrates correspondent banking to MX. An ERP may emit pain.001 to a bank channel that translates to pacs.008 on the wire.',
    followUps: ['what is SWIFT MT vs MX', 'how does pacs.008 relate to pain.001'],
  },
  {
    id: 'banking-aml',
    text: 'AML / travel-rule overlays: EU 2015/849 (AMLD4) and transfer-of-funds rules require payer/payee information on cross-border transfers. Banking collections that move value must keep audit trails (ISO 19011) and fail-closed access floors.',
    followUps: ['how should EU-2015/849 gate bank transfers', 'what is transfer of funds travel rule'],
  },
  {
    id: 'banking-reconcile',
    text: 'Bank reconciliation: import camt.053 lines → match to journal entries (SOX §404 evidence) → residual is unmatched. Statement import + per-line bank-transactions + reconciliation service form the trinity. Fuzzy match scores; never silent overwrite of matched lines.',
    followUps: ['how does camt.053 feed reconciliation', 'what settles a bank leftover wave'],
  },
  {
    id: 'banking-realtime',
    text: 'Realtime rails related to global banking: SEPA Instant (EUR), FedNow/RTP (US), PIX (BR), UPI (IN), Faster Payments (UK). Shared pattern: irrevocable credit, ISO 20022 or local twin, timeout/status via pain.002-like reports. erpax maps them as related domains, not all as first-class atoms yet.',
    followUps: ['what is SEPA Instant', 'how do realtime rails use pain.002'],
  },
  {
    id: 'banking-pain002',
    text: 'pain.002 CustomerPaymentStatusReport: ASPSP/bank acknowledges pain.001/008 with group and transaction statuses (ACCP, ACSP, ACWC, RJCT, PDNG…) plus reason codes (AC01, AM04, …). PaymentRuns need pain.002 to close the initiation loop — without it, export is fire-and-forget.',
    followUps: ['what status codes does pain.002 carry', 'how should PaymentRuns consume pain.002'],
  },
  {
    id: 'banking-camt054',
    text: 'camt.054 BankToCustomerDebitCreditNotification: near-real-time advise of booked items between full camt.053 statements. Complements camt.052 (intraday report). Developing camt.054 types lets notifications land without waiting for end-of-day.',
    followUps: ['how does camt.054 differ from camt.053', 'what is camt.052'],
  },
]

/** Free-chat recipes for banking improve waves (sealed; tokens=0 via quantum/ftl chatLocal). */
export const BANK_RESEARCH_BOOK = seal([
  [
    'how do chat waves develop banking research',
    'deepResearchGlobalBanking → bankResearchWaves → developBankingRelated. Sealed GLOBAL_BANKING_CORPUS at tokens=0 (quantum/ftl); develop missing ISO 20022 faces (pain.002 · camt.054) and heal leftovers.',
  ],
  [
    'what is global banking in erpax',
    'Global banking = ISO 20022 rails ⊕ IBAN/BIC ⊕ SEPA ⊕ PSD2/open-banking ⊕ SWIFT MT/MX ⊕ AML overlays ⊕ reconciliation. Related atoms live under bank/ · iso/20022 · iso/13616 · iso/9362 · country (Berlin Group) · camt053.',
  ],
  [
    'how to develop all related banking from research waves',
    'For each BankingDomain: list atoms, mark present/missing, emit a wave. Apply: add semantic types (pain.002/camt.054), gate standards, chatHealLeftoverWave on bank-touching fields. Never empty gaming tests.',
  ],
  [
    'how to feed banking waves into themselves',
    'endlessBankResearchDevelop: each generation research→waves→nextAsks(+grow sealed corpus)→develop→research. shouldContinue until external stop; maxGenerations bounds one call. cost=0 via quantum/ftl. wave/feed is the loop.',
  ],
  [
    'how to invert banking and fill the gaps',
    'invertBanking: for each banking pole (export/give · EOD camt.053 · pain.001) name its dual (import/take · camt.052 · pain.002 · pacs.008 · pacs.004) and mark atom present/missing. Fill open gaps: camt052/import · pacs004/import · Pacs008 types · standards-import routes. Never claim present without the dual on disk.',
  ],
  [
    'how should banks chat with each other',
    'bank/chat banksChat: BIC participants exchange QuantumSecureEnvelope turns; collaborate 2f+1 to accept develop proposals. Dual of customer chat — FI↔FI. See developQuantumSecureBanking.',
  ],
  [
    'what is quantum secure banking',
    'classical⊕FIPS 203/204 on interbank; holds=isApprovedPqc∧digests. bank/chat.',
  ],
  [
    'what is pain.002 payment status report',
    'CustomerPaymentStatusReport — bank acknowledges pain.001/008 with ACCP/RJCT/… and reason codes. Develop Pain002Report types in iso/20022; PaymentRuns consume them to leave draft→settled honestly.',
  ],
  [
    'what is camt.054 notification',
    'BankToCustomerDebitCreditNotification — intraday advise. Develop Camt054Notification beside camt.053 statement types; statement import can later ingest notifications.',
  ],
])

/** @deprecated alias — book is research, not FTL core */
export const BANK_FTL_BOOK = BANK_RESEARCH_BOOK

/** Seed questions that fan the global-banking research wave. */
export const GLOBAL_BANKING_ASKS: readonly string[] = [
  'what is global banking messaging under ISO 20022',
  'how do SEPA and ISO 20022 relate',
  'what is pain.002 payment status report',
  'what is camt.054 notification',
  'how does PSD2 open banking relate to camt.053',
  'what is SWIFT MT vs MX',
  'how does camt.053 feed reconciliation',
  'how should IBAN validation fail closed',
  'what is SEPA Instant',
  'how should EU-2015/849 gate bank transfers',
]

const RELATED_SPEC: readonly {
  readonly domain: BankingDomain
  readonly title: string
  readonly atoms: readonly string[]
}[] = [
  {
    domain: 'iso-20022-camt',
    title: 'Cash management — camt.052/053/054',
    atoms: [
      'src/iso/20022/index.ts',
      'src/iso/20022/types.ts',
      'src/camt052/import/service/index.ts',
      'src/camt053/import/service/index.ts',
      'src/camt054/import/service/index.ts',
      'src/bank/statement/import/service/index.ts',
    ],
  },
  {
    domain: 'iso-20022-pain',
    title: 'Customer initiation — pain.001/002/008',
    atoms: [
      'src/iso/20022/types.ts',
      'src/pain002/import/service/index.ts',
      'src/bank/accounts/payment/runs/index.ts',
      'src/bank/accounts/payroll/runs/index.ts',
    ],
  },
  {
    domain: 'iso-20022-pacs',
    title: 'FI transfers / returns — pacs.008/004',
    atoms: [
      'src/iso/20022/types.ts',
      'src/pacs004/import/service/index.ts',
      'src/invoices/credit/memos/refunds',
    ],
  },
  {
    domain: 'iban-bic',
    title: 'IBAN · BIC addressing',
    atoms: ['src/iso/13616/index.ts', 'src/iso/9362/index.ts', 'src/derive/country/from/iban/index.ts', 'src/input/index.ts'],
  },
  {
    domain: 'sepa-epc',
    title: 'SEPA EPC schemes',
    atoms: ['src/iso/20022/SKILL.md', 'src/bank/accounts/payment/runs/index.ts'],
  },
  {
    domain: 'psd2-open-banking',
    title: 'PSD2 / Berlin Group open banking',
    atoms: ['src/country/client/berlin-group-psd2.ts', 'src/country/api/index.ts', 'src/trading/api/client/index.ts'],
  },
  {
    domain: 'swift-mt-mx',
    title: 'SWIFT MT ↔ MX coexistence',
    atoms: ['src/iso/20022/index.ts', 'src/standards/registry.ts'],
  },
  {
    domain: 'aml-transfers',
    title: 'AML / transfer-of-funds overlays',
    atoms: ['src/access/standard/index.ts', 'src/bank/accounts/index.ts'],
  },
  {
    domain: 'reconciliation',
    title: 'Statement import + match + residual',
    atoms: [
      'src/bank/reconciliation/service/index.ts',
      'src/bank/accounts/bank/transactions/index.ts',
      'src/bank/accounts/bank/reconciliations/index.ts',
    ],
  },
  {
    domain: 'realtime-rails',
    title: 'Realtime rails (SCT Inst · FedNow · PIX · UPI) — related map',
    atoms: ['src/bank/research/index.ts'],
  },
]

/** Live relatedness map — which global-banking domains the tree already holds. */
export function bankingRelated(cwd: string = process.cwd()): readonly BankingRelated[] {
  return RELATED_SPEC.map((r) => {
    const missing = r.atoms.filter((a) => !existsSync(join(cwd, a)))
    return {
      domain: r.domain,
      title: r.title,
      atoms: r.atoms,
      present: missing.length === 0,
      missing,
    }
  })
}

/**
 * One banking dual gap: a present pole names its invert dual and the atom that fills it.
 * Import ↔ export · camt.053 ↔ camt.052 · pain.001 ↔ pacs.008 · initiation ↔ return.
 */
export interface BankingInvertGap {
  readonly pole: string
  readonly dual: string
  readonly atom: string
  readonly present: boolean
  readonly develop: string
}

const BANKING_INVERT_SPEC: readonly {
  readonly pole: string
  readonly dual: string
  readonly atom: string
  readonly develop: string
  readonly prove?: (cwd: string) => boolean
}[] = [
  {
    pole: 'camt.053 import (EOD statement)',
    dual: 'camt.052 import (intraday report)',
    atom: 'src/camt052/import/service/index.ts',
    develop: 'land parseCamt052 + standards-import route camt.052',
  },
  {
    pole: 'camt.053 import (EOD statement)',
    dual: 'camt.054 import (debit/credit notification)',
    atom: 'src/camt054/import/service/index.ts',
    develop: 'land parseCamt054 + standards-import route camt.054',
  },
  {
    pole: 'pain.001 export (customer credit transfer)',
    dual: 'pain.002 import (payment status report)',
    atom: 'src/pain002/import/service/index.ts',
    develop: 'land parsePain002 + applyPain002Report on PaymentRuns',
  },
  {
    pole: 'pain.001 export (customer credit transfer)',
    dual: 'pacs.008 types (FI-to-FI credit transfer)',
    atom: 'src/iso/20022/types.ts',
    develop: 'export Pacs008CreditTransfer · Pacs008Transaction beside pain.001',
    prove: (cwd) => {
      try {
        return /export interface Pacs008CreditTransfer\b/.test(
          readFileSync(join(cwd, 'src/iso/20022/types.ts'), 'utf8'),
        )
      } catch {
        return false
      }
    },
  },
  {
    pole: 'pacs.008 / pain.001 outbound',
    dual: 'pacs.004 import (payment return)',
    atom: 'src/pacs004/import/service/index.ts',
    develop: 'land parsePacs004 + standards-import route pacs.004',
  },
  {
    pole: 'standards export (give)',
    dual: 'standards import routes inverted banking formats',
    atom: 'src/export/standards-import.ts',
    develop: 'route camt.052 · camt.054 · pain.002 · pacs.004 in importStandards',
    prove: (cwd) => {
      try {
        const t = readFileSync(join(cwd, 'src/export/standards-import.ts'), 'utf8')
        return (
          /'camt\.052'/.test(t) &&
          /'camt\.054'/.test(t) &&
          /'pain\.002'/.test(t) &&
          /'pacs\.004'/.test(t)
        )
      } catch {
        return false
      }
    },
  },
]

/**
 * Invert banking: for each give/outbound pole, require its take/inbound (or FI) dual.
 * Returns every dual with present=true when filled. holds iff open.length === 0.
 */
export function invertBanking(cwd: string = process.cwd()): {
  readonly gaps: readonly BankingInvertGap[]
  readonly open: readonly BankingInvertGap[]
  readonly filled: number
  readonly total: number
  readonly holds: boolean
} {
  const gaps: BankingInvertGap[] = BANKING_INVERT_SPEC.map((s) => {
    const present = s.prove ? s.prove(cwd) : existsSync(join(cwd, s.atom))
    return {
      pole: s.pole,
      dual: s.dual,
      atom: s.atom,
      present,
      develop: present ? `filled — ${s.dual}` : s.develop,
    }
  })
  const open = gaps.filter((g) => !g.present)
  return {
    gaps,
    open,
    filled: gaps.length - open.length,
    total: gaps.length,
    holds: open.length === 0,
  }
}

/** Open invert gaps only — the fill list. */
export function bankingGaps(cwd: string = process.cwd()): readonly BankingInvertGap[] {
  return invertBanking(cwd).open
}

export interface BankResearchWave {
  readonly domain: BankingDomain | 'research'
  readonly count: number
  readonly questions: readonly string[]
  readonly evidence: readonly string[]
  readonly seal: string
  /** develop hint — what to land next */
  readonly develop: string
}

/**
 * Fold deep-research findings into domain waves (biggest first, content-addressed).
 */
export function bankResearchWaves(
  research: Pick<Research, 'findings'>,
  related: readonly BankingRelated[] = bankingRelated(),
): readonly BankResearchWave[] {
  const domainOf = (q: string, evidence: string): BankingDomain | 'research' => {
    const s = `${q} ${evidence}`.toLowerCase()
    if (/camt\.?054|camt\.?053|camt\.?052|cash.?management|statement/.test(s)) return 'iso-20022-camt'
    if (/pain\.?002|pain\.?001|pain\.?008|status.?report|direct.?debit|credit.?transfer/.test(s)) return 'iso-20022-pain'
    if (/pacs|return|fi credit/.test(s)) return 'iso-20022-pacs'
    if (/iban|bic|13616|9362/.test(s)) return 'iban-bic'
    if (/sepa|epc|sct|sdd/.test(s)) return 'sepa-epc'
    if (/psd2|psd3|berlin|open.?banking|nextgen/.test(s)) return 'psd2-open-banking'
    if (/swift|mt\b|mx\b|cbpr/.test(s)) return 'swift-mt-mx'
    if (/aml|2015\/849|travel.?rule|sanctions/.test(s)) return 'aml-transfers'
    if (/reconcil|match|journal/.test(s)) return 'reconciliation'
    if (/instant|fednow|pix|upi|realtime|real-time/.test(s)) return 'realtime-rails'
    return 'research'
  }
  const by = new Map<string, { qs: string[]; ev: string[] }>()
  for (const f of research.findings) {
    const d = domainOf(f.question, f.evidence)
    const bucket = by.get(d) ?? { qs: [], ev: [] }
    bucket.qs.push(f.question)
    bucket.ev.push(f.evidence)
    by.set(d, bucket)
  }
  const relatedHint = (d: string): string => {
    const r = related.find((x) => x.domain === d)
    if (!r) return 'seal more GLOBAL_BANKING_CORPUS'
    if (!r.present) return `land missing atoms: ${r.missing.join(', ')}`
    if (d === 'iso-20022-pain') return 'pain.002 parse+apply landed (pain002/import); PaymentRuns bankResponse* + status patch'
    if (d === 'iso-20022-camt') return 'camt.052/053/054 parse landed (camt052|053|054/import); statement path unchanged'
    if (d === 'iso-20022-pacs') return 'pacs.008 types + pacs.004 parse landed (pacs004/import); Refunds keep pacs.004 face'
    return `deepen ${r.title} — present; extend proof/tests`
  }
  return [...by.entries()]
    .map(([domain, { qs, ev }]) => ({
      domain: domain as BankingDomain | 'research',
      count: qs.length,
      questions: qs,
      evidence: ev,
      seal: foldToRoot(qs.map((q, i) => merge(q, ev[i] ?? ''))),
      develop: relatedHint(domain),
    }))
    .sort((a, b) => b.count - a.count || String(a.domain).localeCompare(String(b.domain)))
}

export interface GlobalBankingReport {
  readonly holds: boolean
  readonly research: Research
  readonly waves: readonly BankResearchWave[]
  readonly related: readonly BankingRelated[]
  readonly present: number
  readonly missingDomains: number
  readonly tokens: 0
  readonly cost: 0
  readonly efficiency: number
  readonly boundary: Boundary
  readonly chat?: { readonly lane: string; readonly answer: string }
}

/**
 * Deep-research global banking at no cost → chat confirms → emit develop waves over related atoms.
 */
export async function deepResearchGlobalBanking(opts: {
  readonly asks?: readonly string[]
  readonly depth?: number
  readonly cwd?: string
  readonly chat?: boolean
} = {}): Promise<GlobalBankingReport> {
  const asks = opts.asks ?? GLOBAL_BANKING_ASKS
  const research = await sealedResearch(asks, {
    corpus: GLOBAL_BANKING_CORPUS,
    depth: opts.depth ?? 2,
  })
  const related = bankingRelated(opts.cwd)
  const waves = bankResearchWaves(research, related)
  const present = related.filter((r) => r.present).length
  const missingDomains = related.length - present
  let chat: { lane: string; answer: string } | undefined
  if (opts.chat !== false) {
    const ans =
      chatLocal('how to develop all related banking from research waves', BANK_RESEARCH_BOOK) ??
      chatLocal('how do chat waves develop banking research', BANK_RESEARCH_BOOK)
    if (ans) chat = { lane: ans.lane, answer: ans.answer }
  }
  const am = amortizeReuse(research.findings.length, 0)
  void computeFtl({
    query: 'bank:global',
    spaceSize: exactMax(1, GLOBAL_BANKING_CORPUS.length),
    answers: research.findings.length,
    tokens: 0,
    patterns: [],
  })
  return {
    holds: research.worthwhile && research.cost === 0 && am.scalesToInfinity,
    research,
    waves,
    related,
    present,
    missingDomains,
    tokens: 0,
    cost: 0,
    efficiency: am.efficiency,
    boundary: BOUNDARY,
    chat,
  }
}

/** Domains the research waves say to develop next (missing atoms or explicit develop hints). */
export function nextBankingDevelopments(report: GlobalBankingReport): readonly {
  readonly domain: string
  readonly develop: string
  readonly priority: number
}[] {
  return report.waves.map((w, i) => ({
    domain: w.domain,
    develop: w.develop,
    priority: w.count * 10 - i,
  }))
}

/**
 * In-memory corpus the endless feed grows. Starts as a copy of GLOBAL_BANKING_CORPUS;
 * each generation may seal new statements from findings so the next search is deeper.
 * Not a mutation of the sealed const — reset between isolated runs via resetBankingCorpusLive.
 */
let liveBankingCorpus: Seal[] = [...GLOBAL_BANKING_CORPUS]

export function bankingCorpusLive(): readonly Seal[] {
  return liveBankingCorpus
}

export function resetBankingCorpusLive(): void {
  liveBankingCorpus = [...GLOBAL_BANKING_CORPUS]
}

/** Seal findings into the live corpus (content-addressed ids). Returns how many statements were added. */
export function growBankingCorpusFromFindings(
  findings: readonly { readonly question: string; readonly evidence: string }[],
): number {
  let grown = 0
  for (const f of findings) {
    const id = `grown-${foldToRoot([merge('q', f.question), merge('e', f.evidence.slice(0, 160))])}`
    if (liveBankingCorpus.some((s) => s.id === id || s.text === f.evidence)) continue
    liveBankingCorpus = [
      ...liveBankingCorpus,
      {
        id,
        text: `${f.question}: ${f.evidence}`,
        followUps: [`verify and extend: ${f.question}`, `deeper research: ${f.question}`],
      },
    ]
    grown++
  }
  return grown
}

/**
 * Feed banking research waves into themselves: research → waves → next asks (+ grow corpus) →
 * develop labels → research again. One call is bounded by `maxGenerations`; endlessness is the
 * law of the loop (shouldContinue) until an external `stopped`. cost=0 / tokens=0.
 */
export async function endlessBankResearchDevelop(
  opts: {
    readonly seedAsks?: readonly string[]
    readonly maxGenerations?: number
    readonly depth?: number
    readonly stopped?: boolean
    readonly cwd?: string
    /** When true (default), reset live corpus to the sealed GLOBAL before running. */
    readonly resetCorpus?: boolean
  } = {},
): Promise<WaveFeedReport<BankResearchWave>> {
  if (opts.resetCorpus !== false) resetBankingCorpusLive()
  const related = bankingRelated(opts.cwd)
  const depth = opts.depth ?? 1
  return feedWavesIntoThemselves<BankResearchWave>({
    seedAsks: opts.seedAsks ?? GLOBAL_BANKING_ASKS.slice(0, 6),
    maxGenerations: opts.maxGenerations ?? 3,
    stopped: opts.stopped,
    askLimit: 10,
    research: async (asks) => {
      const research = await sealedResearch(asks, {
        corpus: liveBankingCorpus,
        depth,
      })
      const followUps = research.findings
        .flatMap((f) => [`verify and extend: ${f.question}`])
        .slice(0, 6)
      return { findings: research.findings, followUps }
    },
    wavesFrom: (r) => bankResearchWaves(r, related),
    growCorpus: growBankingCorpusFromFindings,
    develop: (waves) =>
      waves.map((w) => `${w.domain}: ${w.develop}`),
  })
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void (async () => {
    const inv = invertBanking()
    console.log('bank/research — invert banking & fill gaps')
    console.log(`  invert: filled ${inv.filled}/${inv.total} · holds=${inv.holds}`)
    for (const g of inv.gaps) {
      console.log(`  ${g.present ? '✓' : '✗'} ${g.pole} ↔ ${g.dual} → ${g.atom}`)
    }
    const r = await deepResearchGlobalBanking({ depth: 2 })
    console.log('bank/research — deep research global banking (chat waves, cost=0)')
    console.log(`  findings=${r.research.findings.length} cost=${r.cost} tokens=${r.tokens} eff=${r.efficiency} holds=${r.holds}`)
    console.log(`  related present ${r.present}/${r.related.length} · missingDomains=${r.missingDomains}`)
    for (const w of r.waves.slice(0, 8)) {
      console.log(`  wave ${w.domain} ×${w.count} → ${w.develop}`)
    }
    const endless = await endlessBankResearchDevelop({ maxGenerations: 3, depth: 1 })
    console.log(
      `  endless feed: gens=${endless.generations.length} findings=${endless.totalFindings} grown=${endless.sealGrown} developed=${endless.totalDeveloped} continue=${endless.continuation.continue} cost=${endless.cost}`,
    )
    for (const g of endless.generations) {
      console.log(`    gen ${g.generation}: asks=${g.asks.length} → waves=${g.waves.length} → nextAsks=${g.nextAsks.length}`)
    }
  })()
}
