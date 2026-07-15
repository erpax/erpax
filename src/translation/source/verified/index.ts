/**
 * translation/source/verified — the sense-verified SEED, and its renderings COMPUTED (Wikidata CC0).
 *
 * Only the irreducible judgment is stored: VERIFIED_PROVENANCE, the concept → Qid map for 58 single-word
 * concept atoms (anatomy · nature · matter · plants · animals · food · metals), each admitted ONLY because
 * a candidate concept's English description sense-matched the atom's own meaning (../index#harvestVerified
 * · senseScore ≥ 0.14). The per-locale labels are NOT stored — they are a computed projection of each Qid
 * (verifiedRenderings), sealed content-addressed in the gitignored cache. Theorems replace hardcoded
 * values: the seed is data, the renderings are a read.
 *
 * The gate REJECTED the wrong senses the top-1 search would have poisoned us with (2026-07-15 live):
 * `law→family name`, `balance→Van Halen album`, `gold→family name`, `apple→Apple Inc`. It also left
 * honest seed-GAPS where even a deeper search found no sense-clearing candidate (brain, chest) or the correct
 * Qid scored below threshold (eye Q7364 0.091 · sugar Q11002 0.100) — a gap is better than a wrong sense.
 *
 * This is the training set the coverage metric moves on: ../..#trainingCoverage over these renderings reads
 * ~29/30 (vs the corpus catalogue's 1/30 en-only source). Seeded into the `translations` collection by
 * ../../../translations/seed. A snapshot, like a sealed CC0 dump — re-harvest to refresh; Qids are stable.
 *
 * @standard Wikidata (CC0) · Wikimedia MediaWiki API · BCP-47 locale tags · RFC 9562 §5.8 content-uuid
 * @see ../index (harvestVerified · the sense gate) · ../../index (the translation model) · ./SKILL.md
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { defineTranslation, type TranslationTable } from '@/translation'
import { fetchEntityLabels, toValues, type Fetcher } from '../index'
import { supportedLocales, defaultLocale, type SupportedLocale } from '@/i18n/localization'
import { foldToRoot } from '@/merge'

/** Provenance for every registered concept — the CC0 Wikidata Qid + gloss + sense-match score it cleared. */
export interface Provenance {
  readonly concept: string
  readonly qid: string
  readonly score: number
  readonly description: string
}

/** The sense-match audit trail — every rendering below is admitted by exactly one of these Qids. */
export const VERIFIED_PROVENANCE: readonly Provenance[] = [
  { concept: "heart", qid: "Q1072", score: 0.222, description: "inner organ for the circulation of blood" },
  { concept: "lung", qid: "Q7886", score: 0.4, description: "essential respiration organ in many air-breathing animals" },
  { concept: "blood", qid: "Q7873", score: 0.222, description: "organic fluid which transports nutrients throughout the organism" },
  { concept: "skin", qid: "Q1074", score: 0.429, description: "soft outer covering organ of vertebrates" },
  { concept: "bone", qid: "Q265868", score: 0.5, description: "rigid organ that constitutes part of the endoskeleton of vertebrates" },
  { concept: "muscle", qid: "Q7365", score: 0.286, description: "contractile soft tissue of animals" },
  { concept: "nerve", qid: "Q9620", score: 0.273, description: "enclosed, cable-like bundle of axons in the peripheral nervous system" },
  { concept: "artery", qid: "Q9655", score: 0.455, description: "blood vessel that carries oxygenated blood away from the heart to other organs rather than lungs" },
  { concept: "vein", qid: "Q9609", score: 0.4, description: "blood vessel that carry deoxygenated blood towards the heart, with the exception of the pulmonary vein" },
  { concept: "foot", qid: "Q15807", score: 0.2, description: "weight-bearing anatomical structure found in vertebrates" },
  { concept: "hand", qid: "Q33767", score: 0.286, description: "extremity at the end of an arm or forelimb" },
  { concept: "ear", qid: "Q7362", score: 0.5, description: "organ that detects sound; organ of hearing and balance" },
  { concept: "nose", qid: "Q7363", score: 0.286, description: "organ that smells and facilitates breathing" },
  { concept: "hair", qid: "Q28472", score: 0.5, description: "protein filament that grows from follicles found in the dermis, or skin" },
  { concept: "neck", qid: "Q9633", score: 0.333, description: "part of the body, on many terrestrial or secondarily aquatic vertebrates, that distinguishes the head from the torso or trunk" },
  { concept: "abdomen", qid: "Q9597", score: 0.294, description: "in humans, region of the body between the thorax at the top and the pelvis at the bottom; in insects, segment at the caudal end of the body, following on from the head and thorax" },
  { concept: "water", qid: "Q283", score: 0.364, description: "chemical compound whose molecules are formed by two hydrogen atoms and one oxygen atom" },
  { concept: "star", qid: "Q523", score: 0.636, description: "astronomical object consisting of a luminous spheroid of plasma held together by its own gravity" },
  { concept: "sea", qid: "Q165", score: 0.6, description: "large body of saline water" },
  { concept: "river", qid: "Q4022", score: 0.333, description: "larger natural watercourse" },
  { concept: "lake", qid: "Q23397", score: 0.25, description: "body of relatively still water, localized in a basin" },
  { concept: "ocean", qid: "Q9430", score: 0.3, description: "very large body of saline water" },
  { concept: "fire", qid: "Q3196", score: 0.2, description: "rapid oxidation of a material; phenomenon that emits light and heat" },
  { concept: "ice", qid: "Q23392", score: 0.8, description: "water frozen into the solid state" },
  { concept: "mountain", qid: "Q8502", score: 0.833, description: "large natural elevation of the Earth's surface" },
  { concept: "gas", qid: "Q11432", score: 0.154, description: "fundamental state of matter in which constituent particles are widely separated with weak intermolecular bonds" },
  { concept: "animal", qid: "Q729", score: 0.5, description: "kingdom of multicellular eukaryotic organisms" },
  { concept: "tree", qid: "Q10884", score: 0.6, description: "perennial woody plant" },
  { concept: "leaf", qid: "Q33971", score: 0.176, description: "main organ of photosynthesis and transpiration in higher plants" },
  { concept: "seed", qid: "Q40763", score: 0.75, description: "embryonic plant enclosed in a protective outer covering (seed coat)" },
  { concept: "flower", qid: "Q506", score: 0.667, description: "sexual reproductive structure found on flowering plants" },
  { concept: "moon", qid: "Q405", score: 0.75, description: "Earth's only natural satellite" },
  { concept: "cloud", qid: "Q8074", score: 0.444, description: "visible mass of liquid droplets or frozen crystals suspended in the atmosphere" },
  { concept: "rain", qid: "Q7925", score: 0.273, description: "liquid water precipitated from atmospheric water vapor" },
  { concept: "snow", qid: "Q7561", score: 0.6, description: "precipitation in the form of ice crystal flakes" },
  { concept: "wind", qid: "Q8094", score: 0.143, description: "flow of gases or air on a large scale" },
  { concept: "sand", qid: "Q34679", score: 0.333, description: "granular material composed of finely divided rock and mineral particles" },
  { concept: "wood", qid: "Q287", score: 0.5, description: "fibrous material from trees or other plants" },
  { concept: "iron", qid: "Q677", score: 0.667, description: "chemical element with symbol Fe and atomic number 26" },
  { concept: "copper", qid: "Q753", score: 0.667, description: "chemical element with symbol Cu and atomic number 29" },
  { concept: "silver", qid: "Q1090", score: 0.667, description: "chemical element with symbol Ag and atomic number 47" },
  { concept: "gold", qid: "Q897", score: 0.333, description: "chemical element with symbol Au and atomic number 79 (precious metal)" },
  { concept: "salt", qid: "Q11254", score: 0.375, description: "mineral used as food ingredient, composed primarily of sodium chloride" },
  { concept: "milk", qid: "Q8495", score: 1.0, description: "white liquid produced by the mammary glands of mammals" },
  { concept: "honey", qid: "Q10987", score: 0.5, description: "sweet food made by bees mostly using nectar from flowers" },
  { concept: "bread", qid: "Q7802", score: 0.444, description: "baked food made of flour, water and other ingredients" },
  { concept: "wine", qid: "Q282", score: 0.333, description: "alcoholic drink typically made from grapes through the fermentation process" },
  { concept: "wheat", qid: "Q15645384", score: 0.6, description: "widely cultivated cereal grain" },
  { concept: "egg", qid: "Q17147", score: 0.375, description: "organic vessel in which an embryo first begins to develop" },
  { concept: "fish", qid: "Q152", score: 0.375, description: "vertebrate animal that lives in water and (typically) has gills" },
  { concept: "bird", qid: "Q5113", score: 0.182, description: "class of vertebrates characterized by wings, a feather-covered body and a beak" },
  { concept: "cat", qid: "Q146", score: 0.4, description: "small domesticated carnivorous mammal" },
  { concept: "horse", qid: "Q726", score: 0.286, description: "domesticated four-footed mammal from the equine family" },
  { concept: "cow", qid: "Q11748378", score: 0.182, description: "adult female cattle of the species Bos taurus, domestic ruminant mammal" },
  { concept: "tooth", qid: "Q553", score: 0.333, description: "hard, calcified structure found in the jaws of many vertebrates" },
  { concept: "tongue", qid: "Q9614", score: 0.286, description: "mobile organ located inside the mouth" },
  { concept: "stomach", qid: "Q1029907", score: 0.667, description: "digestive organ" },
  { concept: "stone", qid: "Q22731", score: 0.333, description: "rock; building material" },
]


// ── the computed face: theorems replace hardcoded values ──

/** The harvestable locales — everything but the default; `en` is never harvested, the atom word IS the source. */
const SEED_LOCALES: readonly SupportedLocale[] = supportedLocales.filter((l) => l !== defaultLocale)

const labelsCachePath = (cwd: string): string => join(cwd, 'node_modules', '.cache', 'erpax', 'translations.json')

interface LabelsCache {
  readonly key: string
  readonly at: string
  readonly values: Record<string, Record<string, string>>
}

/** The seed's content-address — the fold of the verified Qids. The seal is valid only for this exact seed. */
export function provenanceKey(): string {
  return foldToRoot(VERIFIED_PROVENANCE.map((p) => p.qid))
}

export interface VerifiedRenderings {
  readonly table: TranslationTable
  /** true = read from the content-addressed seal (no network); false = freshly harvested + sealed. */
  readonly cached: boolean
  readonly key: string
}

/**
 * The renderings, COMPUTED from the seed — theorems replace hardcoded values. Only the sense-verified
 * concept→Qid map is stored (the irreducible judgment); the per-locale labels are a PROJECTION of each
 * Qid, harvested once and sealed content-addressed by the seed's fold (gitignored cache). Unchanged seed
 * ⇒ a READ; changed seed ⇒ re-harvest. `en` is never harvested — the atom word stays the source. An
 * unreachable source with no seal THROWS — a rendering is never fabricated. Label drift inside a verified
 * Qid is Wikidata improving, not poisoning: the sense lives in the Qid, which is what the seed holds.
 */
export async function verifiedRenderings(
  opts: { fetcher?: Fetcher; cwd?: string } = {},
): Promise<VerifiedRenderings> {
  const cwd = opts.cwd ?? process.cwd()
  const key = provenanceKey()
  const path = labelsCachePath(cwd)
  try {
    const prev = JSON.parse(readFileSync(path, 'utf8')) as LabelsCache
    if (prev.key === key) {
      const table = VERIFIED_PROVENANCE.map((p) => defineTranslation(p.concept, p.concept, prev.values[p.concept] ?? {}))
      return { table, cached: true, key } // answered within — the seal holds it
    }
  } catch {
    /* no seal — harvest */
  }
  const values: Record<string, Record<string, string>> = {}
  for (const p of VERIFIED_PROVENANCE) {
    const labels = await fetchEntityLabels(p.qid, opts.fetcher)
    values[p.concept] = toValues({ labels }, SEED_LOCALES)
  }
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify({ key, at: new Date().toISOString(), values } satisfies LabelsCache, null, 2) + '\n')
  return {
    table: VERIFIED_PROVENANCE.map((p) => defineTranslation(p.concept, p.concept, values[p.concept]!)),
    cached: false,
    key,
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  verifiedRenderings().then((r) => {
    const filled = r.table.reduce((s, t) => s + Object.keys(t.values).length - 1, 0)
    console.log(
      `verified — ${r.table.length} concepts computed from the Qid seed · ${filled} non-en renderings · ${r.cached ? 'READ from the seal' : 'harvested + sealed'} (key ${r.key.slice(0, 8)}…)`,
    )
  })
}
