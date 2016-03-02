import Phaser from 'phaser'
import { theme } from '../data/Constants.js'

export default class extends Phaser.State {
  init () {}

  preload () {}



  create () {
    this.map = this.game.add.tilemap('mainmenu')
    this.fonts = ['Architects Daughter', 'Cutive Mono', 'VT323']
    this.fontIndex = 0


    let banner = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Paper Castle')
    banner.font = this.fonts[0]
    banner.fontSize = 120
    banner.fill = 'white'
    banner.tint = theme.current.body
    banner.anchor.setTo(0.5)
    this.banner = banner;

    console.log(this.map)
    // let buttons = this.map.objects.buttons
    // for (var btn of buttons) {
    //   // Button
    //   let rect = new Phaser.Rectangle(btn.x, btn.y, btn.width, btn.height)
    //   let button = new Phaser.Graphics(this.game)
    //   button.beginFill(0xFFFFFF, 1)
    //   button.lineStyle(2, 0x000000, 1)
    //   button.drawShape(rect)
    //   button.endFill()
    //
    //   // Label
    //   let text = this.game.add.text(0, 0, btn.properties.text)
    //   let font = btn.properties.font
    //   font && (text.font = font)
    //   let size = btn.properties.size
    //   size && (text.font = size)
    //   text.anchor.setTo(0.5)
    //   text.fill = '#FFFFFF'
    //
    //   button.addChild(text)
    //   this.game.add.existing(button)
    //
    //
    // }

    this.game.input.onDown.add(this.handleDemoTouch, this)

    this.paletteDebug()
  }

  handleDemoTouch (event) {
    // console.log(event)
    this.fontIndex += 1
    if (this.fontIndex >= this.fonts.length) { this.fontIndex = 0 }
    this.banner.font = this.fonts[this.fontIndex]
    // this.banner.update()
  }

  paletteDebug () {
    let self = this
    let bg = new Phaser.Graphics(self.game)

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

    self.game.add.existing(bg)
    // self.addChild(bg)

  }

  render () {
  }

}
