import './hero.css'

export function hero({ anchor, badge, title, subtitle, image: { src, alt }, buttons }) {
    return `
        <section class="hero" id=${anchor}>
            <div class="hero__content">
                <span class="hero__badge">${badge}</span>
                <h1 class="hero__title">${title}</h1>
                <p class="hero__subtitle">${subtitle}</p>
                <div class="hero__actions">
                    ${buttons.map(({ text, link, variant }) => `
                        <a class="btn btn--${variant}" href="${link}" >${text}</a>
                    `).join('')}
                </div>
            </div>
            <img class="hero__image" src="${src}" alt="${alt}">
        </section>
    `;
}