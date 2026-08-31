// PROD-BUILD STUB for next/og + @vercel/og.
// Dynamic OG image rendering pulls resvg.wasm + yoga.wasm + edge JS (~2 MiB) into
// the Worker. erpax has no opengraph-image routes; stub so Wrangler never packs them.
export class ImageResponse extends Response {
  constructor() {
    super('OG image rendering is disabled in the Cloudflare Worker build', { status: 501 })
  }
}
export function experimental_createImageStream() {
  throw new Error('OG image rendering is disabled in the Cloudflare Worker build')
}
