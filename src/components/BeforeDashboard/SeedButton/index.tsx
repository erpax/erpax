'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast, useTranslation } from '@payloadcms/ui'

import './index.scss'

const SuccessMessage: React.FC = () => {
  const { t: translate } = useTranslation()
  const t = translate as (key: string) => string
  return (
    <div>
      {t('successLead')}
      <a target="_blank" href="/">
        {t('successVisit')}
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
        toast.info(t('toastAlreadySeeded'))
        return
      }
      if (loading) {
        toast.info(t('toastSeeding'))
        return
      }
      if (error) {
        toast.error(t('toastGenericError'))
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
                    reject(new Error(t('toastSeedError')))
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
            loading: t('toastSeedingLoading'),
            success: <SuccessMessage />,
            error: t('toastSeedError'),
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
  if (loading) message = t('seeding')
  if (seeded) message = t('seeded')
  if (error) message = t('seedError').replace('{{error}}', error)

  return (
    <Fragment>
      <button className="seedButton" onClick={handleClick} type="button">
        {t('seedButton')}
      </button>
      {message}
    </Fragment>
  )
}
