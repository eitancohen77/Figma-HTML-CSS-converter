export function applyFont(query, item) {
    query.style.fontFamily = item.style.fontFamily;
    query.style.fontStyle = item.style.fontStyle;
    query.style.fontWeight = item.style.fontWeight;
    query.style.fontSize = item.style.fontSize + "px";
    query.style.letterSpacing = item.style.letterSpacing + "px";

    if (item.style.lineHeightUnit == "PIXELS") {
        query.style.lineHeight = item.style.lineHeightPx + "px";
    }

    query.style.textAlign = item.style.textAlignHorizontal.toLowerCase();
    query.style.display = "flex";

    if (item.style.textAlignVertical == "CENTER") {
        query.style.alignItems = "center";
    } else if (item.style.textAlignVertical == "TOP") {
        query.style.alignItems = "flex-start";
    } else {
        query.style.alignItems = "flex-end";
    }
    
    query.style.justifyContent = query.style.alignItems;
    query.style.marginBottom = item.style.paragraphSpacing + "px";
    query.style.whiteSpace = "pre-wrap";
}