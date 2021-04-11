const { getPaletteFromURL } = require('color-thief-node');

module.exports = async (picUrl) => {
    let hexPalette = ["#000000", "#000001", "#000002", "#000003", "#000004"]
    if (picUrl) {
        const colorPalette = await getPaletteFromURL(picUrl);

        hexPalette = colorPalette.map(color => `#${componentToHex(color[0])}${componentToHex(color[1])}${componentToHex(color[2])}`)
    }
    console.log("🚀 ~ file: fetchColorPalette.js ~ line 9 ~ module.exports= ~ hexPalette ", hexPalette)

    return hexPalette
}

function componentToHex(color) {
    let hex = color.toString(16);
    return hex.length == 1 ? "0" + hex : hex
}