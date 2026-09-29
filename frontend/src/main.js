import './styles/base.css'
import {getSettings, getPage} from './api.js'
// import {hero} from './blocks/hero.js';
import { renderBlocks } from './renderBlocks.js'
const app = document.querySelector('#app')

async function start(){
  app.textContent = 'loading'
  // const settings = getSettings()
  try {
    const [settings, page] = await Promise.all([
      getSettings(),
      getPage(location.pathname)
    ]);

    document.title = `${page.title} - ${settings.siteName}`;
    // const heroBlock = page.blocks.find((block) => block.type === 'hero')
    // app.innerHTML = hero(heroBlock)
    
    app.innerHTML =  `<main>${renderBlocks(page.blocks)}</main>`

  } catch (error){
    app.textContent=`somethign wnt wrong ${error.message}`
  }
  
}

start()