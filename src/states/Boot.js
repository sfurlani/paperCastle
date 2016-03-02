import Phaser from 'phaser'
import WebFont from 'webfontloader'
import { theme } from '../data/Constants.js'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = theme.current.background
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Architects Daughter', 'Cutive Mono', 'Patrick Hand', 'Gloria Hallelujah']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: theme.current.body, align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')

    // Make sure this has no ties to the boot object
    let scaleManager = this.game.scale
    let game = this.game
    let resize = () => {
      let scale = Math.min(window.innerWidth / game.width, window.innerHeight / game.height)
      scaleManager.setUserScale(scale, scale, 0, 0)
      scaleManager.pageAlignHorizontally = true
      scaleManager.pageAlignVertically = true
      scaleManager.refresh()
    }

    scaleManager.scaleMode = Phaser.ScaleManager.USER_SCALE
    scaleManager.minHeight = 660
    scaleManager.minWidth = 880
    scaleManager.setResizeCallback(resize, scaleManager)
    scaleManager.pageAlignHorizontally = true
    scaleManager.compatibility.forceMinimumDocumentHeight = true
    scaleManager.pageAlignVertically = true
    scaleManager.refresh()
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }

}
