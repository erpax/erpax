'use client'

/**
 * Admin pre-login welcome panel.
 *
 * @standard W3C HTML5 form-validation
 * @standard BCP-47 language-tag
 * @compliance WCAG-2.1 §3.3.1 error-identification
 * @see src/components/README.md
 */

import React from 'react'
import { useTranslation } from '@payloadcms/ui'

const BeforeLogin: React.FC = () => {
  const { t: translate } = useTranslation()
  const t = translate as (key: string) => string

  return (
    <div>
      <p>
        <b>{t('beforeLoginBold')}</b>
        {t('beforeLoginRest')}
      </p>
    </div>
  )
}

export default BeforeLogin
