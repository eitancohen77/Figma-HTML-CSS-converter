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

gradientString = ""

for (const [key, value] of Object.entries(frameMock)) {

    if (key == "fills") {
        for (const [i, j] of Object.entries(value)) {
            // Add graadient liunear to an object of some sorts
            if (j.type == "GRADIENT_LINEAR") {
                const { red: red1, green: green1, blue: blue1, a: a1 } = convertToRGB(j.gradientStops[0].color);
                const { red: red2, green: green2, blue: blue2, a: a2 } = convertToRGB(j.gradientStops[1].color);
                
                const p1 = j.gradientStops[0].position * 100;
                const p2 = j.gradientStops[1].position * 100;

                const c1 = `rgba(${red1}, ${green1}, ${blue1}, ${a1}) ${p1}%`;
                const c2 = `rgba(${red2}, ${green2}, ${blue2}, ${a2}) ${p2}%`;

                gradientString = `${c1}, ${c2}`;
            }
            
        }
    }
}

console.log(gradientString)

const div120 = document.querySelector('.id1-120');
div120.style.backgroundImage = `linear-gradient(120deg, ${gradientString})`

