import type { Block } from 'payload'

export const Contacts: Block = {
  slug: 'contacts',
  labels: {
    singular: 'Контакти та підключення (Contacts)',
    plural: 'Контакти та підключення',
  },
  fields: [
    {
      name: 'anchor',
      type: 'text',
      label: 'ID секції (якір)',
      defaultValue: 'contacts',
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Тег секції',
      defaultValue: 'Швидкий старт та контакти',
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
      name: 'phone',
      type: 'text',
      label: 'Контактний телефон лабораторії',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      label: 'Електронна пошта (Email)',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      label: 'Адреса та аудиторія лабораторії',
      required: true,
    },
    {
      name: 'activeMonth',
      type: 'select',
      label: 'Поточний місяць ревізії складу',
      required: true,
      defaultValue: 'Жовтень',
      options: [
        { label: 'Вересень', value: 'Вересень' },
        { label: 'Жовтень', value: 'Жовтень' },
        { label: 'Листопад', value: 'Листопад' },
        { label: 'Грудень', value: 'Грудень' },
        { label: 'Січень', value: 'Січень' },
        { label: 'Лютий', value: 'Лютий' },
        { label: 'Березень', value: 'Березень' },
        { label: 'Квітень', value: 'Квітень' },
        { label: 'Травень', value: 'Травень' },
        { label: 'Червень', value: 'Червень' },
      ],
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Кроки підключення нових користувачів (Onboarding)',
      fields: [
        {
          name: 'stepBadge',
          type: 'text',
          label: 'Номер кроку (напр. Крок 1)',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Назва кроку',
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Опис дій користувача',
          required: true,
        },
      ],
    },
  ],
}
