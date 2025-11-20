import { frame } from "./utils/types/frame.js";
import { text } from "./utils/types/text.js";
import { canvas } from "./utils/types/canvas.js";
import { rectangle } from "./utils/types/rectangle.js";


const data = window.mockData;
console.log(data)

if (!data || !data.document) {
    throw error("Figma file error")
}

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

while (queue.length > 0) {
    const { node: item, parent } = queue.shift();
    const id = item.id;
    const stringId = idToSelector(id);
    const query = document.querySelector(stringId);
    
    if (!query) continue;

    if (item.type === "FRAME") {
        frame(query, item, parent);
    }

    if (item.type == "CANVAS") {
        canvas(query, item)
    }

    else if (item.type == "RECTANGLE") {
        rectangle(query, item, parent)
    }

    else if (item.type == "TEXT") {
        text(query, item, parent)
    }

    // Deal with children
    const children = item.children || [];
    for (const child of children) {
        const childDiv = document.createElement("div");
        const childId = idToClassName(child.id);
        childDiv.classList.add(childId);
        query.appendChild(childDiv);

        queue.push({ node: child, parent: item });
    }








    // // Pop the queue.
    // const { node: item, parent } = queue.shift();
    // const parentBox = parent != null ? parent.absoluteBoundingBox : null;

    // // Getting the id in order to tag each property/componenet types.
    // const id = item.id;
    // const stringId = idToSelector(id)
    // console.log(stringId)
    // const query = document.querySelector(stringId);

    // if (!query) {
    //     console.warn('No element found for', stringId);
    //     continue;
    // }

    // if (item.type == "CANVAS") {
    //     canvas(query, item)
    // }

    // if (item.type == "FRAME" || item.type == "GROUP") {
    //     frame(query, parentBox, item);
    // }

    // else if (item.type == "RECTANGLE") {
    //     rectangle(query, item, parentBox)
    // }

    // else if (item.type == "TEXT") {
    //     text(query, item, parentBox)
    // }

    // // Deal with children
    // const children = item.children || [];
    // for (const child of children) {
    //     const childDiv = document.createElement('div')
    //     const childId =  idToClassName(child.id)
    //     childDiv.classList.add(childId);

    //     query.appendChild(childDiv)
    //     queue.push({ node: child, parent: item });
    // }
}