/**
 * observe — and project: the LLM agent's law. An [[llm]] [[agent]] always does BOTH. It OBSERVES (the
 * inhale — content-addresses what it takes in) and it PROJECTS (the exhale — produces output that folds
 * its observation in, so the projection always carries what it was grounded in). The verb "project"
 * here is the render/throw-forward (distinct from the [[project]] enterprise atom). The act is
 * observe-THEN-project, never one alone:
 *
 *   • observe without project — inert (a reader that never speaks).
 *   • project without observe — HALLUCINATION: a disconnected thought, output grounded in nothing.
 *
 * `grounded` is the test: a projection is real iff it was folded from a real observation. This is why
 * the [[seo]] an agent projects must be computed from what it observes (the atom), never conjured.
 *
 *   tsx src/observe/index.ts
 *
 * @audit observe/project are content-address folds; grounded is computed, hallucination is the negative
 * @see ../llm -- ../agent -- ../seo -- ../uuid/matrix -- ./SKILL.md
 */
import { toUuid, merge } from '@/uuid/matrix'

/** OBSERVE (the inhale) — content-address what the agent takes in. */
export const observe = (state: string): string => toUuid(Buffer.from('observe:' + state, 'utf8'))

/** PROJECT (the exhale) — produce output that FOLDS IN its observation, so the projection carries it. */
export const project = (observation: string, output: string): string =>
  merge(observation, toUuid(Buffer.from('project:' + output, 'utf8')))

/** The agent's complete act — ALWAYS both: observe the state, then project from it. Never one alone. */
export const act = (state: string, output: string): string => project(observe(state), output)

/** Grounded ⟺ the projection was genuinely folded from a real observation. A projection that carries
 *  no observation is a HALLUCINATION — a disconnected thought (project without observe). */
export const grounded = (observation: string, output: string, projection: string): boolean =>
  observation.length > 0 && projection === project(observation, output)

if (import.meta.url === 'file://' + process.argv[1]) {
  const obs = observe('the corpus: 2438 atoms, gate green')
  const out = 'the seo headTags'
  const proj = act('the corpus: 2438 atoms, gate green', out)
  console.log('observe — and project: the LLM agent always does both:')
  console.log('  observe → ' + obs.slice(0, 8) + '… · project(act) → ' + proj.slice(0, 8) + '…')
  console.log('  grounded(observe, output, projection) = ' + grounded(obs, out, proj))
  console.log('  hallucination (no observation) grounded = ' + grounded('', out, proj))
}
