/**
 * cloudflare/binding — the mediator boundary, re-exported from its ONE implementation.
 *
 * This atom used to hold a SECOND copy of the fail-closed mediator, and the copies had
 * diverged badly. `makeMediator` here returned only `{ enforceAuthorized,
 * auditBindingCall }` — no kvGet, no r2Get, no audit chain — against the real one's
 * full typed surface, and it took `op: any`, erasing the very narrowing that stops a
 * caller handing the authorizer a name that is not a binding.
 *
 * Nothing imported it, so nothing was harmed. But it was ADDRESSABLE, it carried a
 * SKILL saying every binding access MUST flow through these wrappers, and it handed
 * out a tenth of the boundary to anyone who believed that. A duplicated security
 * boundary is not two safeguards; it is one safeguard and one decoy.
 *
 * @see ../index.ts — the implementation · ./SKILL.md
 */
export {
  makeMediator,
  enforceAuthorized,
  auditBindingCall,
  reportAuditDrop,
  type MediatorContext,
  type MediatorAuthorizer,
} from '../index'

/** @index-cross.foldback child=cloudflare/binding parent=cloudflare — this cross folds back into its parent. */
