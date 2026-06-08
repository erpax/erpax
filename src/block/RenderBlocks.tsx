import React, { Fragment } from 'react'

import { ComputedCssProvider } from '@/css'
import type { Page } from '@/types'

import { ArchiveBlock } from '@/blocks'
import { CallToActionBlock } from '@/blocks'
import { ContentBlock } from '@/blocks'
import { FormBlock } from '@/blocks'
import { MediaBlock } from '@/blocks'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <ComputedCssProvider
                  key={index}
                  surface={{ kind: 'block', path: `blocks/${blockType}` }}
                  injectRoot={false}
                >
                  <div className="my-16">
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block {...block} disableInnerContainer />
                  </div>
                </ComputedCssProvider>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
