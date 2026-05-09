# `src/utilities/`

Domain glue and one-off helpers. Files in this folder may **cite** standards
via JSDoc but are **not** standards-implementations — those live in
`src/standards/<id>/` per `docs/STANDARDS.md` §2.

## What belongs here

- Pure functions over project-specific shapes (`extractID`, `deepMerge`,
  `formatAuthors`, `toKebabCase`, `ui`).
- Payload / Next.js / tenant-shape glue (`getMeUser`, `getCollectionIDType`,
  `getTenantFromRequest`, `getUserTenantIDs`, `getMediaUrl`,
  `mergeOpenGraph`, `payloadSdk`, `siteTenantWhere`,
  `tenantLabelForDuplicateAudit`).
- React hooks for the admin / public site (`useClickableCard`,
  `useDebounce`, `canUseDOM`).
- Domain-specific helpers that wrap a single standards module
  (`getPreviewSecret` wraps `nist-sp-800-108`).
- Multi-step domain workflows that touch several standards
  (`tenantRemoteSecrets`, `remoteMediaImport`,
  `getEnabledLocalesForTenant`, `billing/stripeWebhookHandlers`).
- The `errors/` registry and `scopes/` access-control filters — both
  cite standards but are project-specific implementations layered on
  Payload, not vendor-spec implementations.

## What does NOT belong here

If a file implements a standard's algorithm, encoding, or message
schema (validators, code tables, builders), move it to
`src/standards/<id>/` and leave a `@deprecated` re-export shim here for
the migration window. See `docs/MIGRATION_WORKLIST.md` slices L/M/N/O/P
for the conventions and prior moves.

## Citing a standard from this folder

Files here may declare standards using the same JSDoc tags as
`src/standards/`:

```ts
/**
 * Wraps the NIST SP 800-108 KDF for the live-preview signing purpose.
 *
 * @standard NIST SP-800-108 key-derivation-function
 * @rfc 5869 hkdf
 * @security ISO-27002 §5.15 access-control preview-secret
 */
```

The difference is intent: this folder *uses* standards; `src/standards/`
*implements* them.

## Deprecated shims

Files marked `@deprecated` here are temporary re-export shims. Their
canonical home is in `src/standards/<id>/`. They will be deleted in a
single pass once every consumer migrates — see
`scripts/slice-f-delete-dead-stubs.sh`.
