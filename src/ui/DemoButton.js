import Phaser from 'phaser'

export default class DemoButton extends Phaser.Rectangle {

  callback

  constructor (x, y, width, height, callback) {
    super(x, y, width, height)

    this.callback = callback
  }

}
