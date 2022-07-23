import { rgbToHex } from "@/utils/convertColors"

/**
 * Courtesy of StackOverflow almighty: https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
 *
 * Modified a bit to accept image url instead of img element & return HEX instead of RGB
 */

export function getAverageImageColor(imgUrl: string) {
  const imgEl = document.createElement("img")
  imgEl.src = imgUrl

  const blockSize = 5
  const defaultRGB = { r: 0, g: 0, b: 0 }
  const rgb = { r: 0, g: 0, b: 0 }
  const canvas = document.createElement("canvas")
  const context = canvas.getContext && canvas.getContext("2d")

  let data,
    i = -4,
    count = 0

  if (!context) {
    return rgbToHex(defaultRGB)
  }

  const height = (canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height)
  const width = (canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width)

  context.drawImage(imgEl, 0, 0)

  try {
    data = context.getImageData(0, 0, width, height)
  } catch (e) {
    /* security error, img on diff domain */
    return rgbToHex(defaultRGB)
  }

  const length = data.data.length

  while ((i += blockSize * 4) < length) {
    ++count
    rgb.r += data.data[i]
    rgb.g += data.data[i + 1]
    rgb.b += data.data[i + 2]
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count)
  rgb.g = ~~(rgb.g / count)
  rgb.b = ~~(rgb.b / count)

  return rgbToHex(rgb)
}
