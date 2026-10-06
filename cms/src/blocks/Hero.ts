// import { relations } from "@payloadcms/db-postgres/drizzle"
import {Block} from "payload"
// import { tr } from "payload/i18n/tr"

export const Hero: Block = {
    slug: "hero",
    labels: {singular: "Hero", plural: "Hero"},
    fields: [
        {name: "ancor", type: "text", label: "ID секції"},
        {name: "badge", type: "text", label: "Лейба"},
        {name: "title", type: "text", label: "Заголовок", required: true},
        {name: "subtitle", type: "textarea", label: "Підзаголовок", required: true},
        {name: "image", type: "upload", relationTo: "media", label:"Зображення", required: true},
        {name: "buttons", type: "array", label: "Кнопки", fields: [
            {name:"text", type: "text", required: true},
            {name:"link", type: "text", required: true},
            {name:"variant", type: "select", required: true, defaultValue: "primary", options: [
                {label: "Основна кнопка", value: "primary"},
                {label: "Додаткова кнопка", value: "secondary"}
            ]},
        ]},
    ]

}