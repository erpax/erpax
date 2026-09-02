// Browser shim for `file-type`, wired in next.config.ts for the client bundle only.
//
// payload@4 admin client components transitively import the server `payload` package
// (via @payloadcms/ui's `shared` export → VersionPillLabel), whose upload paths import
// `fileTypeFromFile`. file-type@21's browser-condition entry (core.js) omits that
// fs-based export, so the client bundle errors on the missing named export. Those upload
// paths never run in the browser, so re-export the browser-safe core (which keeps
// `fileTypeFromBuffer`, the other symbol payload imports) and stub `fileTypeFromFile`
// as a server-only throw.
// `@erpax-shim/file-type-core` is aliased in next.config.ts to the real browser core, resolved
// through payload. Importing `file-type/core` directly cannot work: the browser alias on
// `file-type` matches by prefix, so this file would resolve to itself.
export * from '@erpax-shim/file-type-core'

export const fileTypeFromFile = () => {
  throw new Error('[erpax] file-type#fileTypeFromFile is server-only and unavailable in the browser bundle')
}
