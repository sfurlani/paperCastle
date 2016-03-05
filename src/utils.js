export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const getRandomInt = (min, max) => {
  if (max == null) {
    max = min
    min = 0
  }
  return min + Math.floor(Math.random() * (max - min + 1))
}

export const getRandomItem = (array) => {
  let index = getRandomInt(array.length)
  return array[index]
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
export const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

export const setResponsiveWidth = (sprite, percent, parent) => {
  let percentWidth = (sprite.texture.width - (parent.width / (100 / percent))) * 100 / sprite.texture.width
  sprite.width = parent.width / (100 / percent)
  sprite.height = sprite.texture.height - (sprite.texture.height * percentWidth / 100)
}
