import Phaser from 'phaser'
import { theme, fonts, colors } from '../data/Constants.js'

export default class Label extends Phaser.Text {

  constructor(game, {x, y, width, height, "properties": { text, font, size }} ) {
    x = x || 0
    y = y || 0
    width = width || 0
    height = height || 0
    font = font || fonts.name.text
    size = size || fonts.size.text
    text = text || "NO TEXT"

    let style = {
      font,
      fontSize: size,
      fill: 'white',
    }
    super(game, x+width/2, y+height/2, text, style)
    this.anchor.setTo(0.5)
    this.tint = theme.body

  }

}
