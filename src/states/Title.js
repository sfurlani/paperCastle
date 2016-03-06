import Phaser from 'phaser'
import Button from '../ui/Button'
import { theme, fonts, colors } from '../data/Constants'
import { shuffleArray, getRandomInt } from '../utils'
import { generateDungeon } from '../data/Dungeon'


export default class GameState extends Phaser.State {
  init () {}

  preload () {}

  create () {
    this.map = this.add.tilemap('mainmenu')

    let banner = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Paper Castle')
    banner.font = fonts.name.title
    banner.fontSize = fonts.size.title
    banner.fill = 'white'
    banner.tint = colors.yellow
    banner.anchor.setTo(0.5)
    this.banner = banner;

    let btns = this.map.objects.buttons
    for (let btn of btns) {
      let button = new Button(this.game, btn)
      button && this.add.existing(button)
      this[btn.name] = button
    }

    let self = this
    this.newGame.callback = (event, button, key) => {
      this.game.state.start('Map')
    }

    this.continue.setEnabled(false)

    // this.paletteDebug()
    // for (let n = 0; n < 10; n += 1) {
    //   this.debugRandomGenerator()
    // }

    // generateDungeon()
  }

  paletteDebug () {
    let self = this
    let bg = new Phaser.Graphics(self.game)

    let palette = [
      colors.red,
      colors.orange,
      colors.yellow,
      colors.green,
      colors.jade,
      colors.cyan,
      colors.blue,
      colors.violet,
      colors.magenta,
      colors.black,
      colors.gray,
      colors.white,
      theme.highlight,
      theme.subtext,
      theme.body,
      theme.emphasis
    ];
    let index = 0;
    const incr = 30;
    for (let x = incr/2; x < (200-incr); x += incr*1.5) {
      for (let y = incr/2; y < (200-incr); y += incr*1.5) {
        if (index >= palette.length) { continue; } // guard
        bg.beginFill(palette[index],1);
        bg.drawRect(x+10,y+10,incr, incr);
        bg.endFill();
        index += 1;
      }
    }

    self.game.add.existing(bg)
    // self.addChild(bg)

  }

  render () {
  }

  // debugRandomGenerator() {
  //   let side = 7
  //   let map = [
  //     0, 0, 0, 0, 0, 0, 0,
  //     0, 0, 0, 0, 0, 0, 0,
  //     0, 0, 0, 0, 0, 0, 0,
  //     0, 0, 0, 0, 0, 0, 0,
  //     0, 0, 0, 0, 0, 0, 0,
  //     0, 0, 0, 0, 0, 0, 0,
  //     0, 0, 0, 0, 0, 0, 0,
  //   ]
  //
  //   let roomPossible = [
  //     1, 0, 1, 0, 1, 0, 1,
  //     0, 1, 0, 1, 0, 1, 0,
  //     1, 0, 1, 0, 1, 0, 1,
  //     0, 1, 0, 1, 0, 1, 0,
  //     1, 0, 1, 0, 1, 0, 1,
  //     0, 1, 0, 1, 0, 1, 0,
  //     1, 0, 1, 0, 1, 0, 1,
  //   ]
  //   let roomPossIndex = []
  //   for (let n = 0; n < roomPossible.length; n += 1) {
  //     if (roomPossible[n]) {
  //       roomPossIndex.push(n)
  //     }
  //   }
  //   let maxRoomCount = getRandomInt(12,16)
  //   roomPossIndex = shuffleArray(roomPossIndex)
  //   for (let n = 0; n < maxRoomCount; n += 1) {
  //     let index = roomPossIndex.pop()
  //     let y = Math.floor(index / side)
  //     let x = index % side
  //     // console.log(index + ': {'+x+','+y+'}')
  //     map[index] = 'R'
  //   }
  //
  //   for (let y = 0; y < side; y+= 1) {
  //     for (let x = 0; x < side; x+= 1) {
  //       let char = map[y*side+x]
  //       if (char) { continue; }
  //       let n = (y > 0) ? (map[(y-1)*side+x] == 'R' ? 1 : 0): 0
  //       let s = (y < side-1) ? (map[(y+1)*side+x] == 'R' ? 1 : 0): 0
  //
  //       let w = (x > 0) ? (map[y*side+(x-1)] == 'R' ? 1 : 0) : 0
  //       let e = (x < side-1) ? (map[y*side+(x+1)] == 'R' ? 1 : 0): 0
  //       if (n + e + w + s > 1) {
  //         map[y*side+x] = 'C'
  //       }
  //     }
  //   }
  //
  //   for (let y = 0; y < side; y+= 1) {
  //     for (let x = 0; x < side; x+= 1) {
  //       let char = map[y*side+x]
  //       if (!char || char == 'C') { continue; }
  //
  //       let n = (y > 0) ? (map[(y-1)*side+x] == 'C' ? 1 : 0): 0
  //       let s = (y < side-1) ? (map[(y+1)*side+x] == 'C' ? 1 : 0): 0
  //
  //       let w = (x > 0) ? (map[y*side+(x-1)] == 'C' ? 1 : 0) : 0
  //       let e = (x < side-1) ? (map[y*side+(x+1)] == 'C' ? 1 : 0): 0
  //       if (n + e + w + s > 0) { continue; }
  //       map[y*side+x] = 'X'
  //     }
  //   }
  //
  //
  //   let str = ''
  //   for (let y = 0; y < side; y += 1) {
  //     for (let x = 0; x < side; x+= 1) {
  //       let char = map[y*side+x]
  //       str += char ? char : ' '
  //     }
  //     str += '\n'
  //   }
  //   console.log(str)
  // }
}
