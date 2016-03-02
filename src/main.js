import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'

class Game extends Phaser.Game {

  constructor () {
    super(1024, 768, Phaser.AUTO, 'content', null)
    this.scaleMode = Phaser.ScaleManager.USER_SCALE

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)

    this.state.start('Boot')
  }

}

new Game()
