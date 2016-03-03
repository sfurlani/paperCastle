import Phaser from 'phaser'
import Button from '../ui/Button.js'
import { theme, fonts, colors } from '../data/Constants.js'

export default class GameState extends Phaser.State {
  init () {}

  preload () {}

  create () {
    this.map = this.game.add.tilemap('mainmenu')

    let banner = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Paper Castle')
    banner.font = fonts.name.title
    banner.fontSize = fonts.size.title
    banner.fill = 'white'
    banner.tint = colors.yellow
    banner.anchor.setTo(0.5)
    this.banner = banner;

    let btns = this.map.objects.buttons
    for (let btn of btns) {
      console.log(btn)
      let button = new Button(this.game, btn)
      button && this.game.add.existing(button)
      console.log(button)
    }

    this.paletteDebug()
  }

  paletteDebug () {
    let self = this
    let bg = new Phaser.Graphics(self.game)

    let palette = [
      colors.red,
      colors.orange,
      colors.yellow,
      colors.green,
      colors.jade,
      colors.cyan,
      colors.blue,
      colors.violet,
      colors.magenta,
      colors.black,
      colors.gray,
      colors.white,
      theme.highlight,
      theme.subtext,
      theme.body,
      theme.emphasis
    ];
    let index = 0;
    const incr = 30;
    for (let x = incr/2; x < (200-incr); x += incr*1.5) {
      for (let y = incr/2; y < (200-incr); y += incr*1.5) {
        if (index >= palette.length) { continue; } // guard
        bg.beginFill(palette[index],1);
        bg.drawRect(x+10,y+10,incr, incr);
        bg.endFill();
        index += 1;
      }
    }

    self.game.add.existing(bg)
    // self.addChild(bg)

  }

  render () {
  }

}
