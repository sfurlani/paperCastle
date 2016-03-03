import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import TitleState from './states/Title'

class Game extends Phaser.Game {

  constructor () {
    super(1024, 768, Phaser.AUTO, 'content', null, false, true)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Title', TitleState, false)

    this.state.start('Boot')
  }

}

new Game()
