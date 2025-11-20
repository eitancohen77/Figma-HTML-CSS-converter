
import { gradient_linear } from "./gradientLinear.js";
import { solid } from "./solid.js";

export function applyFills(query, fills, mode = "background") {
    if (!fills || fills.length === 0) return;

    for (const paint of fills) {
        if (paint.visible === false) continue;

        if (paint.type === "GRADIENT_LINEAR") {
            const gradientString = gradient_linear(paint);

            if (mode === "background") {
                query.style.backgroundImage = gradientString;
            }
        }

        if (paint.type === "SOLID") {
            const rgb = solid(paint);

            if (mode === "background") {
                query.style.backgroundColor = rgb;
            } else if (mode === "text") {
                query.style.color = rgb;
                if (paint.opacity != null) {
                    query.style.opacity = paint.opacity;
                }
            }
        }
    }
}
