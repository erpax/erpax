export type UserRole =
  | 'superadmin'
  | 'admin'
  | 'cto-cfo'
  | 'audit-staff'
  | 'compliance-officer'
  | 'finance'
  | 'user'

export const ROLE_PERMISSIONS = {
  superadmin: {
    canModifyReferenceData: true,
    canDeleteAuditTrail: false,
    canAccessAllTenants: true,
    canModifyAuditFindings: true,
    canCreateCertifications: false,
    canCreateRemediationPlans: true,
    canAccessConfidentialEvidence: true,
  },
  admin: {
    canModifyReferenceData: false,
    canDeleteAuditTrail: false,
    canAccessAllTenants: false,
    canModifyAuditFindings: true,
    canCreateCertifications: false,
    canCreateRemediationPlans: true,
    canAccessConfidentialEvidence: true,
  },
  'audit-staff': {
    canModifyReferenceData: false,
    canDeleteAuditTrail: false,
    canAccessAllTenants: false,
    canModifyAuditFindings: true,
    canCreateCertifications: false,
    canCreateRemediationPlans: true,
    canAccessConfidentialEvidence: true,
  },
  'compliance-officer': {
    canModifyReferenceData: false,
    canDeleteAuditTrail: false,
    canAccessAllTenants: false,
    canModifyAuditFindings: true,
    canCreateCertifications: false,
    canCreateRemediationPlans: true,
    canAccessConfidentialEvidence: true,
  },
  finance: {
    canModifyReferenceData: false,
    canDeleteAuditTrail: false,
    canAccessAllTenants: false,
    canModifyAuditFindings: false,
    canCreateCertifications: false,
    canCreateRemediationPlans: false,
    canAccessConfidentialEvidence: false,
  },
  user: {
    canModifyReferenceData: false,
    canDeleteAuditTrail: false,
    canAccessAllTenants: false,
    canModifyAuditFindings: false,
    canCreateCertifications: false,
    canCreateRemediationPlans: false,
    canAccessConfidentialEvidence: false,
  },
}
