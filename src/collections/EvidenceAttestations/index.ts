/**
 * Evidence Attestations — signed PDF cover sheets produced by
 * `src/services/evidence-attestation.ts` for every completed e2e
 * walk-through. Each row pins one PDF/A-2b + PDF/UA-1 attestation
 * (optionally PAdES-signed via `bg-pades-signer.ts`) under
 * `public/evidence/attestations/`.
 *
 * The collection is the durable index — the bytes live on R2 (via the
 * `Media` collection upload) but the metadata + signing status + tenant
 * + workflow trace lives here so audit packs can be assembled from a
 * single query.
 *
 * @standard ISO-19005-2:2011 pdf-a-2
 * @standard ISO-14289-1:2014 pdf-ua-1
 * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
 * @standard ISO-19011:2018 audit-trail visual-evidence
 * @audit ISO-19011:2018 audit-trail attestation-evidence
 * @compliance SOX §404 internal-controls process-walk-through
 * @compliance EU 910/2014 eidas qualified-electronic-signature
 * @see src/services/evidence-attestation.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../hooks/standardCollectionHooks'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '../../access/auth'
import { statusField, notesField, auditFields } from '../../fields/base-accounting-fields'

const EvidenceAttestations: CollectionConfig = {
  slug: 'evidence-attestations',
  labels: { singular: 'Evidence Attestation', plural: 'Evidence Attestations' },
  admin: {
    useAsTitle: 'attestationId',
    defaultColumns: ['attestationId', 'workflow', 'country', 'capturedAt', 'signed', 'status'],
    description:
      'Signed PDF cover sheets per completed e2e walk-through — SOX §404 evidence pack with optional eIDAS qualified seal.',
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'auditor'),
    update: roleScopedAccess('admin', 'auditor'),
    delete: tenantAdmin,
  },
  fields: [
    {
      name: 'attestationId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Filename-style id (e.g. `2026-05-09-order-to-cash-tenant-42`).',
      },
    },
    {
      name: 'workflow',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'Workflow slug (`order-to-cash`, `procure-to-pay`, `record-to-report`).' },
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      admin: { description: 'ISO-3166-1 alpha-2 the walk-through ran against.' },
    },
    {
      name: 'capturedAt',
      type: 'date',
      required: true,
      index: true,
      admin: { description: 'ISO-8601 timestamp the walk-through completed.' },
    },
    {
      name: 'pdfA',
      type: 'select',
      required: true,
      defaultValue: '2b',
      options: [
        { label: 'PDF/A-1b', value: '1b' },
        { label: 'PDF/A-2b (default archival)', value: '2b' },
        { label: 'PDF/A-2a (accessible)', value: '2a' },
        { label: 'PDF/A-3b (hybrid invoice)', value: '3b' },
      ],
    },
    {
      name: 'pdfUa',
      type: 'select',
      defaultValue: '1',
      options: [
        { label: 'None', value: 'none' },
        { label: 'PDF/UA-1', value: '1' },
        { label: 'PDF/UA-2', value: '2' },
      ],
    },
    {
      name: 'signed',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'True when the attestation carries a PAdES qualified signature.' },
    },
    {
      name: 'padesLevel',
      type: 'select',
      options: [
        { label: 'B-B (Baseline)', value: 'B-B' },
        { label: 'B-T (with Timestamp)', value: 'B-T' },
        { label: 'B-LT (Long-Term)', value: 'B-LT' },
        { label: 'B-LTA (Long-Term Archive)', value: 'B-LTA' },
      ],
      admin: {
        condition: (data) => Boolean((data as { signed?: boolean })?.signed),
        description: 'PAdES baseline level the signature claims (declared in `/Prop_Build`).',
      },
    },
    {
      name: 'pdfFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'The PDF/A-2b + PDF/UA-1 attestation bytes (uploaded to R2 via the Media collection).',
      },
    },
    // ─── Slice OOO: eIDAS / ETSI EN 319 142 PAdES signing material ───────
    // Without these the attestation row only carries the wrapper; the
    // actual cryptographic evidence (CMS blob, cert chain, digest, signing
    // time) lives nowhere durable. Per eIDAS Art.28 the qualified-seal
    // material MUST be retrievable from the audit row, not just embedded
    // in the PDF byte stream (which can be re-issued / re-flowed).
    //
    // Populated by `signBgPadesPdf` (`bg-pades-signer.ts`) on save when
    // `signed === true`.
    //
    // @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile signature-fields
    // @standard rfc-5652 cms-detached-signature
    // @standard NIST FIPS-180-4 sha-256 message-digest
    // @compliance EU 910/2014 eidas Art.28 qualified-electronic-signature
    {
      name: 'signatureValue',
      type: 'textarea',
      admin: {
        condition: (data) => Boolean((data as { signed?: boolean })?.signed),
        description: 'CMS SignedData blob (hex-encoded) — eIDAS Art.28 qualified-seal evidence. Populated by `signBgPadesPdf`.',
      },
    },
    {
      name: 'signedAt',
      type: 'date',
      index: true,
      admin: {
        condition: (data) => Boolean((data as { signed?: boolean })?.signed),
        description: 'ISO 8601-1:2019 signature creation time (distinct from `capturedAt` and `approvedAt`).',
      },
    },
    {
      name: 'signingCertificate',
      type: 'textarea',
      admin: {
        condition: (data) => Boolean((data as { signed?: boolean })?.signed),
        description: 'eIDAS qualified-seal certificate chain (PEM-encoded). Subject DN is denormalised in `signedBy`.',
      },
    },
    {
      name: 'signedBy',
      type: 'text',
      admin: {
        condition: (data) => Boolean((data as { signed?: boolean })?.signed),
        description: 'Subject distinguished name (DN) of the signer — denormalised from the signingCertificate for filtering.',
      },
    },
    {
      name: 'signatureDigest',
      type: 'text',
      admin: {
        condition: (data) => Boolean((data as { signed?: boolean })?.signed),
        description: 'SHA-256 (NIST FIPS-180-4) hex digest of the signed bytes — message-digest for tamper-detection.',
      },
    },
    {
      name: 'stepsCount',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Number of walk-through steps captured in the attestation body.' },
    },
    {
      name: 'gapsCount',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Number of UX gaps recorded during the walk-through.' },
    },
    statusField(
      [
        { label: 'Generated', value: 'generated' },
        { label: 'Signed', value: 'signed' },
        { label: 'Filed', value: 'filed' },
        { label: 'Superseded', value: 'superseded' },
      ],
      'generated',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('evidence-attestations'),
  timestamps: true,
}

export default EvidenceAttestations
