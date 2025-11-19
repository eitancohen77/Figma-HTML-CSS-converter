import { convertToRGB } from "./convertToRGB.js";

export function gradient_linear(paint) {
    var gradientString = ""

    const [i0, i1] = paint.gradientHandlePositions;

    const dx = i1.x - i0.x;
    const dy = i1.y - i0.y;

    const angle = Math.atan2(dx, -dy) * 180 / Math.PI;
    const degree = (angle + 360) % 360;

    // Handle the colors 
    const { red: red1, green: green1, blue: blue1, a: a1 } = convertToRGB(paint.gradientStops[0].color);
    const { red: red2, green: green2, blue: blue2, a: a2 } = convertToRGB(paint.gradientStops[1].color);
    
    const p1 = paint.gradientStops[0].position * 100;
    const p2 = paint.gradientStops[1].position * 100;

    const c1 = `rgba(${red1}, ${green1}, ${blue1}, ${a1}) ${p1}%`;
    const c2 = `rgba(${red2}, ${green2}, ${blue2}, ${a2}) ${p2}%`;

    gradientString += `linear-gradient(${degree}deg,${c1}, ${c2})`;
    return gradientString;
}