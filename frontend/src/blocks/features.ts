import './features.css';
import type { FeatureItem, FeaturesBlock } from '../types';

export function features({
  anchor = 'features',
  badge,
  title,
  subtitle,
  items,
}: FeaturesBlock): string {
  const cardsHtml: string = items
    .map(
      ({
        icon,
        moduleTag,
        title: itemTitle,
        text,
        highlights = [],
      }: FeatureItem): string => `
        <article class="feature-card">
          <div class="feature-card__top">
            <span class="feature-card__icon" aria-hidden="true">${icon}</span>
            ${
              moduleTag
                ? `<span class="feature-card__tag">${moduleTag}</span>`
                : ''
            }
          </div>
          <h3 class="feature-card__title">${itemTitle}</h3>
          <p class="feature-card__text">${text}</p>
          ${
            highlights.length > 0
              ? `
                <ul class="feature-card__list">
                  ${highlights
                    .map((point: string): string => `<li>${point}</li>`)
                    .join('')}
                </ul>
              `
              : ''
          }
        </article>
      `
    )
    .join('');

  return `
    <section class="features" id="${anchor}">
      <div class="section-header">
        ${badge ? `<span class="section-tag">${badge}</span>` : ''}
        <h2 class="section-title">${title}</h2>
        ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
      </div>
      <div class="features__grid">
        ${cardsHtml}
      </div>
    </section>
  `;
}
