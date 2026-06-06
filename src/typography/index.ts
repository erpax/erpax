/**
 * typography — the [[vitepress]] typographic feature-set a [[skill]]'s SKILL.md renders with
 * (headings, bold, code, links, lists, tables, blockquotes, containers, math). Coverage = the
 * fraction of features a page actually uses. Full typography (no gaps) is what makes [[test]]
 * results — rendered as vitepress content — whole. Composes [[vitepress]] · [[search]] · [[holographic]].
 *
 *   tsx src/typography/index.ts
 *
 * @standard CommonMark + the vitepress markdown extensions
 * @see ../vitepress -- ../search -- ../holographic -- ./SKILL.md
 */
export const FEATURES = [
  'heading',
  'bold',
  'italic',
  'code',
  'codeblock',
  'link',
  'list',
  'table',
  'blockquote',
  'container',
  'math',
] as const

export type Feature = (typeof FEATURES)[number]

const DETECT: Record<Feature, RegExp> = {
  heading: /^#{1,6}\s/m,
  bold: /\*\*[^*]+\*\*/,
  italic: /(?:^|[^*])\*[^*\s][^*]*\*/m,
  code: /`[^`]+`/,
  codeblock: /```/,
  link: /\[[^\]]+\]\([^)]+\)/,
  list: /^\s*[-*+]\s/m,
  table: /^\|.*\|/m,
  blockquote: /^>\s/m,
  container: /^:::/m,
  math: /\$[^$]+\$/,
}

/** Which typographic features the markdown actually uses. */
export const featuresUsed = (md: string): Feature[] => FEATURES.filter((f) => DETECT[f].test(md))

/** Typographic coverage: fraction of the feature-set used (0..1). */
export const coverage = (md: string): number => featuresUsed(md).length / FEATURES.length

if (import.meta.url === 'file://' + process.argv[1]) {
  const sample = '# h\n\n**b** and `c` and [l](x)\n\n- item\n'
  console.log('typography — used=' + featuresUsed(sample).join(',') + ' · coverage=' + coverage(sample).toFixed(2))
}
