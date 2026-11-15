/**
 * prompt — a prompt is a program: each word a step, the prompt its words run in order.
 *
 * Words with encoded meaning make a prompt executable. A lexicon gives each known word a step over the
 * program's memory, which `run` also exposes as `req.context.prompt`: Payload hands `req.context` to
 * every hook the same request reaches (payloadcms.com/docs/hooks/context), so a collection hook fired by
 * a word's write reads the program it ran under. A step that returns `false` halts the program.
 *
 * An unknown word is researched, not refused. Payload's `search` collection is asked for it, and the
 * answer becomes an `emerging_gap` memory keyed `word:<word>` (a later research of the same word
 * supersedes it), linked to every document found and broadcast to the tenant's `chat` room. Then the
 * program goes on. The research is itself a prompt, `search think emote aware`, of known words only.
 *
 * Prompt.lean proves the semantics: a known word acts, a halting word stops, an unknown word acts as the
 * identity on the state; words that never halt compose (run (xs ++ ys) = run ys ∘ run xs); an unknown
 * word inserted anywhere changes nothing; and the gap program `feel think emote aware` halts at `feel`
 * on a successful call and records and broadcasts a failed one.
 */
import { randomUuid } from '@/utilities/crypto'
import type { PayloadRequest, RequiredDataFromCollectionSlug } from 'payload'

import { getUserTenantIDs } from '@/utilities/get/user/tenant/i/ds'

/** A word's meaning: a step over the program's memory. Returning `false` halts the program. */
export type Word<M> = (req: PayloadRequest, memory: M) => boolean | void | Promise<boolean | void>

/** The meaning of each known word. */
export type Lexicon<M> = Readonly<Record<string, Word<M>>>

/** How an unknown word is handled: researched, never refused. */
export type Researcher = (word: string, req: PayloadRequest, prompt: string) => Promise<void>

/** A prompt's words, lower-cased, in order: letters and digits, joined by an inner `-` or `'`. */
export const wordsOf = (prompt: string): string[] =>
  prompt.toLowerCase().match(/[\p{L}\p{N}]+(?:['-][\p{L}\p{N}]+)*/gu) ?? []

/**
 * Run a prompt. Each known word steps the memory; a step returning `false` ends the program; an unknown
 * word is handed to `research` and the program goes on. The memory is `req.context.prompt` while the
 * program runs, and the caller's program memory is restored after it.
 */
export const run = async <M extends object>(
  prompt: string,
  lexicon: Lexicon<M>,
  req: PayloadRequest,
  memory: M,
  research: Researcher = researchWord,
): Promise<M> => {
  const outer = req.context.prompt
  req.context.prompt = memory
  try {
    for (const word of wordsOf(prompt)) {
      const step = Object.hasOwn(lexicon, word) ? lexicon[word] : undefined
      if (!step) {
        await research(word, req, prompt)
        continue
      }
      if ((await step(req, memory)) === false) break
    }
    return memory
  } finally {
    req.context.prompt = outer
  }
}

/** A `memories` document as a word writes it (its `uuid` is computed by the collection on write). */
export type MemoryData = Omit<RequiredDataFromCollectionSlug<'memories'>, 'uuid'>

/** The `emerging_gap` memory a program records, owned by the caller and scoped to its tenant. */
export const gapOf = (
  req: PayloadRequest,
  gap: Pick<MemoryData, 'key' | 'title' | 'payload' | 'rationale'> & Partial<Pick<MemoryData, 'relatedTo'>>,
): MemoryData => {
  const tenant = req.user ? getUserTenantIDs(req.user)[0] : undefined
  const recordedAt = new Date().toISOString()
  return {
    memoryRef: `MEM-${recordedAt.slice(0, 10)}-${randomUuid().slice(0, 8)}`,
    recordedAt,
    ownerType: 'agent',
    ownerId: String(req.user?.id ?? 'anonymous'),
    kind: 'emerging_gap',
    ...gap,
    ...(tenant ? { tenant } : {}),
  }
}

/**
 * Awareness (Observer.lean, the global-workspace model): a recorded memory enters the tenant's
 * workspace, its `chat` room, so every agent in the tenant holds it.
 */
export const broadcastOf = (memoryId: string | number, gap: MemoryData): RequiredDataFromCollectionSlug<'chat'> => ({
  event: 'gap:recorded',
  eventUuid: randomUuid(),
  aggregateId: String(memoryId),
  agent: gap.ownerId,
  payload: gap.payload,
  emittedAt: gap.recordedAt,
  ...(gap.tenant ? { tenant: gap.tenant } : {}),
})

/** The memory of a program that records: the gap its `think` composed, and the document `emote` wrote. */
export interface Recording {
  gap?: MemoryData
  memory?: { id: string | number }
}

/** `emote`: the thought, pushed out — the composed gap is written as a `memories` document. */
export const emote: Word<Recording> = async (req, m) => {
  if (!m.gap) return false
  m.memory = await req.payload.create({ collection: 'memories', data: m.gap as RequiredDataFromCollectionSlug<'memories'>, overrideAccess: true, req })
}

/** `aware`: the written memory is broadcast to the tenant's chat room. */
export const aware: Word<Recording> = async (req, m) => {
  if (!m.gap || !m.memory) return false
  await req.payload.create({ collection: 'chat', data: broadcastOf(m.memory.id, m.gap), overrideAccess: true, req })
}

/** What research found for a word: the search rows that name it. */
export interface Research extends Recording {
  word: string
  prompt: string
  found?: ReadonlyArray<{ title: string; collection: string; id: string }>
}

/** The research program and its words: ask Payload's search, compose the gap, record it, broadcast it. */
export const RESEARCH = 'search think emote aware'

export const researchLexicon: Lexicon<Research> = {
  search: async (req, m) => {
    const result = await req.payload.find({ collection: 'search', where: { title: { like: m.word } }, limit: 5, depth: 0, req })
    m.found = result.docs.map((d) => ({ title: String(d.title ?? ''), collection: d.doc.relationTo, id: d.doc.value }))
  },
  think: (req, m) => {
    const found = m.found ?? []
    m.gap = gapOf(req, {
      key: `word:${m.word}`,
      title: `The word "${m.word}" has no meaning yet`,
      payload: { word: m.word, prompt: m.prompt, found },
      rationale: found.length
        ? `Researched by the prompt interpreter: ${found.length} document(s) name it; one may hold the meaning a word step should take.`
        : 'Researched by the prompt interpreter: no document names it yet.',
      relatedTo: found.map((f) => ({ collection: f.collection, docId: f.id, edgeKind: 'refers' as const })),
    })
  },
  emote,
  aware,
}

/** The default researcher: the research program, run under the same request. A failure is logged, never thrown. */
export const researchWord: Researcher = async (word, req, prompt) => {
  try {
    await run<Research>(RESEARCH, researchLexicon, req, { word, prompt })
  } catch (error) {
    req.payload.logger.warn({ err: error, msg: `[prompt] could not research the word "${word}"` })
  }
}
