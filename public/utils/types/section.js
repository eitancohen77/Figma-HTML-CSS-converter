import { applyPaint } from "../helper/paint.js";
import { applyPosition } from "../helper/position.js";

export function section(query, item, parent) {
    const parentBox = parent != null ? parent.absoluteBoundingBox : null;

    if (item.fills && item.fills.length > 0) {
        applyPaint(query, item.fills[0], "background")
    } else if (item.backgroundColor != null) {
        const { r, g, b, a } = item.backgroundColor;
        const rgb = `rgba(${r*255}, ${g*255}, ${b*255}, ${a})`;
        query.style.backgroundColor = rgb
        console.log(rgb)
    }

    if (item.absoluteBoundingBox !== null) {
        let localBox;
        if (parentBox) { // Checks to see if the parent has a position
            localBox = {
                x: item.absoluteBoundingBox.x - parentBox.x,
                y: item.absoluteBoundingBox.y - parentBox.y,
                width: item.absoluteBoundingBox.width,
                height: item.absoluteBoundingBox.height
                };
            } else {
                localBox = item.absoluteBoundingBox;
        }
        applyPosition(query, localBox)
    }

    if (item.strokes && item.strokes.length > 0) {
        //applyStrokes(query, item);
        applyPaint(query, item.strokes[0], "stroke", item.strokeWeight)
    }  
}