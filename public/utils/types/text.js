import { applyPosition } from "../helper/position.js";
import { applyFills } from "../helper/fills.js";
import { applyFont } from "../helper/font.js";
import { applyPaint } from "../helper/paint.js";

export function text(query, item, parentBox) {
    
    if (item.style) {
        applyFont(query, item)
    }
    
    if (item.characters) {
        query.textContent = item.characters
    }
    
    if (item.absoluteBoundingBox) {
        const localBox = parentBox
            ? {
                x: item.absoluteBoundingBox.x - parentBox.x,
                y: item.absoluteBoundingBox.y - parentBox.y,
                width: item.absoluteBoundingBox.width,
                height: item.absoluteBoundingBox.height
            }
            : item.absoluteBoundingBox;
        applyPosition(query, localBox)
    }
    
    if (item.fills != null && item.fills.length > 0) {
        applyPaint(query, item.fills[0], "text")
    }


    // for (const [key, value] of Object.entries(item)) { 
    //     if (key == "style") {
    //         applyFont(query, item)
    //     } else if (key == "characters") {
    //         query.textContent = value
    //     } else if (key == "absoluteBoundingBox") {
    //         const localBox = parentBox
    //             ? {
    //                 x: value.x - parentBox.x,
    //                 y: value.y - parentBox.y,
    //                 width: value.width,
    //                 height: value.height
    //             }
    //             : value;
    //         applyPosition(query, localBox)
    //     } else if (key == "fills") {
    //         applyFills(query, item.fills, "text")
    //         //applyPaint(query, item.fills, )
    //     }
    // }
}