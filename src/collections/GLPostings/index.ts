/**
 * GLPostings Collection
 *
 * Individual debit/credit postings to GL accounts.
 * Created when journal entry is posted.
 * Becomes immutable after posting (except admin override with documentation).
 *
 * Purpose: Atomic GL posting records with full audit trail.
 * Each posting is one line of double-entry: either debit or credit.
 *
 * @invariant Posted entries are immutable (postedDate cannot be null after set)
 * @invariant Cannot modify amount, account, or polarity after posting
 * @invariant Admin overrides require reason and audit documentation
 */

import { CollectionConfig } from 'payload'
import { accountingCollectionAccess } from '../../access/auth'
import { enforcePostingImmutability } from '../../hooks/enforcePostingImmutability'
import { validateFiscalPeriodPosting } from '../../hooks/validateFiscalPeriodPosting'

export const GLPostings: CollectionConfig = {
  slug: 'gl-postings',
  admin: {
    useAsTitle: 'postingNumber',
  },
  access: accountingCollectionAccess(),
  hooks: {
    beforeValidate: [validateFiscalPeriodPosting],
    beforeChange: [enforcePostingImmutability],
  },
  fields: [
    {
      name: 'entity',
      type: 'relationship',
      relationTo: 'legal-entities',
      required: true,
      admin: { description: 'Entity whose GL is being posted to' },
    },
    {
      name: 'postingNumber',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        description: 'Sequential posting number for control (e.g., GP-2026-0001-001 = JE-001, line 1)',
      },
    },
    {
      name: 'journalEntry',
      type: 'relationship',
      relationTo: 'journal-entries',
      required: true,
      admin: { description: 'Parent journal entry from which this posting was created' },
    },
    {
      name: 'glAccount',
      type: 'relationship',
      relationTo: 'gl-accounts',
      required: true,
      admin: { description: 'GL account being posted to' },
    },
    {
      name: 'accountNumber',
      type: 'text',
      admin: { description: 'Denormalized account number for reporting (copied at post-time)' },
    },
    {
      name: 'accountType',
      type: 'text',
      admin: { description: 'Account type (denormalized for validation)' },
    },
    {
      name: 'debitAmount',
      type: 'number',
      admin: { description: 'Debit amount (0 if credit posting)' },
    },
    {
      name: 'creditAmount',
      type: 'number',
      admin: { description: 'Credit amount (0 if debit posting)' },
    },
    {
      name: 'amount',
      type: 'number',
      admin: {
        description: 'Absolute amount (debit or credit, used for aging/analysis)',
      },
    },
    {
      name: 'description',
      type: 'text',
      admin: { description: 'Posting-specific description (from journal entry line)' },
    },
    {
      name: 'postingDate',
      type: 'date',
      required: true,
      admin: {
        description:
          'Posting date (from journal entry). Determines fiscal period & period-lock eligibility.',
      },
    },
    {
      name: 'postedDate',
      type: 'date',
      admin: {
        description:
          'Date GL posting was finalized (marks immutability point). Null = draft, date = posted.',
      },
    },
    {
      name: 'postedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { description: 'User who posted this to GL' },
    },
    {
      name: 'costCenter',
      type: 'relationship',
      relationTo: 'cost-centers',
      admin: { description: 'Optional cost center allocation (for P&L analysis)' },
    },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      admin: { description: 'Optional project allocation' },
    },
    {
      name: 'reconciliationStatus',
      type: 'select',
      options: [
        { label: 'Unreconciled', value: 'unreconciled' },
        { label: 'Pending Reconciliation', value: 'pending' },
        { label: 'Reconciled', value: 'reconciled' },
        { label: 'Reconciled (Exception)', value: 'reconciled-exception' },
      ],
      defaultValue: 'unreconciled',
      admin: {
        description:
          'Reconciliation status (for accounts requiring monthly reconciliation like bank, AR, AP)',
      },
    },
    {
      name: 'reconciledDate',
      type: 'date',
      admin: { description: 'Date posting was reconciled to subledger/bank' },
    },
    {
      name: 'reconciledBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { description: 'User who reconciled this posting' },
    },
    {
      name: 'reconciliationDocument',
      type: 'relationship',
      relationTo: 'audit-evidence',
      admin: {
        description:
          'Evidence of reconciliation (e.g., bank statement, subledger match, reconciliation worksheet)',
      },
    },
    {
      name: 'intercompanyMatch',
      type: 'relationship',
      relationTo: 'gl-postings',
      admin: {
        description:
          'If intercompany posting, link to offsetting posting in other entity (for consolidation elimination)',
      },
    },
    {
      name: 'closingEntry',
      type: 'relationship',
      relationTo: 'closing-entries',
      admin: { description: 'If this is part of a period-end close, link to ClosingEntry' },
    },
    {
      name: 'adminOverride',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check if admin modified this posted posting (immutability override)',
      },
    },
    {
      name: 'adminOverrideHistory',
      type: 'array',
      fields: [
        {
          name: 'overriddenBy',
          type: 'relationship',
          relationTo: 'users',
          required: true,
        },
        {
          name: 'overrideDate',
          type: 'date',
          required: true,
        },
        {
          name: 'overrideReason',
          type: 'textarea',
          required: true,
        },
        {
          name: 'priorValue',
          type: 'textarea',
          admin: { description: 'JSON of prior posting state' },
        },
        {
          name: 'newValue',
          type: 'textarea',
          admin: { description: 'JSON of modified posting state' },
        },
      ],
      admin: {
        description: 'Complete history of all admin overrides (audit trail, append-only)',
      },
    },
    {
      name: 'currencyCode',
      type: 'text',
      admin: { description: 'Currency code (e.g., USD, EUR, GBP)' },
    },
    {
      name: 'exchangeRate',
      type: 'number',
      admin: {
        description: 'If multi-currency: conversion rate used (e.g., 1 EUR = 1.10 USD)',
      },
    },
    {
      name: 'exchangeRateDate',
      type: 'date',
      admin: { description: 'As-of date for exchange rate' },
    },
    {
      name: 'originalCurrencyAmount',
      type: 'number',
      admin: {
        description: 'If converted: original amount in foreign currency (before FX conversion)',
      },
    },
    {
      name: 'fxGainLossAmount',
      type: 'number',
      admin: {
        description:
          'FX gain/loss if posting is later revalued (IAS 21 treatment of currency differences)',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'Posting-specific notes' },
    },
  ],
}
