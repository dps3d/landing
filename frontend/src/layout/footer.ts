import type { CommonSettings } from '../types';

export function footer({ siteName, footer: footerData }: CommonSettings): string {
  const year: number = new Date().getFullYear();

  return `
    <footer class="footer">
      <div class="footer__top">
        <div class="footer__info">
          <strong class="footer__brand">© ${year} ${siteName}</strong>
          <p class="footer__text">${footerData.text}</p>
        </div>
        ${
          footerData.systemInfo
            ? `<div class="footer__stack-badge">${footerData.systemInfo}</div>`
            : ''
        }
      </div>
    </footer>
  `;
}
