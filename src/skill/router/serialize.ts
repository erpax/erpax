/**
 * Skill-router core — format negotiation. Render a resolved {@link SkillNode}
 * into the requested format ("served with any means possible"). Pure; the
 * Payload endpoint turns a `Served` into a web `Response` (body or redirect)
 * after the access check.
 */

import type { SkillNode, SkillFormat } from '@/skill/router/resolve'

/** What the endpoint should emit: an inline body, or a redirect. */
export type Served =
  | { readonly kind: 'body'; readonly body: string; readonly contentType: string }
  | { readonly kind: 'redirect'; readonly location: string }

/** QR endpoint — the image literally IS the skill (a QR of its own URL). */
function qr(data: string): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=512x512&margin=12&data=${encodeURIComponent(data)}`
}

/**
 * Serialize a skill in the requested format.
 * - `md`   → raw markdown body
 * - `json` → the node's metadata + relations (machine-readable expert card)
 * - `svg`/`png` → redirect to a QR of the skill's URL
 * - `html` → redirect to the rendered docs page (the route)
 */
export function serializeSkill(skill: SkillNode, format: SkillFormat, site = ''): Served {
  const url = `${site}${skill.route}`
  switch (format) {
    case 'md':
      return { kind: 'body', body: skill.content, contentType: 'text/markdown; charset=utf-8' }
    case 'json':
      return {
        kind: 'body',
        body: JSON.stringify(
          {
            name: skill.name,
            description: skill.description,
            route: skill.route,
            path: skill.path,
            contentUuid: skill.contentUuid ?? null,
            relations: {
              ancestors: skill.ancestors,
              children: skill.children,
              siblings: skill.siblings,
              related: skill.related,
            },
          },
          null,
          2,
        ),
        contentType: 'application/json; charset=utf-8',
      }
    case 'svg':
    case 'png':
      return { kind: 'redirect', location: qr(url) }
    case 'html':
    default:
      return { kind: 'redirect', location: url }
  }
}
