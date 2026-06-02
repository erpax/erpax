// Browser shim for `file-type`, wired in next.config.ts for the client bundle only.
//
// payload@4 admin client components transitively import the server `payload` package
// (via @payloadcms/ui's `shared` export → VersionPillLabel), whose upload paths import
// `fileTypeFromFile`. file-type@21's browser-condition entry (core.js) omits that
// fs-based export, so the client bundle errors on the missing named export. Those upload
// paths never run in the browser, so re-export the browser-safe core (which keeps
// `fileTypeFromBuffer`, the other symbol payload imports) and stub `fileTypeFromFile`
// as a server-only throw.
export * from 'file-type/core'

export const fileTypeFromFile = () => {
  throw new Error('[erpax] file-type#fileTypeFromFile is server-only and unavailable in the browser bundle')
}
