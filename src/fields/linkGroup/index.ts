/**
 * Link group factory — array of `link` fields with shared appearance options.
 *
 * @rfc 3986 uniform-resource-identifier
 * @standard W3C HTML5 nav-element
 * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
 * @see docs/STANDARDS.md §3
 */

import type { ArrayField, Field } from 'payload'

import type { LinkAppearances } from '../link'

import deepMerge from '../../utilities/deepMerge'
import { link } from '../link'

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  overrides?: Partial<ArrayField>
}) => Field

export const linkGroup: LinkGroupType = ({ appearances, overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    fields: [
      link({
        appearances,
      }),
    ],
    admin: {
      initCollapsed: true,
    },
  }

  return deepMerge(generatedLinkGroup, overrides)
}
