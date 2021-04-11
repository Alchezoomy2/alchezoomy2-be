const { getPaletteFromURL } = require('color-thief-node');

module.exports = async (picUrl) => {
    let hexPalette = ["#000000", "#000001", "#000002", "#000003", "#000004"]
    console.log(picUrl)
    if (picUrl) {
        const colorPalette = await getPaletteFromURL(picUrl);
        console.log("🚀 ~ file: fetchColorPalette.js ~ line 8 ~ module.exports= ~ colorPalette ", colorPalette)

        hexPalette = colorPalette.map(color => `#${componentToHex(color[0])}${componentToHex(color[1])}${componentToHex(color[2])}`)
    }

    return hexPalette
}