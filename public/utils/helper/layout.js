export function applyLayout(query, item) {
    const mode = item.layoutMode;
    if (mode !== "HORIZONTAL" && mode !== "VERTICAL") return;

    query.style.display = "flex";

    if (mode === "HORIZONTAL" || mode === "VERTICAL") {
    query.style.display = "flex";
    query.style.flexDirection = mode === "HORIZONTAL" ? "row" : "column";

    // Padding
    if (item.paddingLeft != null)  query.style.paddingLeft   = item.paddingLeft + "px";
    if (item.paddingRight != null) query.style.paddingRight  = item.paddingRight + "px";
    if (item.paddingTop != null)   query.style.paddingTop    = item.paddingTop + "px";
    if (item.paddingBottom != null)query.style.paddingBottom = item.paddingBottom + "px";

    // Spacing between children
    if (item.itemSpacing != null)  query.style.gap = item.itemSpacing + "px";
  }
}