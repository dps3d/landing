import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Користувач CMS',
    plural: 'Користувачі CMS',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'fullName',
      type: 'text',
      label: "Ім'я та прізвище",
    },
    {
      name: 'role',
      type: 'select',
      label: 'Роль у лабораторії',
      required: true,
      defaultValue: 'admin',
      options: [
        { label: 'Адміністратор системи', value: 'admin' },
        { label: 'Викладач лабораторії', value: 'instructor' },
        { label: 'Лаборант / Редактор', value: 'lab_assistant' },
      ],
    },
  ],
}
