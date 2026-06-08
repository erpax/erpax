/**
 * Media — picks `ImageMedia` or `VideoMedia` based on resource MIME.
 *
 * @standard schema.org ImageObject
 * @standard schema.org VideoObject
 * @rfc 6838 mime-type
 * @standard ISO/IEC-14496 mpeg-4 video
 * @standard ISO/IEC-10918 jpeg
 * @compliance WCAG-2.1 §1.1.1 non-text-content alt-text
 * @see src/components/README.md
 */

import React, { Fragment } from 'react'

import type { Props } from './types'

import { ImageMedia } from '@/media/image/media'
import { VideoMedia } from '@/media/video/media'

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const Tag = htmlElement || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  )
}
