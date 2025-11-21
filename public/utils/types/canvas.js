export function canvas(query, item) {
    
    if (item.backgroundColor) {
        const { r, g, b, a } = item.backgroundColor;
        document.body.style.backgroundColor = `rgba(${r*255}, ${g*255}, ${b*255}, ${a})`;
    }
}