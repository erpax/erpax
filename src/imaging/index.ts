/**
 * imaging — modality category facet; pivot to @/medical/device imaging registry.
 */
import { devicesInCategory, wireModalityToEmr, type MedicalDeviceSpec } from '@/medical/device'

export { devicesInCategory, wireModalityToEmr, type MedicalDeviceSpec }

export const imagingDevices = () => devicesInCategory('imaging')
