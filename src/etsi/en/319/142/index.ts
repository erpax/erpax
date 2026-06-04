/**
 * Public surface of the ETSI EN 319 142 PAdES standards module.
 *
 * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
 * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
 * @compliance EU 910/2014 eidas qualified-electronic-signature
 * @see ./profile.ts
 * @see ./signature-dictionary.ts
 */

export {
  type PadesLevel,
  type PadesSubFilter,
  PADES_DEFAULT_LEVEL,
  PADES_DEFAULT_SUBFILTER,
  padesLevelOid,
} from '@/etsi/en/319/142/profile'

export {
  buildPadesSignatureDictionary,
  type PadesSignatureDictionaryInput,
  type PadesSignatureDictionary,
} from '@/etsi/en/319/142/signature-dictionary'
