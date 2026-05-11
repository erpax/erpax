/**
 * NACE Rev. 2 — EU statistical classification of economic activities.
 *
 * Hierarchical: Section (letter A-U) → Division (2-digit) → Group (3-digit)
 * → Class (4-digit). Companions: ISIC Rev.4 (UN), NAICS (US/CA/MX). Used
 * by `legal-entities`, `customers`, `vendors` for industry classification
 * and CSRD ESRS 2 §80(b) sector disclosure.
 *
 * @standard EU Regulation (EC) No 1893/2006 NACE Rev.2
 * @standard UN ISIC Rev.4 (companion)
 * @standard NAICS 2022 (US/CA/MX companion)
 * @compliance EU CSRD ESRS 2 §80(b) sector-classification
 */

/** NACE Rev.2 sections — letter codes A-U with descriptive titles. */
export const NACE_SECTIONS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
] as const
export type NaceSection = (typeof NACE_SECTIONS)[number]

export const NACE_SECTION_LABEL: Readonly<Record<NaceSection, string>> = {
  A: 'A — Agriculture, forestry and fishing',
  B: 'B — Mining and quarrying',
  C: 'C — Manufacturing',
  D: 'D — Electricity, gas, steam and air conditioning supply',
  E: 'E — Water supply; sewerage; waste management; remediation',
  F: 'F — Construction',
  G: 'G — Wholesale and retail trade; repair of motor vehicles',
  H: 'H — Transportation and storage',
  I: 'I — Accommodation and food service activities',
  J: 'J — Information and communication',
  K: 'K — Financial and insurance activities',
  L: 'L — Real estate activities',
  M: 'M — Professional, scientific and technical activities',
  N: 'N — Administrative and support service activities',
  O: 'O — Public administration and defence; compulsory social security',
  P: 'P — Education',
  Q: 'Q — Human health and social work activities',
  R: 'R — Arts, entertainment and recreation',
  S: 'S — Other service activities',
  T: 'T — Activities of households as employers',
  U: 'U — Activities of extraterritorial organisations and bodies',
}
export const NACE_SECTION_OPTIONS: ReadonlyArray<{ label: string; value: NaceSection }> =
  NACE_SECTIONS.map((value) => ({ label: NACE_SECTION_LABEL[value], value }))

/**
 * Validate the structural shape of a NACE Rev.2 code (e.g. "62.01" — class
 * level). Does not validate the code is a real NACE entry — full
 * dictionary is too large to ship in-repo.
 */
export const isValidNaceCodeStructure = (code: string): boolean =>
  /^\d{2}(\.\d{1,2})?$/.test(code.trim())

/** Extract the section letter from a 4-digit class code. */
const NACE_DIVISION_TO_SECTION: Readonly<Record<number, NaceSection>> = {
  1:'A', 2:'A', 3:'A',
  5:'B', 6:'B', 7:'B', 8:'B', 9:'B',
  10:'C', 11:'C', 12:'C', 13:'C', 14:'C', 15:'C', 16:'C', 17:'C', 18:'C', 19:'C',
  20:'C', 21:'C', 22:'C', 23:'C', 24:'C', 25:'C', 26:'C', 27:'C', 28:'C', 29:'C',
  30:'C', 31:'C', 32:'C', 33:'C',
  35:'D',
  36:'E', 37:'E', 38:'E', 39:'E',
  41:'F', 42:'F', 43:'F',
  45:'G', 46:'G', 47:'G',
  49:'H', 50:'H', 51:'H', 52:'H', 53:'H',
  55:'I', 56:'I',
  58:'J', 59:'J', 60:'J', 61:'J', 62:'J', 63:'J',
  64:'K', 65:'K', 66:'K',
  68:'L',
  69:'M', 70:'M', 71:'M', 72:'M', 73:'M', 74:'M', 75:'M',
  77:'N', 78:'N', 79:'N', 80:'N', 81:'N', 82:'N',
  84:'O',
  85:'P',
  86:'Q', 87:'Q', 88:'Q',
  90:'R', 91:'R', 92:'R', 93:'R',
  94:'S', 95:'S', 96:'S',
  97:'T', 98:'T',
  99:'U',
}

export const sectionForNaceCode = (code: string): NaceSection | null => {
  if (!isValidNaceCodeStructure(code)) return null
  const division = parseInt(code.split('.')[0], 10)
  return NACE_DIVISION_TO_SECTION[division] ?? null
}
