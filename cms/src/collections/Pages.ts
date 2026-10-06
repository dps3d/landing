import type { CollectionConfig } from 'payload'
import {Hero} from '../blocks/Hero'
import {Features, features} from '../blocks/Features'

export const Pages: CollectionConfig = {
    slug: "pages",
    labels: {plural: "Сторінки", singular: "Сторінка"},
    access: {read: () => true},
    admin: {useAsTitle: "title"},
    fields: [
        {
            name: "path",
            type: "text",
            label: "URL сторінки",
            required: true,
            unique: true,
            defaultValue: "/",
        },
        {
            name: "blocks",
            type: "blocks",
            label: "Блоки",
            blocks: [Hero, Features]
        },
    ],
}