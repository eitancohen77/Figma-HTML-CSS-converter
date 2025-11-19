export function position(query, value) {
    query.style.position = "absolute";
    query.style.left = value.x + "px";
    query.style.top = value.y + "px";
    query.style.width = value.width + "px";
    query.style.height = value.height + "px";
}