/**
 * JumpCloud — the directory resources of its public API, mapped onto Payload's collections.
 *
 * `schema.json` holds the property names from JumpCloud's published OpenAPI documents; the
 * mapping below is the only hand-written part.
 *
 * @see https://docs.jumpcloud.com/api/
 * @see ../index.ts (coverage) · ../types.ts
 */
import schema from '@/packages/admin/providers/jumpcloud/schema.json'
import { na, type Provider } from '@/packages/admin/providers/types'

const SHELL = 'erpax gives no shell, LDAP or file-share accounts'
const AUTH = "Payload's own auth holds lockout, password policy and second factors"

export const jumpcloud: Provider = {
  slug: 'jumpcloud',
  title: 'JumpCloud',
  source: schema.source,
  schemas: schema.schemas,
  resources: [
    {
      schema: 'systemuserreturn',
      fields: {
        _id: 'users.id',
        email: 'users.email',
        username: 'users.username',
        displayname: 'users.name',
        firstname: 'users.givenName',
        lastname: 'users.familyName',
        middlename: 'users.middleName',
        alternateEmail: 'users.emails',
        recoveryEmail: 'users.recoveryEmail',
        phoneNumbers: 'users.phoneNumbers',
        addresses: 'users.addresses',
        suspended: 'users.active',
        activated: 'users.active',
        state: 'users.active',
        account_locked: 'users.lockUntil',
        account_locked_date: 'users.lockUntil',
        badLoginAttempts: 'users.loginAttempts',
        created: 'users.createdAt',
        password_date: 'users.passwordChangedAt',
        password_expired: 'users.mustChangePassword',
        admin: 'users.roles',
        organization: 'users.tenants',
        external_dn: 'users.externalIds',
        external_source_type: 'users.externalIds',
        managedAppleId: 'users.externalIds',
        company: 'addresses.company',
        jobTitle: 'employees.jobTitle',
        department: 'employees.department',
        costCenter: 'employees.department',
        employeeIdentifier: 'employees.employeeNumber',
        employeeType: 'employees.employmentType',
        location: 'employees.workCountry',
        manager: 'employees.manager',
        description: 'users.inactiveReason',
        ...na(SHELL, 'allow_public_key', 'enable_managed_uid', 'ldap_binding_user', 'passwordless_sudo', 'public_key', 'samba_service_user', 'ssh_keys', 'sudo', 'unix_guid', 'unix_uid'),
        ...na(AUTH, 'disableDeviceMaxLoginAttempts', 'enable_user_portal_multifactor', 'mfa', 'mfaEnrollment', 'totp_enabled', 'password_expiration_date', 'external_password_expiration_date', 'password_never_expires', 'externally_managed', 'delegatedAuthority', 'restrictedFields'),
        ...na('how the account was first made is in the version history', 'creationSource'),
      },
    },
    {
      schema: 'UserGroup',
      fields: {
        id: 'groups.id',
        name: 'groups.name',
        email: 'groups.email',
        description: 'groups.description',
        type: 'groups.kind',
        memberQuery: 'groups.membershipRule',
        membershipMethod: 'groups.membershipRule',
        organizationObjectId: 'groups.tenant',
        ...na('the workings of rule-based membership, not the group', 'memberQueryExemptions', 'memberSuggestionsNotify', 'memberQueryErrorFlags', 'suggestionCounts'),
      },
    },
    {
      schema: 'organization',
      fields: {
        _id: 'tenants.id',
        displayName: 'tenants.name',
        created: 'tenants.createdAt',
        logoUrl: 'tenants.logo',
        ...na("the provider's own billing of its customer", 'entitlement', 'hasStripeCustomerId', 'hasCreditCard', 'lastEstimateCalculationTimeStamp', 'lastSfdcSyncStatus', 'accountsReceivable', 'totalBillingEstimate', 'accountType', 'provider'),
      },
    },
  ],
}
