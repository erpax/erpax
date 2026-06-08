'use client'

import { Badge } from '@/ui'
import type { DefaultCellComponentProps } from 'payload'
import React from 'react'

import '../erpax-computed.scss'

const baseClass = 'erpax-cell erpax-cell--seal'

const SealBadgeCell: React.FC<DefaultCellComponentProps> = ({ customCellProps }) => {
  const sealed = customCellProps?.sealed === true
  return (
    <Badge
      className={`${baseClass} erpax-computed--${sealed ? 'seal-ok' : 'seal-gap'}`}
      variant={sealed ? 'secondary' : 'outline'}
    >
      {sealed ? 'sealed' : 'gap'}
    </Badge>
  )
}

export default SealBadgeCell
