import { CollectionConfig } from 'payload'
import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import {
  encryptPaymentMethodData,
  decryptPaymentMethodData,
} from './hooks/encryptSensitiveFields'

/**
 * Payment Methods — tokenized card / bank-account references for billing.
 *
 * Card data is **never** stored locally — we keep only the Stripe payment-method
 * token, last 4, brand, and expiry. PCI-DSS scope is minimized via tokenization.
 * Sensitive fields encrypted via the encryptSensitiveFields hook.
 *
 * @standard ISO-13616-1:2020 iban bank-account-reference
 * @standard ISO-9362:2022 bic bank-routing
 * @standard ISO-4217:2015 currency-codes
 * @compliance PCI-DSS-4.0 §3.2 do-not-store-sensitive-authentication-data
 * @compliance PCI-DSS-4.0 §3.5 protect-stored-cardholder-data
 * @compliance GDPR Art.32 security-of-processing
 * @security ISO-27002 §8.24 use-of-cryptography
 * @standard NIST SP-800-38D aes-gcm
 * @rfc 5116 authenticated-encryption-with-associated-data
 * @see docs/STANDARDS.md §3
 */
export const PaymentMethods: CollectionConfig = {
  slug: 'payment-methods',
  admin: {
    useAsTitle: 'cardLast4',
    defaultColumns: ['tenant', 'type', 'cardLast4', 'isDefault', 'isActive'],
  },
  access: {
    read: isSuperAdminAccess,
    create: isSuperAdminAccess,
    update: isSuperAdminAccess,
    delete: isSuperAdminAccess,
  },
  hooks: {
    beforeChange: [encryptPaymentMethodData],
    afterRead: [decryptPaymentMethodData],
  },
  fields: [
    {
      name: 'stripePaymentMethodId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Credit/Debit Card', value: 'card' },
        { label: 'Bank Account', value: 'bank_account' },
      ],
      required: true,
    },
    {
      name: 'cardBrand',
      type: 'select',
      options: [
        { label: 'Visa', value: 'visa' },
        { label: 'Mastercard', value: 'mastercard' },
        { label: 'American Express', value: 'amex' },
        { label: 'Discover', value: 'discover' },
      ],
      admin: {
        condition: (data) => data?.type === 'card',
        description: 'Card brand (auto-populated from Stripe)',
      },
    },
    {
      name: 'cardLast4',
      type: 'text',
      admin: {
        condition: (data) => data?.type === 'card',
      },
    },
    {
      name: 'cardExpMonth',
      type: 'number',
      admin: {
        condition: (data) => data?.type === 'card',
      },
    },
    {
      name: 'cardExpYear',
      type: 'number',
      admin: {
        condition: (data) => data?.type === 'card',
      },
    },
    {
      name: 'bankName',
      type: 'text',
      admin: {
        condition: (data) => data?.type === 'bank_account',
      },
    },
    {
      name: 'bankLast4',
      type: 'text',
      admin: {
        condition: (data) => data?.type === 'bank_account',
      },
    },
    {
      name: 'isDefault',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'createdViaStripe',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Whether this was populated from a Stripe webhook',
      },
    },
    {
      name: 'nextRetryAt',
      type: 'date',
      admin: {
        description: 'When to next retry charging this payment method',
      },
    },
  ],
}
