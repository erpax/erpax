'use client'

import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel, useTranslation } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const { t: translate } = useTranslation()
  const t = translate as (key: string) => string
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  const label = data?.data?.link?.label
    ? `${t('rowLabelNav')} ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.link?.label}`
    : t('rowLabelEmpty')

  return <div>{label}</div>
}
