import './testimonials.css';
import type { TestimonialItem, TestimonialsBlock } from '../types';

export function testimonials({
  anchor = 'testimonials',
  badge,
  title,
  subtitle,
  items,
}: TestimonialsBlock): string {
  const listHtml: string = items
    .map(({ name, role, text, rating }: TestimonialItem): string => {
      const safeRating: number = Math.min(5, Math.max(1, Number(rating) || 5));
      const stars: string = '★'.repeat(safeRating) + '☆'.repeat(5 - safeRating);

      return `
        <figure class="testimonial">
          <div class="testimonial__rating" aria-label="Оцінка ${safeRating} з 5">${stars}</div>
          <blockquote class="testimonial__text">«${text}»</blockquote>
          <figcaption class="testimonial__author">
            <strong class="testimonial__name">${name}</strong>
            ${role ? `<span class="testimonial__role">${role}</span>` : ''}
          </figcaption>
        </figure>
      `;
    })
    .join('');

  return `
    <section class="testimonials" id="${anchor}">
      <div class="section-header">
        ${badge ? `<span class="section-tag">${badge}</span>` : ''}
        <h2 class="section-title">${title}</h2>
        ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
      </div>
      <div class="testimonials__list">
        ${listHtml}
      </div>
    </section>
  `;
}
