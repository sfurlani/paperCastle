import Phaser from 'phaser'
import Button from '../ui/Button'
import { theme, fonts, colors } from '../data/Constants'
import { shuffleArray, getRandomInt } from '../utils'



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

    generateDungeon()
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

  debugRandomGenerator() {
    let side = 7
    let map = [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
    ]

    let roomPossible = [
      1, 0, 1, 0, 1, 0, 1,
      0, 1, 0, 1, 0, 1, 0,
      1, 0, 1, 0, 1, 0, 1,
      0, 1, 0, 1, 0, 1, 0,
      1, 0, 1, 0, 1, 0, 1,
      0, 1, 0, 1, 0, 1, 0,
      1, 0, 1, 0, 1, 0, 1,
    ]
    let roomPossIndex = []
    for (let n = 0; n < roomPossible.length; n += 1) {
      if (roomPossible[n]) {
        roomPossIndex.push(n)
      }
    }
    let maxRoomCount = getRandomInt(12,16)
    roomPossIndex = shuffleArray(roomPossIndex)
    for (let n = 0; n < maxRoomCount; n += 1) {
      let index = roomPossIndex.pop()
      let y = Math.floor(index / side)
      let x = index % side
      // console.log(index + ': {'+x+','+y+'}')
      map[index] = 'R'
    }

    for (let y = 0; y < side; y+= 1) {
      for (let x = 0; x < side; x+= 1) {
        let char = map[y*side+x]
        if (char) { continue; }
        let n = (y > 0) ? (map[(y-1)*side+x] == 'R' ? 1 : 0): 0
        let s = (y < side-1) ? (map[(y+1)*side+x] == 'R' ? 1 : 0): 0

        let w = (x > 0) ? (map[y*side+(x-1)] == 'R' ? 1 : 0) : 0
        let e = (x < side-1) ? (map[y*side+(x+1)] == 'R' ? 1 : 0): 0
        if (n + e + w + s > 1) {
          map[y*side+x] = 'C'
        }
      }
    }

    for (let y = 0; y < side; y+= 1) {
      for (let x = 0; x < side; x+= 1) {
        let char = map[y*side+x]
        if (!char || char == 'C') { continue; }

        let n = (y > 0) ? (map[(y-1)*side+x] == 'C' ? 1 : 0): 0
        let s = (y < side-1) ? (map[(y+1)*side+x] == 'C' ? 1 : 0): 0

        let w = (x > 0) ? (map[y*side+(x-1)] == 'C' ? 1 : 0) : 0
        let e = (x < side-1) ? (map[y*side+(x+1)] == 'C' ? 1 : 0): 0
        if (n + e + w + s > 0) { continue; }
        map[y*side+x] = 'X'
      }
    }


    let str = ''
    for (let y = 0; y < side; y += 1) {
      for (let x = 0; x < side; x+= 1) {
        let char = map[y*side+x]
        str += char ? char : ' '
      }
      str += '\n'
    }
    console.log(str)
  }
}

/*
In this algorithm a "feature" is taken to mean any kind of map component e.g. large room, small room, corridor, circular arena, vault etc.
1 Fill the whole map with solid earth
2 Dig out a single room in the centre of the map
3 Pick a wall of any room
4 Decide upon a new feature to build
5 See if there is room to add the new feature through the chosen wall
6 If yes, continue. If no, go back to step 3
7 Add the feature through the chosen wall
8 Go back to step 3, until the dungeon is complete

Step 1 and 2 are easy once you've got the map set up. I have found it very useful to write a "fillRect" command that fills a rectangular map area with a specified tile type.
Step 3 is trickier. You can't pick random squares to add new features because the rule is to always add to the existing dungeon. This makes the connections look good, and also guarantees that every square is reachable. The way Tyrant does it is to pick random squares on the map until it finds a wall square adjacent (horizontally or vertically) to a clear square. This is a good method, since it gives you a roughly even chance of picking any particular wall square.
Step 4 isn't too hard - I just use a random switch statement to determine which of a range of features to build. You can change the whole look of the map by weighting the probabilities of different features. Well-ordered dungeons will have lots of regular rooms and long straight corridors. Cave complexes will tend to have jagged caverns, twisting passages etc.
Step 5 is more tricky, and the key to the whole algorithm. For each feature, you need to know the area of the map that it will occupy. Then you need to scan outwards from the chosen wall to see if this area intersects any features that are already there. Tyrant does this in a fairly simplistic way - it just works out the rectangular space that the new feature will occupy plus a square on each side for walls, then checks to see if the entire rectangle is currently filled with solid earth.
Step 6 decides whether or not to add the feature. If the area under consideration contains anything other than solid earth already, then the routine loops back to step 3. Note that *most* new features will be rejected in this way. This isn't a problem, as the processing time is negligible. Tyrant tries to add 300 or so features to each dungeon, but usually only 40 or so make it past this stage.
Step 7 draws the new feature once you've decided the area is OK. In this stage, you can also add any interesting room features, such as inhabitants, traps, secret doors and treasure.
Step 8 just loops back to build more rooms. The exact number of times that you want to do this will depend on map size and various other factors.

*/

class Feature {
  constructor() {
    return {
      x: 0,
      y: 0,
      type: 'X',
      doors: {
        north: 0,
        east: 0,
        west: 0,
        south: 0
      }
    }
  }
}

class Room {
  constructor() {
    super()
    this.type = 'R'
  }
}

class Corridor {
  constructor() {
    super()
    this.type = 'C'
  }
}

const generateDungeon = (size) => {
  size = size || 7
  let features = [Room, Corridor, Corridor]
  let directions = ['north', 'south', 'east', 'west']
  // Step 1: Fill with Solid Earth
  let dungeon = new Dungeon(size)
  console.log(dungeon)

  let rooms = []

  // Step 2: seed center room
  let seed = new Room()
  seed.x = Math.floor(size/2)
  seed.y = seed.x
  rooms.push(seed)
  dungeon.set(seed)

  let maxCount = size*(size - 1);

  while (dungeon.emptyCount() > 10) {
    let origin
    let direction
    // Step 3 - pick random room, random wall
    while (!direction) {
      origin = getRandomItem(rooms)
      for (let dir of origin.doors) {
        if (!origin.doors[dir]) {
          direction = dir
          break
        }
      } // end door loop
    } // end while !direction

  }

}

class Dungeon {
  constructor(size) {
    let self = this
    if (!size || size == 1) { throw new Error("Cannot create map of size 0 or 1") }

    let map = []
    for (let x = 0; x < size; x += 1) {
      let column = []
      for (let y = 0; y < size; y += 1) {
        column.push(0)
      }
      map.push(column)
    }

    self.get = (x, y) => { return map[x][y] }
    self.set = (value, x, y) => {
      x = value.x || x || 0
      y = value.y || y || 0
      map[x][y] = value
    }

    self.foreach = (func) => {
      if (!func) { return }
      for (let x = 0; x < size; x += 1) {
        for (let y = 0; y < size; y += 1) {
          func(map[x][y], x, y)
        }
      }
    }

    self.totalCount = () => {
      return size * size
    }

    self.emptyCount = () => {
      let count = 0
      self.foreach( (value, x, y) => {
        if (value === 0) { count += 1 }
      })
      return count
    }

  }
}
