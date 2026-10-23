import './hero.css';
import type { ActionButton, HeroBlock, HeroMetric } from '../types';

export function hero({
  anchor = 'hero',
  badge,
  title,
  subtitle,
  image: { src, alt },
  buttons,
  metrics = [],
}: HeroBlock): string {
  const buttonsHtml: string = buttons
    .map(
      ({ text, link, variant }: ActionButton): string => `
        <a class="btn btn--${variant}" href="${link}">${text}</a>
      `
    )
    .join('');

  const metricsHtml: string =
    metrics.length > 0
      ? `
        <div class="hero__metrics">
          ${metrics
            .map(
              ({ value, label }: HeroMetric): string => `
                <div class="hero__metric">
                  <span class="hero__metric-val">${value}</span>
                  <span class="hero__metric-lbl">${label}</span>
                </div>
              `
            )
            .join('')}
        </div>
      `
      : '';

  return `
    <section class="hero" id="${anchor}">
      <div class="hero__content">
        ${
          badge
            ? `<span class="hero__badge"><span class="hero__badge-dot"></span>${badge}</span>`
            : ''
        }
        <h1 class="hero__title">${title}</h1>
        ${subtitle ? `<p class="hero__subtitle">${subtitle}</p>` : ''}
        <div class="hero__actions">
          ${buttonsHtml}
        </div>
        ${metricsHtml}
      </div>
      <div class="hero__visual">
        <img class="hero__image" src="${src}" alt="${alt}" />
      </div>
    </section>
  `;
}
