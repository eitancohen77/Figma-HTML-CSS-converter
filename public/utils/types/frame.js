import { applyPosition } from "../helper/position.js";
import { applyStrokes } from "../helper/strokes.js";
import { applyFills } from "../helper/fills.js";
import { applyPaint } from "../helper/paint.js";

export function frame(query, item, parent) {
    const parentBox = parent != null ? parent.absoluteBoundingBox : null;
    
    if (item.fills && item.fills.length > 0) {
        //applyFills(query, item.fills, "background");
        applyPaint(query, item.fills[0], "background")
    } else if (item.backgroundColor != null) {
        const { r, g, b, a } = item.backgroundColor;
        const rgb = `rgba(${r*255}, ${g*255}, ${b*255}, ${a})`;
        query.style.backgroundColor = rgb
        console.log(rgb)
    }
    
    if (item.absoluteBoundingBox !== null) {
        let localBox;
        if (parentBox) { // edge case to catch the root
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

    if (item.cornerRadius) {
        query.style.borderRadius = item.cornerRadius + 'px';
    }

    if (item.clipsContent) {
        if (item.clipsContent) {
            query.style.overflow = "hidden";
        } else {
            query.style.overflow = "visible";
        }
    }

    if (item.strokes && item.strokes.length > 0) {
        //applyStrokes(query, item);
        applyPaint(query, item.strokes[0], "stroke", item.strokeWeight)
    }    

    //Come back to do more effects
    if (item.effects && item.effects.length > 0) {
        if (item.effects.type = "BACKGROUND_BLUR") {
            query.style.backdropFilter = `blur(${item.effects.radius}px)` 
        }
    }

    if (item.rectangleCornerRadii) {
        const [tl, tr, br, bl] = item.rectangleCornerRadii;
        query.style.borderRadius = `${tl}px ${tr}px ${br}px ${bl}px`;
    }
}