import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {}

  create () {
    let banner = this.add.text(this.game.world.centerX, this.game.height - 64, 'Phaser + ES6 + Webpack')
    banner.font = 'Dyslexie'
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.anchor.setTo(0.5)

    this.map = this.game.add.tilemap('mainmenu')
    console.log(this.map)
    let buttons = this.map.objects.buttons
    for (var btn of buttons) {
      // Button
      let rect = new Phaser.Rectangle(btn.x, btn.y, btn.width, btn.height)
      let button = new Phaser.Graphics(this.game)
      button.beginFill(0xFFFFFF, 1)
      button.lineStyle(2, 0x000000, 1)
      button.drawShape(rect)
      button.endFill()

      // Label
      let text = this.game.add.text(0, 0, btn.properties.text)
      let font = btn.properties.font
      font && (text.font = font)
      let size = btn.properties.size
      size && (text.font = size)
      text.anchor.setTo(0.5)
      text.fill = '#FFFFFF'

      button.addChild(text)
      this.game.add.existing(button)

      this.game.input.onDown.add(this.handleDemoTouch)
    }
  }

  handleDemoTouch (event) {
    console.log(event)
  }

  render () {
  }

}
