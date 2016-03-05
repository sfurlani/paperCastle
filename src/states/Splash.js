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
    this.load.tilemap('level001', 'assets/tilemaps/level001.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.json('test', 'assets/tilemaps/level001.json')
    let images = ['e', 'c1', 'c2s', 'c2r', 'c3', 'c4', 'r1', 'r2s', 'r2r', 'r3', 'r4']
    for (let key of images) {
      this.load.image(key, 'assets/images/' + key + '.png')
    }

  }

  create () {
    this.state.start('Title')
  }

}
