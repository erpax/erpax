/**
 * i18n/tag — a tag no registry can parse selects no language. See SKILL.md.
 *
 * @standard BCP 47 (RFC 5646) — tags for identifying languages
 */
import tsc from 'typescript'
import { supportedLocales } from '@/i18n/localization'
import { astOf, corpusFiles, textOf } from '@/syntax/cache'

export const atomPath = 'i18n/tag' as const

/**
 * Every locale tag the corpus writes is a WELL-FORMED, CANONICAL BCP 47 tag. See SKILL.md.
 *
 * @standard BCP 47 (RFC 5646) — tags for identifying languages
 */
export function malformedLocaleTags(cwd: string = process.cwd()): readonly string[] {
  const bad = new Set<string>()
  for (const tag of supportedLocales) if (!isCanonicalTag(tag)) bad.add(tag)
  for (const file of corpusFiles(cwd, 'source')) {
    for (const tag of localeLiteralsIn(file)) if (!isCanonicalTag(tag)) bad.add(tag)
  }
  return [...bad].sort()
}

/** Well-formed AND already canonical. See SKILL.md. */
export function isCanonicalTag(tag: string): boolean {
  try {
    return Intl.getCanonicalLocales(tag)[0] === tag
  } catch {
    return false
  }
}

/** A `locale:` property whose value is a string literal — PARSED, never matched. */
export function localeLiteralsIn(file: string, text: string = textOf(file)): readonly string[] {
  const out: string[] = []
  const visit = (node: tsc.Node): void => {
    if (
      tsc.isPropertyAssignment(node) &&
      tsc.isIdentifier(node.name) &&
      (node.name.text === 'locale' || node.name.text === 'defaultLocale') &&
      tsc.isStringLiteral(node.initializer) &&
      node.initializer.text !== ''
    ) {
      out.push(node.initializer.text)
    }
    tsc.forEachChild(node, visit)
  }
  visit(astOf(file, text))
  return out
}

/**
 * Fail closed on a tag no registry can parse. Zero is a THEOREM here, not a ratchet.
 *
 * @standard BCP 47 (RFC 5646) §2.2.9 — classes of conformance
 */
export function assertTagsWellFormed(cwd: string = process.cwd()): void {
  const bad = malformedLocaleTags(cwd)
  if (bad.length === 0) return
  throw new Error(
    `✖ BCP 47: ${bad.length} locale tag(s) are malformed or non-canonical — ${bad.join(', ')}. ` +
      'A tag no registry can parse selects no language, and the fallback that hides it is silent.',
  )
}
