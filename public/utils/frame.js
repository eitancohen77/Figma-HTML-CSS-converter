import { applyPosition } from "./helper/position.js";
import { applyStrokes } from "./helper/strokes.js";
import { applyFills } from "./helper/fills.js";

export function frame(query, parentBox, item) {
    if (item.fills != null && item.fills.length > 0) {
        applyFills(query, item.fills, "background");
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
            applyPosition(query, localBox)
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
        }
        if (item.strokes != null) {
            applyStrokes(query, item);
        }    
        //Come back to do more effects
        if (item.effects != null && item.effects.length > 0) {
            if (item.effects.type = "BACKGROUND_BLUR") {
                query.style.backdropFilter = `blur(${item.effects.radius}px)` 
            }
        }
        if (item.rectangleCornerRadii != null) {
            const [tl, tr, br, bl] = item.rectangleCornerRadii;
            query.style.borderRadius = `${tl}px ${tr}px ${br}px ${bl}px`;
        }
}