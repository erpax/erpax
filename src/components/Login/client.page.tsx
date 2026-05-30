'use client'
import type { FormEvent } from 'react'

import { PayloadSDKError } from '@payloadcms/sdk'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

import { getPayloadSdk } from '@/utilities/payloadSdk'

import './index.scss'

const baseClass = 'loginPage'

// go to /tenant1/home
// redirects to /tenant1/login?redirect=%2Ftenant1%2Fhome
// login, uses slug to set payload-tenant cookie

type Props = {
  tenantSlug?: string
  tenantDomain?: string
  labels: {
    login: string
    password: string
    username: string
    genericError: string
  }
}
export const Login = ({ tenantSlug, tenantDomain, labels }: Props) => {
  const usernameRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!usernameRef?.current?.value || !passwordRef?.current?.value) {
      return
    }
    try {
      const response = await getPayloadSdk().request({
        json: {
          password: passwordRef.current.value,
          tenantSlug,
          tenantDomain,
          username: usernameRef.current.value,
        },
        method: 'POST',
        path: '/users/external-users/login',
      })
      const json = (await response.json()) as {
        user?: unknown
        errors?: { message?: string }[]
      }

      if (json.user) {
        const redirectTo = searchParams.get('redirect')
        if (redirectTo) {
          router.push(redirectTo)
          return
        } else {
          if (tenantDomain) {
            router.push('/tenant-domains')
          } else {
            router.push(`/tenant-slugs/${tenantSlug}`)
          }
        }
      } else {
        window.alert(labels.genericError)
      }
    } catch (err) {
      window.alert(err instanceof PayloadSDKError && err.message ? err.message : labels.genericError)
    }
  }

  return (
    <div className={baseClass}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            {labels.username}
            <input name="username" ref={usernameRef} type="text" />
          </label>
        </div>
        <div>
          <label>
            {labels.password}
            <input name="password" ref={passwordRef} type="password" />
          </label>
        </div>

        <button type="submit">{labels.login}</button>
      </form>
    </div>
  )
}
