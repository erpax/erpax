'use client'

import React from 'react'
import { useTranslation } from '@payloadcms/ui'

const BeforeLogin: React.FC = () => {
  const { t: translate } = useTranslation()
  const t = translate as (key: string) => string

  return (
    <div>
      <p>
        <b>{t('erpax:beforeLoginBold')}</b>
        {t('erpax:beforeLoginRest')}
      </p>
    </div>
  )
}

export default BeforeLogin
