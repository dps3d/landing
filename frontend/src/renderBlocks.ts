import { hero } from './blocks/hero';
import { features } from './blocks/features';
import { showcase } from './blocks/showcase';
import { testimonials } from './blocks/testimonials';
import { contacts } from './blocks/contacts';
import type {
  BlockRenderer,
  BlockRendererRegistry,
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
 * Динамічна генерація HTML-розмітки секцій сторінки на основі масиву типізованих блоків
 */
export function renderBlocks(blocks: PageBlock[]): string {
  return blocks
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
