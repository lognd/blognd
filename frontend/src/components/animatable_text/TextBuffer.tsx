import type {CharRow, Char} from "../../lib/animatable_text/text_interface.ts"
import {TextBuffer as TextBufferBackend} from "../../lib/animatable_text/text_buffer.ts"

export function TextBuffer(props: {text: TextBufferBackend}) {
    return (
        <pre style={{ fontFamily: "monospace", lineHeight: "1em" }}>
            {props.text.getGrid().map((row: CharRow, y: number) => (
                <div key={y} style={{ display: "flex" }}>
                    {row.map((cell: Char, x: number) => (
                        <span
                            key={x}
                            className={cell.style?.className}
                            style={{
                                color: cell.style?.textColor ?? "inherit",
                                backgroundColor: cell.style?.backgroundColor ?? "transparent",
                                fontWeight: cell.style?.bold ? "bold" : "normal",
                                fontStyle: cell.style?.italic ? "italic" : "normal",
                                textDecoration: [
                                    cell.style?.underline ? "underline" : "",
                                    cell.style?.strikethrough ? "line-through" : "",
                                ]
                                    .filter(Boolean)
                                    .join(" "),
                                opacity: cell.style?.opacity ?? 1,
                            }}
                        >
                            {cell.char}
                        </span>
                    ))}
                </div>
            ))}
        </pre>
    );
}