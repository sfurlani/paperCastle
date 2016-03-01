import PIXI from 'pixi.js';
import { theme } from '../constants/AppConstants.js';

/**
@property label {PIXI.Text} button text
*/
export default class Button extends PIXI.Container {

  label;

  constructor(text, width, height, ...args) {
    super(...args);
    let self = this;
    self.interactive = true;

    let w = width || 200;
    let h = height || 50;

    let br = new PIXI.Graphics();
    br.beginFill('black', 0);
    br.lineStyle(2, theme.current.highlight, 1);
    br.alpha = 0;
    br.drawRect(1,1,w-2, h-2);
    self.border = br;
    self.addChild(br);

    let bg = new PIXI.Graphics();
    bg.beginFill(theme.current.highlight, 1);
    bg.alpha = 0;
    bg.drawRect(0,0,w, h);
    self.background = bg;
    self.addChild(bg);

    let label = new PIXI.Text(text, {
      align: 'center',
      font:  theme.font.button,
      fill:  'white'
    });
    label.tint = theme.current.body;
    label.anchor = new PIXI.Point(0.5,0.5);
    label.position = new PIXI.Point(w/2, h/2);
    self.label = label;
    self.addChild(label);

  }

  mouseover() {
    let self = this;
    self.border.alpha = 1;
  }

  mouseout() {
    let self = this;
    self.border.alpha = 0;
    self.background.alpha = 0;
  }

  mousedown() {
    let self = this;
    self.background.alpha = 1.0;
  }

  mouseup() {
    let self = this;
    self.background.alpha = 0;
  }

}
