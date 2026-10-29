import type { CommonSettings, MenuItem, ThemeMode } from '../types';

export function header(
  { siteName, dbStatus = 'online', menu }: CommonSettings,
  currentTheme: ThemeMode = 'light'
): string {
  const isOnline: boolean = dbStatus === 'online';
  const statusLabel: string = isOnline ? 'БД активна (Neon)' : 'Обслуговування БД';
  const statusClass: string = isOnline ? 'status-pill--ready' : 'status-pill--warn';

  const navLinksHtml: string = menu
    .map(
      ({ label, link }: MenuItem): string =>
        `<a class="header__link" href="${link}">${label}</a>`
    )
    .join('');

  const nextTheme: ThemeMode = currentTheme === 'dark' ? 'light' : 'dark';
  const themeIcon: string = currentTheme === 'dark' ? '☀️' : '🌙';
  const themeLabel: string = currentTheme === 'dark' ? 'Світла тема' : 'Темна тема';

  return `
    <header class="header">
      <div class="header__brand">
        <a class="header__logo" href="/">
          <span class="header__logo-icon" aria-hidden="true">🔌</span>
          <span>${siteName}</span>
        </a>
        <span class="status-pill ${statusClass}" title="Статус хмарної бази даних Neon PostgreSQL">
          <span class="status-pill__dot"></span>
          <span>${statusLabel}</span>
        </span>
      </div>

      <nav class="header__nav" aria-label="Головна навігація">
        ${navLinksHtml}
      </nav>

      <div class="header__actions">
        <button
          type="button"
          class="theme-toggle"
          id="themeToggle"
          title="Перемкнути на: ${themeLabel}"
          aria-label="Перемкнути колірну тему"
          data-theme-target="${nextTheme}"
        >
          <span class="theme-toggle__icon" aria-hidden="true">${themeIcon}</span>
          <span class="theme-toggle__label">${themeLabel}</span>
        </button>
        <a class="header__phone" href="http://127.0.0.1:8000/accounts/login/">
          Увійти до системи →
        </a>
      </div>
    </header>
  `;
}
