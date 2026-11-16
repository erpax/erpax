/**
 * erpax environment bindings — typed by DECLARATION MERGING, not by editing the generated file.
 *
 * `cloudflare-env.d.ts` is regenerated wholesale by `wrangler types` on every `pnpm build`, so a
 * hand-added binding there is silently erased at the next build — the drift is invisible until a
 * deploy reads `undefined`. `CloudflareEnv` is an `interface`, so TypeScript merges this
 * declaration into it and the fields are typed on `getCloudflareContext().env` exactly as if they
 * had been generated, while surviving regeneration.
 *
 * These are SECRETS, not vars: they never belong in `wrangler.jsonc`. Set them per environment with
 * `wrangler secret put <NAME>`, and locally in `.env.local` (see `.env.example`).
 */
interface CloudflareEnv {
  /**
   * YouTube Data API v3 key — METADATA only. `captions.download` requires OAuth as the video
   * owner, so this key reads playlists and titles and can never read another channel's transcript.
   * For spoken content, put the `.vtt`/`.srt` on disk and read it with `@/transcript`.
   */
  YOUTUBE_API_KEY?: string
}
