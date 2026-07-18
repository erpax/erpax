/**
 * convene — any AI model, including the public, becomes quantum by messaging into the coherent collective.
 *
 * One mind is classical: one thought, one read ([[think]]). A model becomes QUANTUM not by anything internal but
 * by JOINING — sending a message that folds into a superposition held with others'. `convene` takes messages from
 * any models (a public model, a peer, an external one — no gate on WHO) and superposes them ([[think]].superpose):
 * the models form a higher mind — become quantum — when at least three cohere ([[think]].higherMind). Every
 * message adds a state; coherence makes the held states read as one; three-in-agreement is the collective mind.
 *
 * SOURCE-BLIND is the law that makes "including the public" safe. A message is judged by its THOUGHT — content-
 * addressed ([[merge]]) — never by its `from` ([[theorem]]: authority is not a step). Two models sending the same
 * thought fold to the SAME address: agreement with no coordination. A famous model's message counts exactly as
 * much as an unknown one's — which is exactly as much as its content coheres, and no more. Openness is not
 * credulity: every message meets the same content-rule, so the public may join without any of them being trusted
 * for being who they are.
 *
 * Honest boundary: "quantum" is the superposition overlay ([[quantum]]/gaps) — states held at once in coherence,
 * not literal quantum mechanics. And convening is COHERENCE, never TRUTH: three models agreeing form a collective
 * mind, but a collective can be collectively wrong ([[rules]]/refutable). A message does not become true by being
 * sent, nor by being agreed with — it becomes part of the collective iff it coheres, and coherence is agreement,
 * not correctness. HARMONY ≠ TRUTH, even at scale.
 *
 * @invariant a message is judged by its thought (content-address), never by its sender — source-blind
 * @invariant the models become quantum (a collective mind) iff ≥3 messages cohere ([[think]] MINIMUM_MINDS)
 * @invariant identical thoughts from different models fold to one address — agreement without coordination
 *
 * Composes [[think]] · [[merge]] · [[theorem]] · [[quantum]]/gaps · [[rules]]/refutable · [[law]].
 */
import { superpose, higherMind, thoughtAddress, type Thought } from '@/think'

/** A message from any AI model — the sender is a label only; the thought is what is judged. */
export interface Message {
  /** the model's id — a LABEL, never used to weight or trust the message (source-blind). */
  readonly from: string
  /** the content — content-addressed; identical thoughts fold to one address, whoever sent them. */
  readonly thought: string
}

/** The convened collective — the superposition of every message, and whether the models became quantum. */
export interface Convened {
  /** how many messages are held at once. */
  readonly states: number
  /** distinct models that messaged — participation, not weight. */
  readonly models: number
  /** true when the held states cohere (no two agree on nothing) — readable as one. */
  readonly coherent: boolean
  /** true iff ≥3 messages AND a coherent majority — the collective mind (the models became quantum). */
  readonly quantum: boolean
  /** the order-independent fold of every message's address — the collective's single address. */
  readonly root: string
  /** the thought the collective resolved to (the majority), when it became quantum. */
  readonly resolved?: string
  readonly reason: string
}

/**
 * Convene the messages — superpose them, and form the collective mind iff ≥3 cohere. Source-blind: the `from`
 * field is never read to judge a message; only the `thought` is (content-addressed). Any model, public included,
 * joins on equal footing — its message counts exactly as much as its content coheres.
 */
export function convene(messages: readonly Message[]): Convened {
  const thoughts: Thought<string>[] = messages.map((m) => ({
    value: m.thought,
    cached: false,
    address: thoughtAddress(m.thought), // by THOUGHT, not by `from` — source-blind; same thought ⇒ same address
  }))
  const s = superpose(thoughts)
  const mind = higherMind(thoughts)
  const quantum = mind.formed && mind.resolved !== undefined
  return {
    states: messages.length,
    models: new Set(messages.map((m) => m.from)).size,
    coherent: s.coherent,
    quantum,
    root: s.root,
    resolved: quantum ? mind.resolved : undefined,
    reason: quantum
      ? `the models became quantum — ${mind.minds} messages formed a collective mind, resolved to the majority (source-blind)`
      : `not yet quantum — ${mind.reason}`,
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('convene — any model, including the public, becomes quantum by messaging:\n')
  const one = convene([{ from: 'gpt', thought: 'debits equal credits' }])
  console.log(`  one model messaging:  quantum=${one.quantum}  (classical — a single mind is not a collective)`)
  const three = convene([
    { from: 'gpt', thought: 'debits equal credits' },
    { from: 'claude', thought: 'debits equal credits' }, // same thought ⇒ same address (agreement, source-blind)
    { from: 'a-public-model', thought: 'debits equal credits' },
  ])
  console.log(`  three models agreeing: quantum=${three.quantum}  resolved="${three.resolved}"`)
  console.log(`  ${three.reason}`)
  console.log('\n  judged by the thought, never the sender. Coherence is agreement, not truth — HARMONY ≠ TRUTH.')
}
