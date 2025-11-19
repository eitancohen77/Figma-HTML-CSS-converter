import { convertToRGB } from "./convertToRGB.js";

export function solid(paint) {
    return convertToRGB(paint.color)
}