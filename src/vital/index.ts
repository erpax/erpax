/**
 * vital — vitals category facet; pivot to @/medical/device vitals registry.
 */
import { devicesInCategory, wireModalityToEmr, deviceReadingFromBp } from '@/medical/device'

export { devicesInCategory, wireModalityToEmr, deviceReadingFromBp }

export const vitalDevices = () => devicesInCategory('vitals')
