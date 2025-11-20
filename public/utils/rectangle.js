import { applyPosition } from "./helper/position.js";
import { applyFills } from "./helper/fills.js";


export function rectangle(query, item, parentBox) {
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
        applyFills(query, item.fills, "background")
    } 
    if (item.cornerRadius != null) {
        query.style.borderRadius = item.cornerRadius + 'px';
    }
    if (item.rotation != null && item.rotation !== 0) {
        query.style.transform = `rotate(${item.rotation}rad)`;
        query.style.transformOrigin = "center center";
    }
}