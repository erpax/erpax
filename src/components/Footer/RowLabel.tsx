'use client'

import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel, useTranslation } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const { t: translate } = useTranslation()
  const t = translate as (key: string) => string
  const data = useRowLabel<NonNullable<Footer['navItems']>[number]>()

  const label = data?.data?.link?.label
    ? `${t('erpax:rowLabelNav')} ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.link?.label}`
    : t('erpax:rowLabelEmpty')

  return <div>{label}</div>
}
