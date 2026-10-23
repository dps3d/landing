import type { Block } from 'payload'

export const Showcase: Block = {
  slug: 'showcase',
  labels: {
    singular: 'Вітрина компонентів (MCU Showcase)',
    plural: 'Вітрини компонентів (MCU Showcase)',
  },
  fields: [
    {
      name: 'anchor',
      type: 'text',
      label: 'ID секції (якір)',
      defaultValue: 'catalog',
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Тег секції',
      defaultValue: 'Відкрита номенклатура фонду',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок секції',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Підзаголовок секції',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Позиції номенклатури мікроконтролерів і сенсорів',
      fields: [
        {
          name: 'partNumber',
          type: 'text',
          label: 'Маркування (Part Number)',
          required: true,
        },
        {
          name: 'category',
          type: 'text',
          label: 'Категорія (напр. 32-bit ARM Cortex-M3)',
          required: true,
        },
        {
          name: 'packageType',
          type: 'select',
          label: 'Тип корпусу (Package)',
          required: true,
          defaultValue: 'LQFP-48',
          options: [
            { label: 'LQFP-48 (SMD)', value: 'LQFP-48' },
            { label: 'QFN-56 / QFN-32', value: 'QFN-56' },
            { label: 'DIP-28 (THT)', value: 'DIP-28' },
            { label: 'SOIC-8 (SMD)', value: 'SOIC-8' },
            { label: 'SMD Module / Shield', value: 'Module' },
          ],
        },
        {
          name: 'stockStatus',
          type: 'select',
          label: 'Статус наявності на складі',
          required: true,
          defaultValue: 'in_stock',
          options: [
            { label: 'В наявності (In Stock)', value: 'in_stock' },
            { label: 'Малий залишок (Low Stock)', value: 'low_stock' },
            { label: 'Зарезервовано під BOM (Reserved)', value: 'reserved' },
          ],
        },
        {
          name: 'quantity',
          type: 'number',
          label: 'Кількість у комірці (шт.)',
          required: true,
          defaultValue: 25,
        },
        {
          name: 'cellCode',
          type: 'text',
          label: 'Адресна комірка (напр. ORG-A1 • R2-C4)',
          required: true,
        },
        {
          name: 'architecture',
          type: 'text',
          label: 'Інтерфейси / розпіновка (GPIO, I2C, SPI, UART)',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Технічний опис компонента',
        },
      ],
    },
  ],
}
