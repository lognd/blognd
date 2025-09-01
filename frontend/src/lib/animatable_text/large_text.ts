import { TextBuffer } from "./text_buffer.ts"
import type { CharGrid, CharText, CharStyle } from "./text_interface.ts";
import {BLOCK_CHARACTER_MAP, LINE_CHARACTER_MAP} from "./special_characters.ts";

const SINGLE_BOX_CHARS: Record<string, string> = {"═": "─", "║": "│", "╔": "┌", "╗": "┐", "╚": "└", "╝": "┘"} as const
type BoxChar = "═" | "║" | "╔" | "╗" | "╚" | "╝" | "█";
function convertBoxChar(args: {char: BoxChar, level: number}): string {
    switch (args.level) {
        case 0:
            return " ";
        case 1:
            if (args.char === "█") return " ";   // not NBSP
            return SINGLE_BOX_CHARS[args.char] ?? " ";
        case 2:
            if (args.char === "█") return " ";
            return args.char;
        case 3:
            return args.char === "█" ? "░" : args.char;
        case 4:
            return args.char === "█" ? "▒" : args.char;
        case 5:
            return args.char === "█" ? "▓" : args.char;
        default:
            return args.char;
    }
}

type BigCharIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
interface BigCharStyleInfo {
    chr_index: BigCharIndex;
    chr_style: CharStyle;
}
const BIG_CHAR_OUTLINE_STYLES: BigCharStyleInfo[][] = [
    [
        { chr_index: 0, chr_style: {}},
        { chr_index: 1, chr_style: { textColor: "#AC2847", backgroundColor: "#10121C"  }},
        { chr_index: 1, chr_style: { textColor: "#EC273F", backgroundColor: "#10121C"  }},
        { chr_index: 2, chr_style: { textColor: "#FA6E79", backgroundColor: "#10121C"  }},
        { chr_index: 2, chr_style: { textColor: "#FFD1D5", backgroundColor: "#10121C"  }},
        { chr_index: 3, chr_style: { textColor: "#6B2643", backgroundColor: "#10121C" }},
        { chr_index: 4, chr_style: { textColor: "#6B2643", backgroundColor: "#10121C" }},
        { chr_index: 5, chr_style: { textColor: "#6B2643", backgroundColor: "#10121C" }},
        { chr_index: 6, chr_style: { textColor: "#6B2643", backgroundColor: "#10121C" }},
        { chr_index: 6, chr_style: { textColor: "#AC2847", backgroundColor: "#10121C"  }},
        { chr_index: 6, chr_style: { textColor: "#EC273F", backgroundColor: "#10121C"  }},
        { chr_index: 6, chr_style: { textColor: "#FA6E79", backgroundColor: "#10121C"  }},
        { chr_index: 6, chr_style: { textColor: "#FFD1D5", backgroundColor: "#10121C"  }},
        { chr_index: 6, chr_style: { textColor: "#FFFFFF", backgroundColor: "#10121C"  }},
    ],
    [
        { chr_index: 0, chr_style: {}},
        { chr_index: 1, chr_style: { textColor: "#DE5D3A", backgroundColor: "#10121C"  }},
        { chr_index: 1, chr_style: { textColor: "#E98537", backgroundColor: "#10121C"  }},
        { chr_index: 2, chr_style: { textColor: "#F3A833", backgroundColor: "#10121C"  }},
        { chr_index: 2, chr_style: { textColor: "#F4D395", backgroundColor: "#10121C"  }},
        { chr_index: 3, chr_style: { textColor: "#94493A", backgroundColor: "#10121C"  }},
        { chr_index: 4, chr_style: { textColor: "#94493A", backgroundColor: "#10121C"  }},
        { chr_index: 5, chr_style: { textColor: "#94493A", backgroundColor: "#10121C"  }},
        { chr_index: 6, chr_style: { textColor: "#94493A", backgroundColor: "#10121C"  }},
        { chr_index: 6, chr_style: { textColor: "#DE5D3A", backgroundColor: "#10121C"  }},
        { chr_index: 6, chr_style: { textColor: "#E98537", backgroundColor: "#10121C"  }},
        { chr_index: 6, chr_style: { textColor: "#F3A833", backgroundColor: "#10121C"  }},
        { chr_index: 6, chr_style: { textColor: "#F4D395", backgroundColor: "#10121C"  }},
        { chr_index: 6, chr_style: { textColor: "#FFFFFF", backgroundColor: "#10121C"  }},
    ],
] as const;
type BigCharStyleSelector = 0 | 1;
type BigCharStyleIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export class BigChar {
    private readonly block_character: CharGrid;
    private readonly line_character: CharGrid;

    private readonly text_buffer: TextBuffer;
    private readonly style_map: BigCharStyleIndex[][];
    private readonly color_map: BigCharStyleSelector[][];

    private frame_no: number;
    static FRAMES_PER_TRANSITION: number = 5;

    constructor(args: {char: CharText, startDelay?: number}) {
        const raw_array: string[] = BLOCK_CHARACTER_MAP[args.char].split(/\r\n|\r|\n/);
        const height: number = raw_array.length;
        const width: number = Math.max(...raw_array.map((row) => row.length));

        this.block_character = raw_array.map(
            (line: string) => line.padEnd(width, " ").split("").map(
                (ch: string) => ({
                    char: ch as CharText,
                    style: {}
                })
        ));
        this.line_character = LINE_CHARACTER_MAP[args.char].split(/\r\n|\r|\n/).map(
            (line: string) => line.padEnd(width, " ").split("").map(
                (ch: string) => ({
                    char: ch as CharText,
                    style: {}
                })
        ));

        const color: BigCharStyleSelector = (Math.random() > 0.5) ? 0 : 1;

        this.text_buffer = new TextBuffer({rowCount: height, colCount: width})
        this.style_map = Array.from({ length: height }, () =>
            Array.from({ length: width }, () => (0))
        );
        this.color_map = Array.from({ length: height }, () =>
            Array.from({ length: width }, () => (color))
        );

        this.frame_no = -(args.startDelay ?? 0);
    }

    update(): void {
        this.updateStyleMap();
        this.updateTextBuffer()
    }

    updateStyleMap(): void {
        if (this.style_map[0][0] < 13 && this.frame_no > 0 && this.frame_no % BigChar.FRAMES_PER_TRANSITION == 0) this.style_map[0][0]++;
        this.frame_no++;
        for (let y: number = this.text_buffer.getRowCount() - 1; y >= 0; y--) {
            for (let x: number = this.text_buffer.getColCount() - 1; x >= 0; x--) {
                if (x == 0 && y == 0) continue;
                if (x == 0) {
                    this.style_map[y][0] = this.style_map[y-1][0];
                    continue;
                }
                if (y == 0) {
                    this.style_map[0][x] = this.style_map[0][x-1];
                    continue;
                }
                this.style_map[y][x] = this.style_map[y-1][x-1]
            }
        }
    }

    updateTextBuffer(): void {
        for (let y = 0; y < this.text_buffer.getRowCount(); y++) {
            for (let x = 0; x < this.text_buffer.getColCount(); x++) {
                const style_info = BIG_CHAR_OUTLINE_STYLES[this.color_map[y][x]][this.style_map[y][x]];
                let chr: string;

                if (style_info.chr_index >= 3) {
                    chr = convertBoxChar({
                        char: this.block_character[y][x].char as BoxChar,
                        level: style_info.chr_index,
                    });
                } else {
                    chr = convertBoxChar({
                        char: this.line_character[y][x].char as BoxChar,
                        level: style_info.chr_index,
                    });
                }

                if (style_info.chr_index >= 3) {
                    let style: CharStyle = { textColor: "#FFFFFF", backgroundColor: "#10121C" };
                    if (this.block_character[y][x].char == "█") style = style_info.chr_style;
                    else if (this.block_character[y][x].char == " ") style = {};

                    this.text_buffer.setChar({
                        row: y,
                        col: x,
                        char: { char: chr as CharText, style: style },
                    });
                }
                else {
                    let style: CharStyle = style_info.chr_style;
                    if (this.block_character[y][x].char == " ") style = {};
                    this.text_buffer.setChar({
                        row: y,
                        col: x,
                        char: { char: chr as CharText, style: style},
                    });
                }
            }
        }
    }
}