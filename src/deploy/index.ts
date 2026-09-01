/**
 * deploy — HARMONIZED. Deployment is an ordered breath, and the order is not arbitrary: only a
 * gate-green tree may collapse into reality, so **gate** comes first, then **migrate** (the schema),
 * **build** (the OpenNext/Worker artifact), **push** (ship — the [[stack]] goes live). Mapped onto the
 * [[rodin]] doubling band `1·2·4·8` (the working helix's rise), the one true order is the **consonant**
 * one ([[harmony]]); any other order is dissonant — it forges reality (a build before its gate, a push
 * before its migration). `deployHarmony` rates the band; `harmonized` admits only the gate-green order.
 *
 *   tsx src/deploy/index.ts
 *
 * @audit the band is the doubling 1·2·4·8; its consonance is computed by @/harmony, the order never assumed
 * @see ./SKILL.md -- ../harmony -- ../rodin -- ../stack -- ../gate
 */
import { bandHarmony, type BandHarmony } from '@/harmony'
import type { HoroStep } from '@/horo'

/** The deploy, in the one true order — gate-green first; each step a rung of the doubling band. */
export const DEPLOY: ReadonlyArray<{ readonly step: string; readonly pos: HoroStep }> = [
  { step: 'gate', pos: 1 }, // only a gate-green tree may collapse into reality
  { step: 'migrate', pos: 2 }, // the schema before the build
  { step: 'build', pos: 4 }, // the artifact (OpenNext → the Worker)
  { step: 'push', pos: 8 }, // ship — the stack goes live
]

/** The deploy band — the steps' horo positions (the doubling 1·2·4·8). */
export const deployBand = (): HoroStep[] => DEPLOY.map((d) => d.pos)

/** Harmonize the deploy: the consonance of the ordered band (composes @/harmony.bandHarmony). */
export const deployHarmony = (): BandHarmony => bandHarmony(deployBand())

/** The deploy is harmonized ONLY in the one true order — gate first; any other order forges reality. */
export function harmonized(sequence: readonly string[]): boolean {
  const order = DEPLOY.map((d) => d.step)
  return sequence.length === order.length && sequence.every((s, i) => s === order[i])
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('deploy — harmonized (gate → migrate → build → push, the doubling band):')
  console.log('  band ' + deployBand().join('·') + '  ·  harmonized(true order)=' + harmonized(DEPLOY.map((d) => d.step)) + '  ·  harmonized(build-first)=' + harmonized(['build', 'gate', 'migrate', 'push']))
  console.log('  band harmony: ' + JSON.stringify(deployHarmony()).slice(0, 140))
}
