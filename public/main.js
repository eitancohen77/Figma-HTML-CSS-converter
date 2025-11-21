import { frame } from "./utils/types/frame.js";
import { text } from "./utils/types/text.js";
import { canvas } from "./utils/types/canvas.js";
import { rectangle } from "./utils/types/rectangle.js";
import { vector } from "./utils/types/vector.js";
import { section } from "./utils/types/section.js";
import { addPanControls } from "./utils/helper/movementButtons.js";

const data = window.mockData;

let mySet = new Set();

// Checks to see if the returned data is null or not. If not
// logs error and doesnt proceed.
if (!data || !data.document) {
    console.error("Figma file error", data)
} else {

    const root = data.document
    const parent = document.querySelector('body');

    // Need a queue to run BFS on the tree
    // Need a way to keep track of which levels we are on in order 
    const queue = []

    // You are going to need to create a createCanvas function
    const rootDiv = document.createElement('div');
    const rootId = idToClassName(root.id);
    rootDiv.classList.add(rootId);
    parent.append(rootDiv);

    queue.push({ node: root, parent: null });
    
    // Move picture:
    addPanControls(rootDiv)

    function idToClassName(id) {
        return "id" + id.replace(/[^a-zA-Z0-9_-]/g, "-");
    }
    function idToSelector(id) {
        return '.' + idToClassName(id);
    }

    while (queue.length > 0) {
        // Pop the queue.
        const { node: item, parent } = queue.shift();

        // Getting the id in order to tag each property/componenet types.
        const id = item.id;
        const stringId = idToSelector(id)
        const query = document.querySelector(stringId);

        if (!query) {
            console.log('No element found for', stringId);
            continue;
        }
        
        mySet.add(item.type)
        if (item.type == "CANVAS") {
            canvas(query, item)
        } else if (item.type == "FRAME" || item.type == "GROUP" || item.type == "COMPONENT" || item.type == "INSTANCE") {
            frame(query, item, parent);
        } else if (item.type == "VECTOR" || item.type == "STAR" || item.type == "LINE") {
            vector(query, item, parent)
        } else if (item.type == "RECTANGLE") {
            rectangle(query, item, parent)
        } else if (item.type == "TEXT") {
            text(query, item, parent)
        } else if (item.type == "SECTION") {
            section(query, item, parent)
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
    console.log(mySet)
}