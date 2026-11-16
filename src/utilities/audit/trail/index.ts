/** audit/trail — audit event chain barrel. */
export type {
  AuditEventInput,
  AuditEventCtx,
  ChainLinkStatus,
  WriteAuditEventResult,
} from '@/utilities/audit/trail/write-audit-event'
export { appendAuditRow, writeAuditEvent } from '@/utilities/audit/trail/write-audit-event'
export type { AuditRow, AuditRowOperation } from '@/utilities/audit/trail/write-audit-event'
