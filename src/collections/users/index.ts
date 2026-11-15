import type { CollectionConfig, Field, FieldAccess } from 'payload'
import { enforceSeparation } from '@/hooks/collections/users/enforceSeparation'
import { refuseInactive } from '@/hooks/collections/users/refuseInactive'
import { stampLastLogin, stampPasswordChange } from '@/hooks/collections/users/stampAuth'
import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'

import { fieldAccess as superAdminField, isSuperAdmin } from '@/access/collections/shared/superAdminOnly'
import { competencyLineField } from '@/fields/array/competencyLineField'
import { localeRecord } from '@/i18n'

import { createAccess } from '@/utilities/users/access'
import { readAccess } from '@/utilities/users/access'
import { updateAndDeleteAccess } from '@/utilities/users/access'
import { externalUsersLogin } from '@/utilities/users/endpoints'
import { ensureUniqueUsername } from '@/utilities/users/hooks'
import { firstUserCredentials, firstUserSuperAdmin } from '@/utilities/users/hooks'
import { guardPrivilege } from '@/hooks/collections/users/guardPrivilege'
import { isAccessingSelf } from '@/utilities/users/access/isAccessingSelf'
import { getUserTenantIDs } from '@/utilities/get/user/tenant/i/ds'
import { setCookieBasedOnDomain } from '@/utilities/users/hooks'

/** A field only the server writes (its own hooks, or the database directly): no caller may set it. */
const serverOnly = { create: () => false, update: () => false }

/** `active` and its reason: switched by a super-admin or a tenant admin, never by the account itself. */
const switchedByAnAdmin: FieldAccess = ({ req, id }) =>
  Boolean(req.user) && !isAccessingSelf({ user: req.user, id }) && (isSuperAdmin(req.user) || getUserTenantIDs(req.user, 'admin').length > 0)

/** Whether a field holds a required field, itself or anywhere beneath it. */
const requiredBelow = (field: Field): boolean => {
  const f = field as { required?: boolean; fields?: Field[]; tabs?: { fields: Field[] }[]; blocks?: { fields: Field[] }[] }
  return Boolean(f.required) || [...(f.fields ?? []), ...(f.tabs ?? []).flatMap((t) => t.fields), ...(f.blocks ?? []).flatMap((b) => b.fields)].some(requiredBelow)
}

/** Payload's components, rendered for a signed-in user only (src/components/admin/ui/fields/SignedInField). */
const SIGNED_IN_COMPONENT: Partial<Record<Field['type'], string>> = {
  array: '@/components/admin/ui/fields/SignedInField#SignedInArrayField',
  collapsible: '@/components/admin/ui/fields/SignedInField#SignedInCollapsibleField',
}

/**
 * Every field but the credentials appears once someone is signed in (the first-user form stays email
 * and password). A field is hidden by `admin.condition`, except one holding a required field: Payload's
 * database adapter drops NOT NULL beneath any condition, so those get a signed-in component instead.
 */
const signedInOnly = (fields: Field[]): Field[] =>
  fields.map((field) => {
    if ('name' in field && field.name === 'password') return field
    if (requiredBelow(field)) {
      const Field = SIGNED_IN_COMPONENT[field.type]
      const admin = (field as { admin?: { components?: { Field?: unknown } } }).admin
      if (!Field || admin?.components?.Field) return field
      return { ...field, admin: { ...admin, components: { ...admin?.components, Field } } } as Field
    }
    const shown = field.admin?.condition
    return {
      ...field,
      admin: {
        ...field.admin,
        condition: (data, siblingData, context) => Boolean(context?.user) && (shown ? shown(data, siblingData, context) : true),
      },
    } as Field
  })

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: 'tenants',
  tenantsArrayTenantFieldName: 'tenant',
  tenantsCollectionSlug: 'tenants',
  arrayFieldAccess: {},
  tenantFieldAccess: {},
  rowFields: [
    {
      name: 'roles',
      type: 'select',
      label: localeRecord('users.tenantRoles'),
      defaultValue: ['viewer'],
      hasMany: true,
      options: [
        { label: localeRecord('users.tenantAdminRole'), value: 'admin' },
        { label: localeRecord('users.tenantViewerRole'), value: 'viewer' },
      ],
      required: true,
      // Field access has its own signature (boolean only, no Where) so the
      // collection-level `authenticated` helper can't be reused here — the
      // authenticated write gate is the field-access predicate inline.
      // (NIST INCITS-359 RBAC + ISO 27002 §5.15 access-control.)
      access: {
        update: ({ req }) => Boolean(req.user),
      },
    },
  ],
})

/**
 * Users — authenticated identities (cross-tenant via tenants[] membership).
 *
 * Email is the login identity; password storage is delegated to Payload's
 * auth subsystem (bcrypt). Tenant membership and per-tenant roles live on
 * the `tenants[]` array field.
 *
 * @rfc 5322 internet-message-format email
 * @rfc 5321 smtp envelope
 * @rfc 6532 internationalized-email-addresses
 * @standard BCP-47 language-tag user-locale
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27001 A.5.17 authentication-information
 * @security ISO-27002 §8.5 secure-authentication
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @compliance GDPR Art.32 security-of-processing
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §3
 */
export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: localeRecord('users.singular'),
    plural: localeRecord('users.plural'),
  },
  access: {
    create: createAccess,
    delete: updateAndDeleteAccess,
    read: readAccess,
    update: updateAndDeleteAccess,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    // An agent is a user: it reaches the MCP gateway with its own API key (`Authorization: users API-Key <key>`).
    useAPIKey: true,
    // Account lockout (Payload built-in) — topology-independent brute-force defense,
    // independent of the per-worker in-memory endpoint throttle.
    maxLoginAttempts: 5,
    lockTime: 900000, // 15 minutes
    // No email verification. It was on wherever RESEND_API_KEY was set, and `verify` adds columns
    // (`_verified`, `_verificationToken`): the schema then depended on an environment variable, the
    // migrations were generated without the key, and production (with it) could create no user at all
    // (`no column named _verified`). Users are created by an admin or are the owner, so there is no
    // sign-up to verify; forgot-password mails through Cloudflare Email Service.
    verify: false,
  },
  endpoints: [externalUsersLogin],
  // The first user is super-admin by definition: its form asks for credentials only, and every other
  // field appears once someone is signed in (Payload's first-user view shows all fields otherwise).
  fields: signedInOnly([
    // Payload's own API-key fields, declared so they merge with Payload's and, like every field here,
    // stay off the first-user form: the first user brings an email and a password, nothing else.
    { name: 'apiKey', type: 'text' },
    { name: 'apiKeyLast4', type: 'text' },
    {
      type: 'text',
      name: 'password',
      hidden: true,
      access: {
        read: () => false,
        update: ({ req, id }) => {
          const { user } = req
          if (!user) return false
          if (id === user.id) return true
          return isSuperAdmin(user)
        },
      },
    },
    {
      name: 'name',
      type: 'text',
      label: localeRecord('users.name'),
    },
    // ── The directory record. Payload's own fields stay the standard (`email`, `name`,
    // `password`); what Payload has no field for takes its name from SCIM (RFC 7643), which every
    // directory provider maps onto. Providers are adapters: src/packages/admin/providers.
    { name: 'givenName', type: 'text' },
    { name: 'middleName', type: 'text' },
    { name: 'familyName', type: 'text' },
    { name: 'nickname', type: 'text' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'timezone', type: 'text', admin: { description: 'An IANA time zone, e.g. Europe/Sofia.' } },
    // written by the server only (stampLastLogin, stampPasswordChange): readOnly in the admin did not stop the API
    { name: 'lastLogin', type: 'date', access: serverOnly, admin: { readOnly: true, position: 'sidebar' } },
    { name: 'passwordChangedAt', type: 'date', access: serverOnly, admin: { readOnly: true, position: 'sidebar' } },
    // virtual: the unit's name beside its id, resolved through the relationship at read time
    { name: 'orgUnitName', type: 'text', virtual: 'orgUnit.name', admin: { readOnly: true, hidden: true } },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      access: { update: switchedByAnAdmin },
      admin: { position: 'sidebar', description: 'An inactive user cannot sign in.' },
    },
    {
      name: 'inactiveReason',
      type: 'text',
      access: { update: switchedByAnAdmin },
      admin: { position: 'sidebar', condition: (data) => data?.active === false, description: 'Why the account was switched off.' },
    },
    {
      name: 'orgUnit',
      type: 'relationship',
      relationTo: 'org-units',
      admin: { position: 'sidebar', description: 'The org unit this user sits in.' },
    },
    {
      type: 'collapsible',
      label: 'Directory',
      admin: { initCollapsed: true },
      fields: [
    { name: 'aliases', type: 'text', hasMany: true, admin: { description: 'Other addresses that reach this user.' } },
    {
      name: 'emails',
      type: 'array',
      admin: { description: 'Further email addresses. The sign-in address is `email`.' },
      fields: [
        { name: 'value', type: 'email', required: true },
        { name: 'type', type: 'select', options: ['work', 'home', 'other'] },
        { name: 'primary', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'phoneNumbers',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'type', type: 'select', options: ['work', 'home', 'mobile', 'other'] },
        { name: 'primary', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'externalIds',
      type: 'array',
      admin: { description: 'This user in other systems: the provider or system, and the id it uses.' },
      fields: [
        { name: 'type', type: 'text', required: true, admin: { description: 'The system: google, an HR system, …' } },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'recoveryEmail', type: 'email' },
        { name: 'recoveryPhone', type: 'text' },
      ],
    },
      ],
    },
    // ── The user has NO type. One universal actor (the `all`/`one` identity
    // element); what it IS — employee, agent, customer, author, follower —
    // emerges from its RELATIONS and held competencies, never a `kind` field
    // (a type is a dimension not yet collapsed; see the `dimension` skill).
    // `roles` is capability; `competencies` is the held skill-set — identical
    // to what an agent loads and a job-position requires (same content ⇒ same
    // id). Social interactions (posts, comments, messages, follows) are
    // likewise relations on this one typeless user, federating in sync via
    // content-uuid events (the `event`/`merge` skills).
    competencyLineField({ mode: 'held', description: 'Competencies this actor holds (an agent loads these; a job requires them).' }),
    {
      admin: {
        position: 'sidebar',
      },
      name: 'roles',
      type: 'select',
      label: localeRecord('users.roles'),
      defaultValue: ['user'],
      hasMany: true,
      options: [
        { label: localeRecord('users.superAdminRole'), value: 'super-admin' },
        { label: localeRecord('users.adminRole'), value: 'admin' },
        { label: localeRecord('users.userRole'), value: 'user' },
        { label: localeRecord('users.customerRole'), value: 'customer' },
        // Slice BBB — added per Decision B step 4 Option A2 so the accounting
        // plugin's existing role checks (`req.user?.roles?.includes('accountant')`,
        // `'auditor'`) resolve. The seeds at
        // `src/plugins/accounting/seeds/level-{1,2,3}/*.ts` already create
        // users with these role values; before this slice they were silently
        // dropped on write.
        { label: 'Accountant', value: 'accountant' },
        { label: 'Auditor', value: 'auditor' },
        // Audit/compliance personas — merged from the Phase audit-governance
        // collections (RegulatoryReports, AuditCommittees, …) which gate on
        // these roles, plus the read-only stakeholder `viewer`. Single
        // canonical superset; see `@/access/roles-registry` (SoD matrix).
        { label: 'Audit Staff', value: 'audit-staff' },
        { label: 'Compliance Officer', value: 'compliance-officer' },
        { label: 'Finance', value: 'finance' },
        // HR / management personas — merged from the workforce + commitments
        // collections (Employees, PayrollRuns, TimeEntries, commitments) which
        // gate on these roles. Same canonical-superset pattern as above; see
        // `@/access/roles-registry` (SoD matrix).
        { label: 'Human Resources', value: 'hr' },
        { label: 'Payroll Officer', value: 'payroll-officer' },
        { label: 'Manager', value: 'manager' },
        { label: 'Director', value: 'director' },
        { label: 'Viewer', value: 'viewer' },
      ],
      access: {
        create: ({ req }) => isSuperAdmin(req.user),
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
    {
      name: 'username',
      type: 'text',
      label: localeRecord('users.username'),
      required: false,
      hooks: {
        beforeValidate: [ensureUniqueUsername],
      },
      index: true,
    },
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField?.admin || {}),
        position: 'sidebar',
      },
    },
    {
      // The user's role assignments (NIST INCITS-359 user-assignment): which role DEFINITIONS the
      // user holds. This is the former `user-roles` join collection — a row per (user, role) —
      // as the has-many relationship Payload has for it. A set by construction, so the duplicate
      // an extra row could create cannot exist. Super-admin only, as the join collection was; the
      // access engine reads it with overrideAccess.
      name: 'roleAssignments',
      type: 'relationship',
      relationTo: 'roles',
      hasMany: true,
      access: { create: superAdminField, read: superAdminField, update: superAdminField },
      admin: { position: 'sidebar', description: 'Role definitions assigned to this user (global, tenant-wide or per-document).' },
    },
    {
      name: 'orders',
      type: 'join',
      label: localeRecord('users.orders'),
      collection: 'orders',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['id', 'createdAt', 'total', 'currency', 'items'],
      },
    },
    {
      name: 'cart',
      type: 'join',
      label: localeRecord('users.cart'),
      collection: 'carts',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['id', 'createdAt', 'total', 'currency', 'items'],
      },
    },
    {
      name: 'addresses',
      type: 'join',
      label: localeRecord('users.addresses'),
      collection: 'addresses',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['id'],
      },
    },
    /**
     * Per-user Payload-shaped sandbox config — same nested-Payload-Config
     * shape as `tenant.config`, narrowed to what meaningfully varies per
     * user (presentation + features). Legal/compliance fields like
     * `accounting.standard` and `currency.reportingCurrency` deliberately
     * live ONLY on the tenant — a user can't unilaterally change their
     * employer's reporting framework — but they CAN choose UI language,
     * date format, and personal display preferences.
     *
     * **International-first cascade** (most-specific wins):
     *   1. Document field
     *   2. **`user.config.<section>.<field>`** — explicit per-user override
     *   3. `tenant.config.<section>.<field>` — explicit per-tenant override
     *   4. `tenant.config.identity.country` → `COUNTRY_PROFILES` derived
     *   5. Deployment defaults (`getRegionalDefaults`)
     *
     * @standard BCP-47 language-tag user-locale-preference
     * @standard ECMA-402 internationalization-api
     * @compliance GDPR Art.12 transparent-information user-language-of-choice
     * @security ISO-27002 §5.15 access-control per-user-feature-flags
     * @audit ISO-19011:2018 audit-trail user-config-change
     */
    {
      name: 'config',
      type: 'group',
      admin: {
        description:
          'Per-user sandbox config (mirrors tenant.config shape, scoped to presentation + features).',
      },
      fields: [
        {
          name: 'localization',
          type: 'group',
          admin: { description: 'Personal locale preference. Overrides tenant.config.localization.' },
          fields: [
            {
              name: 'defaultLocale',
              type: 'text',
              admin: {
                description:
                  'BCP 47 locale tag (e.g. bg-BG, en-US, de-DE). Drives admin UI language for this user.',
              },
            },
            {
              name: 'displayCurrency',
              type: 'text',
              admin: {
                description:
                  'ISO 4217 §5 currency code the user prefers to SEE amounts in. Independent from the tenant\'s reporting currency — viewing-only conversion via FX.',
              },
            },
            {
              name: 'dateFormat',
              type: 'select',
              options: [
                { label: 'ISO 8601 (YYYY-MM-DD)', value: 'iso' },
                { label: 'European (DD/MM/YYYY)', value: 'eu' },
                { label: 'US (MM/DD/YYYY)', value: 'us' },
                { label: 'Locale default', value: 'locale' },
              ],
              defaultValue: 'locale',
              admin: { description: 'Personal date-format preference. Defaults to the BCP 47 locale\'s standard.' },
            },
          ],
        },
        {
          name: 'features',
          type: 'json',
          admin: {
            description:
              'Per-user feature flags (e.g. {"betaUI": true, "darkMode": true}). Merged on top of tenant.config.features.',
          },
        },
      ],
    },
  ]),
  hooks: {
    // The genesis owner computes itself: the FIRST user (empty user set) becomes
    // super-admin by the identity element, never by hand-assignment.
    beforeOperation: [firstUserCredentials],
    beforeChange: [firstUserSuperAdmin, guardPrivilege, enforceSeparation, stampPasswordChange],
    beforeLogin: [refuseInactive],
    afterLogin: [setCookieBasedOnDomain, stampLastLogin],
  },
  timestamps: true,
}
