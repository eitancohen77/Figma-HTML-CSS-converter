if (frameMock.length == 0) {
    throw error("Figma file error")
}

function convertToRGB(color) {
    const red = Math.round(color.r *255);
    const green = Math.round(color.g * 255);
    const blue = Math.round(color.b * 255);
    const a = color.a ?? 1;
    return {red, green, blue, a}; // May be a edge case. a may not exists
}

for (const [key, value] of Object.entries(frameMock)) {

    if (key == "fills") {
        for (const [i, j] of Object.entries(value)) {
            // Add graadient liunear to an object of some sorts
            if (j.type == "GRADIENT_LINEAR") {
                const {red, green, blue, a} = convertToRGB(j.gradientStops[0].color);
                console.log(`rgba: ${red}, ${green}, ${blue}, ${a}`);
            }
            
        }
    }
}
