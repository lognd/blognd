import { TextBuffer } from "./text_buffer.ts"
import { PRINTABLE_ASCII } from "./special_characters.ts"
import type {Char, CharText, Color} from "./text_interface.ts";

const MATRIX_COLORS: Color[] = [
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
]
type MatrixColorIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

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
            Array.from({ length: args.colCount }, () => 0)
        );
    }

    update(): void {
        this.updateColorMap();
        this.updateTextBuffer();
    }

    private updateTextBuffer(): void {
        for (let y = this.text_buffer.getRowCount() - 1; y >= 0; y--) {
            for (let x = this.text_buffer.getColCount() - 1; x >= 0; x--) {
                // Set text and color
                switch (this.color_map[y][x]) {
                    case 0:
                        this.text_buffer.setChar({row: y, col: x, char: {char: " " as CharText, style: {}}});
                        break;
                    default:
                        this.text_buffer.setChar({row: y, col: x, char: {char: randomASCII() as CharText, style: {textColor: MATRIX_COLORS[this.color_map[y][x] - 1]}}})
                }
            }
        }
    }

    private updateColorMap(): void {
        for (let y = this.text_buffer.getRowCount() - 1; y >= 0; y--) {
            for (let x = this.text_buffer.getColCount() - 1; x >= 0; x--) {
                // Move text down the screen.
                const above_cell: Char | null = this.text_buffer.getChar({row: y - 1, col: x})

                let color_index: number = this.color_map[y][x];
                if (above_cell) color_index = this.color_map[y-1][x] + 1;

                // Decrement the text value.
                if (color_index > 0) color_index--;
                this.color_map[y][x] = color_index as MatrixColorIndex;
            }
        }

        // Start the new rain-drops.
        for (let x = 0; x < this.text_buffer.getColCount(); x++) {
            if (pollRandom(MatrixRain.MATRIX_CHANCE)) {
                this.color_map[0][x] = MATRIX_COLORS.length as MatrixColorIndex;
            }
        }
    }


}