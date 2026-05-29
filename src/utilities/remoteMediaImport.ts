/**
 * Remote-media import — fetch images/files from external URLs into Media
 * collection during seed / Pages / Posts / Products beforeChange.
 *
 * @rfc 3986 uniform-resource-identifier remote-source
 * @rfc 6838 mime-type media-type
 * @rfc 9110 http-semantics fetch
 * @standard ISO/IEC-23008 mpeg-image
 * @standard ISO/IEC-10918 jpeg
 * @compliance GDPR Art.5(1)(c) data-minimization
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @audit ISO-19011:2018 audit-trail
 */

import type { CollectionBeforeChangeHook, File as PayloadUploadFile, PayloadRequest } from 'payload'

import { fetchRemoteFileForPayload } from '@/utilities/fetchRemoteFile'

/** Disable all remote-media hooks: `PAYLOAD_REMOTE_MEDIA_IMPORT=false` */
export const remoteMediaImportDisabled = () => process.env.PAYLOAD_REMOTE_MEDIA_IMPORT === 'false'

const IMAGE_PATH_EXT_RE = /\.(jpg|jpeg|png|gif|webp|svg|avif)(\?|#|$)/i

export function isLikelyRemoteImageUrl(raw: string): boolean {
  const s = raw.trim()
  if (!s.startsWith('http://') && !s.startsWith('https://')) return false
  try {
    const u = new URL(s)
    if (IMAGE_PATH_EXT_RE.test(u.pathname + u.search)) return true
    if (u.hostname.includes('googleusercontent.com')) return true
    if (u.hostname.endsWith('blogspot.com') && u.pathname.includes('img')) return true
    return false
  } catch {
    return false
  }
}

type LexicalRootDoc = { root: { children: unknown[]; [k: string]: unknown }; [k: string]: unknown }

function isLexicalDoc(value: unknown): value is LexicalRootDoc {
  return (
    typeof value === 'object' &&
    value !== null &&
    'root' in value &&
    typeof (value as LexicalRootDoc).root === 'object' &&
    (value as LexicalRootDoc).root !== null &&
    Array.isArray((value as LexicalRootDoc).root.children)
  )
}

async function transformLexicalDoc(
  doc: LexicalRootDoc,
  resolveUrl: (url: string) => Promise<string | null>,
): Promise<LexicalRootDoc> {
  const children = doc.root.children ?? []
  const next: unknown[] = []
  for (const node of children) {
    const chunk = await transformLexicalTopLevelNode(node, resolveUrl)
    next.push(...chunk)
  }
  return {
    ...doc,
    root: {
      ...doc.root,
      children: next,
    },
  }
}

async function transformLexicalTopLevelNode(
  node: unknown,
  resolveUrl: (url: string) => Promise<string | null>,
): Promise<unknown[]> {
  if (!node || typeof node !== 'object') return [node]

  const n = node as Record<string, unknown>
  if (n.type === 'paragraph') {
    const mediaBlock = await tryParagraphToMediaBlock(n, resolveUrl)
    if (mediaBlock) return [mediaBlock]
  }

  return [node]
}

async function tryParagraphToMediaBlock(
  paragraph: Record<string, unknown>,
  resolveUrl: (url: string) => Promise<string | null>,
): Promise<unknown | null> {
  const children = paragraph.children as unknown[] | undefined
  if (!children?.length) return null

  if (children.length === 1) {
    const only = children[0] as Record<string, unknown>
    if (only?.type === 'link') {
      const fields = only.fields as Record<string, unknown> | undefined
      const url = typeof fields?.url === 'string' ? fields.url : ''
      if (url && isLikelyRemoteImageUrl(url)) {
        const id = await resolveUrl(url)
        if (id === null) return null
        return mediaBlockNode(id)
      }
    }
    if (only?.type === 'text') {
      const text = typeof only.text === 'string' ? only.text.trim() : ''
      if (text && isLikelyRemoteImageUrl(text)) {
        const id = await resolveUrl(text)
        if (id === null) return null
        return mediaBlockNode(id)
      }
    }
  }

  return null
}

function mediaBlockNode(mediaId: string): Record<string, unknown> {
  return {
    type: 'block',
    fields: {
      blockName: '',
      blockType: 'mediaBlock',
      media: mediaId,
    },
    format: '',
    version: 2,
  }
}

async function normalizeLocalizedLexical(
  content: unknown,
  localeCodes: string[],
  transform: (doc: LexicalRootDoc) => Promise<LexicalRootDoc>,
): Promise<unknown> {
  if (!content) return content
  if (isLexicalDoc(content)) {
    return transform(content)
  }
  if (typeof content === 'object' && content !== null && !Array.isArray(content)) {
    const o = content as Record<string, unknown>
    const out: Record<string, unknown> = { ...o }
    for (const code of localeCodes) {
      if (code in o && isLexicalDoc(o[code])) {
        out[code] = await transform(o[code] as LexicalRootDoc)
      }
    }
    return out
  }
  return content
}

function containsHttp(value: unknown): boolean {
  try {
    return JSON.stringify(value).includes('http')
  } catch {
    return true
  }
}

export function tenantIdFromDoc(data: Record<string, unknown>): string | undefined {
  const t = data.tenant
  if (typeof t === 'string') return t
  if (t && typeof t === 'object' && 'id' in t && typeof (t as { id: unknown }).id === 'string') {
    return (t as { id: string }).id
  }
  return undefined
}

function getAtPath(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split('.')
  let cur: unknown = obj
  for (const k of parts) {
    if (!cur || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[k]
  }
  return cur
}

function setAtPath(obj: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split('.')
  let cur: Record<string, unknown> = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i]
    const next = cur[k]
    if (!next || typeof next !== 'object' || Array.isArray(next)) return
    cur = next as Record<string, unknown>
  }
  const last = parts[parts.length - 1]
  cur[last] = value
}

/** Supports `meta.image`, `heroImage`, or `gallery[].image` (array-of-objects). */
async function coerceUploadUrlPaths(
  data: Record<string, unknown>,
  patterns: string[],
  resolveUrl: (url: string) => Promise<string | null>,
): Promise<void> {
  for (const pattern of patterns) {
    if (pattern.includes('[].')) {
      const [arrayKey, restPath] = pattern.split('[].', 2)
      if (!arrayKey || restPath === undefined) continue
      const arr = data[arrayKey]
      if (!Array.isArray(arr)) continue
      for (const item of arr) {
        if (!item || typeof item !== 'object') continue
        await coerceDotPath(item as Record<string, unknown>, restPath, resolveUrl)
      }
    } else {
      await coerceDotPath(data, pattern, resolveUrl)
    }
  }
}

async function coerceDotPath(
  root: Record<string, unknown>,
  dotPath: string,
  resolveUrl: (url: string) => Promise<string | null>,
): Promise<void> {
  const current = getAtPath(root, dotPath)
  if (typeof current !== 'string' || !isLikelyRemoteImageUrl(current)) return
  const id = await resolveUrl(current)
  if (id !== null) setAtPath(root, dotPath, id)
}

export type CreateImportRemoteMediaHookOptions = {
  /**
   * Lexical rich-text field names at document root (localized maps supported).
   * Only use for editors that include the `mediaBlock` Lexical block where replacements are emitted.
   */
  lexicalFields?: string[]
  /**
   * Upload fields that may arrive as raw URL strings (imports / APIs).
   * Dot paths: `meta.image`, `heroImage`. Array items: `gallery[].image`.
   */
  uploadUrlPaths?: string[]
}

function createResolveUrl(
  req: PayloadRequest,
  tenantId: string | undefined,
): (url: string) => Promise<string | null> {
  const cache = new Map<string, string>()
  const inflight = new Map<string, Promise<string | null>>()

  return async function resolveUrl(url: string): Promise<string | null> {
    const cached = cache.get(url)
    if (cached !== undefined) return cached

    let pending = inflight.get(url)
    if (!pending) {
      pending = (async () => {
        try {
          const file: PayloadUploadFile = await fetchRemoteFileForPayload(url)
          const media = await req.payload.create({
            collection: 'media',
            data: {
              alt: file.name,
              ...(tenantId !== undefined ? { tenant: tenantId } : {}),
            },
            file,
            req,
            overrideAccess: true,
          })
          const id = String(media.id)
          cache.set(url, id)
          return id
        } catch (err) {
          req.payload.logger.warn({
            msg: 'remoteMediaImport: failed to fetch or create media',
            url,
            err: err instanceof Error ? err.message : String(err),
          })
          return null
        } finally {
          inflight.delete(url)
        }
      })()
      inflight.set(url, pending)
    }

    return pending
  }
}

/**
 * Shared `beforeChange` logic: fetch remote image URLs, create `media` rows, rewrite Lexical / upload fields.
 * Use `context.skipRemoteMediaImport = true` to bypass. Disable globally with `PAYLOAD_REMOTE_MEDIA_IMPORT=false`.
 */
export function createImportRemoteMediaHook(
  options: CreateImportRemoteMediaHookOptions = {},
): CollectionBeforeChangeHook {
  const lexicalFields = options.lexicalFields ?? []
  const uploadUrlPaths = options.uploadUrlPaths ?? []

  return async ({ data, req, context }) => {
    if (remoteMediaImportDisabled()) return data
    if (context?.skipRemoteMediaImport) return data
    if (!data || typeof data !== 'object') return data

    const record = data as Record<string, unknown>
    const localization = req.payload.config.localization
    const localeCodes = localization ? localization.localeCodes : []
    const tenantId = tenantIdFromDoc(record)
    const resolveUrl = createResolveUrl(req, tenantId)

    if (uploadUrlPaths.length > 0) {
      await coerceUploadUrlPaths(record, uploadUrlPaths, resolveUrl)
    }

    for (const fieldName of lexicalFields) {
      const fieldVal = record[fieldName]
      if (fieldVal !== undefined && containsHttp(fieldVal)) {
        record[fieldName] = await normalizeLocalizedLexical(fieldVal, localeCodes, (lex) =>
          transformLexicalDoc(lex, resolveUrl),
        )
      }
    }

    return data
  }
}

/** Posts: Lexical `content` + common SEO / hero upload strings */
export const importRemoteMediaPostsHook = createImportRemoteMediaHook({
  lexicalFields: ['content'],
  uploadUrlPaths: ['heroImage', 'meta.image'],
})

/** Pages: SEO image only (layout blocks are not transformed here). */
export const importRemoteMediaPagesHook = createImportRemoteMediaHook({
  uploadUrlPaths: ['meta.image'],
})

/** Products: gallery rows + SEO; layout/description Lexical omitted (product editors differ). */
export const importRemoteMediaProductsHook = createImportRemoteMediaHook({
  uploadUrlPaths: ['gallery[].image', 'meta.image'],
})
