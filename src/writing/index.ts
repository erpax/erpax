/**
 * writing — the craft of CONNECTED THOUGHTS, **computed** from sealed coordinates.
 *
 * Writing is never a prose template — `computedWritingForPath(atomPath)` derives debit/credit
 * structure · law lines · wikilink density · eb/word from readme/paper.ts and proseEntropy.
 * `improveWritingSkill` scores variance · trinity · word-matter; `writingToSpeech` (via @/speech)
 * collapses text → phoneme chain.
 *
 *   tsx src/writing/index.ts
 *
 * @audit the principles are the coherence law applied to prose — craft, not decoration
 * @see ../heart -- ../coherence -- ../recycle -- ../sequence -- ./computed -- ./SKILL.md
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

export {
  computedWritingForPath,
  writingScore,
  type ComputedWriting,
  type ComputedWritingOpts,
} from './computed'

export {
  improveWritingSkill,
  improveSpeechSkill,
  type WritingSkillModel,
  type SpeechSkillModel,
  type SkillExerciseResult,
} from './skills'

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('writing — connected thoughts (an essay is a coherent grain-graph; a hallucination is an orphan sentence):')
  for (const p of PRINCIPLES) console.log('  ' + p.name.padEnd(10) + ' — ' + p.move)
}
