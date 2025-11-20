import { gradient_linear } from "./utils/gradientLinear.js";
import { solid } from "./utils/solid.js";
import { position } from "./utils/position.js";
import { convertToRGB } from "./utils/convertToRGB.js";

const data = window.realData;
const children = data.document.children;
console.log(data)

if (data.length == 0) {
    throw error("Figma file error")
}

// Original parent will have to be canvas, but in this case it will be set to .frame
const parent = document.querySelector('body');

// Need a queue to run BFS on the tree
// Need a way to keep track of which levels we are on in order 
const queue = []

// You are going to need to create a createCanvas function
const rootDiv = document.createElement('div')
const rootId =  idToClassName(data.document.id)
rootDiv.classList.add(rootId);
parent.append(rootDiv)

queue.push(data.document);


function idToClassName(id) {
    const [a, b] = id.split(':');
    return `id${a}-${b}`;
}

function idToSelector(id) {
    return '.' + idToClassName(id);  // with dot
}


while (queue.length > 0) {

    const item = queue.shift()

    const id = item.id;
    const stringId = idToSelector(id)
    console.log(stringId)
    const query = document.querySelector(stringId);

    if (!query) {
        console.warn('No element found for', stringId);
        continue;
    }

    if (item.type == "FRAME") {
        
        for (const [key, value] of Object.entries(item)) {
        
            if (key == "fills") {
                for (const [i, j] of Object.entries(value)) {
                    // Add graadient liunear to an object of some sorts
                    if (j.type == "GRADIENT_LINEAR") {
                        const gradientString = gradient_linear(j)
        
                        query.style.backgroundImage = gradientString
                    }
        
                    if (j.type == "SOLID") {
                        var rgb = solid(j);
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
                }
            }
        }
    }

    else if (item.type == "TEXT") {
        for (const [key, value] of Object.entries(item)) { 
            if (key == "style") {
                query.style.fontFamily = item.style.fontFamily;
                query.style.fontStyle = item.style.fontStyle;
                query.style.fontWeight = item.style.fontWeight;
                query.style.fontSize = item.style.fontSize + "px";
                query.style.letterSpacing = item.style.letterSpacing + "px";
                if (item.style.lineHeightUnit === "PIXELS") {
                    query.style.lineHeight = item.style.lineHeightPx + "px";
                }
                query.style.textAlign = item.style.textAlignHorizontal.toLowerCase();
                query.style.display = "flex";
                if (item.style.textAlignVertical === "CENTER") {
                    query.style.alignItems = "center";
                } else if (item.style.textAlignVertical === "TOP") {
                    query.style.alignItems = "flex-start";
                } else {
                    query.style.alignItems = "flex-end";
}
                query.style.justifyContent = query.style.alignItems;
                query.style.marginBottom = item.style.paragraphSpacing + "px";
                query.style.whiteSpace = "pre-wrap";
            } else if (key == "characters") {
                query.textContent = value
            } else if (key == "absoluteBoundingBox") {
                position(query, value)
            }
        }
    }

    // Deal with children
    const children = item.children || [];
    for (const child of children) {
        const childDiv = document.createElement('div')
        const childId =  idToClassName(child.id)
        childDiv.classList.add(childId);

        query.appendChild(childDiv)
        queue.push(child);
    }
}




