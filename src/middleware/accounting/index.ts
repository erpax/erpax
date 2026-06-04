/**
 * Accounting Middleware — multi-tenancy + request-context barrel.
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @see ../index.ts for master citation index
 * @see docs/STANDARDS.md §4.4
 */

export * from '@/middleware/accounting/tenant-scope';
