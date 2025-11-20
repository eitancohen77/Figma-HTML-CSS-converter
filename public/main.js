import { gradient_linear } from "./utils/gradientLinear.js";
import { solid } from "./utils/solid.js";
import { position } from "./utils/position.js";
import { convertToRGB } from "./utils/convertToRGB.js";

const data = window.realData;
const children = data.document.children;
console.log(data)

if (!data || !data.document) {
    throw error("Figma file error")
}

// Original parent will have to be canvas, but in this case it will be set to .frame
const parent = document.querySelector('body');

// Need a queue to run BFS on the tree
// Need a way to keep track of which levels we are on in order 
const queue = []

// You are going to need to create a createCanvas function
const rootDiv = document.createElement('div');
const rootId = idToClassName(data.document.id);
rootDiv.classList.add(rootId);
parent.append(rootDiv);

queue.push({ node: data.document, parent: null });


function idToClassName(id) {
    const [a, b] = id.split(':');
    return `id${a}-${b}`;
}

function idToSelector(id) {
    return '.' + idToClassName(id);  // with dot
}

// function fills(query, item) {
//     if (item.type == "GRADIENT_LINEAR") {
//         const gradientString = gradient_linear(item)

//         query.style.backgroundImage = gradientString
//     }

//     if (item.type == "SOLID") {
//         var rgb = solid(item);
//         query.style.backgroundColor = rgb
//     }
// }


while (queue.length > 0) {

    const { node: item, parent } = queue.shift();
    const parentBox = parent ? parent.absoluteBoundingBox : null;

    const id = item.id;
    const stringId = idToSelector(id)
    console.log(stringId)
    const query = document.querySelector(stringId);

    if (!query) {
        console.warn('No element found for', stringId);
        continue;
    }

    if (item.type == "CANVAS") {
        if (item.backgroundColor) {
            const { r, g, b, a } = item.backgroundColor;
            query.style.backgroundColor = `rgba(${r*255}, ${g*255}, ${b*255}, ${a})`;
        }
        query.style.position = "relative"
        query.style.width = "100vw"
        query.style.height = "100vh"
    }

    if (item.type == "FRAME") {
        //for (const [key, value] of Object.entries(item)) {

            if (item.fills != null && item.fills.length > 0) {
                for (const [i, j] of Object.entries(item.fills)) {
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
                //fills(query, item.fills)
                
            } 
            else if (item.backgroundColor != null) {
                const { r, g, b, a } = item.backgroundColor;
                const rgb = `rgba(${r*255}, ${g*255}, ${b*255}, ${a})`;
                query.style.backgroundColor = rgb
                console.log(rgb)
            }
            if (item.absoluteBoundingBox !== null) {
                const localBox = parentBox
                    ? {
                        x: item.absoluteBoundingBox.x - parentBox.x,
                        y: item.absoluteBoundingBox.y - parentBox.y,
                        width: item.absoluteBoundingBox.width,
                        height: item.absoluteBoundingBox.height
                    }
                    : item.absoluteBoundingBox;
                position(query, localBox)
            }
            if (item.cornerRadius != null) {
                query.style.borderRadius = item.cornerRadius + 'px';
            }
            if (item.clipsContent != null) {
                if (item.clipsContent) {
                    query.style.overflow = "hidden";
                } else {
                    query.style.overflow = "visible";
                }
            // Come back to strokes
            } else if (item.strokes != null) {
                const stroke = item.strokes[0]
            }    
            //Come back to do more effects
            if (item.effects && item.effects.length > 0) {
                if (item.effects.type = "BACKGROUND_BLUR") {
                    query.style.backdropFilter = `blur(${item.effects.radius}px)` 
                }
            }
        //}
    }

    if (item.type == "RECTANGLE") {

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
                const localBox = parentBox
                    ? {
                        x: value.x - parentBox.x,
                        y: value.y - parentBox.y,
                        width: value.width,
                        height: value.height
                    }
                    : value;
                position(query, localBox)
            } else if (key == "fills") {
                for (const [i, j] of Object.entries(item.fills)) {
                    const { r, g, b, a } = j.color;
                    const rgb = `rgba(${r*255}, ${g*255}, ${b*255}, ${a})`;
                    query.style.color = rgb;
                    if (j.opacity != null) {
                        query.style.opacity = j.opacity
                    }
                }
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
        queue.push({ node: child, parent: item });
    }
}