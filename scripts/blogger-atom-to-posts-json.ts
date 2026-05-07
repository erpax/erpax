/**
 * Convert a Blogger `feed.atom` (Atom 1.0) export into JSON you can import via
 * Payload Admin → Imports → posts (JSON), using `@payloadcms/plugin-import-export`.
 *
 * Usage:
 *   pnpm exec tsx scripts/blogger-atom-to-posts-json.ts ./feed.atom --out ./posts-import.json
 *
 * Options:
 *   --out <path>              Output file (default: ./posts-import.json)
 *   --tenant <id>             Optional numeric `tenant` id (multi-tenant)
 *   --author-id <id>          Set `authors` relationship to this user id for every post
 *   --categories-map <path>   JSON object: Blogger label (term) → Payload category id, e.g. {"Travel": 3}
 *   --labels-out <path>       Write `{ slug, labels[] }[]` for labels found on each post (no Payload ids)
 *   --hero-images-out <path> Write `{ slug, url }[]` first `<img src>` per post (sidecar for manual uploads)
 *   --reverse                 Reverse entry order (Blogger feeds are often newest-first)
 *   --draft                   `_status`: draft instead of published
 *   --limit <n>               Import at most n entries (after --reverse)
 *   --slug-prefix <str>       Prefix every slug (before uniqueness suffix)
 *   --omit-images             Skip placeholder paragraphs for `<img>` tags
 *   --seo-meta-title          Set `meta.title` to the post title for each doc
 */

import fs from 'node:fs'
import path from 'node:path'

import { JSDOM } from 'jsdom'

const ATOM_NS = 'http://www.w3.org/2005/Atom'

/** Lexical text format bitmask (matches @lexical/rich-text conventions). */
const F_BOLD = 1
const F_ITALIC = 2
const F_UNDERLINE = 4

type LexicalText = {
  type: 'text'
  detail: number
  format: number
  mode: 'normal'
  style: string
  text: string
  version: number
}

type LexicalLink = {
  type: 'link'
  children: LexicalText[]
  direction: 'ltr' | 'rtl'
  fields: {
    linkType: 'custom'
    newTab?: boolean
    url: string
  }
  format: string
  indent: number
  version: number
}

type LexicalParagraph = {
  type: 'paragraph'
  children: (LexicalText | LexicalLink)[]
  direction: 'ltr' | 'rtl'
  format: string
  indent: number
  textFormat: number
  version: number
}

type LexicalHeading = {
  type: 'heading'
  children: LexicalText[]
  direction: 'ltr' | 'rtl'
  format: string
  indent: number
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  version: number
}

type LexicalCodeBlock = {
  type: 'block'
  fields: {
    blockName: string
    blockType: 'code'
    code: string
    language: string
  }
  format: string
  version: number
}

type LexicalChild = LexicalParagraph | LexicalHeading | LexicalCodeBlock

type HtmlToLexicalOptions = {
  omitImages: boolean
}

function textNode(text: string, format = 0): LexicalText {
  return {
    type: 'text',
    detail: 0,
    format,
    mode: 'normal',
    style: '',
    text,
    version: 1,
  }
}

function paragraphFromPieces(pieces: (LexicalText | LexicalLink)[]): LexicalParagraph {
  const children = pieces.length ? mergeAdjacentTextNodes(pieces) : [textNode('')]
  return {
    type: 'paragraph',
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1,
  }
}

function paragraphFromText(text: string): LexicalParagraph {
  const t = text.replace(/\s+/g, ' ').trim()
  return {
    type: 'paragraph',
    children: t ? [textNode(t)] : [textNode('')],
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1,
  }
}

/** Merge consecutive text nodes when format matches (cleaner JSON). */
function mergeAdjacentTextNodes(pieces: (LexicalText | LexicalLink)[]): (LexicalText | LexicalLink)[] {
  const out: (LexicalText | LexicalLink)[] = []
  for (const p of pieces) {
    if (p.type !== 'text') {
      out.push(p)
      continue
    }
    const prev = out[out.length - 1]
    if (prev && prev.type === 'text' && prev.format === p.format) {
      prev.text += p.text
    } else {
      out.push({ ...p })
    }
  }
  return out
}

function collectRichInline(el: Element, inheritedFormat: number): (LexicalText | LexicalLink)[] {
  const out: (LexicalText | LexicalLink)[] = []
  for (const child of el.childNodes) {
    if (child.nodeType === 3) {
      const t = child.textContent ?? ''
      if (t) out.push(textNode(t, inheritedFormat))
      continue
    }
    if (child.nodeType !== 1) continue
    const sub = child as Element
    const tag = sub.tagName.toLowerCase()
    let fmt = inheritedFormat
    if (tag === 'strong' || tag === 'b') fmt |= F_BOLD
    if (tag === 'em' || tag === 'i') fmt |= F_ITALIC
    if (tag === 'u') fmt |= F_UNDERLINE
    if (tag === 'br') {
      out.push(textNode('\n', inheritedFormat))
      continue
    }
    if (tag === 'a') {
      const href = sub.getAttribute('href') ?? ''
      const innerPieces = collectRichInline(sub, fmt)
      const innerTexts = flattenToTextOnly(innerPieces)
      out.push({
        type: 'link',
        children: innerTexts.length ? innerTexts : [textNode(sub.textContent?.trim() ?? '', fmt)],
        direction: 'ltr',
        fields: {
          linkType: 'custom',
          newTab: true,
          url: href,
        },
        format: '',
        indent: 0,
        version: 3,
      })
      continue
    }
    out.push(...collectRichInline(sub, fmt))
  }
  return out
}

function flattenToTextOnly(pieces: (LexicalText | LexicalLink)[]): LexicalText[] {
  const texts: LexicalText[] = []
  for (const p of pieces) {
    if (p.type === 'text') texts.push(p)
    else texts.push(...p.children)
  }
  return texts
}

function paragraphFromElement(el: Element): LexicalParagraph {
  const pieces = collectRichInline(el, 0)
  if (pieces.length === 0) return paragraphFromText(el.textContent?.trim() ?? '')
  return paragraphFromPieces(pieces)
}

function headingFromText(tag: LexicalHeading['tag'], text: string): LexicalHeading {
  return {
    type: 'heading',
    children: [textNode(text.replace(/\s+/g, ' ').trim())],
    direction: 'ltr',
    format: '',
    indent: 0,
    tag,
    version: 1,
  }
}

function childEl(parent: Element, local: string): Element | null {
  const byNs = parent.getElementsByTagNameNS(ATOM_NS, local)
  if (byNs.length) return byNs[0] ?? null
  const byTag = parent.getElementsByTagName(local)
  return byTag[0] ?? null
}

function innerHtmlOrText(el: Element | null): string {
  if (!el) return ''
  const type = el.getAttribute('type') || ''
  const raw = el.textContent ?? ''
  if (type.includes('html') || raw.includes('&lt;') || raw.includes('<')) {
    const html = decodeAtomHtmlPayload(raw)
    const frag = new JSDOM(`<div>${html}</div>`).window.document.body
    return frag.textContent?.trim() ?? ''
  }
  return raw.trim()
}

/** Decode XML entity-encoded HTML from Atom `content` / `summary` nodes. */
function decodeAtomHtmlPayload(raw: string): string {
  let s = raw.trim()
  const cdata = s.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/)
  if (cdata) s = cdata[1] ?? s
  if (s.includes('&lt;') || s.includes('&gt;') || s.includes('&amp;')) {
    const ta = new JSDOM('<!DOCTYPE html><html><body></body></html>').window.document.createElement('textarea')
    ta.innerHTML = s
    s = ta.value
  }
  return s
}

function htmlInner(el: Element | null): string {
  if (!el) return ''
  const type = el.getAttribute('type') || ''

  if (type === 'xhtml') {
    const wrapper = el.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'div')[0]
    if (wrapper) return wrapper.innerHTML
  }

  const raw = el.textContent ?? ''
  return decodeAtomHtmlPayload(raw)
}

function alternateHref(entry: Element): string | null {
  const links = [...entry.getElementsByTagNameNS(ATOM_NS, 'link'), ...entry.getElementsByTagName('link')]
  const htmlAlternate = links.find((l) => {
    const href = l.getAttribute('href')
    if (!href?.startsWith('http')) return false
    if (l.getAttribute('rel') !== 'alternate') return false
    const typ = l.getAttribute('type')
    if (typ && typ !== 'text/html') return false
    return true
  })
  return (
    htmlAlternate?.getAttribute('href') ??
    links.find((l) => l.getAttribute('rel') === 'alternate')?.getAttribute('href') ??
    links.find((l) => l.getAttribute('href'))?.getAttribute('href') ??
    null
  )
}

function slugFromUrl(href: string): string {
  try {
    const u = new URL(href)
    const seg = u.pathname.split('/').filter(Boolean).pop() ?? 'post'
    const base = seg.replace(/\.html?$/i, '')
    const slug = base
      .replace(/[^a-zA-Z0-9-_]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase()
    return slug || 'post'
  } catch {
    return 'post'
  }
}

function ensureUniqueSlug(base: string, used: Map<string, number>): string {
  const count = used.get(base) ?? 0
  used.set(base, count + 1)
  if (count === 0) return base
  return `${base}-${count + 1}`
}

function firstImageSrcFromHtml(html: string): string | null {
  const trimmed = html?.trim()
  if (!trimmed) return null
  const dom = new JSDOM(`<body>${trimmed}</body>`)
  const img = dom.window.document.querySelector('img[src]') as HTMLImageElement | null
  const src = img?.getAttribute('src')?.trim()
  return src || null
}

function entryCategoryTerms(entry: Element): string[] {
  const cats = [...entry.getElementsByTagNameNS(ATOM_NS, 'category'), ...entry.getElementsByTagName('category')]
  const terms = cats
    .map((c) => c.getAttribute('term'))
    .filter((t): t is string => Boolean(t && t.trim()))
  return [...new Set(terms)]
}

function mapLabelsToCategoryIds(labels: string[], map: Record<string, number>): number[] {
  const ids: number[] = []
  const seen = new Set<number>()
  for (const label of labels) {
    const id = map[label]
    if (typeof id === 'number' && !Number.isNaN(id) && !seen.has(id)) {
      seen.add(id)
      ids.push(id)
    }
  }
  return ids
}

function loadJsonRecord(filePath: string): Record<string, number> {
  const raw = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(raw) as unknown
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new Error(`Expected JSON object in ${filePath}`)
  }
  const out: Record<string, number> = {}
  for (const [k, v] of Object.entries(data)) {
    if (typeof v === 'number' && Number.isFinite(v)) out[k] = v
  }
  return out
}

function htmlToLexicalContent(html: string, options: HtmlToLexicalOptions) {
  const trimmed = html?.trim()
  if (!trimmed) {
    return {
      root: {
        type: 'root',
        children: [paragraphFromText('')],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    }
  }

  const dom = new JSDOM(`<body>${trimmed}</body>`)
  const body = dom.window.document.body
  const children: LexicalChild[] = []

  function pushParagraphText(t: string) {
    if (!t.trim()) return
    children.push(paragraphFromText(t))
  }

  function walkBlock(el: Element) {
    const tag = el.tagName.toLowerCase()

    if (tag === 'p') {
      children.push(paragraphFromElement(el))
      return
    }

    if (tag === 'br') {
      return
    }

    if (/^h[1-6]$/.test(tag)) {
      const hx = tag as LexicalHeading['tag']
      children.push(headingFromText(hx, el.textContent ?? ''))
      return
    }

    if (tag === 'pre') {
      const code = el.textContent ?? ''
      children.push({
        type: 'block',
        fields: {
          blockName: '',
          blockType: 'code',
          code,
          language: 'plaintext',
        },
        format: '',
        version: 2,
      })
      return
    }

    if (tag === 'blockquote') {
      children.push(paragraphFromElement(el))
      return
    }

    if (tag === 'ul' || tag === 'ol') {
      for (const li of [...el.querySelectorAll(':scope > li')]) {
        const pieces = collectRichInline(li, 0)
        const prefix = textNode('• ')
        const bodyPieces =
          pieces.length > 0 ? [prefix, ...pieces] : [prefix, textNode((li.textContent ?? '').trim())]
        children.push(paragraphFromPieces(bodyPieces))
      }
      return
    }

    if (tag === 'div') {
      for (const c of [...el.childNodes]) {
        if (c.nodeType === 1) walkBlock(c as Element)
        else if (c.nodeType === 3) pushParagraphText(c.textContent ?? '')
      }
      return
    }

    if (tag === 'img') {
      if (options.omitImages) return
      const alt = el.getAttribute('alt') || 'Image'
      pushParagraphText(`[${alt}]`)
      return
    }

    pushParagraphText(el.textContent ?? '')
  }

  for (const node of [...body.childNodes]) {
    if (node.nodeType === 3) {
      pushParagraphText(node.textContent ?? '')
    } else if (node.nodeType === 1) {
      walkBlock(node as Element)
    }
  }

  if (children.length === 0) {
    children.push(paragraphFromText(body.textContent?.trim() ?? ''))
  }

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/** Minimal post shape for JSON import (omit `id` for create mode). */
type PostPayload = {
  tenant?: number
  title: string
  slug: string
  _status: 'draft' | 'published'
  publishedAt?: string | null
  authors?: number[]
  categories?: number[]
  content: {
    root: {
      type: 'root'
      children: LexicalChild[]
      direction: 'ltr' | 'rtl' | null
      format: string
      indent: number
      version: number
    }
  }
  meta?: {
    title?: string | null
    description?: string | null
  }
}

type CliOptions = {
  input?: string
  out: string
  tenant?: number
  authorId?: number
  categoryMapPath?: string
  labelsOut?: string
  heroImagesOut?: string
  reverse: boolean
  draft: boolean
  limit?: number
  slugPrefix: string
  omitImages: boolean
  seoMetaTitle: boolean
}

function parseArgs(argv: string[]): CliOptions {
  const positional: string[] = []
  const o: CliOptions = {
    out: path.join(process.cwd(), 'posts-import.json'),
    reverse: false,
    draft: false,
    slugPrefix: '',
    omitImages: false,
    seoMetaTitle: false,
  }

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--out') {
      o.out = argv[++i] ?? o.out
      continue
    }
    if (a === '--tenant') {
      o.tenant = Number(argv[++i])
      continue
    }
    if (a === '--author-id') {
      o.authorId = Number(argv[++i])
      continue
    }
    if (a === '--categories-map') {
      o.categoryMapPath = argv[++i]
      continue
    }
    if (a === '--labels-out') {
      o.labelsOut = argv[++i]
      continue
    }
    if (a === '--hero-images-out') {
      o.heroImagesOut = argv[++i]
      continue
    }
    if (a === '--reverse') {
      o.reverse = true
      continue
    }
    if (a === '--draft') {
      o.draft = true
      continue
    }
    if (a === '--limit') {
      o.limit = Number(argv[++i])
      continue
    }
    if (a === '--slug-prefix') {
      o.slugPrefix = argv[++i] ?? ''
      continue
    }
    if (a === '--omit-images') {
      o.omitImages = true
      continue
    }
    if (a === '--seo-meta-title') {
      o.seoMetaTitle = true
      continue
    }
    if (a.startsWith('-')) {
      console.error(`Unknown option: ${a}`)
      process.exit(1)
    }
    positional.push(a)
  }

  o.input = positional[0]
  return o
}

function main() {
  const argv = process.argv.slice(2)
  const opts = parseArgs(argv)
  const {
    input,
    out,
    tenant,
    authorId,
    categoryMapPath,
    labelsOut,
    heroImagesOut,
    reverse,
    draft,
    limit,
    slugPrefix,
    omitImages,
    seoMetaTitle,
  } = opts

  if (!input) {
    console.error(`Usage: pnpm exec tsx scripts/blogger-atom-to-posts-json.ts <feed.atom> [options]

Options:
  --out <path>              Output JSON (default: ./posts-import.json)
  --tenant <id>
  --author-id <id>          Payload users id for authors[]
  --categories-map <path>   JSON map: Blogger label → category id
  --labels-out <path>       Sidecar: slug + label terms per post
  --hero-images-out <path>  Sidecar: slug + first <img src>
  --reverse
  --draft
  --limit <n>
  --slug-prefix <str>
  --omit-images
  --seo-meta-title          Set meta.title from post title
`)
    process.exit(1)
  }

  let categoryMap: Record<string, number> = {}
  if (categoryMapPath) {
    const p = path.resolve(process.cwd(), categoryMapPath)
    if (!fs.existsSync(p)) {
      console.error(`Categories map not found: ${p}`)
      process.exit(1)
    }
    categoryMap = loadJsonRecord(p)
  }

  const inputPath = path.resolve(process.cwd(), input)
  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputPath}`)
    process.exit(1)
  }

  const xml = fs.readFileSync(inputPath, 'utf8')
  const jsdom = new JSDOM(xml, { contentType: 'text/xml' })
  const doc = jsdom.window.document

  const parserErr = doc.getElementsByTagName('parsererror')[0]
  if (parserErr?.textContent) {
    console.error('XML parse error:', parserErr.textContent.slice(0, 500))
    process.exit(1)
  }

  let entries = [...doc.getElementsByTagNameNS(ATOM_NS, 'entry')]
  if (entries.length === 0) {
    entries = [...doc.getElementsByTagName('entry')]
  }

  if (entries.length === 0) {
    console.error('No <entry> elements found. Is this an Atom feed?')
    process.exit(1)
  }

  if (reverse) entries = [...entries].reverse()
  if (typeof limit === 'number' && limit > 0) {
    entries = entries.slice(0, limit)
  }

  const slugUsed = new Map<string, number>()
  const posts: PostPayload[] = []
  const labelRows: { slug: string; labels: string[] }[] = []
  const heroRows: { slug: string; url: string | null }[] = []

  const lexicalOpts: HtmlToLexicalOptions = { omitImages }

  for (const entry of entries) {
    const titleEl = childEl(entry, 'title')
    const title = innerHtmlOrText(titleEl)
    if (!title) continue

    const publishedEl = childEl(entry, 'published')
    const publishedAt = publishedEl?.textContent?.trim() || null

    const summaryEl = childEl(entry, 'summary')
    const summaryPlain = innerHtmlOrText(summaryEl)

    const contentEl = childEl(entry, 'content')
    let html = htmlInner(contentEl)
    if (!html.trim()) html = htmlInner(summaryEl)

    const href = alternateHref(entry)
    let baseSlug = href ? slugFromUrl(href) : slugFromUrl(title.replace(/\s+/g, '-'))
    if (slugPrefix) {
      const p = slugPrefix.replace(/-+$/, '').replace(/^-+/, '')
      baseSlug = p ? `${p}-${baseSlug}` : baseSlug
    }
    const slug = ensureUniqueSlug(baseSlug, slugUsed)

    const labels = entryCategoryTerms(entry)
    if (labels.length) labelRows.push({ slug, labels })

    const heroUrl = firstImageSrcFromHtml(html)
    heroRows.push({ slug, url: heroUrl })

    const docPayload: PostPayload = {
      title,
      slug,
      _status: draft ? 'draft' : 'published',
      publishedAt,
      content: htmlToLexicalContent(html, lexicalOpts),
    }

    if (typeof tenant === 'number' && !Number.isNaN(tenant)) {
      docPayload.tenant = tenant
    }

    if (typeof authorId === 'number' && !Number.isNaN(authorId)) {
      docPayload.authors = [authorId]
    }

    const catIds = mapLabelsToCategoryIds(labels, categoryMap)
    if (catIds.length) docPayload.categories = catIds

    const meta: NonNullable<PostPayload['meta']> = {}
    if (summaryPlain) meta.description = summaryPlain.slice(0, 500)
    if (seoMetaTitle) meta.title = title
    if (Object.keys(meta).length) docPayload.meta = meta

    posts.push(docPayload)
  }

  const outPath = path.resolve(process.cwd(), out)
  fs.writeFileSync(outPath, `${JSON.stringify(posts, null, 2)}\n`, 'utf8')

  console.error(`Wrote ${posts.length} post(s) to ${outPath}`)

  if (labelsOut) {
    const lp = path.resolve(process.cwd(), labelsOut)
    fs.writeFileSync(lp, `${JSON.stringify(labelRows, null, 2)}\n`, 'utf8')
    console.error(`Wrote label manifest (${labelRows.length} rows) to ${lp}`)
  }

  if (heroImagesOut) {
    const hp = path.resolve(process.cwd(), heroImagesOut)
    fs.writeFileSync(hp, `${JSON.stringify(heroRows, null, 2)}\n`, 'utf8')
    console.error(`Wrote hero image URLs (${heroRows.length} rows) to ${hp}`)
  }

  console.error(
    'Import in Payload Admin: Collections → Imports → create → collection: posts → format: JSON → upload this file.',
  )
}

try {
  main()
} catch (e) {
  console.error(e)
  process.exit(1)
}
