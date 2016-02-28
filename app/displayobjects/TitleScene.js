import PIXI from 'pixi.js';
import Scene from './Scene.js';
import Button from './Button.js';
import IntroScene from './IntroScene.js';
import { THEME } from '../constants/AppConstants.js';
import RendererStore from '../stores/RendererStore.js';
import { Tween } from 'tween.js';

export default class TitleScene extends Scene {

  constructor(...args) {
    super(...args);
    let self = this;

    let bg = new PIXI.Graphics();
    bg.beginFill(THEME.dark.background,1);
    bg.drawRect(0,0,self.width, self.height);
    self.background = bg;
    self.addChild(bg);

    let title = new PIXI.Text('Paper Castle',{
      align: 'center',
      font:  '144px CourierNew',
      fill:  THEME.dark.body
    });
    title.anchor = new PIXI.Point(0.5, 0.5);
    title.position = RendererStore.get('stageCenter');
    title.visible = false;
    self.title = title;
    self.addChild(title);

    let btnH = 50;
    let btnY = title.y + btnH*3;
    let start = new Button('New Game', 200, btnH);
    start.position = new PIXI.Point(title.x - start.width/2, btnY - start.height/2);
    start.visible = false;

    start.click = () => {
      let intro = new IntroScene();
      self.stage.showScene(intro);
    };

    self.startButton = start;
    self.addChild(start);

    btnY += (btnH*1.25);
    let cont = new Button('Continue', 200, btnH);
    cont.position = new PIXI.Point(title.x - cont.width/2, btnY - cont.height/2);
    cont.visible = false;
    self.continueButton = cont;
    self.addChild(cont);
  }

  didShow() {
    let self = this;

    let start = self.startButton;
    start.alpha = 0;
    start.interactive = false;
    start.visible = true;
    let startFade = new Tween(start)
      .to({alpha: 1}, 200)
      .onComplete(() => start.interactive=true );

    let cont = self.continueButton;
    cont.alpha = 0;
    cont.interactive = false;
    cont.visible = true;
    let contFade = new Tween(cont)
      .to({alpha: 1}, 200)
      .onComplete(() => cont.interactive=true );

    let title = self.title;
    title.alpha = 0;
    title.visible = true;
    let titleFade = new Tween(title)
      .to({alpha: 1}, 1000)
      .onComplete(() => {
        startFade.start();
        contFade.start();
      });

    window.setTimeout( () => titleFade.start(), 500 );
  }
}
