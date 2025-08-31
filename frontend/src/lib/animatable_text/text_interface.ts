
export type Color = string;

export type CharText = string & { __charBrand: never };

export interface CharStyle {
    // Text Color
    textColor?: Color;
    backgroundColor?: Color;

    // Text Formatting
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;

    // Text Effects
    opacity?: number;

    // Text Hooks
    className?: string;
}

export interface Char {
    char: CharText;
    style?: CharStyle;
}

export interface TextView {
    upper: number;
    lower: number;
    left: number;
    right: number;
}

export type CharRow = Char[];
export type CharCol = Char[];
export type CharGrid = CharRow[];

export type TextSetStatus = "success" | "out-of-bounds" | "mismatched-size" | "unknown";

export interface TextInterface {
    // -- Core State ---------------------------------------------------------------
    getRowCount(): number;
    getColCount(): number;

    // -- Reading ------------------------------------------------------------------
    getChar(args: {row: number, col: number}): Char | null;
    getCharText(args: {row: number, col: number}): CharText | null;
    getRow(args: {row: number}): CharRow | null;
    getCol(args: {col: number}): CharCol | null;
    getGrid(): CharGrid;

    // -- Writing ------------------------------------------------------------------
    setChar(args: {row: number, col: number, char: Char}): TextSetStatus;
    setChar(args: {row: number, col: number, char: CharText}): TextSetStatus;
    setLine(args: {row: number, charRow: CharRow}): TextSetStatus;
    writeString(args: {row: number, col: number, text: string, style?: CharStyle}): TextSetStatus;

    // -- Resizing -----------------------------------------------------------------
    setAspect(args: {width: number, height: number, minRowCount?: number, minColCount?: number}): void;
    fill(args: {char: Char}): void;
    fill(args: {char: CharText}): void;
    clear(): void;
}
