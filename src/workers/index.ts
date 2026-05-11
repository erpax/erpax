/**
 * Worker-side DurableObject re-exports — Slice UUUUUUUU (2026-05-11).
 *
 * Wrangler picks DO classes up by scanning the `main` entry point's
 * bundle for `export class X` matching each `durable_objects.bindings`
 * `class_name`. With OpenNext compiling the Next app to
 * `.open-next/worker.js`, the bundle includes whatever the app's
 * dependency graph reaches. Re-exporting from a single well-known
 * file (and side-effect-importing it from a guaranteed-bundled
 * location) ensures all 4 DO classes ship with the worker.
 *
 * If the user's prior wrangler dev/deploy logs show:
 *   "A DurableObjectNamespace in the config referenced the class
 *    'TenantQuotaCounter', but no such Durable Object class is
 *    exported from the worker"
 * then importing this file from a boot-time module (e.g. payload.config)
 * closes that warning.
 *
 * @standard ISO/IEC 27001 A.5.23 cloud-service-tenant-isolation
 * @audit ISO 19011:2018 §6.4.6 (audit-chain tamper-evidence)
 */
export {
  TenantQuotaCounter,
  RateLimiter,
  JobLock,
  AuditChain,
} from '@/services/ai/durable-objects'
