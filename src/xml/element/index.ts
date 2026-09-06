/**
 * The three element primitives every XML serializer in this corpus wrote for itself — see ./SKILL.md.
 *
 * @standard XML-1.0 §3.1 start-tag · attribute · element-content
 */

import { escapeXml } from '@/xml/escape'

/** Attribute list rendered with a leading space, or '' when every value is undefined. */
export const escapeAttrs = (attrs: Record<string, string | number | undefined>): string => {
  const pairs: string[] = []
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined) continue
    pairs.push(`${key}="${escapeXml(value)}"`)
  }
  return pairs.length ? ' ' + pairs.join(' ') : ''
}

/**
 * A leaf element with optional attributes. Empty string when the value is absent, so a caller
 * composes optional fields without an `if` per field.
 */
export const leaf = (
  tag: string,
  value: string | number | undefined | null,
  attrs?: Record<string, string | number | undefined>,
): string => {
  if (value === undefined || value === null || value === '') return ''
  return `<${tag}${attrs ? escapeAttrs(attrs) : ''}>${escapeXml(value)}</${tag}>`
}

/** A wrapper element. Empty children are dropped, and an all-empty wrapper renders as ''. */
export const wrap = (tag: string, ...children: Array<string | undefined | null>): string => {
  const inner = children.filter((c) => Boolean(c)).join('\n')
  if (!inner) return ''
  return `<${tag}>\n${inner}\n</${tag}>`
}
