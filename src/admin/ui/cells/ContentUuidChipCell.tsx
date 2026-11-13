'use client'

import { shortUuid } from '@/integrity'
import { Pill } from '@payloadcms/ui'
import type { DefaultCellComponentProps } from 'payload'
import React from 'react'

/** A content uuid as a short chip; the full value is the chip's title. */
const ContentUuidChipCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  const raw = typeof cellData === 'string' ? cellData : ''
  if (!raw) return <span>—</span>
  return (
    <Pill elementProps={{ ref: () => undefined, title: raw }} pillStyle="light-gray" size="small">
      <code>{shortUuid(raw, 'object')}</code>
    </Pill>
  )
}

export default ContentUuidChipCell
