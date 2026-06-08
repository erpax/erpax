'use client'

import { ComputedCssProvider } from '@/css'
import { ViolationMonitorProvider } from '@/admin/ui'
import { QuantumDimensionsProvider } from '@/quantum/QuantumDimensionsProvider'
import { Toaster } from '@/ui'
import React from 'react'

import './erpax-computed.scss'

/** Payload admin root — injects corpus-computed theme vars for all admin/ui surfaces. */
const ComputedCssAdminRoot: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <ComputedCssProvider surface={{ kind: 'admin', path: 'admin/ui', horo: 7, sealed: true }}>
    <QuantumDimensionsProvider pollMs={30_000} emitOnChange>
      <ViolationMonitorProvider pollMs={30_000} emitOnChange>
        {children}
        <Toaster />
      </ViolationMonitorProvider>
    </QuantumDimensionsProvider>
  </ComputedCssProvider>
)

export default ComputedCssAdminRoot
