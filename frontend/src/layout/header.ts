import type { CommonSettings, MenuItem } from '../types';

export function header({
  siteName,
  headerPhone,
  dbStatus = 'online',
  menu,
}: CommonSettings): string {
  const isOnline: boolean = dbStatus === 'online';
  const statusLabel: string = isOnline ? 'БД активна (Neon)' : 'Обслуговування БД';
  const statusClass: string = isOnline ? 'status-pill--ready' : 'status-pill--warn';

  const navLinksHtml: string = menu
    .map(
      ({ label, link }: MenuItem): string =>
        `<a class="header__link" href="${link}">${label}</a>`
    )
    .join('');

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

      ${
        headerPhone
          ? `<a class="header__phone" href="tel:${headerPhone.replace(/[^\d+]/g, '')}">${headerPhone}</a>`
          : ''
      }
    </header>
  `;
}
