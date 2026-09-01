/**
 * erpax — the orientation face, and the one package that names the whole.
 *
 * The five providers (`@erpax/access`, `accounting`, `cloudflare`, `commerce`,
 * `identity`) each ship one capability. This is the umbrella: what a reader installs to
 * find out WHERE erpax is and how to enter it, without cloning the corpus or booting the
 * app. The URL and the repo are the same orientation, so the wire is the entry — a
 * consumer resolves the canonical repo, the skill entry, and the content-uuid that seals
 * it, and follows the atoms from there.
 *
 * It ships no collection, no config and no app. The licensed application stays private:
 * this package is the FACE, and `scripts/assert-root-private.mjs` keeps the root itself
 * unpublishable.
 *
 * @see ./SKILL.md — ./api/surface — @/skill/wire
 */
export { ERPAX_CANONICAL_REPO, ERPAX_SKILL_ENTRY, ERPAX_SKILL_ENTRY_ALT, ERPAX_SKILL_ENTRY_CONTENT_UUID, ERPAX_AGENT_SURFACES, wireFromRepoUrl, } from '../skill/wire';
export type { WireFromRepoUrl, WireFromRepoUrlResult, WireFromRepoUrlError } from '../skill/wire';
export { erpaxWikiParity, erpaxApiDiscoveryPayload } from './api/surface';
