/**
 * WCO Harmonised System — chapter index + structure validator.
 *
 * The HS Code is a globally standardised classification of goods (6-digit
 * harmonised + further national digits — typically 8 (CN code, EU) or 10
 * (HTS, US)). 21 sections subdivided into 99 chapters, then headings (4
 * digits) and subheadings (6 digits).
 *
 * @standard WCO Harmonised System Convention (effective 1988, latest revision 2022)
 * @standard EU CN Code (Combined Nomenclature) Regulation (EEC) 2658/87
 * @standard US HTS (Harmonized Tariff Schedule)
 * @see https://www.wcoomd.org/en/topics/nomenclature/instrument-and-tools/hs-nomenclature-2022-edition.aspx
 */

/** HS chapter ranges grouped by Section (I-XXI). */
export const HS_SECTIONS: ReadonlyArray<{
  readonly section: string
  readonly title: string
  readonly chapters: readonly [number, number]
}> = [
  { section: 'I',     title: 'Live animals; animal products',                                                chapters: [1, 5] },
  { section: 'II',    title: 'Vegetable products',                                                           chapters: [6, 14] },
  { section: 'III',   title: 'Animal, vegetable, microbial fats and oils',                                   chapters: [15, 15] },
  { section: 'IV',    title: 'Prepared foodstuffs; beverages, spirits, vinegar; tobacco',                    chapters: [16, 24] },
  { section: 'V',     title: 'Mineral products',                                                             chapters: [25, 27] },
  { section: 'VI',    title: 'Products of the chemical or allied industries',                                chapters: [28, 38] },
  { section: 'VII',   title: 'Plastics, rubber, and articles thereof',                                       chapters: [39, 40] },
  { section: 'VIII',  title: 'Raw hides, skins, leather, furskins',                                          chapters: [41, 43] },
  { section: 'IX',    title: 'Wood, cork, basketware',                                                       chapters: [44, 46] },
  { section: 'X',     title: 'Pulp, paper, paperboard',                                                      chapters: [47, 49] },
  { section: 'XI',    title: 'Textiles and textile articles',                                                chapters: [50, 63] },
  { section: 'XII',   title: 'Footwear, headgear, umbrellas, prepared feathers',                             chapters: [64, 67] },
  { section: 'XIII',  title: 'Stone, ceramic, glass',                                                        chapters: [68, 70] },
  { section: 'XIV',   title: 'Pearls, precious stones, precious metals, jewellery',                          chapters: [71, 71] },
  { section: 'XV',    title: 'Base metals and articles of base metal',                                       chapters: [72, 83] },
  { section: 'XVI',   title: 'Machinery, mechanical appliances, electrical equipment',                       chapters: [84, 85] },
  { section: 'XVII',  title: 'Vehicles, aircraft, vessels, transport equipment',                             chapters: [86, 89] },
  { section: 'XVIII', title: 'Optical, photographic, measuring, medical instruments; clocks',                chapters: [90, 92] },
  { section: 'XIX',   title: 'Arms and ammunition',                                                          chapters: [93, 93] },
  { section: 'XX',    title: 'Miscellaneous manufactured articles',                                          chapters: [94, 96] },
  { section: 'XXI',   title: 'Works of art, collectors\' pieces, antiques',                                  chapters: [97, 99] },
]

/**
 * Validate the structural shape of an HS code (6-digit base, optional
 * national extension up to 10 digits). Does NOT validate that the code
 * exists in the current HS edition — that requires the per-edition
 * dataset which is too large to ship in-repo.
 */
export const isValidHsCodeStructure = (code: string): boolean => {
  const trimmed = code.replace(/\s|\./g, '')
  return /^\d{6,10}$/.test(trimmed)
}

/** Extract the chapter (first 2 digits) — returns null when invalid. */
export const hsChapter = (code: string): number | null => {
  if (!isValidHsCodeStructure(code)) return null
  return parseInt(code.replace(/\s|\./g, '').slice(0, 2), 10)
}

/** Find the section whose chapter range contains a chapter number. */
export const sectionForChapter = (chapter: number): string | null => {
  const section = HS_SECTIONS.find(({ chapters: [lo, hi] }) => chapter >= lo && chapter <= hi)
  return section?.section ?? null
}
