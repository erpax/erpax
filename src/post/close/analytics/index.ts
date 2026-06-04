/**
 * Post-Close Analytics (Phase B7)
 *
 * One accountable object with coexisting facets:
 *  - service.ts — the PostCloseAnalytics static service (variance / ratio / segment / management reporting)
 *  - SKILL.md   — the IAS-34 / IFRS-8 / COSO / GAAP-VRE standard + implementation docs
 *
 * Barrel re-export so `@/post/close/analytics` resolves the PostCloseAnalytics
 * service for every consumer (the former service + standards units now merged here).
 */

export { PostCloseAnalytics } from './service'
