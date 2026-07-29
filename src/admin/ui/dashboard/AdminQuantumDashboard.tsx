'use client'

/**
 * afterDashboard — quantum dimensions panel with FTL-deferred provider.
 * Mounts QuantumDimensionsProvider only here (not on every admin route).
 */
import { QuantumDimensionsProvider } from '@/quantum/QuantumDimensionsProvider'
import RadixDimensionPanel from '@/quantum/RadixDimensionPanel'
import { adminBootShell } from '@/quantum/ftl/admin'
import React from 'react'

const boot = adminBootShell({ reuses: 1 })

const AdminQuantumDashboard: React.FC = () => (
  <QuantumDimensionsProvider
    pollMs={boot.pollMs}
    emitOnChange
    deferMs={boot.idleDeferMs}
  >
    <RadixDimensionPanel />
  </QuantumDimensionsProvider>
)

export default AdminQuantumDashboard
