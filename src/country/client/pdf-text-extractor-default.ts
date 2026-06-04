/**
 * Default `PdfTextExtractor` — pdf-parse-based text extraction. Plugs
 * into `parseBgBankStatementPdf` so tenants get a working PDF→text
 * pipeline out of the box.
 *
 * Two runtime paths:
 *
 *   1. Node — uses `pdf-parse` (npm), pure-JS. Default in
 *      development + the long-lived Node deployment.
 *   2. Cloudflare Workers — `pdf-parse` doesn't bundle cleanly; the
 *      deployment substitutes Workers AI's
 *      `@cf/unum/uform-gen2-qwen-500m` (vision model) or proxies the
 *      bytes to a sidecar Worker. This module's `pdf-parse` import
 *      is dynamic, so it loads cleanly in Workers and only fails at
 *      *call* time if the dependency is unavailable — caller can
 *      then fall back to a Workers-AI extractor.
 *
 * @standard ISO-32000-2:2020 pdf source-document
 * @standard W3C HTML5 (extracted text consumed downstream)
 * @audit ISO-19011:2018 audit-trail document-extraction-evidence
 * @see ./bg-bank-statement-pdf.ts (PdfTextExtractor consumer interface)
 */

import type { PdfTextExtractor } from '@/country/client/bg-bank-statement-pdf'

/**
 * Default extractor backed by `pdf-parse`. Returns the joined per-page
 * text with `\f` form-feed delimiters between pages so per-page reasoning
 * is recoverable downstream.
 *
 * Throws when `pdf-parse` isn't available — caller is expected to
 * substitute the Workers extractor in that case.
 */
export const defaultPdfTextExtractor: PdfTextExtractor = async (bytes) => {
  // Dynamic import so this module loads cleanly in Workers (where
  // pdf-parse can't be resolved at bundle time).
  let pdfParse: (buf: Buffer | Uint8Array) => Promise<{ text: string }>
  try {
    // Runtime-optional dependency: a non-literal specifier so the bundler
    // (and tsc) treat it as a dynamic load, never a static resolve — the
    // same pattern payload.config.ts uses for the optional `wrangler` import.
    const spec: string = 'pdf-parse'
    const mod = (await import(/* webpackIgnore: true */ spec)) as
      | { default: (buf: Buffer | Uint8Array) => Promise<{ text: string }> }
      | ((buf: Buffer | Uint8Array) => Promise<{ text: string }>)
    pdfParse = (typeof mod === 'function' ? mod : mod.default) as typeof pdfParse
  } catch (e) {
    throw new Error(
      `defaultPdfTextExtractor: pdf-parse unavailable in this runtime — ` +
        `substitute a Workers-AI / sidecar extractor. Underlying: ${
          e instanceof Error ? e.message : String(e)
        }`,
    )
  }
  const result = await pdfParse(bytes)
  return result.text ?? ''
}
