/**
 * medical — clinical hub composer; re-exports medical/device registry + EMR wire.
 *
 *   tsx src/medical/index.ts
 *
 * @audit hub re-exports delegate to medical/device; never hand-asserted modalities
 * @see ./device — ./device/SKILL.md
 */
export {
  MEDICAL_DEVICES,
  MODALITIES,
  devicesInCategory,
  deviceSpec,
  deviceReadingFromModality,
  observationsFromMedicalDevice,
  wireModalityToEmr,
  allModalitiesBoundaryHold,
  recordMedicalDeviceOnPath,
  type MedicalDeviceCategory,
  type MedicalDeviceModality,
  type MedicalDeviceSpec,
  type DeviceOutputSlot,
} from '@/medical/device'

if (import.meta.url === 'file://' + process.argv[1]) {
  import('@/medical/device').then(({ MODALITIES, wireModalityToEmr, allModalitiesBoundaryHold }) => {
    const at = '2026-06-08T12:00:00.000Z'
    const obs = wireModalityToEmr('monitor', [78, 97, 118], at)
    console.log(
      'medical — modalities=' +
        MODALITIES.length +
        ' · boundary=' +
        allModalitiesBoundaryHold() +
        ' · monitor codes=' +
        obs.map((o) => o.code).join('+'),
    )
  })
}
