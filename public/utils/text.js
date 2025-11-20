import { applyPosition } from "./helper/position.js";
import { applyFills } from "./helper/fills.js";
import { applyFont } from "./helper/font.js";

export function text(query, item, parentBox) {

    for (const [key, value] of Object.entries(item)) { 
        if (key == "style") {
            applyFont(query, item)
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
            applyPosition(query, localBox)
        } else if (key == "fills") {
            applyFills(query, item.fills, "text")
        }
    }
}