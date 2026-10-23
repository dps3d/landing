import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  try {
    const common = await payload.updateGlobal({
      slug: 'common',
      data: {
        siteName: 'MCU Inventory System',
        headerPhone: '+380 (32) 258-12-40',
        dbStatus: 'online',
        menu: [
          { label: 'Модулі платформи', link: '#features' },
          { label: 'Номенклатура MCU', link: '#catalog' },
          { label: 'Досвід лабораторії', link: '#testimonials' },
          { label: 'Підключення та контакти', link: '#contacts' },
        ],
        footer: {
          text: 'Єдина лабораторна веб-платформа обліку мікроконтролерів, інтерактивних розпіновок (Pinout Builder), адресних складських комірок та специфікацій інженерних проєктів (BOM).',
          systemInfo: 'Payload CMS 3.0 • Neon Serverless PostgreSQL • Vite + TypeScript',
        },
      },
    })

    return Response.json({
      success: true,
      message: 'Налаштування Common для MCU Inventory System успішно синхронізовано з Neon PostgreSQL',
      common,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}
