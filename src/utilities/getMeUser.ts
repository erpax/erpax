import { PayloadSDKError } from '@payloadcms/sdk'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import type { User } from '../payload-types'
import { getPayloadSdk } from './payloadSdk'

export const getMeUser = async (args?: {
  nullUserRedirect?: string
  validUserRedirect?: string
}): Promise<{
  token: string
  user: User
}> => {
  const { nullUserRedirect, validUserRedirect } = args || {}
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  const sdk = getPayloadSdk()

  let user: User | undefined
  let ok = false

  try {
    if (token) {
      const result = await sdk.me(
        { collection: 'users' },
        { headers: { Authorization: `JWT ${token}` } },
      )
      user = result.user as User
      ok = Boolean(user)
    }
  } catch (err) {
    if (!(err instanceof PayloadSDKError)) {
      throw err
    }
    ok = false
    user = undefined
  }

  if (validUserRedirect && ok && user) {
    redirect(validUserRedirect)
  }

  if (nullUserRedirect && (!ok || !user)) {
    redirect(nullUserRedirect)
  }

  // Token will exist here because if it doesn't the user will be redirected
  return {
    token: token!,
    user: user!,
  }
}
