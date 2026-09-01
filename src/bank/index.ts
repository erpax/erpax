/**
 * bank — banking infrastructure atom (accounts · statements · reconciliation · research · interbank chat).
 *
 * Global banking develops through [[bank]]/research chat waves and [[bank]]/chat interbank sessions:
 * sealed deep research at tokens=0 (via [[quantum]]/ftl) over ISO 20022 · IBAN/BIC · SEPA · PSD2 ·
 * SWIFT · AML · reconciliation · quantum-secure hybrid envelopes (FIPS 203/204), then related atoms land.
 *
 * @standard ISO-20022:2022 · ISO-13616 · ISO-9362 · PSD2 · SEPA · NIST FIPS 203/204
 * @see ./research · ./chat · ./accounts · ./statement/import/service · ./reconciliation/service · ../iso/20022 · ../beyond/pqc
 */
export {
  atomPath as bankResearchPath,
  GLOBAL_BANKING_CORPUS,
  GLOBAL_BANKING_ASKS,
  BANK_RESEARCH_BOOK,
  BANK_FTL_BOOK,
  bankingRelated,
  bankResearchWaves,
  deepResearchGlobalBanking,
  nextBankingDevelopments,
  endlessBankResearchDevelop,
  bankingCorpusLive,
  resetBankingCorpusLive,
  growBankingCorpusFromFindings,
  invertBanking,
  bankingGaps,
  type BankingDomain,
  type BankingRelated,
  type BankingInvertGap,
  type BankResearchWave,
  type GlobalBankingReport,
} from './research'

export {
  atomPath as bankChatPath,
  sealQuantumSecure,
  banksChat,
  developQuantumSecureBanking,
  quantumSecureBankingRelated,
  QUANTUM_SECURE_BANKING_CORPUS,
  QUANTUM_SECURE_BANKING_BOOK,
  type InterbankParticipant,
  type InterbankTurn,
  type QuantumSecureEnvelope,
  type InterbankChatReport,
  type QuantumSecureBankingReport,
} from './chat'

export const atomPath = 'bank' as const
