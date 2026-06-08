import { describe, expect, it } from 'vitest'
import * as Ui from '@/ui'

/** Expected shadcn catalog exports (46 components + cn). */
const EXPECTED_EXPORTS = [
  'cn',
  'Accordion',
  'Alert',
  'AlertDialog',
  'AspectRatio',
  'Avatar',
  'Badge',
  'Breadcrumb',
  'Button',
  'Calendar',
  'Card',
  'Carousel',
  'ChartContainer',
  'Checkbox',
  'Collapsible',
  'Command',
  'ContextMenu',
  'Dialog',
  'Drawer',
  'DropdownMenu',
  'Form',
  'HoverCard',
  'Input',
  'InputOTP',
  'Label',
  'Menubar',
  'NavigationMenu',
  'Pagination',
  'Popover',
  'Progress',
  'RadioGroup',
  'ResizablePanelGroup',
  'ScrollArea',
  'Select',
  'Separator',
  'Sheet',
  'Sidebar',
  'Skeleton',
  'Slider',
  'Toaster',
  'Switch',
  'Table',
  'Tabs',
  'Textarea',
  'Toggle',
  'ToggleGroup',
  'Tooltip',
] as const

describe('ui — shadcn barrel smoke', () => {
  it('imports every catalog export from @/ui', () => {
    for (const name of EXPECTED_EXPORTS) {
      expect(Ui, `missing export: ${name}`).toHaveProperty(name)
    }
  })

  it('cn utility is a function', () => {
    expect(Ui.cn).toBeTypeOf('function')
  })
})
