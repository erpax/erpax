'use client'

import { Banner, Pill } from '@payloadcms/ui'
import type { UIFieldClientComponent } from 'payload'
import React from 'react'

import '../erpax-computed.scss'

const ErpaxMetaField: UIFieldClientComponent = ({ field }) => {
  const custom = field.admin?.custom ?? {}
  const accountCode = typeof custom.accountCode === 'string' ? custom.accountCode : '—'
  const horo = custom.horo
  const sealed = custom.sealed === true

  return (
    <Banner>
      <strong>account</strong> <code>{accountCode}</code> · <strong>horo</strong> {typeof horo === 'number' ? horo : '—'} ·{' '}
      <strong>seal</strong>{' '}
      <Pill pillStyle={sealed ? 'success' : 'warning'} size="small">
        {sealed ? 'sealed' : 'gap'}
      </Pill>
    </Banner>
  )
}

export default ErpaxMetaField
