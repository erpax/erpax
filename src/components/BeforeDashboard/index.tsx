'use client'

/**
 * Admin pre-dashboard banner — first-run seed prompt.
 *
 * @standard WAI-ARIA 1.2 status-role
 * @compliance WCAG-2.1 §1.4.3 contrast-minimum
 * @standard BCP-47 language-tag
 * @see src/components/README.md
 */

import { Banner } from '@payloadcms/ui/elements/Banner'
import { useTranslation } from '@payloadcms/ui'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  const { t: translate } = useTranslation()
  const t = translate as (key: string) => string

  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>{t('dashboardTitle')}</h4>
      </Banner>
      {t('dashboardIntro')}
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {t('dashboardSeedMid')}
          <a href="/" target="_blank">
            {t('dashboardVisitSite')}
          </a>
          {t('dashboardSeedEnd')}
        </li>
        <li>
          {t('dashboardLi2a')}
          <a
            href="https://payloadcms.com/docs/configuration/collections"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t('dashboardLi2Collections')}
          </a>
          {t('dashboardLi2b')}
          <a
            href="https://payloadcms.com/docs/fields/overview"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t('dashboardLi2Fields')}
          </a>
          {t('dashboardLi2c')}
          <a
            href="https://payloadcms.com/docs/getting-started/what-is-payload"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t('dashboardLi2StartDocs')}
          </a>
          {t('dashboardLi2d')}
        </li>
        <li>{t('dashboardLi3')}</li>
      </ul>
      {t('dashboardProTip')}
      <a
        href="https://payloadcms.com/docs/custom-components/overview"
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('dashboardCustomComponent')}
      </a>
      {t('dashboardProTipEnd')}
      <strong>{t('dashboardPayloadConfig')}</strong>
      {t('dashboardProTipFinal')}
    </div>
  )
}

export default BeforeDashboard
