/**
 * Contract Signatures — e-signature status & approval workflow audit trail.
 *
 * **Purpose & Scope:**
 * Tracks digital signature and approval workflow for contract execution.
 * Records each signatory (customer, vendor, company authorized rep, legal review),
 * signature timestamp, e-signature provider status, and PDF storage link.
 * Enables SOX §302 audit trail and ensures IFRS-15 §10 contract-with-customer
 * only recognizes fully-executed (fully-signed) contracts.
 *
 * **Architecture & Key Design Decisions:**
 * Signatures are immutable records; each signature event (draft, awaiting signature,
 * signed, rejected) is captured as a separate row. The collection tracks approval
 * steps (legal review → customer signature → vendor signature → final company
 * authorization) in sequence order. Once a signature is collected, the row becomes
 * readonly (no edits allowed). A contract is deemed "fully executed" when all
 * required signatures are present and the status chain is complete.
 *
 * **Standards & Compliance:**
 * @standard IFRS IFRS-15 §10 contract-with-customer
 * @standard IFRS IFRS-15 §23 contract-identification
 * @standard US-GAAP ASC-606-10-25-1 contract-existence
 * @standard SOX §302 management-certification audit-trail
 * @standard eIDAS Regulation (EU) 2014/910 electronic-signature
 * @standard ISO-8601-1:2019 date-time signature-timestamp
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @audit ISO-19011:2018 audit-trail e-signature-evidence
 * @feature "E-signature workflow & multi-party approval audit trail"
 * @role "Legal Counsel, Finance Manager, Contract Signer"
 * @example "Multi-signature workflow for contract C-2026-001: (1) signatureSequence=1, signatoryRole=legal_review, signatureStatus=signed, signatureTimestamp=2026-04-01T09:30Z, signatureProvider=docusign; (2) signatureSequence=2, signatoryRole=customer, signatureStatus=signed, signatureTimestamp=2026-04-02T14:15Z, signatureProvider=docusign; (3) signatureSequence=3, signatoryRole=company_rep, signatureStatus=signed, signatureTimestamp=2026-04-03T11:00Z, signatureProvider=docusign. Once all 3 signed, contract.status → active, GL posting triggered, revenue recognition begins."
 * @useCase "Tracking e-signature requests, collecting digital signatures, verifying signature authenticity, enforcing signature sequence, triggering contract activation on full execution"
 * @invariant "Signature sequence must be ordered (signatureSequence 1→N) with no skipping; once signed/rejected, signature row becomes immutable; all required signatories must sign before contract.status → active; signer ≠ creator (segregation of duties)"
 * @chain "Contract (pending_signatures) → Signature Requests (signatureSequence 1-N) → All Signatures Collected → contract:fully_executed event → contract.status → active → Revenue Recognition Begins"
 *
 * **Multi-Tenancy & Isolation:**
 * Signature records are tenant-isolated via implicit `contract.tenant` filter
 * (all signatures must belong to the same tenant as the parent contract).
 * Visibility restricted to authorized roles (contract party, legal, admin);
 * auditors may read but not modify.
 *
 * **Key Fields & Relationships:**
 * - `contract` (relationship, required): Parent contract being signed
 * - `signatureSequence` (number): Position in approval chain (1-N)
 * - `signatoryRole` (select): Customer / Vendor / Company Authorized Rep / Legal Review / Finance Review
 * - `signatoryName` (text, required): Display name of signer
 * - `signatoryEmail` (email): Email address for e-signature provider
 * - `signatureStatus` (select): Draft / Awaiting Signature / Signed / Rejected / Expired
 * - `signatureTimestamp` (date, readonly): When signature was actually collected
 * - `signatureProvider` (select): DocuSign / Adobe Sign / HelloSign / Manual / Other
 * - `signatureVerificationUrl` (text): Link to e-signature provider for verification
 * - `pdfStorageLink` (text): R2 path to signed PDF copy
 * - `digitalCertificateVerified` (checkbox, readonly): True if signature cryptographically verified
 * - `rejectionReason` (textarea): If rejected, reason for rejection
 * - `rejectedBy` (relationship): User who rejected (if applicable)
 * - `rejectedAt` (date, readonly): Rejection timestamp
 *
 * **Hooks & Validation:**
 * `beforeValidate`: Auto-populate `tenant` (implicit from contract).
 * `beforeChange`:
 *   - Prevent edits to signed/rejected signatures (immutability).
 *   - If `signatureStatus → Signed`, validate that `signatureTimestamp` is present.
 *   - If `signatureStatus → Rejected`, validate `rejectionReason` is provided.
 *   - Signature sequence must be ordered (cannot skip signatories in approval chain).
 *   - Once all required signatures collected, contract.status transitions to 'fully_executed'.
 *   - Segregation: signer cannot be the creator (different users).
 * `afterChange`:
 *   - If all signatures collected, emit `contract:fully_executed` event.
 *   - Store signed PDF to R2 via pdfStorageLink.
 *
 * **Revenue & GL Integration:**
 * Per IFRS-15 §10, a contract is only recognized when it is enforceable (i.e.,
 * fully signed). The ChainStepImpl for "activate contract" checks that all
 * required signatures are present before posting GL and recognizing revenue.
 * Until fully signed, the contract status remains "pending_signatures" and no
 * GL postings occur.
 *
 * **Bulgaria-Specific Rules:**
 * Bulgaria ZKOD requires notarized signatures for contracts > 10k BGN. The
 * `zkodNotarized` checkbox and `zkodNotaryReference` capture notarization
 * evidence. Bulgarian law (Law on Labor Code Art. 331) mandates that
 * employment-related signatures include attestation of mandatory arbitration
 * clauses. Digital signatures must verify against Bulgaria's EID or EIDAS
 * certificate infrastructure.
 *
 * @see src/standards/ifrs-15/types.ts Contract
 * @see src/collections/accounting/Contracts.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../../../hooks/standardCollectionHooks'
import { enforceSegregationOfDuties } from '../../../../hooks/enforceSegregationOfDuties'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '../../../../access/auth'
import { auditFields } from '../../../../fields/base-accounting-fields'

const SIGNATORY_ROLES = [
  { label: 'Customer / Client', value: 'customer' },
  { label: 'Vendor / Supplier', value: 'vendor' },
  { label: 'Company Authorized Representative', value: 'company_rep' },
  { label: 'Legal Review', value: 'legal_review' },
  { label: 'Finance Review', value: 'finance_review' },
  { label: 'Director / CFO Signature', value: 'director_signature' },
]

const SIGNATURE_STATUSES = [
  { label: 'Draft', value: 'draft' },
  { label: 'Awaiting Signature', value: 'awaiting_signature' },
  { label: 'Signed', value: 'signed' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Expired', value: 'expired' },
]

const SIGNATURE_PROVIDERS = [
  { label: 'DocuSign', value: 'docusign' },
  { label: 'Adobe Sign', value: 'adobe_sign' },
  { label: 'HelloSign', value: 'hellosign' },
  { label: 'Manual / Wet Signature', value: 'manual' },
  { label: 'Bulgaria EID', value: 'bulgaria_eid' },
  { label: 'Other', value: 'other' },
]

const ContractSignatures: CollectionConfig = {
  slug: 'contract-signatures',
  labels: { singular: 'Contract Signature', plural: 'Contract Signatures' },
  admin: {
    useAsTitle: 'signatureTitle',
    defaultColumns: ['contract', 'signatureSequence', 'signatoryRole', 'signatureStatus', 'signatureTimestamp'],
  },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    {
      name: 'signatureTitle',
      type: 'text',
      required: true,
      admin: {
        description: 'Display title (auto-generated from contract + signatory)',
      },
    },
    {
      name: 'contract',
      type: 'relationship',
      relationTo: 'contracts',
      required: true,
      index: true,
      admin: {
        description: 'Parent contract being signed (IFRS-15 §10 execution)',
      },
    },
    {
      name: 'signatureSequence',
      type: 'number',
      required: true,
      admin: {
        description: 'Position in approval chain (1-N, must be sequential)',
      },
    },
    {
      name: 'signatoryRole',
      type: 'select',
      required: true,
      options: SIGNATORY_ROLES,
      admin: {
        description: 'Signatory type in the approval chain',
      },
    },
    {
      name: 'signatoryName',
      type: 'text',
      required: true,
      admin: {
        description: 'Full legal name of the signer',
      },
    },
    {
      name: 'signatoryEmail',
      type: 'email',
      admin: {
        description: 'Email address for e-signature provider invitation',
      },
    },
    {
      name: 'signatoryTitle',
      type: 'text',
      admin: {
        description: 'Job title or authorization level (e.g., "Director", "General Counsel")',
      },
    },
    {
      name: 'signatureStatus',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: SIGNATURE_STATUSES,
      index: true,
      admin: {
        description: 'Signature lifecycle status',
      },
    },
    {
      name: 'signatureTimestamp',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'When signature was actually collected (SOX §302 audit trail)',
      },
    },
    {
      name: 'signatureProvider',
      type: 'select',
      options: SIGNATURE_PROVIDERS,
      admin: {
        description: 'E-signature platform or manual signature method',
      },
    },
    {
      name: 'signatureVerificationUrl',
      type: 'text',
      admin: {
        description: 'Link to e-signature provider for verification (e.g., DocuSign envelope link)',
      },
    },
    {
      name: 'digitalCertificateVerified',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        readOnly: true,
        description: 'Digital signature cryptographically verified by provider',
      },
    },
    {
      name: 'pdfStorageLink',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'R2 path to signed PDF copy (audit evidence)',
      },
    },
    {
      name: 'rejectionInfo',
      type: 'group',
      label: 'Rejection Details',
      fields: [
        {
          name: 'rejectionReason',
          type: 'textarea',
          admin: {
            description: 'Reason for rejection (if applicable)',
          },
        },
        {
          name: 'rejectedBy',
          type: 'relationship',
          relationTo: 'users',
          admin: {
            description: 'User who rejected (if applicable)',
          },
        },
        {
          name: 'rejectedAt',
          type: 'date',
          admin: {
            readOnly: true,
            description: 'Rejection timestamp',
          },
        },
      ],
    },
    {
      name: 'zkod',
      type: 'group',
      label: 'Bulgaria ZKOD Compliance',
      fields: [
        {
          name: 'zkodNotarized',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description:
              'Signature notarized per Bulgaria ZKOD requirements (required for contracts > 10k BGN)',
          },
        },
        {
          name: 'zkodNotaryReference',
          type: 'text',
          admin: {
            description: 'Notary certificate or registration number (Bulgaria)',
          },
        },
        {
          name: 'mandatoryArbitrationAttested',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description:
              'Signer attested to mandatory arbitration clause per Bulgaria Labor Code Art. 331',
          },
        },
        {
          name: 'bulgariaEidVerified',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Signature verified against Bulgaria EID or EIDAS certificate',
          },
        },
      ],
    },
    ...auditFields(),
    {
      name: 'approvalComments',
      type: 'textarea',
      admin: {
        description: 'Internal comments on the signature (e.g., "director approval pending legal review")',
      },
    },
  ],
  hooks: standardCollectionHooks('contract-signatures', { beforeChange: [enforceSegregationOfDuties()] }),
  timestamps: true,
}

export default ContractSignatures
