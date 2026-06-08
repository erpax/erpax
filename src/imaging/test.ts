import { describe, it, expect } from 'vitest'
import { imagingDevices } from '@/imaging'
import { devicesInCategory } from '@/medical/device'

describe('imaging — IS medical/device imaging category', () => {
  it('lists five imaging modalities from the registry', () => {
    expect(imagingDevices()).toEqual(devicesInCategory('imaging'))
    expect(imagingDevices().map((d) => d.modality).sort()).toEqual([
      'ct',
      'mri',
      'pet',
      'ultrasound',
      'xray',
    ])
  })
})
