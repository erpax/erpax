/**
 * BG-NSS — Bulgarian National statutory chart of accounts (Национален
 * сметкоплан). The worked example of a statutory-chart seed template; anchored
 * to BG, so `tenant` + `compliance` derive from the BG country-context
 * (reporting currency, fiscal year, e-invoicing mandate, statutory chart ref).
 *
 * The chart follows the Bulgarian account-class structure (Раздели 1–7),
 * mapped onto the five IAS-1 §54 element types:
 *   - клас 1 Капитали            → equity / liability
 *   - клас 2 Дълготрайни активи  → asset (non-current)
 *   - клас 3 Материални запаси   → asset (inventory)
 *   - клас 4 Разчети             → liability / asset (settlements)
 *   - клас 5 Финансови средства  → asset (financial)
 *   - клас 6 Разходи             → expense
 *   - клас 7 Приходи             → revenue
 *
 * @standard ISO-3166-1:2020 BG country-code
 * @standard BG-NSS national-statutory-chart-of-accounts
 * @accounting IFRS IAS-1 §54 minimum-line-items
 * @compliance EU 2014/55 b2g-e-invoicing-mandate
 * @see ./build.ts
 * @see ../../../../standards/iso-3166-1/countries/bg.ts
 */

import { buildTemplate } from '@/seeds/template/build'
import type { IndustryTemplate, SeedAccount } from '@/seeds/template/types'

const BG_NSS_CHART: ReadonlyArray<SeedAccount> = [
  // клас 1 — Капитали
  { accountNumber: '101', accountName: 'Основен капитал', accountType: 'equity' },
  { accountNumber: '117', accountName: 'Неразпределена печалба', accountType: 'equity' },
  { accountNumber: '151', accountName: 'Получени банкови заеми', accountType: 'liability' },
  // клас 2 — Дълготрайни активи
  { accountNumber: '203', accountName: 'Сгради', accountType: 'asset' },
  { accountNumber: '204', accountName: 'Машини и оборудване', accountType: 'asset' },
  // клас 3 — Материални запаси
  { accountNumber: '302', accountName: 'Материали', accountType: 'asset' },
  { accountNumber: '304', accountName: 'Стоки', accountType: 'asset' },
  // клас 4 — Разчети
  { accountNumber: '401', accountName: 'Доставчици', accountType: 'liability' },
  { accountNumber: '411', accountName: 'Клиенти', accountType: 'asset' },
  { accountNumber: '453', accountName: 'Разчети за ДДС', accountType: 'liability' },
  // клас 5 — Финансови средства
  { accountNumber: '501', accountName: 'Каса', accountType: 'asset' },
  { accountNumber: '503', accountName: 'Разплащателна сметка', accountType: 'asset' },
  // клас 6 — Разходи
  { accountNumber: '601', accountName: 'Разходи за материали', accountType: 'expense' },
  { accountNumber: '602', accountName: 'Разходи за външни услуги', accountType: 'expense' },
  { accountNumber: '604', accountName: 'Разходи за заплати', accountType: 'expense' },
  // клас 7 — Приходи
  { accountNumber: '701', accountName: 'Приходи от продажби на продукция', accountType: 'revenue' },
  { accountNumber: '702', accountName: 'Приходи от продажби на стоки', accountType: 'revenue' },
]

export const BG_NSS_TEMPLATE: IndustryTemplate = buildTemplate({
  id: 'bg-nss',
  label: 'BG — National statutory chart (НСС)',
  description: 'Bulgarian National statutory chart of accounts, account classes 1–7.',
  country: 'BG',
  standards: [
    'BG-NSS national-statutory-chart-of-accounts',
    'IFRS IAS-1 §54 minimum-line-items',
    'EN-16931:2017 §B2G e-invoicing',
  ],
  chartOfAccounts: BG_NSS_CHART,
  sampleTransactions: [
    {
      reference: 'ПРОД-0001',
      debitAccountName: 'Клиенти',
      creditAccountName: 'Приходи от продажби на стоки',
      description: 'Продажба на стоки на клиент',
    },
    {
      reference: 'ПЛ-0001',
      debitAccountName: 'Разплащателна сметка',
      creditAccountName: 'Клиенти',
      description: 'Получено плащане от клиент',
    },
  ],
})
