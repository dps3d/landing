import type { Block } from 'payload'

export const Features: Block = {
  slug: 'features',
  labels: {
    singular: 'Функціональні модулі (Features)',
    plural: 'Функціональні модулі (Features)',
  },
  fields: [
    {
      name: 'anchor',
      type: 'text',
      label: 'ID секції (якір)',
      defaultValue: 'features',
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Тег секції',
      defaultValue: 'Можливості платформи',
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
      label: 'Модулі та переваги системи',
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Іконка (емодзі або символ)',
          required: true,
        },
        {
          name: 'moduleTag',
          type: 'select',
          label: 'Категорія модуля',
          required: true,
          defaultValue: 'Каталог та Pinout',
          options: [
            { label: 'Каталог та Pinout', value: 'Каталог та Pinout' },
            { label: 'Колірні комірки', value: 'Колірні комірки' },
            { label: 'Проєкти та BOM', value: 'Проєкти та BOM' },
            { label: 'Рольова безпека', value: 'Рольова безпека' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          label: 'Назва модуля',
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Опис модуля',
          required: true,
        },
        {
          name: 'highlights',
          type: 'array',
          label: 'Ключові можливості (список)',
          fields: [
            {
              name: 'point',
              type: 'text',
              label: 'Пункт списку',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
