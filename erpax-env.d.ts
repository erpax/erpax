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
 *   wrangler secret put TRELLO_API_KEY
 *   wrangler secret put TRELLO_TOKEN
 * and locally in `.env.local` (see `.env.example`). The Trello token grants full account access.
 *
 * @see src/trello/SKILL.md
 */
interface CloudflareEnv {
  /**
   * YouTube Data API v3 key — METADATA only. `captions.download` requires OAuth as the video
   * owner, so this key reads playlists and titles and can never read another channel's transcript.
   * For spoken content, put the `.vtt`/`.srt` on disk and read it with `@/transcript`.
   */
  YOUTUBE_API_KEY?: string
  /** Trello API key — trello.com/power-ups/admin → API Key tab. */
  TRELLO_API_KEY?: string
  /** Trello token — full account access; environment/secret only, never committed. */
  TRELLO_TOKEN?: string
  /** Optional: the board whose lists the client reads. */
  TRELLO_BOARD_ID?: string
  /** Optional: '1' | 'true' opts into the flag-gated Trello MCP server in `.mcp.json`. */
  TRELLO_MCP_ENABLED?: string

  // ── PQC library bindings ──────────────────────────────────────────────────────────────────────
  // Which library actually seals each surface, named per surface rather than globally, because
  // anchor/surface's whole point is that a surface is sealed BY something specific: a root sealed by
  // FIPS 205 and a channel keyed by FIPS 203 are different bindings and different failures. Absent
  // ⇒ the surface is `open` and must name its owner — the guard reads these, so an unset binding
  // makes the manifest say so instead of a `sealed` status resting on a string.

  /** Library sealing ROOT-SIGNING — must implement FIPS 205 SLH-DSA or FIPS 204 ML-DSA. */
  PQC_ROOT_PROVIDER?: string
  /** Library sealing CHANNEL-KEYING and RE-EXCHANGE — must implement FIPS 203 ML-KEM. */
  PQC_KEM_PROVIDER?: string
  /** Library sealing STORAGE-AT-REST (e.g. AES-256-GCM via NIST SP 800-38D). */
  PQC_STORAGE_PROVIDER?: string
  /** Key identifier for the root signature — the credential, never the key material. */
  PQC_ROOT_KEY_ID?: string
  /** Key identifier for the KEM — the credential, never the key material. */
  PQC_KEM_KEY_ID?: string
}
