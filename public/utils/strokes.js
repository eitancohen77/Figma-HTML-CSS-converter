export function strokes(query, item) {
    if (item.strokes == null || item.strokes.length == 0 || item.strokeWeight == null) return;

    const stroke = item.strokes[0];

    if (stroke.type == "SOLID" && stroke.color) {
        const { r, g, b, a } = stroke.color;
        const color = `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`;

        query.style.borderStyle = "solid";
        query.style.borderWidth = item.strokeWeight + "px";
        query.style.borderColor = color;
    }
}
