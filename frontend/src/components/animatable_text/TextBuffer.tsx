import type {Char, CharRow, CharGrid} from "../../lib/animatable_text/text_interface.ts"
import { TextBuffer as TextBufferBackend } from "../../lib/animatable_text/text_buffer.ts";

export function TextBuffer({ text }: { text: TextBufferBackend }) {
    const grid: CharGrid = text.getGrid();

    return (
        <div>
            {grid.map((row: CharRow, y: number) => (
                <div key={y} style={{display: "flex"}}>
                    {row.map((cell: Char, x: number) => (
                            <span key={x}
                                  className={cell.style?.className}
                                  style={{
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