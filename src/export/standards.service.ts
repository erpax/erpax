/**
 * Standards Export — unified entry point for the four wire-format
 * exporters (SAF-T XML, Peppol UBL XML, EDIFACT, ISO 20022 XML).
 *
 * Each format has its own canonical builder + serializer in
 * `src/services/`; this module wraps them in a single dispatch so the
 * export plugin's REST API can accept a `format` and return the file.
 *
 * Format coverage:
 *   saf-t-xml       OECD SAF-T 2.0 audit file (XML)
 *   peppol-ubl      Peppol BIS Billing 3.0 invoice (UBL 2.1 XML)
 *   edifact         UN/EDIFACT D.96A interchange (segment-based)
 *   pain-001-xml    ISO 20022 customer credit-transfer initiation
 *   pain-008-xml    ISO 20022 customer direct-debit initiation
 *
 * Shared shape: each export takes a strongly-typed `request` (the
 * domain model) and returns a `StandardsExportResult` with the
 * rendered string + the canonical MIME type + the suggested filename.
 *
 * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
 * @standard Peppol-BIS-3.0 billing
 * @standard UBL-2.1 universal-business-language
 * @standard UN-EDIFACT D.96A
 * @standard ISO-20022:2022 universal-financial-industry-message-scheme
 * @standard ISO-9735:2002 edifact-syntax-rules
 * @rfc 6838 mime-type
 * @audit ISO-19011:2018 audit-trail
 * @see src/services/saf-t-export.service.ts
 * @see src/services/peppol-export.service.ts
 * @see src/services/edifact-export.service.ts
 * @see src/services/iso20022-export.service.ts
 */

import type { Payload } from 'payload'
import {
  buildAuditFile,
  renderSafTXml,
  type SafTExportOptions,
} from '@/saf/t/export.service'
import {
  renderPeppolInvoice,
} from '@/peppol/export.service'
import {
  serializeInterchangeAsString,
} from '@/edifact/export.service'
import {
  renderPain001,
  renderPain008,
} from '@/iso20022/export.service'
import type { PeppolBillingMessage } from '@/peppol/bis/3'
import type { EdifactInterchange } from '@/un/edifact'
import type {
  Pain001Initiation,
  Pain008Initiation,
} from '@/iso/20022'

/**
 * Unified format discriminator. Mirrors `ExportFormat` for PDF/Excel/HTML
 * but for the wire-format export targets.
 */
export type StandardsExportFormat =
  | 'saf-t-xml'
  | 'peppol-ubl'
  | 'edifact'
  | 'pain-001-xml'
  | 'pain-008-xml'

/**
 * Discriminated request — each format requires its specific input shape.
 */
export type StandardsExportRequest =
  | { format: 'saf-t-xml'; payload: Payload; options: SafTExportOptions }
  | { format: 'peppol-ubl'; message: PeppolBillingMessage }
  | { format: 'edifact'; interchange: EdifactInterchange }
  | { format: 'pain-001-xml'; initiation: Pain001Initiation; namespace?: string }
  | { format: 'pain-008-xml'; initiation: Pain008Initiation; namespace?: string }

/**
 * Result of a standards export — the rendered content plus
 * transport-layer metadata (MIME type + filename) so the REST API
 * can attach headers without each caller re-deriving them.
 */
export interface StandardsExportResult {
  format: StandardsExportFormat
  /** Rendered wire-format content (XML or EDIFACT segments). */
  content: string
  /** RFC 6838 media type for Content-Type. */
  mimeType: string
  /** Default filename for Content-Disposition: attachment. */
  filename: string
}

const MIME: Record<StandardsExportFormat, string> = {
  'saf-t-xml': 'application/xml',
  'peppol-ubl': 'application/xml',
  'edifact': 'application/edifact',
  'pain-001-xml': 'application/xml',
  'pain-008-xml': 'application/xml',
}

const baseFilename = (
  format: StandardsExportFormat,
  identifier: string,
): string => {
  const ts = new Date().toISOString().slice(0, 10)
  switch (format) {
    case 'saf-t-xml':
      return `saft-${identifier}-${ts}.xml`
    case 'peppol-ubl':
      return `peppol-${identifier}-${ts}.xml`
    case 'edifact':
      return `edifact-${identifier}-${ts}.edi`
    case 'pain-001-xml':
      return `pain001-${identifier}-${ts}.xml`
    case 'pain-008-xml':
      return `pain008-${identifier}-${ts}.xml`
  }
}

/**
 * Unified entry point — dispatches to the correct builder + serializer
 * based on the request's format discriminator.
 *
 * @standard RFC-6838 mime-type
 */
export const exportStandards = async (
  request: StandardsExportRequest,
): Promise<StandardsExportResult> => {
  switch (request.format) {
    case 'saf-t-xml': {
      const auditFile = await buildAuditFile(request.payload, request.options)
      return {
        format: 'saf-t-xml',
        content: renderSafTXml(auditFile),
        mimeType: MIME['saf-t-xml'],
        filename: baseFilename('saf-t-xml', String(request.options.companyID)),
      }
    }
    case 'peppol-ubl': {
      return {
        format: 'peppol-ubl',
        content: renderPeppolInvoice(request.message),
        mimeType: MIME['peppol-ubl'],
        filename: baseFilename(
          'peppol-ubl',
          request.message.invoice.invoiceNumber,
        ),
      }
    }
    case 'edifact': {
      return {
        format: 'edifact',
        content: serializeInterchangeAsString(request.interchange),
        mimeType: MIME['edifact'],
        filename: baseFilename(
          'edifact',
          request.interchange.unb.interchangeControlReference,
        ),
      }
    }
    case 'pain-001-xml': {
      return {
        format: 'pain-001-xml',
        content: renderPain001(request.initiation, {
          namespace: request.namespace,
        }),
        mimeType: MIME['pain-001-xml'],
        filename: baseFilename(
          'pain-001-xml',
          request.initiation.messageId,
        ),
      }
    }
    case 'pain-008-xml': {
      return {
        format: 'pain-008-xml',
        content: renderPain008(request.initiation, {
          namespace: request.namespace,
        }),
        mimeType: MIME['pain-008-xml'],
        filename: baseFilename(
          'pain-008-xml',
          request.initiation.messageId,
        ),
      }
    }
  }
}

/**
 * Convenience — returns just the MIME type for a format. Useful when
 * a caller already has the rendered content (from a direct service
 * call) and just needs the transport metadata.
 */
export const mimeTypeFor = (format: StandardsExportFormat): string =>
  MIME[format]
