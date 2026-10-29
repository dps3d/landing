import './styles/base.css';
import { API_URL, getCommon, getPage } from './api';
import { header } from './layout/header';
import { footer } from './layout/footer';
import { renderBlocks } from './renderBlocks';
import type { LandingBundle, ThemeMode, UIState } from './types';

const app = document.querySelector<HTMLDivElement>('#app');
const THEME_STORAGE_KEY = 'mcu_theme';

/**
 * Отримання початкової теми: збережена в LocalStorage або системна
 */
function getInitialTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    // fallback
  }
  return 'light';
}

let currentTheme: ThemeMode = getInitialTheme();
document.documentElement.setAttribute('data-theme', currentTheme);

/**
 * Встановлення та синхронізація теми оформлення
 */
function setTheme(newTheme: ThemeMode): void {
  currentTheme = newTheme;
  document.documentElement.setAttribute('data-theme', newTheme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  } catch {
    // ignore
  }

  // Оновлюємо ілюстрацію плати STM32 у блоці Hero
  const heroImg = document.querySelector<HTMLImageElement>('.hero__image');
  if (heroImg) {
    heroImg.src = newTheme === 'dark' ? '/mcu-hero-board-dark.svg' : '/mcu-hero-board.svg';
  }

  // Оновлюємо кнопку в шапці (Header)
  const themeToggle = document.querySelector<HTMLButtonElement>('#themeToggle');
  if (themeToggle) {
    const nextTheme: ThemeMode = newTheme === 'dark' ? 'light' : 'dark';
    const nextIcon = newTheme === 'dark' ? '☀️' : '🌙';
    const nextLabel = newTheme === 'dark' ? 'Світла тема' : 'Темна тема';
    themeToggle.setAttribute('data-theme-target', nextTheme);
    themeToggle.setAttribute('title', `Перемкнути на: ${nextLabel}`);
    const iconSpan = themeToggle.querySelector('.theme-toggle__icon');
    const labelSpan = themeToggle.querySelector('.theme-toggle__label');
    if (iconSpan) iconSpan.textContent = nextIcon;
    if (labelSpan) labelSpan.textContent = nextLabel;
  }

  // Оновлюємо активний стан кнопок теми в тулбарі
  const themeBtns = document.querySelectorAll<HTMLButtonElement>('[data-theme-set]');
  themeBtns.forEach((btn) => {
    const btnTheme = btn.getAttribute('data-theme-set');
    if (btnTheme === newTheme) {
      btn.classList.add('demo-btn--active');
    } else {
      btn.classList.remove('demo-btn--active');
    }
  });

  const themeLabelStrong = document.querySelector<HTMLElement>('.demo-toolbar__theme-val');
  if (themeLabelStrong) {
    themeLabelStrong.textContent = newTheme === 'dark' ? 'ТЕМНА' : 'СВІТЛА';
  }
}

/**
 * Рендеринг верхньої панелі для швидкої демонстрації трьох станів UI (Вимога 3.2) та перемикача тем
 */
function renderDemoToolbar(
  activeStatus: UIState<LandingBundle>['status'],
  theme: ThemeMode
): string {
  return `
    <div class="demo-toolbar" role="region" aria-label="Перемикач станів інтерфейсу та колірної теми">
      <div class="demo-toolbar__group">
        <span class="demo-toolbar__label">
          ⚡ Стан UI (TypeScript Union State): <strong>${activeStatus.toUpperCase()}</strong>
        </span>
        <div class="demo-toolbar__controls">
          <button type="button" class="demo-btn ${activeStatus === 'ready' ? 'demo-btn--active' : ''}" data-demo-state="ready">
            1. Готовність (Ready)
          </button>
          <button type="button" class="demo-btn ${activeStatus === 'loading' ? 'demo-btn--active' : ''}" data-demo-state="loading">
            2. Завантаження (Loading)
          </button>
          <button type="button" class="demo-btn ${activeStatus === 'error' ? 'demo-btn--active' : ''}" data-demo-state="error">
            3. Помилка API (Error)
          </button>
        </div>
      </div>

      <div class="demo-toolbar__group demo-toolbar__theme-group">
        <span class="demo-toolbar__label">
          🎨 Тема: <strong class="demo-toolbar__theme-val">${theme === 'dark' ? 'ТЕМНА' : 'СВІТЛА'}</strong>
        </span>
        <div class="demo-toolbar__controls">
          <button type="button" class="demo-btn demo-btn--theme ${theme === 'light' ? 'demo-btn--active' : ''}" data-theme-set="light">
            ☀️ Світла
          </button>
          <button type="button" class="demo-btn demo-btn--theme ${theme === 'dark' ? 'demo-btn--active' : ''}" data-theme-set="dark">
            🌙 Темна
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Відображення поточного стану застосунку (loading | error | ready)
 */
function renderAppState(state: UIState<LandingBundle>): void {
  if (!app) return;

  if (state.status === 'loading') {
    app.innerHTML = `
      ${renderDemoToolbar('loading', currentTheme)}
      <div class="ui-state-box" role="status" aria-live="polite">
        <div class="ui-spinner" aria-hidden="true"></div>
        <span class="ui-state-box__badge ui-state-box__badge--loading">STATE: LOADING</span>
        <h2 class="ui-state-box__title">Завантаження даних лабораторної системи...</h2>
        <p class="ui-state-box__desc">${state.message}</p>
        <div class="skeleton-grid" aria-hidden="true">
          <div class="skeleton-card">
            <div class="skeleton-line skeleton-line--short"></div>
            <div class="skeleton-line skeleton-line--med"></div>
            <div class="skeleton-line"></div>
          </div>
          <div class="skeleton-card">
            <div class="skeleton-line skeleton-line--short"></div>
            <div class="skeleton-line skeleton-line--med"></div>
            <div class="skeleton-line"></div>
          </div>
          <div class="skeleton-card">
            <div class="skeleton-line skeleton-line--short"></div>
            <div class="skeleton-line skeleton-line--med"></div>
            <div class="skeleton-line"></div>
          </div>
        </div>
      </div>
    `;
    bindDemoButtons();
    bindThemeToggles();
    return;
  }

  if (state.status === 'error') {
    app.innerHTML = `
      ${renderDemoToolbar('error', currentTheme)}
      <div class="ui-state-box ui-state-box--error" role="alert">
        <span class="ui-state-box__badge ui-state-box__badge--error">STATE: ERROR • TRY...CATCH</span>
        <h2 class="ui-state-box__title">Щось пішло не так під час звернення до API</h2>
        <p class="ui-state-box__desc">
          Не вдалося завантажити конфігурацію сторінки з бекенду Payload CMS / Neon PostgreSQL.
          Перевірте запущений сервер або мережеве з'єднання.
        </p>
        <div class="ui-state-box__code">
          Помилка: ${state.errorMessage} | Ендпоінт: ${state.endpointUrl}
        </div>
        <div>
          <button type="button" class="btn btn--primary" id="retryBtn">
            Спробувати знову
          </button>
        </div>
      </div>
    `;
    bindDemoButtons();
    bindThemeToggles();
    const retryBtn = document.querySelector<HTMLButtonElement>('#retryBtn');
    retryBtn?.addEventListener('click', () => {
      void start();
    });
    return;
  }

  // Стан готовності (status === 'ready')
  const { common, page } = state.data;
  document.title = `${page.title} — ${common.siteName}`;

  app.innerHTML = `
    ${renderDemoToolbar('ready', currentTheme)}
    ${header(common, currentTheme)}
    <main>${renderBlocks(page.blocks)}</main>
    ${footer(common)}
  `;
  bindDemoButtons();
  bindThemeToggles();
}

/**
 * Прив'язка обробників кліку для демонстраційних кнопок перемикання станів UI
 */
function bindDemoButtons(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-demo-state]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetState = btn.getAttribute('data-demo-state');
      if (targetState === 'loading') {
        renderAppState({
          status: 'loading',
          message: `Виконується асинхронний запит Promise.all([getCommon(), getPage('${location.pathname}')]) до ${API_URL}...`,
        });
      } else if (targetState === 'error') {
        renderAppState({
          status: 'error',
          errorMessage: 'HTTP status: 503 Service Unavailable (База даних Neon тимчасово недоступна або маршрут не знайдено)',
          endpointUrl: `${API_URL}/api/page?path=${location.pathname}`,
        });
      } else {
        void start('ready');
      }
    });
  });
}

/**
 * Прив'язка обробників кліку для перемикачів теми (у шапці та в тулбарі)
 */
function bindThemeToggles(): void {
  const headerToggle = document.querySelector<HTMLButtonElement>('#themeToggle');
  headerToggle?.addEventListener('click', () => {
    const target = headerToggle.getAttribute('data-theme-target') as ThemeMode;
    setTheme(target || (currentTheme === 'dark' ? 'light' : 'dark'));
  });

  const themeBtns = document.querySelectorAll<HTMLButtonElement>('[data-theme-set]');
  themeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-theme-set') as ThemeMode;
      if (target === 'light' || target === 'dark') {
        setTheme(target);
      }
    });
  });
}

/**
 * Головна асинхронна функція ініціалізації клієнтського застосунку
 */
async function start(forceState?: string): Promise<void> {
  const urlParams = new URLSearchParams(location.search);
  const requestedState = forceState || urlParams.get('state');
  const currentPath: string = urlParams.get('path') || location.pathname || '/';

  // 1. Встановлюємо початковий стан завантаження (Loading)
  renderAppState({
    status: 'loading',
    message: `Очікування відповіді від ${API_URL}/api/common та /api/page?path=${currentPath}...`,
  });

  if (requestedState === 'loading') {
    return;
  }

  if (requestedState === 'error') {
    renderAppState({
      status: 'error',
      errorMessage: 'HTTP status: 404 (Сторінку за шляхом "/unknown-route" не знайдено в Payload CMS)',
      endpointUrl: `${API_URL}/api/page?path=/unknown-route`,
    });
    return;
  }

  // 2. Виконуємо паралельні асинхронні запити до API у блоці try...catch
  try {
    const [common, page] = await Promise.all([
      getCommon(),
      getPage(currentPath),
    ]);

    // 3. Переводимо інтерфейс у стан готовності (Ready)
    renderAppState({
      status: 'ready',
      data: { common, page },
    });
  } catch (error: unknown) {
    const errorMessage: string =
      error instanceof Error ? error.message : 'Невідома мережева помилка';

    // 4. Перехоплюємо збій та показуємо інформативний стан помилки (Error)
    renderAppState({
      status: 'error',
      errorMessage,
      endpointUrl: `${API_URL}/api/page?path=${currentPath}`,
    });
  }
}

void start();
