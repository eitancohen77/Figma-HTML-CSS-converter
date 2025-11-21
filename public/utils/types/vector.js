import { applyPosition } from "../helper/position.js";
import { applyPaint } from "../helper/paint.js";

export function vector(query, item, parent) {
    const parentBox = parent != null ? parent.absoluteBoundingBox : null;

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
    } else if (item.backgroundColor != null) {
        const { r, g, b, a } = item.backgroundColor;
        const rgb = `rgba(${r*255}, ${g*255}, ${b*255}, ${a})`;
        query.style.backgroundColor = rgb
        console.log(rgb)
    }

    if (item.strokes && item.strokes.length > 0) {
        applyPaint(query, item.strokes[0], "stroke", item.strokeWeight)
    }  

    else if (item.backgroundColor != null) {
        const { r, g, b, a } = item.backgroundColor;
        const rgb = `rgba(${r*255}, ${g*255}, ${b*255}, ${a})`;
        query.style.backgroundColor = rgb
        console.log(rgb)
    }

    if (item.rotation && item.rotation !== 0) {
        query.style.transform = `rotate(${item.rotation}rad)`;
        query.style.transformOrigin = "center center";
    }

}