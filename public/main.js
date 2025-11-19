import { gradient_linear } from "./utils/gradientLinear.js";
import { solid } from "./utils/solid.js";
import { position } from "./utils/position.js";
import { convertToRGB } from "./utils/convertToRGB.js";
const mockData = window.mockData;
const children = mockData.document.children;
console.log(children)

if (mockData.length == 0) {
    throw error("Figma file error")
}

function convertIdString(id) {
    const [a, b] = id.split(':');
    return `.id${a}-${b}`;
}


for (const item of children) {

    const id = item.id;
    console.log(id)
    const stringId = convertIdString(id)
    console.log(stringId)
    const query = document.querySelector(stringId);
    
    for (const [key, value] of Object.entries(item)) {
    
        if (key == "fills") {
            for (const [i, j] of Object.entries(value)) {
                // Add graadient liunear to an object of some sorts
                if (j.type == "GRADIENT_LINEAR") {
                    const gradientString = gradient_linear(j)
    
                    console.log(gradientString)
                    query.style.backgroundImage = gradientString
                }
    
                if (j.type == "SOLID") {
                    var rgb = solid(j);
                    console.log(rgb)
                    query.style.backgroundColor = rgb
                }
            }
        } else if (key == "absoluteBoundingBox") {
            // Come back to this to decide if you want to make it so query changes are done in main or in function
            position(query, value)
        } else if (key == "cornerRadius") {
            query.style.borderRadius = value + 'px';
        } else if (key == "clipsContent") {
            if (value) {
                query.style.overflow = "hidden";
            } else {
                query.style.overflow = "visible";
            }
        // Come back to strokes
        } else if (key == "strokes") {
            const stroke = value[0]
            
        //Come back to do more effects
        } else if (key == "effects" && value.length > 0) {
            if (value.type = "BACKGROUND_BLUR") {
                query.style.backdropFilter = `blur(${value.radius}px)` 
                console.log("went through")
            }
        }
    }
}




