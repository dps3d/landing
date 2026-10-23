/**
 * ============================================================================
 * ТИПІЗАЦІЯ ПРОЄКТУ MCU INVENTORY SYSTEM (Вимога 3.3)
 * - Type Aliases (псевдоніми типів)
 * - Union Types (об'єднання типів та дискриміновані об'єднання)
 * - Intersection Types (перетин типів для композиції схем блоків)
 * - Типізація функцій, об'єктів та відповідей API
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. TYPE ALIASES & UNION TYPES (Літеральні об'єднання та псевдоніми)
// ----------------------------------------------------------------------------

/** Псевдонім типу для URL-шляху сторінки (напр. "/" або "/about") */
export type PagePath = string;

/** Псевдонім типу для HTML-якоря секції */
export type SectionAnchor = string;

/** Варіанти стилізації кнопок у Hero-блоці (Union Type) */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

/** Статус підключення до бази даних у шапці сайту (Union Type) */
export type DbHealthStatus = 'online' | 'maintenance' | 'offline';

/** Корпуси електронних компонентів у лабораторії (Union Type) */
export type PackageType = 'LQFP-48' | 'QFN-56' | 'DIP-28' | 'SOIC-8' | 'Module';

/** Статус складського залишку в комірці органайзера (Union Type) */
export type StockStatus = 'in_stock' | 'low_stock' | 'reserved';

/** Категорія функціонального модуля системи (Union Type) */
export type ModuleCategoryTag =
  | 'Каталог та Pinout'
  | 'Колірні комірки'
  | 'Проєкти та BOM'
  | 'Рольова безпека';

/** Допустимі оцінки відгуків (Union Type числових літералів) */
export type RatingValue = 1 | 2 | 3 | 4 | 5;

/** Назви місяців ревізії складу (строгий список Select у CMS) */
export type RevisionMonth =
  | 'Вересень'
  | 'Жовтень'
  | 'Листопад'
  | 'Грудень'
  | 'Січень'
  | 'Лютий'
  | 'Березень'
  | 'Квітень'
  | 'Травень'
  | 'Червень';

// ----------------------------------------------------------------------------
// 2. БАЗОВІ ТИПИ ОБ'ЄКТІВ ТА СПІЛЬНІ ВЛАСТИВОСТІ (для Intersection Types)
// ----------------------------------------------------------------------------

/** Базові ідентифікаційні поля будь-якого блоку сторінки */
export type BlockIdentity = {
  id?: string;
  anchor?: SectionAnchor;
};

/** Базові заголовкові поля секції лендингу */
export type BlockHeading = {
  badge?: string;
  title: string;
  subtitle?: string;
};

/**
 * INTERSECTION TYPE (&): поєднання ідентифікатора секції та заголовкових полів
 */
export type BaseSectionBlock = BlockIdentity & BlockHeading;

/** Об'єкт зображення з колекції Media */
export type MediaImage = {
  src: string;
  alt: string;
};

/** Кнопка дії (Call-To-Action) */
export type ActionButton = {
  text: string;
  link: string;
  variant: ButtonVariant;
};

/** Показник KPI у Hero-блоці */
export type HeroMetric = {
  value: string;
  label: string;
};

/** Елемент списку функціональних модулів */
export type FeatureItem = {
  icon: string;
  moduleTag?: ModuleCategoryTag | string;
  title: string;
  text: string;
  highlights?: string[];
};

/** Позиція номенклатури мікроконтролера / компонента у вітрині складу */
export type ComponentShowcaseItem = {
  partNumber: string;
  category: string;
  packageType: PackageType;
  stockStatus: StockStatus;
  quantity: number;
  cellCode: string;
  architecture?: string;
  description?: string;
};

/** Елемент відгуку викладача або інженера лабораторії */
export type TestimonialItem = {
  name: string;
  role?: string;
  text: string;
  rating: RatingValue | number;
};

/** Крок підключення нового користувача (Onboarding) */
export type OnboardingStep = {
  stepBadge: string;
  title: string;
  text: string;
};

// ----------------------------------------------------------------------------
// 3. INTERSECTION TYPES (&) ДЛЯ ОПИСУ СХЕМ ОКРЕМИХ БЛОКІВ СТОРІНКИ
// ----------------------------------------------------------------------------

/** Схема блоку Hero (перетин BaseSectionBlock та специфічних полів Hero) */
export type HeroBlock = BaseSectionBlock & {
  type: 'hero';
  image: MediaImage;
  buttons: ActionButton[];
  metrics?: HeroMetric[];
};

/** Схема блоку Features (перетин BaseSectionBlock та масиву модулів) */
export type FeaturesBlock = BaseSectionBlock & {
  type: 'features';
  items: FeatureItem[];
};

/** Схема блоку Showcase (вітрина мікроконтролерів і комірок складу) */
export type ShowcaseBlock = BaseSectionBlock & {
  type: 'showcase';
  items: ComponentShowcaseItem[];
};

/** Схема блоку Testimonials (відгуки інженерів та викладачів) */
export type TestimonialsBlock = BaseSectionBlock & {
  type: 'testimonials';
  items: TestimonialItem[];
};

/** Схема блоку Contacts (контакти лабораторії та алгоритм підключення) */
export type ContactsBlock = BaseSectionBlock & {
  type: 'contacts';
  phone: string;
  email: string;
  address: string;
  activeMonth?: RevisionMonth | string;
  steps?: OnboardingStep[];
};

// ----------------------------------------------------------------------------
// 4. DISCRIMINATED UNION TYPE (|) ДЛЯ КОНСТРУКТОРА БЛОКІВ СТОРІНКИ
// ----------------------------------------------------------------------------

/**
 * Об'єднаний тип (Discriminated Union) усіх можливих блоків сторінки.
 * Дискримінатором виступає поле `type`.
 */
export type PageBlock =
  | HeroBlock
  | FeaturesBlock
  | ShowcaseBlock
  | TestimonialsBlock
  | ContactsBlock;

/** Тип усіх підтримуваних назв блоків: 'hero' | 'features' | 'showcase' | 'testimonials' | 'contacts' */
export type BlockType = PageBlock['type'];

// ----------------------------------------------------------------------------
// 5. ТИПІЗАЦІЯ ДАНИХ, ОТРИМАНИХ ЧЕРЕЗ API (/api/common та /api/page)
// ----------------------------------------------------------------------------

/** Пункт головного навігаційного меню */
export type MenuItem = {
  label: string;
  link: string;
};

/** Налаштування футера з глобальної сутності Common */
export type FooterSettings = {
  text: string;
  systemInfo?: string;
};

/** Відповідь кастомного ендпоінта /api/common (Globals: Common) */
export type CommonSettings = {
  siteName: string;
  headerPhone?: string;
  dbStatus?: DbHealthStatus;
  menu: MenuItem[];
  footer: FooterSettings;
};

/** Відповідь кастомного ендпоінта /api/page?path=... (Collection: Pages) */
export type PageData = {
  path: PagePath;
  title: string;
  blocks: PageBlock[];
};

/** Помилка API (наприклад, 404 Page not found або 500 Server Error) */
export type ApiErrorPayload = {
  error: string;
  path?: string;
  statusCode?: number;
};

/** Об'єднані дані для повного рендерингу клієнтського застосунку */
export type LandingBundle = {
  common: CommonSettings;
  page: PageData;
};

// ----------------------------------------------------------------------------
// 6. ТИПІЗАЦІЯ СТАНІВ UI (Завантаження / Помилка / Готовність) ТА ФУНКЦІЙ
// ----------------------------------------------------------------------------

/** Дискримінований Union Type для опису трьох станів інтерфейсу (Вимога 3.2 та 3.3) */
export type UIState<T> =
  | { status: 'loading'; message: string }
  | { status: 'ready'; data: T }
  | { status: 'error'; errorMessage: string; endpointUrl: string };

/** Узагальнений (Generic) тип функції-шаблонізатора блоку */
export type BlockRenderer<B extends PageBlock = PageBlock> = (block: B) => string;

/** Суворо типізований словник рендерерів для кожного типу блоку */
export type BlockRendererRegistry = {
  [K in BlockType]: BlockRenderer<Extract<PageBlock, { type: K }>>;
};

/** Тип асинхронної функції запиту до API */
export type ApiGetFunction = <T>(endpoint: string) => Promise<T>;
