'use client'

import { navigationGroupsFromPaths } from '@/navigation'
import { COLLECTION_DIAMOND_KEY } from '@/factory/collection-factory'
import { Separator } from '@/ui'
import { useConfig, Link } from '@payloadcms/ui'
import React, { useMemo } from 'react'

const baseClass = 'erpax-corpus-nav'

/** Injected before default nav — fractal corpus tree from collection atom paths. */
const CorpusNavLinks: React.FC = () => {
  const { config } = useConfig()
  const { tree, slugByPath } = useMemo(() => {
    const slugByPath = new Map<string, string>()
    const paths: string[] = []
    for (const c of config.collections ?? []) {
      const diamond = (c as Record<string, unknown>)[COLLECTION_DIAMOND_KEY] as
        | { atomPath?: string }
        | undefined
      const atomPath = diamond?.atomPath ?? c.slug.replace(/-/g, '/')
      slugByPath.set(atomPath, c.slug)
      paths.push(atomPath)
    }
    return { tree: navigationGroupsFromPaths(paths).slice(0, 10), slugByPath }
  }, [config.collections])

  const adminHref = (atomPath: string): string | null => {
    const slug = slugByPath.get(atomPath)
    return slug ? `/admin/collections/${slug}` : null
  }

  if (!tree.length) return null

  return (
    <div className={`${baseClass} mb-[var(--base)]`}>
      <p className="text-muted-foreground mb-2 text-[11px] tracking-wider uppercase">
        Corpus map
      </p>
      <Separator className="mb-2" />
      <ul className="m-0 list-none p-0">
        {tree.map((group) => {
          const href = group.link
            ? adminHref(group.link.replace(/^\//, '').replace(/\/SKILL$/, ''))
            : null
          return (
            <li key={group.text} className="mb-1">
              {href ? (
                <Link href={href} className="text-[13px]">
                  {group.text}
                </Link>
              ) : (
                <span className="text-[13px] font-semibold">{group.text}</span>
              )}
              {group.items?.length ? (
                <ul className="mt-1 ml-3 list-none p-0">
                  {group.items.slice(0, 6).map((child) => {
                    const childPath =
                      child.link?.replace(/^\//, '').replace(/\/SKILL$/, '') ?? child.text
                    const childHref = adminHref(childPath)
                    return (
                      <li key={child.text}>
                        {childHref ? (
                          <Link href={childHref} className="text-xs">
                            {child.text}
                          </Link>
                        ) : (
                          <span className="text-xs">{child.text}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CorpusNavLinks
