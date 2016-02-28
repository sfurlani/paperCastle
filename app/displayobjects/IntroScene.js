/* eslint-disable */
import PIXI from 'pixi.js';
import Scene from './Scene.js';
import Button from './Button.js';
import { THEME } from '../constants/AppConstants.js';
import RendererStore from '../stores/RendererStore.js';
import { Tween } from 'tween.js';
/* eslint-enable */

export default class IntroScene extends Scene {

  label;

  constructor(...args) {
    super(...args);
    let self = this;
    let wwp = 0.8;


    let label = new PIXI.Text('',{
      font: THEME.font.text,
      fill: THEME.current.body,
      align: 'left',
      wordWrap: true,
      wordWrapWidth: self.width * wwp
    });
    label.anchor = new PIXI.Point(0.5, 0.5);
    label.position = RendererStore.get('stageCenter');
    self.label = label;
    self.addChild(label);

    let cont = new Button('Continue', 200, 50);
    cont.position = new PIXI.Point(label.x - cont.width/2, self.height - cont.height/2 - 100);
    cont.visible = false;
    cont.click = () => {
      if (self.storyIndex < self.storyText.length) {
        self.displayNextStory();
      }
      else {
        //
      }
    };
    self.continueButton = cont;
    self.addChild(cont);

    this.storyText = [
      '\tEvery year the Magic College holds a contest to determine who is ready to be admitted as an apprentice.\n\n\tThis year you are finally old enough to partake in the contest and have lined up with many others at the gates to the college',
      '\tThe contest is different every year and the line seems to be moving unnervingly fast.  The contestants enter one-by-one through the gate and do not come out again.\n\n\tThe sun hasn\'t risen above the treeline and it\'s already your turn.',
      '\tYou enter through the iron gate and are ushered quickly through a series of halls to a small, unremarkable room.  The room contains a small desk and many shelves of scrolls.  Behind the desk is a short, gnarled woman wearing the robes of an Arch-magi.\n\n\tAs you enter the wizard behind the desk pulls out another scroll seemingly from thin air and places it in front of you.\n\n\t\"Sign here,\" she says, tapping the page with a withered fingernail.',
      '\tYou examine the scroll but are are unable to read its contents, as they\'re written in a language you\'ve never seen before.\n\n\tYou hesitate briefly before picking up the quill.  After all, if you want to be a wizard, this is the only way, right?',
      '\tThe wizard \"harumphs\" as you write your name and no sooner has the ink dried then the room begins to spin and your vision flashes with bright colors.\n\n\tYou slump forward into the desk and fall unconscious.',
      '\tThe wizard picks up the scroll and places it in the stack with the rest.\n\n\t\"Next...\" she mutters to a seemingly empty room.'
    ];
    this.storyIndex = 0;
  }

  didShow() {
    this.displayNextStory();
  }

  displayNextStory() {
    let self = this;
    if (self.storyIndex >= self.storyText.length) { return; }

    self.label.text = self.storyText[self.storyIndex];
    self.label.updateText();

    let cont = self.continueButton;
    cont.alpha = 0;
    cont.interactive = false;
    cont.visible = true;
    let contFade = new Tween(cont)
      .to({alpha: 1}, 200)
      .onComplete(() => {
        self.storyIndex += 1;
        cont.interactive=true;
      });

    window.setTimeout( () => contFade.start(), 1000 );
  }

}
