'use client'

import type { UIFieldClientComponent } from 'payload'
import React from 'react'
import { Badge, Card, CardContent } from '@/ui'

import '../erpax-computed.scss'

const ErpaxMetaField: UIFieldClientComponent = ({ field }) => {
  const custom = field.admin?.custom ?? {}
  const accountCode = typeof custom.accountCode === 'string' ? custom.accountCode : '—'
  const horo = custom.horo
  const sealed = custom.sealed === true

  return (
    <Card className="erpax-computed--meta">
      <CardContent className="space-y-2 pt-4 text-sm">
        <div>
          <strong>account</strong> {accountCode}
        </div>
        <div>
          <strong>horo</strong> {typeof horo === 'number' ? horo : '—'}
        </div>
        <div className="flex items-center gap-2">
          <strong>seal</strong>
          <Badge variant={sealed ? 'secondary' : 'outline'}>{sealed ? 'sealed' : 'gap'}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export default ErpaxMetaField
