import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
/**
 * bank/chat — interbank BIC chat + hybrid classical⊕PQC envelopes.
 *
 *   tsx src/bank/chat/index.ts
 *
 * @standard ISO-9362:2022 bic
 * @standard ISO-20022:2022 pacs / pain
 * @standard NIST FIPS 203 ML-KEM · FIPS 204 ML-DSA
 * @see ../research · ../../beyond/pqc · ../../quantum/ftl · ../../quantum/chat · ./SKILL.md
 */
import { merge, foldToRoot } from '@/merge'
import { uuid as toUuid } from '@/integrity'
import {
  chatLocal,
  seal,
  research as sealedResearch,
  amortize as amortizeReuse,
  ftl as computeFtl,
  BOUNDARY,
  type Seal,
  type Research,
  type Boundary,
} from '@/quantum/ftl'
import { startSession, sessionAppend, sealSession, collaborate, type ChatSession } from '@/quantum/chat'
import { isApprovedPqc, signPqc } from '@/beyond/pqc'
import type { PqcAlgorithm, PqcSignature } from '@/beyond/types'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

export const atomPath = 'bank/chat' as const

/** One bank on the interbank chat — addressed by BIC (ISO 9362). */
export interface InterbankParticipant {
  readonly bic: string
  readonly name: string
  /** Fingerprint of the bank's declared PQC public key (content-address or hex). */
  readonly pqcFingerprint: string
  readonly algorithm?: PqcAlgorithm
}

/** One sealed turn in an interbank chat. */
export interface InterbankTurn {
  readonly fromBic: string
  readonly text: string
  readonly payloadUuid: string
  readonly envelope: QuantumSecureEnvelope
  readonly at: number
}

/**
 * Hybrid envelope: content-uuid ⊕ approved PQC algorithm. Holds is computed
 * (isApprovedPqc ∧ digest shape) — no hand-asserted physics claims.
 */
export interface QuantumSecureEnvelope {
  readonly payloadUuid: string
  readonly classicalDigest: string
  readonly algorithm: PqcAlgorithm
  readonly publicKeyFingerprint: string
  readonly pqc: PqcSignature
  readonly hybrid: true
  /** true iff algorithm is NIST-approved AND digests agree */
  readonly holds: boolean
}

/** Seal a payload under hybrid classical⊕PQC posture (fail-closed on unapproved alg). */
export function sealQuantumSecure(
  payload: string,
  opts: {
    readonly publicKeyFingerprint: string
    readonly algorithm?: PqcAlgorithm
  },
): QuantumSecureEnvelope {
  const algorithm = opts.algorithm ?? 'ML-DSA-65'
  const payloadUuid = toUuid(`bank:qsb:${payload}`)
  const classicalDigest = foldToRoot([merge('payload', payload), merge('alg', algorithm)])
  const bytes = new TextEncoder().encode(payload)
  const pqc = signPqc({
    payload: bytes,
    algorithm,
    publicKeyFingerprint: opts.publicKeyFingerprint,
  })
  const holds = isApprovedPqc(algorithm) && pqc.algorithm === algorithm && classicalDigest.length === 36
  return {
    payloadUuid,
    classicalDigest,
    algorithm,
    publicKeyFingerprint: opts.publicKeyFingerprint,
    pqc,
    hybrid: true,
    holds,
  }
}

/** Sealed QSB knowledge (tokens=0). */
export const QUANTUM_SECURE_BANKING_CORPUS: readonly Seal[] = [
  {
    id: 'qsb-interbank-chat',
    text: 'banksChat: BIC participants; each turn = QuantumSecureEnvelope; collaborate@2f+1',
    followUps: ['how should banks chat with each other', 'what is an interbank chat session'],
  },
  {
    id: 'qsb-pqc-posture',
    text: 'qsb = classical digest ⊕ NIST FIPS 203/204; holds ⇔ isApprovedPqc ∧ digests',
    followUps: ['what is quantum secure banking', 'how does ML-DSA protect interbank messages'],
  },
  {
    id: 'qsb-hybrid-envelope',
    text: 'QuantumSecureEnvelope: payloadUuid·classicalDigest·algorithm·pqc; verify fail-closed until liboqs',
    followUps: ['how to develop quantum secure banking', 'how should pacs.008 ride a quantum-secure envelope'],
  },
  {
    id: 'qsb-iso-pacs',
    text: 'pacs.008/004 · pain.002 ride QuantumSecureEnvelope on FI↔FI threads',
    followUps: ['how does pacs.008 relate to pain.001', 'how should banks chat about payment returns'],
  },
  {
    id: 'qsb-holds',
    text: 'holds ⇔ isApprovedPqc ∧ content-address ∧ consensus; stub verify ≠ forge-proof',
    followUps: ['what is the boundary of quantum secure banking', 'when does PQC verify fail closed'],
  },
]

export const QUANTUM_SECURE_BANKING_BOOK = seal([
  [
    'how should banks chat with each other',
    'banksChat(BICs) → sealQuantumSecure(turn) → collaborate@2f+1 → sealSession',
  ],
  [
    'what is an interbank chat session',
    'ChatSession + InterbankParticipant[] (BIC) + hybrid-envelope turns',
  ],
  [
    'what is quantum secure banking',
    'classical content-address ⊕ FIPS 203/204; holds=isApprovedPqc∧digests',
  ],
  [
    'how to develop quantum secure banking',
    'deepResearch → banksChat consensus → QuantumSecureEnvelope on pacs/pain',
  ],
  [
    'how does ML-DSA protect interbank messages',
    'FIPS 204 lattice sig; declare alg+fingerprint+uuid; verify fail-closed until libpqc',
  ],
  [
    'how should pacs.008 ride a quantum-secure envelope',
    'sealQuantumSecure(pacs.008) → exchange; receiver checks holds before apply',
  ],
  [
    'what is the boundary of quantum secure banking',
    'holds=approvedPQC∧digest∧consensus; stub verify fail-closed',
  ],
  [
    'when does PQC verify fail closed',
    'verifyPqc ok:false until Workers liboqs; PLACEHOLDER ≠ authentic',
  ],
  [
    'how should banks chat about payment returns',
    'propose pacs.004 → vote@2f+1 → seal under QuantumSecureEnvelope',
  ],
])

/** Related atoms quantum-secure banking must keep present. */
const QSB_RELATED: readonly string[] = [
  'src/bank/chat/index.ts',
  'src/beyond/pqc/index.ts',
  'src/iso/20022/types.ts',
  'src/pacs004/import/service/index.ts',
  'src/pain002/import/service/index.ts',
  'src/quantum/chat/index.ts',
]

export function quantumSecureBankingRelated(cwd: string = process.cwd()): readonly {
  readonly atom: string
  readonly present: boolean
}[] {
  return QSB_RELATED.map((atom) => ({ atom, present: existsSync(join(cwd, atom)) }))
}

export interface InterbankChatReport {
  readonly session: ChatSession
  readonly banks: readonly InterbankParticipant[]
  readonly turns: readonly InterbankTurn[]
  readonly acceptedDevelopments: readonly string[]
  readonly thread: string
  readonly sealed: boolean
  readonly holds: boolean
  readonly tokens: 0
  readonly cost: 0
  readonly boundary: Boundary
}

/**
 * Let the banks chat with each other: each turn is hybrid-sealed; optional
 * develop proposals pass only with 2f+1 collaborative consensus.
 */
export function banksChat(
  banks: readonly InterbankParticipant[],
  opts: {
    readonly topic?: string
    readonly turns?: readonly { readonly fromBic: string; readonly text: string }[]
    readonly proposals?: readonly {
      readonly text: string
      /** one boolean per bank, same order as `banks` */
      readonly votes: readonly boolean[]
    }[]
    readonly seal?: boolean
  } = {},
): InterbankChatReport {
  const topic = opts.topic ?? 'quantum-secure-banking'
  let session = startSession(`interbank:${topic}:${banks.map((b) => b.bic).join('+')}`)
  const byBic = new Map(banks.map((b) => [b.bic, b]))
  const turns: InterbankTurn[] = []
  const defaultTurns =
    opts.turns ??
    banks.map((b, i) => ({
      fromBic: b.bic,
      text:
        i === 0
          ? 'propose: wrap all pacs.008/004 exchanges in QuantumSecureEnvelope (ML-DSA-65)'
          : `ack from ${b.bic}: hybrid classical⊕PQC`,
    }))

  let at = 0
  for (const t of defaultTurns) {
    const bank = byBic.get(t.fromBic)
    if (!bank) continue
    const envelope = sealQuantumSecure(t.text, {
      publicKeyFingerprint: bank.pqcFingerprint,
      algorithm: bank.algorithm ?? 'ML-DSA-65',
    })
    session = sessionAppend(session, `${t.fromBic}:${envelope.payloadUuid}:${t.text}`)
    turns.push({
      fromBic: t.fromBic,
      text: t.text,
      payloadUuid: envelope.payloadUuid,
      envelope,
      at: at++,
    })
  }

  const acceptedDevelopments: string[] = []
  for (const p of opts.proposals ?? []) {
    const collab = collaborate(session, p.text, p.votes)
    session = collab.session
    if (collab.accepted) acceptedDevelopments.push(p.text)
  }

  if (opts.seal !== false) session = sealSession(session)
  const envelopesHold = turns.every((t) => t.envelope.holds)
  const related = quantumSecureBankingRelated()
  return {
    session,
    banks,
    turns,
    acceptedDevelopments,
    thread: session.thread,
    sealed: session.sealed,
    holds: envelopesHold && related.every((r) => r.present) && session.sealed,
    tokens: 0,
    cost: 0,
    boundary: BOUNDARY,
  }
}

export interface QuantumSecureBankingReport {
  readonly holds: boolean
  readonly research: Research
  readonly chat: InterbankChatReport
  readonly related: readonly { readonly atom: string; readonly present: boolean }[]
  readonly develop: readonly string[]
  readonly tokens: 0
  readonly cost: 0
  readonly efficiency: number
  readonly boundary: Boundary
  readonly recipe?: { readonly lane: string; readonly answer: string }
}

const DEFAULT_BANKS: readonly InterbankParticipant[] = [
  { bic: 'BNBGBGSF', name: 'Bank A (BNB)', pqcFingerprint: 'fp-bnbg-ml-dsa-65' },
  { bic: 'COBADEFF', name: 'Bank B (Commerzbank)', pqcFingerprint: 'fp-coba-ml-dsa-65' },
  { bic: 'CHASUS33', name: 'Bank C (JPMorgan)', pqcFingerprint: 'fp-chas-ml-dsa-65' },
]

/**
 * Deep-research quantum-secure banking → banks chat → consensus develop → report.
 * tokens=0 · cost=0.
 */
export async function developQuantumSecureBanking(
  opts: {
    readonly banks?: readonly InterbankParticipant[]
    readonly asks?: readonly string[]
    readonly depth?: number
    readonly cwd?: string
  } = {},
): Promise<QuantumSecureBankingReport> {
  const asks = opts.asks ?? [
    'how should banks chat with each other',
    'what is quantum secure banking',
    'how to develop quantum secure banking',
    'how should pacs.008 ride a quantum-secure envelope',
    'what is the boundary of quantum secure banking',
  ]
  const research = await sealedResearch(asks, {
    corpus: QUANTUM_SECURE_BANKING_CORPUS,
    depth: opts.depth ?? 2,
  })
  const banks = opts.banks ?? DEFAULT_BANKS
  const votes = banks.map(() => true)
  const chat = banksChat(banks, {
    topic: 'develop-quantum-secure-banking',
    proposals: [
      {
        text: 'develop: QuantumSecureEnvelope on pacs.008/004 + pain.002 interbank exchanges',
        votes,
      },
      {
        text: 'develop: keep verifyPqc fail-closed until liboqs; never claim PLACEHOLDER forge-proof',
        votes,
      },
    ],
  })
  const related = quantumSecureBankingRelated(opts.cwd)
  const develop = [
    ...chat.acceptedDevelopments,
    ...related.filter((r) => !r.present).map((r) => `land missing atom: ${r.atom}`),
  ]
  const recipe =
    chatLocal('how to develop quantum secure banking', QUANTUM_SECURE_BANKING_BOOK) ??
    chatLocal('what is quantum secure banking', QUANTUM_SECURE_BANKING_BOOK)
  const am = amortizeReuse(research.findings.length, 0)
  void computeFtl({
    query: 'bank:quantum-secure',
    spaceSize: exactMax(1, QUANTUM_SECURE_BANKING_CORPUS.length),
    answers: research.findings.length,
    tokens: 0,
    patterns: [],
  })
  return {
    holds:
      research.worthwhile &&
      research.cost === 0 &&
      chat.holds &&
      related.every((r) => r.present) &&
      chat.acceptedDevelopments.length > 0,
    research,
    chat,
    related,
    develop,
    tokens: 0,
    cost: 0,
    efficiency: am.efficiency,
    boundary: BOUNDARY,
    recipe: recipe ? { lane: recipe.lane, answer: recipe.answer } : undefined,
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void developQuantumSecureBanking().then((r) => {
    console.log('bank/chat — banks chat · develop quantum-secure banking')
    console.log(
      `  holds=${r.holds} cost=${r.cost} tokens=${r.tokens} eff=${r.efficiency} findings=${r.research.findings.length}`,
    )
    console.log(
      `  chat: banks=${r.chat.banks.length} turns=${r.chat.turns.length} accepted=${r.chat.acceptedDevelopments.length} thread=${r.chat.thread.slice(0, 8)}…`,
    )
    console.log(`  develop → ${r.develop.join(' · ')}`)
  })
}
