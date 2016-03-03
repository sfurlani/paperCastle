import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    this.load.tilemap('mainmenu', 'assets/tilemaps/mainmenu.json', null, Phaser.Tilemap.TILED_JSON)
    //
    // load your assets
    //

  }

  create () {
    this.state.start('Title')
  }

}
