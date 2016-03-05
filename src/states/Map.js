import Phaser from 'phaser'
import { colors } from '../data/Constants'

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

    let map = this.game.add.tilemap('level001')
    this.map = map;
    console.log(map)
  }

  preload() {

  }

  create() {
    let scale = 1
    let minimap = this.add.group()

    let layer = this.map.layers[0]
    minimap.x = this.game.world.width - (this.map.width * this.map.tileWidth)
    for (let r = 0; r < layer.data.length; r += 1) {
      let row = layer.data[r]
      for (let c = 0; c < row.length; c += 1) {
        let tile = row[c]
        console.log(tile)
        let tileprops = this.map.tiles[tile.index]
        let setID = tileprops[2]
        let tilesetprops = this.map.tilesets[setID]
        let imagePath = tilesetprops.tiles[tile.index-1].image
        let imageName = getImageKey(imagePath)
        console.log(imageName)

        let sprite = new Phaser.Image(this.game, (tile.worldX+tile.centerX)*scale, (tile.worldY+tile.centerY)*scale, imageName)
        sprite.anchor.setTo(0.5)
        sprite.rotation = tile.rotation
        sprite.scale = {x:scale, y:scale}
        sprite.tint = colors.white
        tile.sprite = sprite
        minimap.addChild(sprite)

      }
    }


  }

}
