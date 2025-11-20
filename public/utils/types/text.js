import { applyPosition } from "../helper/position.js";
import { applyFont } from "../helper/font.js";
import { applyPaint } from "../helper/paint.js";

export function text(query, item, parent) {
    const parentBox =
        parent && parent.absoluteBoundingBox ? parent.absoluteBoundingBox : null;
    const parentIsAutoLayout =
        parent && parent.layoutMode && parent.layoutMode !== "NONE";

    if (item.style) {
        applyFont(query, item);
    }

    if (item.characters != null) {
        query.textContent = item.characters;
    }

    // Only absolutely position when parent is NOT auto layout
    if (item.absoluteBoundingBox && !parentIsAutoLayout) {
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

    if (item.fills && item.fills.length > 0) {
        applyPaint(query, item.fills[0], "text");
    }
}