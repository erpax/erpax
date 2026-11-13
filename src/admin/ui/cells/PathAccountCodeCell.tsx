'use client'

import { Pill } from '@payloadcms/ui'
import type { DefaultCellComponentProps } from 'payload'
import React from 'react'

/** The atom's path as its account code. */
const PathAccountCodeCell: React.FC<DefaultCellComponentProps> = ({ customCellProps }) => {
  const code = typeof customCellProps?.accountCode === 'string' ? customCellProps.accountCode : '—'
  return (
    <Pill pillStyle="light-gray" size="small">
      <code>{code}</code>
    </Pill>
  )
}

export default PathAccountCodeCell
