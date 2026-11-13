'use client'

import { Pill } from '@payloadcms/ui'
import type { DefaultCellComponentProps } from 'payload'
import React from 'react'

/** Sealed or gap — the admin's own success and warning pills. */
const SealBadgeCell: React.FC<DefaultCellComponentProps> = ({ customCellProps }) => {
  const sealed = customCellProps?.sealed === true
  return (
    <Pill pillStyle={sealed ? 'success' : 'warning'} size="small">
      {sealed ? 'sealed' : 'gap'}
    </Pill>
  )
}

export default SealBadgeCell
