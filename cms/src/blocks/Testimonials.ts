import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Відгуки інженерів та викладачів (Testimonials)',
    plural: 'Відгуки інженерів та викладачів',
  },
  fields: [
    {
      name: 'anchor',
      type: 'text',
      label: 'ID секції (якір)',
      defaultValue: 'testimonials',
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Тег секції',
      defaultValue: 'Досвід впровадження',
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
      label: 'Відгуки користувачів лабораторії',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: "Ім'я та прізвище",
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          label: 'Посада / роль у лабораторії',
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Текст відгуку',
          required: true,
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Оцінка (від 1 до 5)',
          required: true,
          min: 1,
          max: 5,
          defaultValue: 5,
        },
      ],
    },
  ],
}
