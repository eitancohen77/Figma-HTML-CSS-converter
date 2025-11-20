export function convertToRGB(color) {
    const red = Math.round(color.r *255);
    const green = Math.round(color.g * 255);
    const blue = Math.round(color.b * 255);
    const a = color.a ?? 1;
    return {red, green, blue, a}; // May be a edge case. a may not exists
}