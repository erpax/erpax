'use client'

import { Badge } from '@/ui'
import type { DefaultCellComponentProps } from 'payload'
import React from 'react'

const baseClass = 'erpax-cell erpax-cell--account'

const PathAccountCodeCell: React.FC<DefaultCellComponentProps> = ({ customCellProps }) => {
  const code = typeof customCellProps?.accountCode === 'string' ? customCellProps.accountCode : '—'
  return (
    <Badge variant="secondary" className={`${baseClass} font-mono`} title={code}>
      {code}
    </Badge>
  )
}

export default PathAccountCodeCell
