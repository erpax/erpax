/**
 * typography/links — wikilink extraction (no imports).
 *
 * Leaf module for word-folder scans — avoids typography/index → seal init cycle.
 */

const FRONTMATTER = /^---\n([\s\S]*?)\n---/
const wikilinkRe = (): RegExp => /\[\[([^\]]+)\]\]/g

/** Canonical link/leaf key — identical to aura/scan.mjs `norm` so resolution agrees across gates. */
export const norm = (s: string): string => s.toLowerCase().replace(/[-_]/g, '')

const prose = (text: string): string =>
  text.replace(FRONTMATTER, ' ').replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')

/** The outgoing wikilink targets of a page, normalized to their resolvable leaf. */
export const linksOf = (text: string): string[] => {
  const out = new Set<string>()
  for (const m of prose(text).matchAll(wikilinkRe())) {
    const leaf = m[1]!.split('|')[0]!.split('/').pop()
    if (leaf) out.add(norm(leaf))
  }
  return [...out].sort()
}
