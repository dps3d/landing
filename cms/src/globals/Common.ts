import type { GlobalConfig } from 'payload'

export const Common: GlobalConfig = {
  slug: 'common',
  label: 'Налаштування сайту (Globals)',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Назва сайту / системи',
      required: true,
      defaultValue: 'MCU Inventory System',
    },
    {
      name: 'headerPhone',
      type: 'text',
      label: 'Телефон лабораторії у хедері',
      defaultValue: '+380 (32) 258-12-40',
    },
    {
      name: 'dbStatus',
      type: 'select',
      label: 'Індикатор стану СУБД у топбарі',
      required: true,
      defaultValue: 'online',
      options: [
        { label: 'БД активна (Neon PostgreSQL / MariaDB)', value: 'online' },
        { label: 'Технічне обслуговування', value: 'maintenance' },
      ],
    },
    {
      name: 'menu',
      type: 'array',
      label: 'Головне меню навігації',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Текст пункту меню',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Посилання (URL або #якір)',
          required: true,
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Футер сайту',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Текст опису у футері',
          required: true,
        },
        {
          name: 'systemInfo',
          type: 'text',
          label: 'Технологічний підпис (Stack)',
          defaultValue: 'Payload CMS 3.0 • Neon PostgreSQL • Vite + TypeScript',
        },
      ],
    },
  ],
}
