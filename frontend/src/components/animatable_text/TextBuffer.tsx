import type {Char, CharRow, CharGrid} from "../../lib/animatable_text/text_interface.ts"
import { TextBuffer as TextBufferBackend } from "../../lib/animatable_text/text_buffer.ts";

export function TextBuffer({ text }: { text: TextBufferBackend }) {
    const grid: CharGrid = text.getGrid();

    return (
        <div style={{
            whiteSpace: "pre",
            display: "inline-block"
        }}>
            {grid.map((row: CharRow, y: number) => (
                <div key={y} style={{display: "flex"}}>
                    {row.map((cell: Char, x: number) => (
                            <span key={x}
                                  className={cell.style?.className}
                                  style={{
                                      display: "inline-block",
                                      width: "0.95ch",   // exactly one character cell wide
                                      height: "1em",  // exactly one line tall
                                      lineHeight: "1em",
                                      fontSize: "24px", // tune to match the matrix rain
                                      margin: 0,
                                      padding: 0,
                                      color: cell.style?.textColor ?? "inherit",
                                      backgroundColor: cell.style?.backgroundColor ?? "inherit",
                                      fontWeight: cell.style?.bold ? "bold" : "normal",
                                      fontStyle: cell.style?.italic ? "italic" : "normal",
                                      textDecoration: [cell.style?.underline ? "underline" : "",
                                          cell.style?.strikethrough ? "strikethrough" : ""
                                      ].filter(Boolean).join(" "),
                                      opacity: cell.style?.opacity ?? 1
                                  }}>
                            {cell.char}
                        </span>
                        )
                    )}
                </div>
            ))}
        </div>
    );
}