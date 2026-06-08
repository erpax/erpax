'use client'

import { shortUuid } from '@/integrity'
import { Badge, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/ui'
import type { DefaultCellComponentProps } from 'payload'
import React from 'react'

import '../erpax-computed.scss'

const baseClass = 'erpax-cell erpax-cell--uuid'

const ContentUuidChipCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  const raw = typeof cellData === 'string' ? cellData : ''
  if (!raw) return <span className={baseClass}>—</span>
  const short = shortUuid(raw, 'object')
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={`${baseClass} erpax-computed--chip font-mono`}>
            {short}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-mono">{raw}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ContentUuidChipCell
