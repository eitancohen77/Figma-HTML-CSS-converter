import { applyPosition } from "../helper/position.js";
import { applyPaint } from "../helper/paint.js";
import { applyLayout } from "../helper/layout.js";

export function frame(query, item, parent) {
    const parentBox =
        parent && parent.absoluteBoundingBox ? parent.absoluteBoundingBox : null;
    const parentLayoutMode = parent ? parent.layoutMode || "NONE" : "NONE";

    // background
    if (item.fills && item.fills.length > 0) {
        applyPaint(query, item.fills[0], "background");
    } else if (item.backgroundColor != null) {
        const { r, g, b, a } = item.backgroundColor;
        query.style.backgroundColor = `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`;
    }

    // position frame itself, unless its parent is auto layout
    if (item.absoluteBoundingBox && parentLayoutMode === "NONE") {
        const box = item.absoluteBoundingBox;

        const localBox = parentBox
            ? {
                  x: box.x - parentBox.x,
                  y: box.y - parentBox.y,
                  width: box.width,
                  height: box.height,
              }
            : box;

        applyPosition(query, localBox);
    }

    // corners
    if (item.cornerRadius) {
        query.style.borderRadius = item.cornerRadius + "px";
    }

    if (item.rectangleCornerRadii) {
        const [tl, tr, br, bl] = item.rectangleCornerRadii;
        query.style.borderRadius = `${tl}px ${tr}px ${br}px ${bl}px`;
    }

    if (item.clipsContent != null) {
        query.style.overflow = item.clipsContent ? "hidden" : "visible";
    }

    if (item.strokes && item.strokes.length > 0) {
        applyPaint(query, item.strokes[0], "stroke", {
            strokeWidth: item.strokeWeight,
        });
    }

    // layout
    if (item.layoutMode && item.layoutMode !== "NONE") {
        applyLayout(query, item);
    } else {
        query.style.display = "block";
    }
}
