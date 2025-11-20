// Come back to this later.

import { solid } from "./solid.js";
import { gradient_linear } from "./gradientLinear.js";

function paintToCss(paint) {
    if (!paint || paint.visible == false || paint.opacity == 0) {
        return null;
    }

    if (paint.type == "SOLID") {
        return solid(paint);             
    }

    if (paint.type == "GRADIENT_LINEAR") {
        return gradient_linear(paint);     
    }

    return null;
}

export function applyPaint(query, paint, mode, options = {}) {
    const css = paintToCss(paint);
    if (!css) {
        return;
    }

    if (mode == "background") {
        if (css.startsWith("linear-gradient")) {
            query.style.backgroundImage = css;
        } else {
            query.style.backgroundColor = css;
        }
    }

    if (mode == "text") {
        query.style.color = css;
        if (paint.opacity != null) {
            query.style.opacity = paint.opacity;
        }
    }

    if (mode == "stroke") {
        const strokeWidth = options.strokeWidth || 1;

        if (paint.type == "SOLID") {
            query.style.borderStyle = "solid";
            query.style.borderWidth = strokeWidth + "px";
            query.style.borderColor = css;
        } else if (paint.type == "GRADIENT_LINEAR") {
            query.style.borderStyle = "solid";
            query.style.borderWidth = strokeWidth + "px";
            query.style.borderImageSlice = 1;
            query.style.borderImageSource = css;
        }
    }
}
