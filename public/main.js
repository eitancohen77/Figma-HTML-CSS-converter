import { gradient_linear } from "./utils/gradientLinear.js";

if (frameMock.length == 0) {
    throw error("Figma file error")
}

for (const [key, value] of Object.entries(frameMock)) {

    if (key == "fills") {
        for (const [i, j] of Object.entries(value)) {
            // Add graadient liunear to an object of some sorts
            if (j.type == "GRADIENT_LINEAR") {
                const gradientString = gradient_linear(j)

                console.log(gradientString)
                
                const div120 = document.querySelector('.id1-120');
                div120.style.backgroundImage = gradientString
            }
        }
    }
}



