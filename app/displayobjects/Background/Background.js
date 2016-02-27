import PIXI from 'pixi.js';
// import TEXTURE from './diagnostic.png';
import { THEME } from '../../constants/AppConstants';
import RendererStore from '../../stores/RendererStore';

/**
 * Loads the adds the diagnostic image
 *
 * @exports Background
 * @extends Container
 */
export default class Background extends PIXI.Container {

  constructor() {
    super();

    // let bg = PIXI.Sprite.fromImage(TEXTURE);
    let bg = new PIXI.Graphics();
    bg.beginFill(THEME.light.background,1);
    bg.drawRect(0,0,RendererStore.get('stageWidth'),RendererStore.get('stageHeight'));

    this.addChild(bg);
  }

}
