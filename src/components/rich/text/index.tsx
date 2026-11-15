/**
 * RichText — Lexical serialized state → HTML / React tree.
 *
 * @standard W3C HTML5 Living Standard rich-text-output
 * @standard CommonMark 0.31 markdown-fallback
 * @standard schema.org HTMLRichText
 * @compliance WCAG-2.1 §1.3.1 info-and-relationships
 * @compliance WCAG-2.1 §1.4.10 reflow
 * @see src/components/README.md
 */

// Each block from its own component file: the @/blocks barrel also carries server-only blocks
// (archive reads the Payload config), and this component renders in the browser too.
import { MediaBlock } from '@/blocks/media/block/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, type CodeBlockProps } from '@/blocks/code/Component'

import type {
  AffectBlock as AffectBlockProps,
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/utilities/types'
import { AffectBlock } from '@/blocks/affect/Component'
import { BannerBlock } from '@/blocks/banner/Component'
import { CallToActionBlock } from '@/blocks/call/to/action/Component'
import { codedFromRegistry } from '@/utilities/error/codedRegistry'
import { ERR } from '@/utilities/error/errorCodes'
import { cn } from '@/components/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<AffectBlockProps | CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

/**
 * The href for a link an editor made to another document.
 *
 * EXPORTED so the law can be refuted. It was private, and a SKILL stating "an internal link is a
 * route, never a stored URL" with no way to contradict it is an unfalsifiable claim
 * ([[rules]]/refutable) — the library is still the only caller, through the converter below.
 */
export const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw codedFromRegistry(ERR.INTERNAL_RICHTEXT_VALUE)
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    affect: ({ node }) => <AffectBlock className="col-start-2" {...node.fields} />,
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
