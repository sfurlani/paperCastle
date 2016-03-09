
import { shuffleArray, getRandomInt, getRandomItem } from '../utils'

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

/**
 * Base Dungeon Feature Class
 */
export class Feature {
  constructor(x,y) {
    let props = {
      x: x || 0,
      y: y || 0,
      print: 'X',
      key: 'e',
      doors: {
        north: 0,
        east: 0,
        west: 0,
        south: 0
      },
      _rotation: 0
    }
    Object.assign(this, props)
  }

  get doorCount() {
    let doors = this.doors

    let west = doors.west
    let east = doors.east
    let south = doors.south
    let north = doors.north

    let exits = 0
    exits += (north) ? 1 : 0
    exits += (east) ? 1 : 0
    exits += (south) ? 1 : 0
    exits += (west) ?  1 : 0
    return exits
  }

  get imageKey() {
    if (this._key) { return this._key}

    // Determine ImageKey and sprite rotation based on placement of doors

    let doors = this.doors
    let west = doors.west
    let east = doors.east
    let south = doors.south
    let north = doors.north

    let exits = this.doorCount

    let l = 0
    let r = Math.PI
    let u = 0.5*Math.PI
    let d = 1.5*Math.PI

    let suffix = ''

    if (exits == 1) {
      if (north) {
        this._rotation = u
      }
      else if (east) {
        this._rotation = r
      }
      else if (south) {
        this._rotation = d
      }
    } else if (exits == 2) {
      suffix = 'r'
      if (west && east) {
        suffix = 's'
      }
      else if (north && south) {
        suffix = 's'
        this._rotation = u
      }
      else if (west && south) {
        this._rotation = l
      }
      else if (north && west) {
        this._rotation = u
      }
      else if (east && north) {
        this._rotation = r
      }
      else if (south && east) {
        this._rotation = d
      }


    } else if (exits == 3) {
      if (!north) {
        this._rotation = d
      }
      else if (!south) {
        this._rotation = u
      }
      else if (!west) {
        this._rotation = r
      }
    }
    if (exits) {
      this._key = this.key + (exits || '') + suffix
    } else {
      this._key = 'e'
      this.print = '?'
    }
    return this._key
  }

  get rotation() {
    return this._rotation
  }

  get rotDegrees() {
    return this.rotation() / Math.PI * 180
  }
}

/**
 * This Subclass for Rooms - considering composition isntead
 */
export class Room extends Feature{
  constructor(x,y) {
    super(x,y)
    this.print = 'R'
    this.key = 'r'
  }

}

/**
 * This Subclass for Corridors - considering composition isntead
 */
export class Corridor extends Feature{
  constructor(x,y) {
    super(x,y)
    this.print = 'C'
    this.key = 'c'
  }
}

/**
 * @class FeatureSpec
 * @property count {number} Relative Odds (i.e. passing in specs with 1, 2, and 7 means that the odds are 1:10, 2:10, 7:10 respectively)
 * @property feature {type} Feature or SubClass to create
 */

/**
 *
 * @param [size=7] {number}
 * @param features {FeatureSpec[]}
 * @returns {Dungeon}
 */
export const generateDungeon = ({size, features}) => {
  size = size || 7

  // Step 4 function definition
  features = features || [{count: 1, feature: Room}, {count: 1, feature: Corridor }]
  let nextFeature = () => {
    let total = 0
    for (let n = 0; n < features.length; n += 1) { total += features[n].count }
    let index = getRandomInt(1, total)
    let running = 0
    for (let n = 0; n < features.length; n += 1) {
      running += features[n].count
      if (index <= running) { return features[n].feature }
    }
    console.log(features)
    throw new Error("Shouldn't get here: wrong input: "+features)
  }
  let directions = ['north', 'south', 'east', 'west']

  // Step 1: Fill with Solid Earth
  let dungeon = new Dungeon(size)
  console.log(dungeon)

  let rooms = []
  let allFeatures = []

  // Step 2: seed rooms
  let seedCount = 1 // numbers great than 1 will require graph checking
  for (let n = 0; n < seedCount; n += 1) {
    let seed = new Room(getRandomInt(0,size-1), getRandomInt(0,size-1))
    allFeatures.push(seed)
    seed.roomNumber = rooms.length
    rooms.push(seed)
    dungeon.set(seed)
  }

  let tries = 0 // infinite loop guard
  let next = null

  while (dungeon.emptyCount() > size && tries < (size*size*5)) {
    tries += 1

    // Step 3
    let origin = next || getRandomItem(allFeatures)
    let direction = getRandomItem(directions)

    if (!origin) { console.log(allFeatures); throw new Error("Unable to find origin") }

    // Step 4
    let featureClass = nextFeature()
    if (!featureClass) { console.log(features); throw new Error("Unable to generate feature"); }

    // Step 5a - check if door already exists
    let door = origin.doors[direction]
    if (door) { next = null; continue }

    // Step 5b - check if adjacent feature exists
    let adjacentFeatures = dungeon.getAdjacentTo(origin)
    let feature = adjacentFeatures[direction]

    // Step 5c - If origin is a room, open a door x% of the time (50%)
    if (feature) {

      if( typeof(feature) === "string" ) { next = null; continue} // map returns `X` as edge sentinel
      if( origin.print === 'C' ) { next = null; continue} // Don't add doors to corridors
      if( Math.random() < 0.5 ) { next = null; continue} // Only add a door 50% of the time

      // Open Door between the two features
      origin.doors[direction] = feature
      switch (direction) {
      case 'north':
        feature.doors.south = origin
        break;
      case 'south':
        feature.doors.north = origin
        break;
      case 'east':
        feature.doors.west = origin
        break;
      case 'west':
        feature.doors.east = origin
        break;
      }

      next = feature
      continue
    }

    // Step 4 - create new feature
    next = new featureClass(origin.x, origin.y)
    allFeatures.push(next)
    if (next.print === 'R') { next.roomNumber = rooms.length; rooms.push(next) } // keep track of room #'s separately

    // Open Mutual Doors
    origin.doors[direction] = next
    switch (direction) {
    case 'north':
      next.doors.south = origin
      next.y -= 1
      break;
    case 'south':
      next.doors.north = origin
      next.y += 1
      break;
    case 'east':
      next.doors.west = origin
      next.x += 1
      break;
    case 'west':
      next.doors.east = origin
      next.x -= 1
      break;
    }
    dungeon.set(next)

    // Step 6 (repeat)
  }



  // Turn Corridor Dead-Ends into Rooms
  dungeon.foreach( (value, x, y) => {
    if (value.imageKey !== 'c1') { return }

    let replacement = new Room(x,y)
    replacement.doors = value.doors
    dungeon.set(replacement)
    replacement.roomNumber = rooms.length
    rooms.push(replacement)
  })

  // Step 2 - back fill empty spots with stone
  dungeon.foreach( (value, x, y) => {
    if (value && value.doorCount > 0) { return }
    let rock = new Feature()
    rock.x = x
    rock.y = y
    dungeon.set(rock)
  })

  dungeon.rooms = rooms
  dungeon.features = allFeatures

  console.log('Final: ')
  console.log(dungeon.getPrintOut())

  return dungeon
}

export class Dungeon {
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
      for (let y = 0; y < size; y += 1) {
        for (let x = 0; x < size; x += 1) {
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

    self.getAdjacent = (x,y) => {
      return {
        'north': (y > 0) ? map[x][y-1] : 'X',
        'south': (y < size-1) ? map[x][y+1]: 'X',
        'west' : (x > 0) ? map[x-1][y] : 'X',
        'east' : (x < size-1) ? map[x+1][y] : 'X'
      }
    }

    self.getAdjacentTo = (value) => {
      return self.getAdjacent(value.x, value.y)
    }

    self.getPrintOut = () => {
      let lastY = 0
      let printout = ''

      self.foreach( (value, x, y) => {
        if (y != lastY) {
          printout += '\n'
          lastY = y
        }
        printout += (value) ? (value.print || '?') : ' '
      })
      return printout
    }

  }

}
