'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast, useTranslation } from '@payloadcms/ui'

import './index.scss'

const SuccessMessage: React.FC = () => {
  const { t: translate } = useTranslation()
  const t = translate as (key: string) => string
  return (
    <div>
      {t('erpax:successLead')}
      <a target="_blank" href="/">
        {t('erpax:successVisit')}
      </a>
    </div>
  )
}

export const SeedButton: React.FC = () => {
  const { t: translate } = useTranslation()
  const t = translate as (key: string) => string
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (seeded) {
        toast.info(t('erpax:toastAlreadySeeded'))
        return
      }
      if (loading) {
        toast.info(t('erpax:toastSeeding'))
        return
      }
      if (error) {
        toast.error(t('erpax:toastGenericError'))
        return
      }

      setLoading(true)

      try {
        toast.promise(
          new Promise((resolve, reject) => {
            try {
              fetch('/next/seed', { method: 'POST', credentials: 'include' })
                .then((res) => {
                  if (res.ok) {
                    resolve(true)
                    setSeeded(true)
                  } else {
                    reject(new Error(t('erpax:toastSeedError')))
                  }
                })
                .catch((err) => {
                  reject(err)
                })
            } catch (err) {
              reject(err)
            }
          }),
          {
            loading: t('erpax:toastSeedingLoading'),
            success: <SuccessMessage />,
            error: t('erpax:toastSeedError'),
          },
        )
      } catch (err) {
        const errMessage = err instanceof Error ? err.message : String(err)
        setError(errMessage)
      }
    },
    [loading, seeded, error, t],
  )

  let message = ''
  if (loading) message = t('erpax:seeding')
  if (seeded) message = t('erpax:seeded')
  if (error) message = t('erpax:seedError').replace('{{error}}', error)

  return (
    <Fragment>
      <button className="seedButton" onClick={handleClick} type="button">
        {t('erpax:seedButton')}
      </button>
      {message}
    </Fragment>
  )
}
