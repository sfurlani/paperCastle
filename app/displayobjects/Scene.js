import PIXI from 'pixi.js';
import RendererStore from '../stores/RendererStore.js';

export default class Scene extends PIXI.Container {

  get width() {
    return this.data.width;
  }

  get height() {
    return this.data.height;
  }

  constructor(...args) {
    super(...args);

    this.data = {
      width:  RendererStore.get('stageWidth'),
      height: RendererStore.get('stageHeight')
    };

  }

  didShow() {

  }

  willShow() {

  }

  didHide() {

  }

  willHide() {

  }

}
