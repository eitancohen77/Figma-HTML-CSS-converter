import { convertToRGB } from "./convertToRGB";

export function solid(paint) {
    return convertToRGB(paint.color)
}