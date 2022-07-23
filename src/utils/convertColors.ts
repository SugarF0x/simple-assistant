/**
 * Courtesy of StackOverflow almighty:
 *   https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 *   https://stackoverflow.com/questions/635022/calculating-contrasting-colours-in-javascript
 */

function componentToHex(c: number) {
  const hex = c.toString(16)
  return hex.length == 1 ? "0" + hex : hex
}

export function rgbToHex(rgb: { r: number; g: number; b: number }) {
  const { r, g, b } = rgb
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) throw new Error(`Error converting hex to RGB - malformed value: ${hex}`)
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

export function getContrastingColor(color: string) {
  const rgb = hexToRgb(color)
  const threshold = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b

  return threshold >= 165 ? "#000000" : "#FFFFFF"
}
