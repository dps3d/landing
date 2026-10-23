import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Медіафайл',
    plural: 'Медіафайли (Фото компонентів)',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Альтернативний текст (Alt)',
      required: true,
    },
    {
      name: 'componentCode',
      type: 'text',
      label: 'Маркування компонента (напр. STM32F103C8T6)',
    },
  ],
  upload: true,
}
