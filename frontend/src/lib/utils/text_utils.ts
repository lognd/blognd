export function getCharSize(font: string = "'JetBrains Mono', monospace") {
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.fontFamily = font;
    span.style.fontSize = "16px";
    span.textContent = "M"; // widest char
    document.body.appendChild(span);
    const rect = span.getBoundingClientRect();
    document.body.removeChild(span);
    return { width: rect.width, height: rect.height };
}