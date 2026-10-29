import { hero } from './blocks/hero';
import { features } from './blocks/features';
import { showcase } from './blocks/showcase';
import { testimonials } from './blocks/testimonials';
import { contacts } from './blocks/contacts';
import type {
  BlockRenderer,
  BlockRendererRegistry,
  MenuItem,
  PageBlock,
} from './types';

const renderers: BlockRendererRegistry = {
  hero,
  features,
  showcase,
  testimonials,
  contacts,
};

/**
 * Витягує чистий ідентифікатор якоря або slug з посилання
 * Наприклад: "#contacts" -> "contacts", "//contacts" -> "contacts", "http://...#features" -> "features"
 */
export function extractAnchor(link?: string): string {
  if (!link) return '';
  let str = link.trim();
  const hashIndex = str.indexOf('#');
  if (hashIndex !== -1) {
    str = str.slice(hashIndex + 1);
  }
  return str.replace(/^[/#!]+/, '').trim().toLowerCase();
}

/**
 * Перевірка відповідності блоку сторінки заданому якорю з меню
 */
export function blockMatchesAnchor(block: PageBlock, anchor: string): boolean {
  if (!anchor) return false;
  const target = anchor.toLowerCase();
  const blockAnchor = (block.anchor || '').toLowerCase();
  const blockType = (block.type || '').toLowerCase();

  // Прямий збіг за полем anchor або type
  if (blockAnchor === target || blockType === target) {
    return true;
  }

  // Спеціальний аліас: вітрина мікроконтролерів має type: 'showcase' та anchor: 'catalog'
  if (target === 'catalog' && (blockType === 'showcase' || blockAnchor === 'catalog')) {
    return true;
  }
  if (target === 'showcase' && (blockType === 'showcase' || blockAnchor === 'catalog')) {
    return true;
  }

  return false;
}

/**
 * Динамічне сортування блоків сторінки відповідно до порядку пунктів меню навігації в CMS
 * - Hero-блок залишається на початку, якщо він явно не переміщений у меню
 * - Блоки із посиланнями з меню вибудовуються у порядку меню CMS
 * - Інші блоки додаються у хвіст зі збереженням їх початкового порядку
 */
export function sortBlocksByMenu(blocks: PageBlock[], menu?: MenuItem[]): PageBlock[] {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return [];
  }

  if (!Array.isArray(menu) || menu.length === 0) {
    return [...blocks];
  }

  const result: PageBlock[] = [];
  const placedBlockIndexes = new Set<number>();

  // Перевіряємо, чи є в меню явне посилання на hero-блок
  const hasHeroInMenu = menu.some((item) => {
    const anchor = extractAnchor(item.link);
    return anchor === 'hero';
  });

  // Якщо Hero-блок існує і не винесений окремо в меню, він традиційно залишається першим (головний банер)
  if (!hasHeroInMenu) {
    const heroIndex = blocks.findIndex((b) => b.type === 'hero');
    if (heroIndex !== -1) {
      result.push(blocks[heroIndex]);
      placedBlockIndexes.add(heroIndex);
    }
  }

  // Додаємо блоки відповідно до черговості в меню навігації
  for (const menuItem of menu) {
    const anchor = extractAnchor(menuItem.link);
    if (!anchor) continue;

    const blockIndex = blocks.findIndex(
      (block, idx) => !placedBlockIndexes.has(idx) && blockMatchesAnchor(block, anchor)
    );

    if (blockIndex !== -1) {
      result.push(blocks[blockIndex]);
      placedBlockIndexes.add(blockIndex);
    }
  }

  // Додаємо решту блоків, які не були згадані в меню навігації
  blocks.forEach((block, idx) => {
    if (!placedBlockIndexes.has(idx)) {
      result.push(block);
    }
  });

  return result;
}

/**
 * Динамічна генерація HTML-розмітки секцій сторінки на основі масиву типізованих блоків
 * та порядку пунктів головного меню навігації
 */
export function renderBlocks(blocks: PageBlock[], menu?: MenuItem[]): string {
  const orderedBlocks = sortBlocksByMenu(blocks, menu);

  return orderedBlocks
    .map((block: PageBlock): string => {
      const render = renderers[block.type] as BlockRenderer<PageBlock> | undefined;

      if (!render) {
        console.warn(`Не знайдено шаблон для блоку з типом: "${block.type}"`);
        return '';
      }

      return render(block);
    })
    .join('');
}
