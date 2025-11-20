export function canvas(query, item) {
    if (item.backgroundColor) {
        const { r, g, b, a } = item.backgroundColor;
        query.style.backgroundColor = `rgba(${r*255}, ${g*255}, ${b*255}, ${a})`;
    }
    query.style.position = "relative"
    query.style.width = "100vw"
    query.style.height = "100vh"
}