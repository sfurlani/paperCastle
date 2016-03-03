import Phaser from 'phaser'
import Label from '../ui/Label.js'
import { theme, fonts, colors } from '../data/Constants.js'

export default class Button extends Phaser.Graphics {

  constructor (game, {x, y, width, height, properties: { text, key, font, size }}, callback) {
    super(game)

    this.key = key
    this.callback = callback

    let frame = new Phaser.Rectangle(x, y, width, height)
    this.hitArea = frame;

    let label = new Label(game, {x, y, width, height, properties: { text, font, size }})
    this.label = label;
    this.addChild(label)

    this.inputEnabled = true
    this.input.useHandCursor = true

    this.events.onInputUp.add(this.onInputUp, this)
    this.events.onInputDown.add(this.onInputDown, this)
    this.events.onInputOver.add(this.onInputOver, this)
    this.events.onInputOut.add(this.onInputOut, this)

    var enabled = true;

    this.setEnabled = (value) => {
      enabled = value

      this.label.tint = enabled ? theme.body : theme.subtext
      this.inputEnabled = enabled
    }

    this.isEnabled = () => {
      return enabled
    }

  }

  onInputOver (event) {
    this.clear()
    this.lineStyle(2, theme.highlight, 1)
    this.drawShape(this.hitArea)
  }
  onInputOut (event) {
    this.clear()
  }

  onInputDown (event) {
    this.clear()
    this.beginFill(theme.highlight, 1)
    this.drawShape(this.hitArea)

  }
  onInputUp (event) {
    this.clear()
    this.callback && this.callback(event, this, this.key)
  }

}
