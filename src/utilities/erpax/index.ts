/**
 * erpax — the orientation face: WHERE erpax is and how to enter it. The URL and the repo are
 * the same orientation, so the wire is the entry — a reader resolves the canonical repo, the
 * skill entry, and the content-uuid that seals it, and follows the atoms from there. The app
 * serves it (`src/app/my-route`, through ./api/surface); erpax publishes no packages.
 *
 * @see ./SKILL.md — ./api/surface — @/skill/wire
 */

export { erpaxWikiParity, erpaxApiDiscoveryPayload } from '@/utilities/erpax/api/surface'

/*
 * The one law and the tiered licence are PROSE, and prose lives in the form leg —
 * ./SKILL.md and the package README, both of which ship. Exporting them as constants
 * duplicated the SKILL and cracked the matrix ratchet (two more uncrossed exports for
 * text that is not code). A consumer reads them; nothing computes with them.
 */
