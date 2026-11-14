/**
 * Policy Acknowledgments — single-folder collection node.
 *
 * @security ISO-27001 A.5.1 policy-acknowledgement
 * @compliance SOX §404 control-attestation
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import type { CollectionBeforeChangeHook } from 'payload'
import { roleBasedAccess } from '@/access/collections/shared/roleBasedAccess'

/**
 * An acknowledgment is of the policy AS IT STOOD. When no version is given, stamp the policy's
 * current `versionNumber` so a later revision of the policy does not change what was acknowledged.
 * A version already recorded is never overwritten. Best-effort: an unreachable policy leaves it empty.
 */
export const stampPolicyVersion: CollectionBeforeChangeHook = async ({ data, req }) => {
  const d = data as { policy?: unknown; policyVersionNumber?: unknown }
  if (d.policyVersionNumber || d.policy == null) return data
  if (typeof d.policy === 'object') {
    const current = (d.policy as { versionNumber?: unknown }).versionNumber
    if (typeof current === 'string' && current) d.policyVersionNumber = current
    return data
  }
  try {
    const policy = await req.payload.findByID({ collection: 'internal-policies', id: d.policy as string | number, depth: 0, overrideAccess: true, req })
    const current = (policy as { versionNumber?: unknown })?.versionNumber
    if (typeof current === 'string' && current) d.policyVersionNumber = current
  } catch {
    // keep the acknowledgment; the version stays unrecorded
  }
  return data
}

export const PolicyAcknowledgments: CollectionConfig = {
  slug: 'policy-acknowledgments',
  admin: {
    useAsTitle: 'employeeName',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin', 'admin'],
    update: ['super-admin', 'admin'],
    delete: ['super-admin'],
  }),
  hooks: { beforeChange: [stampPolicyVersion] },
  fields: [
    {
      name: 'policy',
      type: 'relationship',
      relationTo: 'internal-policies',
      required: true,
    },
    {
      name: 'policyVersionNumber',
      type: 'text',
      index: true,
      admin: { description: 'The version of the policy that was acknowledged (stamped from the policy when left empty).' },
    },
    {
      name: 'employeeName',
      type: 'text',
      required: true,
    },
    {
      name: 'employeeId',
      type: 'text',
    },
    {
      name: 'acknowledgedDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'acknowledgedBy',
      type: 'text',
    },
    {
      name: 'signedDocument',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Acknowledged', value: 'acknowledged' },
        { label: 'Pending', value: 'pending' },
        { label: 'Overdue', value: 'overdue' },
        { label: 'Expired', value: 'expired' },
      ],
      defaultValue: 'pending',
    },
  ],
}
