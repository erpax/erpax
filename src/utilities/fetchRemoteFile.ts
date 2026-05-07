import type { File } from 'payload'

function guessExtensionFromMime(mime: string): string {
  const m = mime.toLowerCase()
  if (m.includes('jpeg')) return '.jpg'
  if (m.includes('png')) return '.png'
  if (m.includes('gif')) return '.gif'
  if (m.includes('webp')) return '.webp'
  if (m.includes('svg')) return '.svg'
  if (m.includes('avif')) return '.avif'
  return ''
}

/**
 * Download a remote file for Payload `create({ collection: 'media', file })`.
 */
export async function fetchRemoteFileForPayload(url: string): Promise<File> {
  const res = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      Accept: 'image/*,*/*;q=0.8',
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${res.status}`)
  }

  const buf = Buffer.from(await res.arrayBuffer())
  const contentType =
    res.headers.get('content-type')?.split(';')[0]?.trim() || 'application/octet-stream'

  let name: string
  try {
    const pathSeg = new URL(url).pathname.split('/').filter(Boolean).pop() || `remote-${Date.now()}`
    name = decodeURIComponent(pathSeg.split('?')[0] ?? pathSeg)
  } catch {
    name = `remote-${Date.now()}`
  }

  if (!/[.][a-z0-9]{2,8}$/i.test(name)) {
    name += guessExtensionFromMime(contentType) || '.bin'
  }

  return {
    name,
    data: buf,
    mimetype: contentType,
    size: buf.length,
  }
}
