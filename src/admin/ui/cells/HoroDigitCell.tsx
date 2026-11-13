'use client'

import { Pill } from '@payloadcms/ui'
import type { DefaultCellComponentProps } from 'payload'
import React from 'react'

/** The atom's horo digit, or a dash when it has none. */
const HoroDigitCell: React.FC<DefaultCellComponentProps> = ({ customCellProps }) => {
  const horo = customCellProps?.horo
  const label = typeof horo === 'number' ? String(horo) : '—'
  return (
    <Pill aria-label={`horo ${label}`} pillStyle="light" rounded size="small">
      {label}
    </Pill>
  )
}

export default HoroDigitCell
