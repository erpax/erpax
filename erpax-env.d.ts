/**
 * Trello environment bindings — typed by DECLARATION MERGING, not by editing the generated file.
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
  /** Trello API key — trello.com/power-ups/admin → API Key tab. */
  TRELLO_API_KEY?: string
  /** Trello token — full account access; environment/secret only, never committed. */
  TRELLO_TOKEN?: string
  /** Optional: the board whose lists the client reads. */
  TRELLO_BOARD_ID?: string
  /** Optional: '1' | 'true' opts into the flag-gated Trello MCP server in `.mcp.json`. */
  TRELLO_MCP_ENABLED?: string
}
