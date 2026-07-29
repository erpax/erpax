'use client'

import { ComputedCssProvider } from '@/css/ComputedCssProvider'
import { adminBootShell } from '@/quantum/ftl/admin'
import { Toaster } from '@/ui'
import React from 'react'

import './erpax-computed.scss'

/** FTL precomputed shell — O(1) reuse; heavy monitors stay off the admin hot path. */
const boot = adminBootShell({ reuses: 1 })

/**
 * Payload admin root — injects corpus-computed theme vars only.
 *
 * QuantumDimensionsProvider / ViolationMonitorProvider used to wrap every admin
 * route and sync-scan the corpus on mount (crack: scan∧address). Those providers
 * now mount only on afterDashboard panels (FTL deferHeavyProviders).
 */
const ComputedCssAdminRoot: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <ComputedCssProvider surface={boot.surface}>
    {children}
    <Toaster />
  </ComputedCssProvider>
)

export default ComputedCssAdminRoot
