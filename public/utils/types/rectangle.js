import { vector } from "./vector.js";

export function rectangle(query, item, parent) {
    // RECTANGLE inherits all the properties of vector.
    vector(query, item, parent);

    if (item.cornerRadius) {
        query.style.borderRadius = item.cornerRadius + 'px';
    }

    if (item.rectangleCornerRadii) {
        const [tl, tr, br, bl] = item.rectangleCornerRadii;
        query.style.borderRadius = `${tl}px ${tr}px ${br}px ${bl}px`;
    }
}