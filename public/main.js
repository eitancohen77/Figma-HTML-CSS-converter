import { gradient_linear } from "./utils/gradientLinear.js";
import { solid } from "./utils/solid.js";
import { position } from "./utils/position.js";

if (frameMock.length == 0) {
    throw error("Figma file error")
}

function convertIdString(id) {
    const [a, b] = id.split(':');
    return `.id${a}-${b}`;
}

const id = frameMock.id;
console.log(id)
const stringId = convertIdString(id)
console.log(stringId)
const query = document.querySelector(stringId);

for (const [key, value] of Object.entries(frameMock)) {

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
            }
        }
    } else if (key == "absoluteBoundingBox") {
        // Come back to this to decide if you want to make it so query changes are done in main or in function
        position(query, value)
    }
}



