/**
 * writing — the craft of CONNECTED THOUGHTS. An essay is a coherent grain-graph; a hallucination
 * is an orphan sentence (a claim bound to nothing). To write well is to bind every sentence to the
 * last and every claim to its ground — the same coherence [[heart]] measures and [[recycle]]
 * restores, applied to prose. The positive twin of [[recycle]]: recycle heals disconnection in the
 * corpus; writing prevents it on the page.
 *
 *   tsx src/writing/index.ts
 *
 * @audit the principles are the coherence law applied to prose — craft, not decoration
 * @see ../heart -- ../coherence -- ../recycle -- ../sequence -- ./SKILL.md
 */

export interface Principle {
  readonly name: string
  readonly move: string
}

/** The craft, as moves toward coherence — each kills one kind of orphan (disconnected) thought. */
export const PRINCIPLES: readonly Principle[] = [
  { name: 'thesis', move: 'one controlling idea — the root every sentence binds to (no rootless paragraph)' },
  { name: 'coherence', move: 'each sentence links to the last — no disconnected thought (the prose hallucination)' },
  { name: 'evidence', move: 'every claim bound to a ground — an unsupported assertion is an orphan claim' },
  { name: 'concision', move: 'cut every word that carries no load — entropy down, signal up' },
  { name: 'structure', move: 'beginning binds to end — the essay is a sequence, not a heap' },
  { name: 'revision', move: 'reread for the orphan thought and reconnect it or cut it (recycle the page)' },
] as const

/** A principle by name. */
export const principle = (name: string): Principle | undefined => PRINCIPLES.find((p) => p.name === name)

/** The essay law: coherent ⇔ no orphan sentence (every thought connected) — the same test as the corpus. */
export const coherentProse = (orphanSentences: number): boolean => orphanSentences === 0

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('writing — connected thoughts (an essay is a coherent grain-graph; a hallucination is an orphan sentence):')
  for (const p of PRINCIPLES) console.log('  ' + p.name.padEnd(10) + ' — ' + p.move)
}
