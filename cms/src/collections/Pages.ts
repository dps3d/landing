import type { CollectionConfig } from 'payload'
import { Hero } from '../blocks/Hero'
import { Features } from '../blocks/Features'
import { Showcase } from '../blocks/Showcase'
import { Testimonials } from '../blocks/Testimonials'
import { Contacts } from '../blocks/Contacts'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Сторінка',
    plural: 'Сторінки',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', 'updatedAt'],
  },
  fields: [
    {
      name: 'path',
      type: 'text',
      label: 'URL-шлях сторінки (напр. / або /about)',
      required: true,
      unique: true,
      defaultValue: '/',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Назва сторінки (Title)',
      required: true,
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Блоки конструктора сторінки',
      blocks: [Hero, Features, Showcase, Testimonials, Contacts],
    },
  ],
}
