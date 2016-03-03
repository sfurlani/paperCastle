import Phaser from 'phaser'
import WebFont from 'webfontloader'
import { theme } from '../data/Constants.js'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = theme.background
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Cinzel Decorative', 'UnifrakturMaguntia']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: theme.body, align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')


    this.setupScaleManager(this.game)

  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }

  setupScaleManager (game) {
    let scaleManager = game.scale
    let resize = () => {
      // Make sure these variable have no ties to the boot object
      let scale = Math.min(window.innerWidth / game.width, window.innerHeight / game.height)
      let offsetY = (window.innerWidth - game.width) / 2
      scaleManager.setUserScale(scale, scale, 0, 0)
      scaleManager.refresh()
    }

    scaleManager.scaleMode = Phaser.ScaleManager.USER_SCALE
    scaleManager.minHeight = 240
    scaleManager.minWidth = 320
    scaleManager.pageAlignHorizontally = true
    scaleManager.pageAlignVertically = true
    scaleManager.setResizeCallback(resize, this)
    scaleManager.refresh()
  }

}
