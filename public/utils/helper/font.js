export function applyFont(query, item) {
    const style = item.style;
    query.style.fontFamily = style.fontFamily;
    query.style.fontStyle = style.fontStyle;
    query.style.fontWeight = style.fontWeight;
    query.style.fontSize = style.fontSize + "px";
    query.style.letterSpacing = style.letterSpacing + "px";

    if (style.lineHeightUnit === "PIXELS") {
        query.style.lineHeight = style.lineHeightPx + "px";
    }

    query.style.textAlign = style.textAlignHorizontal.toLowerCase();

    // plain text, no flex
    query.style.display = "block";

    // correct CSS property name
    query.style.whiteSpace = "pre-wrap";
}