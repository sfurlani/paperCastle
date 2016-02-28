import PIXI from 'pixi.js';
import Scene from './Scene.js';
import Button from './Button.js';
import { THEME } from '../constants/AppConstants.js';
import RendererStore from '../stores/RendererStore.js';
import { Tween } from 'tween.js';

export default class IntroScene extends Scene {

  label;

  constructor(...args) {
    super(...args);
    let self = this;
    let wwp = 0.8;


    let label = new PIXI.Text('',{
      font: '16pt CourierNew',
      fill: THEME.dark.body,
      align: 'left',
      wordWrap: true,
      wordWrapWidth: self.width * wwp
    });
    label.anchor = new PIXI.Point(0.5, 0.5);
    label.position = RendererStore.get('stageCenter');
    self.label = label;
    self.addChild(label);

    let cont = new Button('Continue', 200, 50);
    cont.position = new PIXI.Point(label.x - cont.width/2, this.height - cont.height/2 - 100);
    cont.visible = false;
    self.continueButton = cont;
    self.addChild(cont);
  }

  didShow() {
    let self = this;
    let storyText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at tincidunt tortor, scelerisque viverra felis. Donec eleifend nec ligula vitae tincidunt. Cras tempus turpis lacus, eget semper nibh finibus in. Vestibulum a metus ut risus imperdiet suscipit non sit amet mauris. Proin feugiat posuere orci, et suscipit felis porta a. Nulla tempus risus est, eget tristique turpis semper et. Aliquam posuere nunc at purus vehicula, a sagittis purus tincidunt. Curabitur eu nulla sapien. Nullam lectus dolor, consectetur vitae tortor et, convallis vestibulum augue. Morbi vehicula quis ante sed imperdiet. Sed vitae congue quam.\n\nSed facilisis varius maximus. Cras blandit malesuada suscipit. Vivamus placerat justo egestas risus interdum, non malesuada nisl pretium. Fusce elementum justo vel ante tincidunt, a dapibus libero malesuada. Nullam turpis augue, tincidunt at rutrum eget, varius ac ligula. Aliquam nisl ipsum, gravida nec aliquet nec, pharetra ut justo. Curabitur pretium, mi vestibulum convallis elementum, massa magna accumsan mi, a rhoncus urna odio ut turpis. Nam tristique vitae enim et pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec nisi risus, aliquam sit amet metus varius, lacinia faucibus odio. Proin eget eros sit amet metus suscipit scelerisque. Nullam vitae dolor vel dui gravida vestibulum. Proin sed tempus diam, id vehicula sem.';
    self.label.text = storyText;
    self.label.updateText();

    let cont = self.continueButton;
    cont.alpha = 0;
    cont.interactive = false;
    cont.visible = true;
    let contFade = new Tween(cont)
      .to({alpha: 1}, 200)
      .onComplete(() => cont.interactive=true );

    window.setTimeout( () => contFade.start(), 1000 );
  }

}
