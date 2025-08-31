import type {
    Char,
    CharCol,
    CharGrid,
    CharRow,
    CharStyle,
    CharText,
    TextInterface,
    TextSetStatus
} from "./text_interface.ts";

export class TextBuffer implements TextInterface {
    private grid: CharGrid;
    static readonly MAX_ASPECT_RATIO: number = 2.0;

    constructor(args: {rowCount: number, colCount: number}) {
        this.grid = Array.from({ length: args.rowCount }, () =>
            Array.from({ length: args.colCount }, () => ({ char: " " as CharText}))
        );
    }

    private isOutOfBounds(args: {row: number, col: number}) : boolean {
        return args.row < 0 || args.row >= this.getRowCount() ||
            args.col < 0 || args.col >= this.getColCount();
    }

    /*private isNull(): boolean {
        return this.isOutOfBounds({row: 0, col: 0});
    }*/

    fill(args: {char: Char | CharText}): void {
        const c: Char = (typeof args.char === "string") ? {char: args.char} : args.char;

        for (let y: number = 0; y < this.getRowCount(); y++) {
            for (let x: number = 0; x < this.getColCount(); x++) {
                this.setChar({row: y, col: x, char: c});
            }
        }

    }

    clear(): void {
        this.fill({char: " " as CharText})
    }

    getChar(args: { row: number; col: number }): Char | null {
        if (this.isOutOfBounds(args)) return null;
        return this.grid[args.row][args.col];
    }

    getCharText(args: {row: number, col: number}): CharText | null {
        const c: Char | null = this.getChar(args)
        return c ? c.char : null;
    }

    getColCount(): number {
        if (this.grid.length == 0) return 0;
        return this.grid[0].length;
    }

    getGrid(): CharGrid {
        return this.grid;
    }

    getRow(args: { row: number }): CharRow | null {
        if (this.isOutOfBounds({row: args.row, col: 0})) return null;
        return this.grid[args.row];
    }

    getCol(args: { col: number }): CharCol | null {
        if (this.isOutOfBounds({row: 0, col: args.col})) return null;
        return Array.from({length: args.col}, (i: number) => (this.grid[i][args.col]));
    }

    getRowCount(): number {
        return this.grid.length;
    }

    /*private getWindow(): TextView {
        const text_view: TextView = {
            upper: 0,
            lower: this.getRowCount(),
            left: 0,
            right: this.getColCount()
        }
        if (!this.isNull()) {
            while (isBlank({charArr: this.getRow({row: text_view.upper})!})) text_view.upper++;
            while (isBlank({charArr: this.getRow({row: text_view.lower - 1})!})) text_view.lower--;
            while (isBlank({charArr: this.getCol({col: text_view.left})!})) text_view.left++;
            while (isBlank({charArr: this.getCol({col: text_view.right - 1})!})) text_view.right--;
        }

        return text_view;
    }

    setAspect(args: { width: number; height: number, minRowCount?: number, minColCount?: number }): void {
        const text_view = this.getWindow();

        const width: number = args.minColCount ? Math.max(Math.abs(text_view.right - text_view.left), args.minColCount) : text_view.right - text_view.left;
        const height: number = args.minRowCount ? Math.max(Math.abs(text_view.lower - text_view.upper), args.minRowCount) : text_view.lower - text_view.upper;
        const aspect_ratio: number = Math.min(Math.max(Math.abs(args.width / args.height), 1.0 / TextBuffer.MAX_ASPECT_RATIO), TextBuffer.MAX_ASPECT_RATIO);

        let new_width: number = aspect_ratio * height;
        const new_height: number = Math.max(Math.round(new_width > width ? height : width / aspect_ratio), 1);
        new_width = Math.max(new_width > width ? width / aspect_ratio : new_width, 1);

        this.grid = Array.from({ length: new_height }, () =>
            Array.from({ length: new_width }, () => ({ char: " " as CharText}))
        );
    }
    */

    setChar(args: { row: number; col: number; char: Char | CharText }): TextSetStatus {
        // Bad mutation guards.
        if (this.isOutOfBounds({row: args.row, col: args.col})) return "out-of-bounds";

        // Mutate value.
        if (typeof args.char === "string") this.grid[args.row][args.col].char = args.char;
        else this.grid[args.row][args.col] = args.char;

        // if (this.getChar({row: args.row, col: args.col}) != args.char) return "unknown";
        return "success";
    }

    setLine(args: { row: number; charRow: CharRow }): TextSetStatus {
        // Bad mutation guards.
        if (this.isOutOfBounds({row: args.row, col: 0})) return "out-of-bounds";
        if (this.grid[args.row].length != args.charRow.length) return "mismatched-size";

        // Mutate value.
        this.grid[args.row] = args.charRow;
        // if (this.getLine({row: args.row}) != args.charRow) return "unknown";
        return "success";
    }

    writeString(args: { row: number; col: number; text: string; style?: CharStyle }): TextSetStatus {
        // Bad mutation guards.
        if (this.isOutOfBounds({row: args.row, col: args.col}) || this.isOutOfBounds({row: args.row, col: args.col + args.text.length})) return "out-of-bounds";

        // Mutate value.
        const style: CharStyle | undefined = this.getChar({row: args.row, col: args.col})?.style;
        for (let i: number = 0; i < args.text.length; i++) {
            this.setChar({row: args.row, col: args.col, char: {char: args.text[i] as CharText, style: style}});
        }
        return "success";
    }

}