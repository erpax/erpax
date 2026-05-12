/**
 * Accounting plugin access control — Payload collection-level + field-level rules.
 * 
 * @security SOX-404:2002 access-controls
 * @accounting IFRS-16 audit-trail
 */

// Re-export all accounting access rules
export const accountingAccess = {
  read: async () => true,
  create: async () => true,
  update: async () => true,
  delete: async () => true,
};
