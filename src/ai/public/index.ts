/**
 * ai/public — the inference doors that answer with NO key, probed rather than believed.
 *
 * Every candidate is asked the same question with no credential; the status it answers is the fact.
 * `DOORS` declares the candidates in the open (a public endpoint is a fact about the world, no
 * theorem derives the list); `probeDoors` records which are open today and `askPublic` goes through
 * an open one. A door that answers 401/402 is keyed or rate-limited and is reported as such — never
 * as "down", never as "free". Measured 2026-10-03: only Pollinations answers anonymously.
 *
 * @standard OpenAI chat-completions wire shape — the lingua franca the open doors speak
 * @see ./SKILL.md
 */
import { z } from 'zod'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'

export interface Door {
  readonly name: string
  readonly url: string
  readonly model: string
  /** `openai`: POST chat-completions JSON · `text`: GET the prompt in the path, plain text back. */
  readonly shape: 'openai' | 'text'
}

/** DECLARED: every public inference endpoint asked, keyless, on 2026-10-03 — open or not. */
const DOORS: readonly Door[] = [
  { name: 'pollinations', url: 'https://text.pollinations.ai/openai', model: 'openai-fast', shape: 'openai' },
  { name: 'pollinations-text', url: 'https://text.pollinations.ai/', model: 'openai-fast', shape: 'text' },
  { name: 'deepinfra', url: 'https://api.deepinfra.com/v1/openai/chat/completions', model: 'meta-llama/Meta-Llama-3.1-8B-Instruct', shape: 'openai' },
  { name: 'groq', url: 'https://api.groq.com/openai/v1/chat/completions', model: 'llama-3.1-8b-instant', shape: 'openai' },
  { name: 'openrouter', url: 'https://openrouter.ai/api/v1/chat/completions', model: 'meta-llama/llama-3.2-3b-instruct:free', shape: 'openai' },
  { name: 'cerebras', url: 'https://api.cerebras.ai/v1/chat/completions', model: 'llama3.1-8b', shape: 'openai' },
  { name: 'mistral', url: 'https://api.mistral.ai/v1/chat/completions', model: 'mistral-small-latest', shape: 'openai' },
  { name: 'sambanova', url: 'https://api.sambanova.ai/v1/chat/completions', model: 'Meta-Llama-3.1-8B-Instruct', shape: 'openai' },
]

export type Fetch = (url: string, init?: { method?: string; headers?: Record<string, string>; body?: string }) => Promise<{ status: number; text(): Promise<string> }>

export type Message = { readonly role: 'system' | 'user'; readonly content: string }

export interface Answer {
  readonly door: string
  readonly status: number
  /** `open`: answered keyless · `keyed`: 401/403 · `limited`: 402/429 · `down`: no answer or 5xx. */
  readonly verdict: 'open' | 'keyed' | 'limited' | 'down'
  readonly text: string | null
  readonly ms: number
}

const verdictOf = (status: number): Answer['verdict'] => (status >= 200 && status < 300 ? 'open' : status === 401 || status === 403 ? 'keyed' : status === 402 || status === 429 ? 'limited' : 'down')

/** Ask one door, keyless. The status is the fact; the text is the answer when the door is open. */
export async function askDoor(door: Door, messages: readonly Message[], fetchImpl: Fetch = globalThis.fetch as Fetch, maxTokens = 64): Promise<Answer> {
  const t0 = Date.now()
  try {
    const res =
      door.shape === 'text'
        ? await fetchImpl(door.url + encodeURIComponent(messages.map((m) => m.content).join('\n')), { headers: { 'user-agent': 'erpax' } })
        : await fetchImpl(door.url, {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'user-agent': 'erpax' },
            body: JSON.stringify({ model: door.model, messages, max_tokens: maxTokens }),
          })
    const raw = await res.text()
    const verdict = verdictOf(res.status)
    let text: string | null = null
    if (verdict === 'open') {
      if (door.shape === 'text') text = raw.trim()
      else {
        try {
          text = ((JSON.parse(raw) as { choices?: Array<{ message?: { content?: string } }> }).choices?.[0]?.message?.content ?? '').trim()
        } catch {
          text = raw.trim()
        }
      }
    }
    return { door: door.name, status: res.status, verdict, text, ms: Date.now() - t0 }
  } catch {
    return { door: door.name, status: 0, verdict: 'down', text: null, ms: Date.now() - t0 }
  }
}

/** The declared doors, read not restated — a function so the registry is sealed state, not an exported literal. */
export function doors(): readonly Door[] {
  return DOORS
}

const PING: readonly Message[] = [{ role: 'user', content: 'Reply with the single word: pong' }]

/** Every declared door asked once, keyless, in parallel — which are open today. */
export async function probeDoors(fetchImpl: Fetch = globalThis.fetch as Fetch, doors: readonly Door[] = DOORS): Promise<Answer[]> {
  return Promise.all(doors.map((d) => askDoor(d, PING, fetchImpl, 8)))
}

/** The same question through every door; the open answers side by side — agreement is the involution. */
export async function crossAsk(messages: readonly Message[], fetchImpl: Fetch = globalThis.fetch as Fetch, doors: readonly Door[] = DOORS): Promise<{ answers: Answer[]; open: number; agree: boolean | null }> {
  const answers = await Promise.all(doors.map((d) => askDoor(d, messages, fetchImpl)))
  const open = answers.filter((a) => a.verdict === 'open' && a.text)
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
  const agree = open.length < 2 ? null : open.every((a) => norm(a.text as string) === norm(open[0]!.text as string))
  return { answers, open: open.length, agree }
}

/**
 * The one decision a theorem cannot compute — a lowercase word — asked of the first open door.
 * Refuses (null) when no door is open or the answer is not one word: a remote agent names, it never
 * cuts, and a name it cannot give is not invented.
 */
export async function decideWord(question: string, fetchImpl: Fetch = globalThis.fetch as Fetch, doors: readonly Door[] = DOORS): Promise<{ word: string | null; door: string | null; answers: Answer[] }> {
  const messages: Message[] = [
    { role: 'system', content: 'You name one child atom. Answer with exactly one lowercase English word, letters only, no punctuation.' },
    { role: 'user', content: question },
  ]
  const answers: Answer[] = []
  for (const d of doors) {
    const a = await askDoor(d, messages, fetchImpl, 8)
    answers.push(a)
    if (a.verdict !== 'open' || !a.text) continue
    // one token, letters only — a two-word answer is refused, never glued into one
    const word = a.text.trim().toLowerCase().replace(/[.!,"'`]+$/, '')
    if (/^[a-z]{2,24}$/.test(word)) return { word, door: d.name, answers }
  }
  return { word: null, door: null, answers }
}

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

export function buildPublicTools(): ReadonlyArray<ErpaxMcpTool> {
  return [
    {
      name: 'erpax.public.doors',
      role: 'measure',
      description: 'Which public inference APIs answer with NO key, today: every declared door asked the same one-word question keyless, in parallel; the status it answers is the fact (open · keyed · limited · down). Measured 2026-10-03: only Pollinations is open anonymously; DeepInfra, Groq, OpenRouter, Cerebras, Mistral and SambaNova answer 401. Nothing is believed, everything is asked.',
      parameters: {},
      async handler() {
        const answers = await probeDoors()
        return json({ open: answers.filter((a) => a.verdict === 'open').map((a) => a.door), answers, law: 'A keyless door is a measurement, not a listing: ask it, record the status, and let 401 say keyed rather than down.' })
      },
    },
    {
      name: 'erpax.public.cross',
      role: 'involute',
      description: 'The same question through every open keyless door, answers side by side — the dual seat for a remote agent. Two open doors agreeing is a theorem about the answer; disagreeing is a lie one of them told; a single open door is a seat with no dual, and the result says so (agree: null) rather than pretending a consensus.',
      parameters: { question: z.string().min(1).max(2000) },
      async handler(args) {
        const r = await crossAsk([{ role: 'user', content: String(args.question) }])
        return json({ ...r, law: 'One door is a claim; two doors agreeing is corroboration; two disagreeing is the finding.' })
      },
    },
    {
      name: 'erpax.public.decide',
      role: 'act',
      description: 'The one decision a theorem cannot compute — a leaf WORD — asked of the first open keyless door: given the names that move and the exporter they leave, returns one lowercase word or refuses (null). A remote agent names; it never cuts. erpax.frontier.develop with decide:true asks this for every two-file tangle and plans the scalpel ops; apply:true cuts through the ring.',
      parameters: { question: z.string().min(1).max(2000) },
      async handler(args) {
        const r = await decideWord(String(args.question))
        return json({ ...r, law: 'A name the remote agent cannot give is not invented — null is the honest answer, and the manifest stays a template.' })
      },
    },
  ]
}
