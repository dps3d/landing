import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero-секція (Головний екран)',
    plural: 'Hero-секції',
  },
  fields: [
    {
      name: 'anchor',
      type: 'text',
      label: 'ID секції (якір)',
      defaultValue: 'hero',
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Бейдж над заголовком',
      defaultValue: 'Академічна лабораторія • MCU Inventory System',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Головний заголовок',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Підзаголовок (опис платформи)',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Зображення Hero-секції',
      required: true,
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Кнопки дій (CTA)',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Текст кнопки',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Посилання (URL або #якір)',
          required: true,
        },
        {
          name: 'variant',
          type: 'select',
          label: 'Стиль кнопки',
          required: true,
          defaultValue: 'primary',
          options: [
            { label: 'Основна кнопка (Primary)', value: 'primary' },
            { label: 'Додаткова кнопка (Secondary)', value: 'secondary' },
            { label: 'Прозора кнопка (Ghost)', value: 'ghost' },
          ],
        },
      ],
    },
    {
      name: 'metrics',
      type: 'array',
      label: 'Ключові показники лабораторії (KPI)',
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Значення (напр. 38+ або MariaDB 13.0)',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Підпис показника',
          required: true,
        },
      ],
    },
  ],
}
