'use client'

import { Banner } from '@payloadcms/ui/elements/Banner'
import { useTranslation } from '@payloadcms/ui'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>{t('erpax:dashboardTitle')}</h4>
      </Banner>
      {t('erpax:dashboardIntro')}
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {t('erpax:dashboardSeedMid')}
          <a href="/" target="_blank">
            {t('erpax:dashboardVisitSite')}
          </a>
          {t('erpax:dashboardSeedEnd')}
        </li>
        <li>
          {t('erpax:dashboardLi2a')}
          <a
            href="https://payloadcms.com/docs/configuration/collections"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t('erpax:dashboardLi2Collections')}
          </a>
          {t('erpax:dashboardLi2b')}
          <a
            href="https://payloadcms.com/docs/fields/overview"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t('erpax:dashboardLi2Fields')}
          </a>
          {t('erpax:dashboardLi2c')}
          <a
            href="https://payloadcms.com/docs/getting-started/what-is-payload"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t('erpax:dashboardLi2StartDocs')}
          </a>
          {t('erpax:dashboardLi2d')}
        </li>
        <li>{t('erpax:dashboardLi3')}</li>
      </ul>
      {t('erpax:dashboardProTip')}
      <a
        href="https://payloadcms.com/docs/custom-components/overview"
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('erpax:dashboardCustomComponent')}
      </a>
      {t('erpax:dashboardProTipEnd')}
      <strong>{t('erpax:dashboardPayloadConfig')}</strong>
      {t('erpax:dashboardProTipFinal')}
    </div>
  )
}

export default BeforeDashboard
