import { convertToRGB } from "./convertToRGB.js";

export function solid(paint) {
    const { red, green, blue, a } = convertToRGB(paint.color)
    return `rgba(${red}, ${green}, ${blue}, ${a})`;
}   