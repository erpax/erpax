/**
 * Share-Based Payments — IFRS 2 equity-settled & cash-settled employee
 * compensation register.
 *
 * Slice BBBBB-prep (2026-05-11): one row per grant (stock options, RSU,
 * RSA, PSU, ESPP, SAR). The `settlementType` discriminator drives
 * whether the grant credits equity (IFRS 2 §10) or builds a liability
 * (IFRS 2 §30). Vesting schedule is captured as a tranche array.
 *
 * @standard IFRS IFRS-2 §10-§13 equity-settled-share-based-payment
 * @standard IFRS IFRS-2 §15-§19 vesting-conditions
 * @standard IFRS IFRS-2 §30-§33 cash-settled-share-based-payment
 * @standard IFRS IFRS-2 §44 disclosure-requirements
 * @standard US-GAAP ASC-718 stock-compensation
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time grant-vesting-exercise
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-equity-grants
 * @compliance SOX §404 internal-controls TOM-EQU-01
 * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '../access/auth'
import { currencyField, statusField, notesField, auditFields, referenceField } from '../fields/base-accounting-fields'

const ShareBasedPayments: CollectionConfig = {
  slug: 'share-based-payments',
  labels: { singular: 'Share-Based Payment Grant', plural: 'Share-Based Payment Grants' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'employee', 'awardType', 'settlementType', 'grantDate', 'fairValueAtGrant', 'status'],
    description:
      'IFRS 2 share-based-payment register. One row per grant (options / RSUs / PSUs / ESPP / SARs).',
  },
  access: accountingCollectionAccess({ feature: 'share_based_payments' }),
  fields: [
    referenceField({ description: 'Sequential grant reference (e.g. EQ-2026-001).' }),
    { name: 'employee', type: 'relationship', relationTo: 'employees', required: true, index: true },
    {
      name: 'awardType',
      type: 'select',
      required: true,
      options: [
        { label: 'Stock Option (NSO / ISO)', value: 'stock_option' },
        { label: 'RSU — Restricted Stock Unit', value: 'rsu' },
        { label: 'RSA — Restricted Stock Award', value: 'rsa' },
        { label: 'PSU — Performance Stock Unit', value: 'psu' },
        { label: 'ESPP — Employee Stock Purchase Plan', value: 'espp' },
        { label: 'SAR — Stock Appreciation Right', value: 'sar' },
        { label: 'Phantom Stock', value: 'phantom' },
      ],
    },
    {
      name: 'settlementType',
      type: 'select',
      required: true,
      defaultValue: 'equity',
      options: [
        { label: 'Equity-settled (IFRS 2 §10 — credit equity)', value: 'equity' },
        { label: 'Cash-settled (IFRS 2 §30 — credit liability)', value: 'cash' },
      ],
    },
    { name: 'grantDate', type: 'date', required: true, index: true },
    { name: 'numberOfUnits', type: 'number', required: true, min: 0,
      admin: { description: 'Total units / shares granted.' } },
    { name: 'strikePrice', type: 'number', defaultValue: 0,
      admin: { description: 'Exercise price (cents). Zero for full-value awards (RSU/RSA/PSU).' } },
    { name: 'fairValueAtGrant', type: 'number', required: true,
      admin: { description: 'IFRS 2 §11 — Black-Scholes / Monte-Carlo / market price at grant (cents per unit).' } },
    { name: 'totalGrantValue', type: 'number',
      admin: { readOnly: true, description: 'numberOfUnits × fairValueAtGrant (cents).' } },
    currencyField(),
    {
      name: 'vestingSchedule',
      type: 'array',
      labels: { singular: 'Tranche', plural: 'Tranches' },
      admin: { description: 'IFRS 2 §15 vesting period(s) — graded or cliff. Expense recognised straight-line over each tranche.' },
      dbName: 'sbp_tranches',
      fields: [
        { name: 'tranche', type: 'number', required: true, min: 1 },
        { name: 'vestDate', type: 'date', required: true },
        { name: 'unitsVesting', type: 'number', required: true, min: 0 },
        { name: 'isCliff', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'vestingConditions',
      type: 'group',
      admin: { description: 'IFRS 2 §19 — service / performance / market conditions affect grant-date fair-value differently.' },
      fields: [
        { name: 'serviceConditionMonths', type: 'number', defaultValue: 12 },
        { name: 'hasPerformanceCondition', type: 'checkbox', defaultValue: false },
        { name: 'performanceMetric', type: 'text', admin: { description: 'e.g. revenue ≥ €X / EPS ≥ Y' } },
        { name: 'hasMarketCondition', type: 'checkbox', defaultValue: false },
        { name: 'marketCondition', type: 'text', admin: { description: 'e.g. share price ≥ €X for 60 trading days' } },
      ],
    },
    { name: 'expirationDate', type: 'date',
      admin: { description: 'For options: contractual term end (typically 7-10 yr from grant).' } },
    { name: 'forfeitureRateAssumption', type: 'number', min: 0, max: 100,
      admin: { description: 'IFRS 2 §IG-12 expected forfeiture % per period (drives expense true-up).', step: 0.01 } },
    { name: 'cumulativeExpenseRecognised', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Running total of expense booked to date (cents).' } },
    { name: 'unitsExercised', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'unitsForfeited', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'unitsCancelled', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { readOnly: true } },
    statusField(
      [
        { label: 'Granted', value: 'granted' },
        { label: 'Vesting', value: 'vesting' },
        { label: 'Vested', value: 'vested' },
        { label: 'Exercised', value: 'exercised' },
        { label: 'Forfeited', value: 'forfeited' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Expired', value: 'expired' },
      ],
      'granted',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('share-based-payments')],
  },
  timestamps: true,
}

export default ShareBasedPayments
