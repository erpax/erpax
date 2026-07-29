'use client'

/**
 * afterDashboard — violation monitor with FTL-deferred provider.
 * Mounts ViolationMonitorProvider only here (not on every admin route).
 */
import { ViolationMonitorProvider } from '@/admin/ui/violations/ViolationMonitorProvider'
import ViolationMonitorPanel from '@/admin/ui/violations/ViolationMonitorPanel'
import { adminBootShell } from '@/quantum/ftl/admin'
import React from 'react'

const boot = adminBootShell({ reuses: 1 })

const AdminViolationDashboard: React.FC = () => (
  <ViolationMonitorProvider
    pollMs={30_000}
    emitOnChange
    improveOnDetect={false}
    deferMs={boot.pollMs === 0 ? 1 : 0}
  >
    <ViolationMonitorPanel />
  </ViolationMonitorProvider>
)

export default AdminViolationDashboard
