import {hero} from "./blocks/hero.js";
import { features } from "./blocks/features.js";

const renderers = {hero, features};

export function renderBlocks(blocks){
    return blocks.map((block) => {
        const render = renderers[block.type]

        if (!render){
            console.warn(`no block ${block.type}`);
            return '';
        }

        return render(block);
    }).join('');
}