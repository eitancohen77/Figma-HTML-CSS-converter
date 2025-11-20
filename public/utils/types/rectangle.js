import { applyPosition } from "../helper/position.js";
import { applyPaint } from "../helper/paint.js";


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
    
    if (item.fills && item.fills.length > 0) {
        applyPaint(query, item.fills[0], "background")
    } 

    if (item.cornerRadius) {
        query.style.borderRadius = item.cornerRadius + 'px';
    }

    if (item.rotation && item.rotation !== 0) {
        query.style.transform = `rotate(${item.rotation}rad)`;
        query.style.transformOrigin = "center center";
    }
}