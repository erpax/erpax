'use client'

import { Badge } from '@/ui'
import type { DefaultCellComponentProps } from 'payload'
import React from 'react'

const baseClass = 'erpax-cell erpax-cell--horo'

const HoroDigitCell: React.FC<DefaultCellComponentProps> = ({ customCellProps }) => {
  const horo = customCellProps?.horo
  const label = typeof horo === 'number' ? String(horo) : '—'
  return (
    <Badge variant="outline" className={baseClass} title={`horo ${label}`}>
      {label}
    </Badge>
  )
}

export default HoroDigitCell
