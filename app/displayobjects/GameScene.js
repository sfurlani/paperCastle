/* eslint-disable */
import PIXI from 'pixi.js';
import Scene from './Scene.js';
import Button from './Button.js';
import { theme } from '../constants/AppConstants.js';
import RendererStore from '../stores/RendererStore.js';
import { Tween } from 'tween.js';
import { QUESTS } from '../data/Quest.js';
/* eslint-enable */

export default class GameScene extends Scene {

  constructor(...args) {
    super(...args);

    this.playArea = new PIXI.Container();
    this.addChild(this.playArea);
    let bg = new PIXI.Graphics();
    bg.beginFill(theme.black);
    bg.drawRect(0,0,this.height, this.height);
    this.playArea.background = bg;
    this.playArea.addChild(bg);

    this.menuArea = new PIXI.Container();
    this.addChild(this.menuArea);
    let border = new PIXI.Graphics();
    border.lineStyle(2, theme.dark.body, 1);
    border.drawRect(this.height+0.5,0.5,(this.width-this.height)-1,this.height-1);
    this.menuArea.border = border;
    this.menuArea.addChild(border);

    console.log(QUESTS);

  }



}
