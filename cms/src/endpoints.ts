import type { Endpoint, PayloadRequest } from 'payload'

const DEFAULT_COMMON = {
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
}

const DEFAULT_HOME_PAGE = {
  path: '/',
  title: 'Головна — Лабораторний облік мікроконтролерів',
  blocks: [
    {
      type: 'hero',
      anchor: 'hero',
      badge: 'Академічна лабораторія • MCU Inventory System',
      title: 'Лабораторна система обліку мікроконтролерів, складських комірок та проєктів',
      subtitle:
        'Єдина веб-платформа для контролю лабораторного фонду радіодеталей, інтерактивного проєктування розпіновок мікросхем (Pinout Builder), просторового розміщення в органайзерах та автоматичного розрахунку специфікацій збірки (BOM).',
      image: {
        src: '/mcu-hero-board.svg',
        alt: 'Інтерактивна панель обліку мікроконтролерів STM32, ESP32, RP2040 та Pinout Builder',
      },
      buttons: [
        { text: 'Переглянути номенклатуру MCU', link: '#catalog', variant: 'primary' },
        { text: 'Функціональні модулі', link: '#features', variant: 'secondary' },
        { text: 'Як отримати доступ →', link: '#contacts', variant: 'ghost' },
      ],
      metrics: [
        { value: '42+', label: 'Позицій мікроконтролерів і сенсорів' },
        { value: '24', label: 'Адресні складські комірки' },
        { value: '12', label: 'Активних специфікацій BOM' },
        { value: 'Neon + InnoDB', label: 'Хмарна реляційна архітектура' },
      ],
    },
    {
      type: 'features',
      anchor: 'features',
      badge: 'Можливості платформи',
      title: 'Функціональні модулі системи',
      subtitle:
        'Платформа автоматизує повний життєвий цикл роботи навчальної та науково-дослідної лабораторії вбудованих систем (Embedded Systems).',
      items: [
        {
          icon: '🔌',
          moduleTag: 'Каталог та Pinout',
          title: 'Каталог та Pinout Builder',
          text: 'Централізована номенклатура мікроконтролерів (STM32, ESP32, AVR, RP2040) та периферійних модулів. Інтерактивна візуалізація розпіновки чіпів із колірним підсвічуванням шин (GPIO, I2C, SPI, UART, ADC, PWM, Power).',
          highlights: [
            'Миттєвий пошук за маркуванням, корпусом і номіналом',
            'Фільтрація за корпусами (DIP-28, LQFP-48, QFN-56, SOIC-8)',
            'Прямі посилання на офіційні PDF Datasheets',
          ],
        },
        {
          icon: '📦',
          moduleTag: 'Колірні комірки',
          title: 'Адресний складський облік',
          text: 'Точна топологія розміщення радіодеталей у касетних органайзерах, рядах та окремих комірках. Роздільний облік фізичного залишку та зарезервованих під проєкти компонентів.',
          highlights: [
            'Колірна індикація наявності та критичного дефіциту',
            'Швидкі операції поповнення та списання в 1 клік',
            'Журналювання складських транзакцій із фіксацією автора',
          ],
        },
        {
          icon: '📋',
          moduleTag: 'Проєкти та BOM',
          title: 'Специфікації проєктів (BOM)',
          text: 'Двопанельний конструктор переліку компонентів (Bill of Materials) для інженерних пристроїв. Автоматичний калькулятор готовності до збірки (Build Readiness) із розрахунком дефіцитних позицій.',
          highlights: [
            'Бронювання деталей зі складу під конкретний проєкт',
            'Підтримка публічних та приватних лабораторних розробок',
            'Автоматичний підрахунок вартості комплектації виробу',
          ],
        },
        {
          icon: '🛡️',
          moduleTag: 'Рольова безпека',
          title: 'Безпека та пре-модерація',
          text: 'Багаторівнева рольова модель: Гість (публічний огляд), Лаборант (керування власними BOM та резервами) і Викладач-Адміністратор (повний контроль складу та схвалення заявок).',
          highlights: [
            'Пре-модерація нових облікових записів викладачем',
            'Строга типізація полів у Payload CMS та TypeScript',
            'Безпечна робота з хмарною БД через змінні оточення (.env)',
          ],
        },
      ],
    },
    {
      type: 'showcase',
      anchor: 'catalog',
      badge: 'Відкрита номенклатура фонду',
      title: 'Актуальні позиції лабораторного складу',
      subtitle:
        'Приклад даних про мікроконтролери, драйвери та сенсори, що надходять через типізований REST API.',
      items: [
        {
          partNumber: 'STM32F103C8T6',
          category: '32-bit ARM Cortex-M3 • 72 MHz',
          packageType: 'LQFP-48',
          stockStatus: 'in_stock',
          quantity: 34,
          cellCode: 'ORG-A1 • R1-C2',
          architecture: '37×GPIO • 2×SPI • 2×I2C • 3×USART • CAN • USB 2.0',
          description:
            'Базовий мікроконтролер лінійки Performance Line (64 KB Flash, 20 KB SRAM) для лабораторних стендів та промислової автоматики.',
        },
        {
          partNumber: 'ESP32-WROOM-32D',
          category: 'Dual-Core Xtensa LX6 • Wi-Fi + BLE',
          packageType: 'Module',
          stockStatus: 'in_stock',
          quantity: 28,
          cellCode: 'ORG-A1 • R1-C1',
          architecture: '34×GPIO • Wi-Fi 802.11n • Bluetooth 4.2 BR/EDR + BLE • ADC/DAC',
          description:
            'Високоінтегрований радіомодуль для IoT-вузлів, телеметрії, MQTT-шлюзів та бездротових сенсорних мереж.',
        },
        {
          partNumber: 'RP2040 Dual ARM',
          category: 'Dual Cortex-M0+ • 133 MHz • PIO',
          packageType: 'QFN-56',
          stockStatus: 'in_stock',
          quantity: 19,
          cellCode: 'ORG-A1 • R2-C3',
          architecture: '30×GPIO • 8×PIO State Machines • 2×UART • 2×SPI • 2×I2C',
          description:
            "Мікроконтролер Raspberry Pi з програмованими автоматами вводу-виводу (PIO) та 264 KB вбудованої пам'яті SRAM.",
        },
        {
          partNumber: 'ATmega328P-PU',
          category: '8-bit AVR RISC • 20 MHz',
          packageType: 'DIP-28',
          stockStatus: 'low_stock',
          quantity: 6,
          cellCode: 'ORG-A2 • R1-C4',
          architecture: '23×GPIO • 6×PWM • 6×ADC (10-bit) • SPI • TWI (I2C) • USART',
          description:
            'Класичний мікроконтролер у наскрізному корпусі DIP-28 для швидкого макетування на Breadboard без пайки.',
        },
        {
          partNumber: 'BME280 Environmental',
          category: 'Цифровий сенсор T° / P / RH%',
          packageType: 'Module',
          stockStatus: 'reserved',
          quantity: 12,
          cellCode: 'ORG-B1 • R3-C1',
          architecture: 'I2C (0x76 / 0x77) • SPI (до 10 MHz) • 1.71V–3.6V',
          description:
            'Прецизійний комбінований датчик атмосферного тиску, вологості та температури Bosch Sensortec для метеостанцій.',
        },
        {
          partNumber: 'INA219AIDCNR',
          category: 'Цифровий монітор струму та потужності',
          packageType: 'SOIC-8',
          stockStatus: 'in_stock',
          quantity: 40,
          cellCode: 'ORG-B2 • R2-C2',
          architecture: 'I2C / SMBus • Shunt Voltage ±320mV • Bus 0–26V • 12-bit ADC',
          description:
            'Двонаправлений вимірювач струму, напруги та потужності на шині живлення до 26 В із 16 програмованими адресами I2C.',
        },
      ],
    },
    {
      type: 'testimonials',
      anchor: 'testimonials',
      badge: 'Досвід впровадження',
      title: 'Відгуки викладачів та інженерів лабораторії',
      subtitle:
        'Як перехід на централізований облік та інтерактивні розпіновки оптимізував навчальний і дослідницький процес.',
      items: [
        {
          name: 'Олександр Ковальчук',
          role: 'Керівник лабораторії мікропроцесорної техніки',
          text: 'Завдяки адресному обліку по касетних органайзерах та пре-модерації заявок час видачі комплектів на лабораторні роботи скоротився втричі, а втрати дефіцитних модулів STM32 та ESP32 зведені до нуля.',
          rating: 5,
        },
        {
          name: 'Ірина Мельник',
          role: 'Викладачка курсу вбудованих систем та IoT',
          text: 'Вбудований візуалізатор розпіновок (Pinout Builder) та калькулятор BOM дозволяють студентам перевіряти сумісність шин I2C/SPI та наявність деталей на складі ще до початку пайки прототипу.',
          rating: 5,
        },
        {
          name: 'Тарас Бойко',
          role: 'Лаборант-розробник дипломних проєктів',
          text: 'Поєднання Payload CMS, хмарної БД Neon та типізованого фронтенду на TypeScript зробило наповнення каталогу максимально захищеним від людських помилок редактора.',
          rating: 5,
        },
      ],
    },
    {
      type: 'contacts',
      anchor: 'contacts',
      badge: 'Швидкий старт та контакти',
      title: 'Як отримати доступ до роботи в лабораторії',
      subtitle:
        'Простий і прозорий алгоритм підключення нових лаборантів, студентів та викладачів до системи MCU Inventory.',
      phone: '+380 (32) 258-12-40',
      email: 'lab.mcu@inventory.edu.ua',
      address: 'м. Львів, вул. Володимира Великого, 51 • Корпус електроніки, ауд. 304',
      activeMonth: 'Жовтень',
      steps: [
        {
          stepBadge: 'Крок 1',
          title: 'Подання заявки в системі',
          text: 'Заповніть реєстраційну форму лаборанта: вкажіть ПІБ, навчальну групу або кафедру та робочий email.',
        },
        {
          stepBadge: 'Крок 2',
          title: 'Верифікація викладачем',
          text: 'Відповідальний адміністратор перевіряє заявку в панелі керування та активує обліковий запис (is_active = True).',
        },
        {
          stepBadge: 'Крок 3',
          title: 'Робота з BOM та складом',
          text: 'Створюйте власні інженерні проєкти, формуйте специфікації BOM та бронюйте мікроконтролери в адресних комірках.',
        },
      ],
    },
  ],
}

/**
 * Формування CORS-заголовків для крос-доменних запитів фронтенду
 */
function getCorsHeaders(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': process.env.FRONTEND_URL || '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

/**
 * Нормалізація об'єкта зображення з колекції Media у плоску структуру { src, alt }
 */
function normalizeMedia(image: unknown): { src: string; alt: string } {
  if (image && typeof image === 'object') {
    const mediaObj = image as { url?: string; src?: string; alt?: string }
    const rawUrl = mediaObj.url || mediaObj.src || ''
    const baseUrl = process.env.CMS_URL || ''
    const src = rawUrl.startsWith('http') ? rawUrl : rawUrl ? `${baseUrl}${rawUrl}` : '/mcu-hero-board.svg'
    return {
      src,
      alt: mediaObj.alt || 'MCU Inventory System',
    }
  }
  return {
    src: '/mcu-hero-board.svg',
    alt: 'MCU Inventory System',
  }
}

/**
 * Трансформація блоків Payload CMS (blockType -> type) у чисту плоску структуру для фронтенду
 */
function normalizeBlock(rawBlock: Record<string, unknown>): Record<string, unknown> {
  const { blockType, id, blockName, ...rest } = rawBlock
  const type = (blockType as string) || (rawBlock.type as string) || 'unknown'

  if (type === 'hero') {
    return {
      id,
      type: 'hero',
      anchor: rest.anchor || rest.ancor || 'hero',
      badge: rest.badge || '',
      title: rest.title || '',
      subtitle: rest.subtitle || '',
      image: normalizeMedia(rest.image),
      buttons: Array.isArray(rest.buttons)
        ? rest.buttons.map((btn: Record<string, unknown>) => ({
            text: String(btn.text || ''),
            link: String(btn.link || '#'),
            variant: (btn.variant as string) || 'primary',
          }))
        : [],
      metrics: Array.isArray(rest.metrics)
        ? rest.metrics.map((m: Record<string, unknown>) => ({
            value: String(m.value || ''),
            label: String(m.label || ''),
          }))
        : [],
    }
  }

  if (type === 'features') {
    return {
      id,
      type: 'features',
      anchor: rest.anchor || 'features',
      badge: rest.badge || '',
      title: rest.title || '',
      subtitle: rest.subtitle || '',
      items: Array.isArray(rest.items)
        ? rest.items.map((item: Record<string, unknown>) => ({
            icon: String(item.icon || '⚡'),
            moduleTag: String(item.moduleTag || 'Каталог та Pinout'),
            title: String(item.title || ''),
            text: String(item.text || ''),
            highlights: Array.isArray(item.highlights)
              ? item.highlights.map((h: unknown) =>
                  typeof h === 'string' ? h : String((h as Record<string, unknown>).point || '')
                )
              : [],
          }))
        : [],
    }
  }

  return {
    id,
    type,
    ...rest,
  }
}

/**
 * Обробник отримання наскрізних налаштувань із сутності Globals (Common)
 */
async function handleGetCommon(req: PayloadRequest): Promise<Response> {
  try {
    const common = await req.payload.findGlobal({
      slug: 'common',
      depth: 1,
    })

    if (!common || !common.siteName) {
      return Response.json(DEFAULT_COMMON, {
        status: 200,
        headers: getCorsHeaders(),
      })
    }

    const flatCommon = {
      siteName: common.siteName || DEFAULT_COMMON.siteName,
      headerPhone: common.headerPhone || DEFAULT_COMMON.headerPhone,
      dbStatus: common.dbStatus || DEFAULT_COMMON.dbStatus,
      menu:
        Array.isArray(common.menu) && common.menu.length > 0
          ? common.menu.map((item) => ({
              label: item.label,
              link: item.link,
            }))
          : DEFAULT_COMMON.menu,
      footer: {
        text: common.footer?.text || DEFAULT_COMMON.footer.text,
        systemInfo: common.footer?.systemInfo || DEFAULT_COMMON.footer.systemInfo,
      },
    }

    return Response.json(flatCommon, {
      status: 200,
      headers: getCorsHeaders(),
    })
  } catch {
    return Response.json(DEFAULT_COMMON, {
      status: 200,
      headers: getCorsHeaders(),
    })
  }
}

/**
 * Обробник отримання структури сторінки за параметром ?path=...
 */
async function handleGetPage(req: PayloadRequest): Promise<Response> {
  const url = new URL(req.url || 'http://localhost:3000/api/page')
  const pagePath = url.searchParams.get('path') || req.searchParams?.get('path') || '/'

  try {
    const result = await req.payload.find({
      collection: 'pages',
      where: {
        path: {
          equals: pagePath,
        },
      },
      depth: 2,
      limit: 1,
    })

    const pageDoc = result.docs[0]

    if (!pageDoc) {
      if (pagePath === '/') {
        return Response.json(DEFAULT_HOME_PAGE, {
          status: 200,
          headers: getCorsHeaders(),
        })
      }

      return Response.json(
        {
          error: `Сторінку за шляхом "${pagePath}" не знайдено в Payload CMS`,
          path: pagePath,
          statusCode: 404,
        },
        { status: 404, headers: getCorsHeaders() }
      )
    }

    const rawBlocks = Array.isArray(pageDoc.blocks) ? pageDoc.blocks : []
    const flatPage = {
      path: pageDoc.path,
      title: pageDoc.title,
      blocks:
        rawBlocks.length > 0
          ? rawBlocks.map((block) => normalizeBlock(block as unknown as Record<string, unknown>))
          : DEFAULT_HOME_PAGE.blocks,
    }

    return Response.json(flatPage, {
      status: 200,
      headers: getCorsHeaders(),
    })
  } catch {
    if (pagePath === '/') {
      return Response.json(DEFAULT_HOME_PAGE, {
        status: 200,
        headers: getCorsHeaders(),
      })
    }

    return Response.json(
      { error: `Сторінку за шляхом "${pagePath}" не знайдено`, statusCode: 404 },
      { status: 404, headers: getCorsHeaders() }
    )
  }
}

/**
 * Кастомний ендпоінт /api/common (та аліас /api/settings)
 */
export const commonEndpoint: Endpoint = {
  path: '/common',
  method: 'get',
  handler: handleGetCommon,
}

export const settingsEndpoint: Endpoint = {
  path: '/settings',
  method: 'get',
  handler: handleGetCommon,
}

/**
 * Кастомний ендпоінт /api/page?path=... (та аліас /api/pages?path=...)
 */
export const pageEndpoint: Endpoint = {
  path: '/page',
  method: 'get',
  handler: handleGetPage,
}

export const pagesEndpoint: Endpoint = {
  path: '/pages',
  method: 'get',
  handler: handleGetPage,
}
