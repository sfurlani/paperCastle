/* eslint-disable */
import Phaser from 'phaser';
import { theme } from '../data/Constants.js';
/* eslint-enable */

export default class extends Phaser.State {

  constructor(...args) {
    super(...args);
    let self = this;

    let title = new PIXI.Text('Paper Castle',{
      align: 'center',
      font:  theme.font.title,
      fill:  'white'
    });
    title.tint = theme.current.body;
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

    this.debugPalette();
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
    cont.click = () => {
      let game = new GameScene();
      this.stage.showScene(game);
    };

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

  debugPalette() {
    let self = this;
    // DEBUG - testing color palette
    let bg = new PIXI.Graphics();
    //bg.beginFill(theme.dark.background,1);
    //bg.drawRect(10,10,200,200);
    //bg.endFill();

    let colors = [
      theme.red,
      theme.orange,
      theme.yellow,
      theme.green,
      theme.jade,
      theme.cyan,
      theme.blue,
      theme.violet,
      theme.magenta,
      theme.black,
      theme.gray,
      theme.white,
      theme.dark.highlight,
      theme.dark.subtext,
      theme.dark.body,
      theme.dark.emphasis
    ];
    let index = 0;
    const incr = 30;
    for (let x = incr/2; x < (200-incr); x += incr*1.5) {
      for (let y = incr/2; y < (200-incr); y += incr*1.5) {
        if (index >= colors.length) { continue; } // guard
        bg.beginFill(colors[index],1);
        bg.drawRect(x+10,y+10,incr, incr);
        bg.endFill();
        index += 1;
      }
    }

    self.addChild(bg);
  }
}
