import { TextBuffer } from "./text_buffer.ts"
import { PRINTABLE_ASCII } from "./special_characters.ts"
import type {CharText, Color} from "./text_interface.ts";

const MATRIX_COLORS: Color[][] = [
    [
        "#1E4044",
        "#1E4044",
        "#1E4044",
        "#1E4044",
        "#006554",
        "#006554",
        "#26854C",
        "#26854C",
        "#5AB552",
        "#9DE64E",
    ],
    [
        "#3E3B65",
        "#3E3B65",
        "#3E3B65",
        "#3E3B65",
        "#3859B3",
        "#3859B3",
        "#3388DE",
        "#3388DE",
        "#36C5F4",
        "#6DEAD6",
    ]
]
type MatrixColorSelect = 0 | 1;
type MatrixTimeIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type MatrixColorIndex = {
    colorSelect: MatrixColorSelect;
    timeIndex: MatrixTimeIndex
}

function sample<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function pollRandom(chance: number) {
    return Math.random() < chance;
}

function randomASCII(): CharText {
    return sample(PRINTABLE_ASCII);
}

export class MatrixRain
{
    static readonly MATRIX_CHANCE: number = 0.04;
    private readonly text_buffer: TextBuffer;
    private readonly color_map: MatrixColorIndex[][];

    constructor(args: {colCount: number, rowCount: number}) {
        this.text_buffer = new TextBuffer(args);
        this.color_map = Array.from({ length: args.rowCount }, () =>
            Array.from({ length: args.colCount }, () => ({
                colorSelect: 0,
                timeIndex: 0,
            }))
        );

        for (let y = this.text_buffer.getRowCount() - 1; y >= 0; y--) {
            for (let x = this.text_buffer.getColCount() - 1; x >= 0; x--) {
                if (pollRandom(MatrixRain.MATRIX_CHANCE))
                {
                    for (let o = 0; o < MATRIX_COLORS[0].length; o++) {
                        if (y - o < 0) break;
                        this.color_map[y-o][x] = {
                            colorSelect: 0,
                            timeIndex: MATRIX_COLORS[0].length - o as MatrixTimeIndex
                        };
                    }
                }
            }
        }
    }

    update(): void {
        this.updateColorMap();
        this.updateTextBuffer();
    }

    spawnDrop(args: {col: number, colorSelect?: MatrixColorSelect, row?: number}) {
        const r = (args.row ?? 0);
        this.color_map[r][args.col] = {
            colorSelect: args.colorSelect ?? 1,
            timeIndex: MATRIX_COLORS[args.colorSelect ?? 1].length as MatrixTimeIndex,
        };
    }

    private updateTextBuffer(): void {
        for (let y = this.text_buffer.getRowCount() - 1; y >= 0; y--) {
            for (let x = this.text_buffer.getColCount() - 1; x >= 0; x--) {
                // Set text and color
                switch (this.color_map[y][x].timeIndex) {
                    case 0:
                        this.text_buffer.setChar({row: y, col: x, char: {char: " " as CharText, style: {}}});
                        break;
                    default:
                        this.text_buffer.setChar({row: y, col: x, char: {char: randomASCII() as CharText, style: {textColor: MATRIX_COLORS[this.color_map[y][x].colorSelect][this.color_map[y][x].timeIndex - 1]}}})
                }
            }
        }
    }

    private updateColorMap(): void {
        for (let y = this.text_buffer.getRowCount() - 1; y >= 0; y--) {
            for (let x = this.text_buffer.getColCount() - 1; x >= 0; x--) {
                const above = this.color_map[y - 1]?.[x]; // look at backend map, not TextBuffer chars

                let timeIndex = this.color_map[y][x].timeIndex;
                let colorIndex = this.color_map[y][x].colorSelect;

                // If current cell is empty
                if (timeIndex === 0 && above && above.timeIndex > 0) {
                    timeIndex = above.timeIndex + 1;
                    colorIndex = above.colorSelect;
                }

                // Precedence rule: if above is blue, always override
                if (above && above.timeIndex > 0) {
                    if (above.colorSelect === 1) {
                        timeIndex = above.timeIndex + 1;
                        colorIndex = 1;
                    } else if (timeIndex === 0) {
                        // only inherit green if empty
                        timeIndex = above.timeIndex + 1;
                        colorIndex = 0;
                    }
                }

                // Fade out
                if (timeIndex > 0) {
                    timeIndex--;
                }

                this.color_map[y][x] = {
                    colorSelect: colorIndex as MatrixColorSelect,
                    timeIndex: timeIndex as MatrixTimeIndex,
                };
            }
        }

        // Spawn new green drops
        for (let x = 0; x < this.text_buffer.getColCount(); x++) {
            if (pollRandom(MatrixRain.MATRIX_CHANCE)) {
                this.color_map[0][x] = {
                    colorSelect: 0,
                    timeIndex: MATRIX_COLORS[0].length as MatrixTimeIndex,
                };
            }
        }
    }


}