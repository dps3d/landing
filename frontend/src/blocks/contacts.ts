import './contacts.css';
import type { ContactsBlock, OnboardingStep } from '../types';

export function contacts({
  anchor = 'contacts',
  badge,
  title,
  subtitle,
  phone,
  email,
  address,
  activeMonth = 'Жовтень',
  steps = [],
}: ContactsBlock): string {
  const stepsHtml: string =
    steps.length > 0
      ? `
        <div class="contacts__steps">
          ${steps
            .map(
              ({ stepBadge, title: stepTitle, text }: OnboardingStep): string => `
                <div class="onboarding-step">
                  <span class="onboarding-step__badge">${stepBadge}</span>
                  <h3 class="onboarding-step__title">${stepTitle}</h3>
                  <p class="onboarding-step__text">${text}</p>
                </div>
              `
            )
            .join('')}
        </div>
      `
      : '';

  return `
    <section class="contacts" id="${anchor}">
      <div class="contacts__header">
        ${badge ? `<span class="section-tag">${badge}</span>` : ''}
        <h2 class="section-title">${title}</h2>
        ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
      </div>

      ${stepsHtml}

      <div class="contacts__card">
        <div class="contacts__direct">
          <span class="contacts__label">Прямий зв'язок із лабораторією</span>
          <a class="contacts__link" href="tel:${phone.replace(/[^\d+]/g, '')}">${phone}</a>
          <a class="contacts__link" href="mailto:${email}">${email}</a>
          <p class="contacts__address">📍 ${address}</p>
        </div>

        <div class="contacts__meta">
          <div class="contacts__meta-box">
            <span class="contacts__meta-lbl">Поточний місяць ревізії (Select у CMS)</span>
            <strong class="contacts__meta-val">📅 ${activeMonth} 2026</strong>
          </div>
          <div class="contacts__meta-box">
            <span class="contacts__meta-lbl">Режим доступу нових акаунтів</span>
            <strong class="contacts__meta-val">🔒 Пре-модерація викладачем</strong>
          </div>
        </div>
      </div>
    </section>
  `;
}
