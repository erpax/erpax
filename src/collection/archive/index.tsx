/**
 * Collection archive — paginated grid of post cards.
 *
 * @standard schema.org ItemList
 * @standard schema.org CollectionPage
 * @standard W3C HTML5 section-element
 * @compliance WCAG-2.1 §2.4.1 bypass-blocks
 * @see src/components/README.md
 */

import { cn } from '@/ui'
import React from 'react'

import { Card, CardPostData } from '@/card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={result} relationTo="posts" showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
