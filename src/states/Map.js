import Phaser from 'phaser'
import { colors } from '../data/Constants'
import { generateDungeon, Dungeon, Room, Corridor, Feature } from '../data/Dungeon'

const getFilename = (path) => {
    return path.split('\\').pop().split('/').pop()
}

const getImageKey = (path) => {
  let name = getFilename(path)
  return name.split('.')[0]
}

export default class MapState extends Phaser.State {

  init() {
    // let json = this.game.cache.getTilemapData('level001')
    // console.log(json)
    // let map = Phaser.TilemapParser.parseTiledJSON(json.data)
    // console.log(map)
    //

  }

  preload() {

  }

  create() {
    let self = this
    self.group = self.add.group()
    self.addDungeon()
    self.old_create()
    self.inputEnabled = true
    self.input.onTap.add(self.addDungeon, self)
  }

  addDungeon() {
    this.group.removeAll()
    let self = this
    let scale = 3
    let features = [
      {count: 1, feature: Room},
      {count: 5, feature: Corridor }
    ]
    let dungeon = generateDungeon({size: 7, features})
    dungeon.foreach( (value,x,y) => {
      if (!value) { return }
      let xPos = (32*x+16)*scale
      let yPos = (32*y+16)*scale
      let sprite = new Phaser.Image(self.game, xPos, yPos, value.imageKey)
      sprite.rotation = value.rotation
      sprite.anchor.setTo(0.5)
      sprite.scale = new Phaser.Point(scale,scale)
      self.group.addChild(sprite)

      if (value.print === 'R') {
        let label = new Phaser.Text(self.game, xPos, yPos, value.roomNumber)
        label.anchor.setTo(0.5)
        self.group.addChild(label)
      }


      // let exits = ''
      // exits += (value.doors.north) ? 'N' : '_'
      // exits += (value.doors.east) ? 'E' : '_'
      // exits += (value.doors.south) ? 'W' : '_'
      // exits += (value.doors.west) ? 'S' : '_'
      //
      // console.log(value.imageKey+": "+sprite.x+","+sprite.y+' '+exits)

    })
  }

  old_create() {

    let map = this.game.add.tilemap('level001')
    this.map = map;
    console.log(map)

    let scale = 1
    let minimap = this.add.group()

    let layer = this.map.layers[0]
    minimap.x = this.game.world.width - (this.map.width * this.map.tileWidth)
    for (let r = 0; r < layer.data.length; r += 1) {
      let row = layer.data[r]
      for (let c = 0; c < row.length; c += 1) {
        let tile = row[c]

        let tileprops = this.map.tiles[tile.index]
        let setID = tileprops[2]
        let tilesetprops = this.map.tilesets[setID]
        let imagePath = tilesetprops.tiles[tile.index-1].image
        let imageName = getImageKey(imagePath)

        tile.imageKey = imageName
        let sprite = new Phaser.Image(this.game, (tile.worldX+tile.centerX)*scale, (tile.worldY+tile.centerY)*scale, imageName)
        sprite.anchor.setTo(0.5)
        sprite.rotation = tile.rotation
        let angle = tile.rotation / Math.PI * 180
        for (let a = angle; a > 0; a -= 90) {
          let t = tile.properties.west
          tile.properties.west = tile.properties.south
          tile.properties.south = tile.properties.east
          tile.properties.east = tile.properties.north
          tile.properties.north = t
        }
        sprite.scale = {x:scale, y:scale}
        sprite.tint = colors.white
        tile.sprite = sprite
        minimap.addChild(sprite)
      }
    }


  }

}


/*

Ideas:

Use basic math puzzles for doors, teaching a different number system.
Use diferent cololors to indicate different bases (b2 - y, b10 - g, b7 - r, b16 - b)

Use hearts to indicate "health" or tries.

Scatter language with obscure passages, answers are taken from text

Find notes from previous gauntlet takers

Symbols, passages, and colors/bases begin to teach you magic

b2 - target (me/them - number) (z, x)
b10 - spell type (q w e r t y u i o p)
b16 - spell shaping (formula, how it works)
b7 - super diff spells modifiers?

Use magic to solve other puzzles
Use magic to combat enemies

also, (maybe instead of complicated magic systyem)

Use physics puzzles like those in Gizmo's & Gadgets

*/
