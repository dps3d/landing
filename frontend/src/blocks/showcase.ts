import './showcase.css';
import type {
  ComponentShowcaseItem,
  ShowcaseBlock,
  StockStatus,
} from '../types';

/**
 * Типізована функція звуження Union Type (StockStatus) для відображення статусу комірки
 */
function renderStockBadge(status: StockStatus, quantity: number): string {
  switch (status) {
    case 'in_stock':
      return `<span class="stock-badge stock-badge--ok">В наявності • ${quantity} шт.</span>`;
    case 'low_stock':
      return `<span class="stock-badge stock-badge--low">Малий залишок • ${quantity} шт.</span>`;
    case 'reserved':
      return `<span class="stock-badge stock-badge--reserved">Бронь BOM • ${quantity} шт.</span>`;
  }
}

export function showcase({
  anchor = 'catalog',
  badge,
  title,
  subtitle,
  items,
}: ShowcaseBlock): string {
  const itemsHtml: string = items
    .map(
      ({
        partNumber,
        category,
        packageType,
        stockStatus,
        quantity,
        cellCode,
        architecture,
        description,
      }: ComponentShowcaseItem): string => `
        <article class="mcu-card">
          <div class="mcu-card__header">
            <div>
              <h3 class="mcu-card__part">${partNumber}</h3>
              <span class="mcu-card__category">${category}</span>
            </div>
            <span class="mcu-card__pkg">${packageType}</span>
          </div>

          ${
            architecture
              ? `<div class="mcu-card__arch" title="Шини та розпіновка">${architecture}</div>`
              : ''
          }

          ${
            description
              ? `<p class="mcu-card__desc">${description}</p>`
              : ''
          }

          <div class="mcu-card__footer">
            <span class="mcu-card__cell" title="Адресна комірка в органайзері">
              📍 ${cellCode}
            </span>
            ${renderStockBadge(stockStatus, quantity)}
          </div>
        </article>
      `
    )
    .join('');

  return `
    <section class="showcase" id="${anchor}">
      <div class="section-header">
        ${badge ? `<span class="section-tag">${badge}</span>` : ''}
        <h2 class="section-title">${title}</h2>
        ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
      </div>
      <div class="showcase__grid">
        ${itemsHtml}
      </div>
    </section>
  `;
}
