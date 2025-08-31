import type {CharText, Char, CharRow, CharCol} from "./text_interface.ts"

export const WHITESPACE: CharText[] = [
    " " as CharText,
    "\u00A0" as CharText,
    "\t" as CharText,
    "\n" as CharText
] as const;

export const PRINTABLE_ASCII: CharText[] = [
    "!" as CharText, "\"" as CharText,  "#" as CharText, "$" as CharText,
    "%" as CharText, "&" as CharText, "'" as CharText, "(" as CharText,
    ")" as CharText, "*" as CharText, "+" as CharText, "," as CharText,
    "-" as CharText, "." as CharText, "/" as CharText, "0" as CharText,
    "1" as CharText, "2" as CharText, "3" as CharText, "4" as CharText,
    "5" as CharText, "6" as CharText, "7" as CharText, "8" as CharText,
    "9" as CharText, ":" as CharText, ";" as CharText, "<" as CharText,
    "=" as CharText, ">" as CharText, "?" as CharText, "@" as CharText,
    "A" as CharText, "B" as CharText, "C" as CharText, "D" as CharText,
    "E" as CharText, "F" as CharText, "G" as CharText, "H" as CharText,
    "I" as CharText, "J" as CharText, "K" as CharText, "L" as CharText,
    "M" as CharText, "N" as CharText, "O" as CharText, "P" as CharText,
    "Q" as CharText, "R" as CharText, "S" as CharText, "T" as CharText,
    "U" as CharText, "V" as CharText, "W" as CharText, "X" as CharText,
    "Y" as CharText, "Z" as CharText, "[" as CharText, "\\" as CharText,
    "]" as CharText, "^" as CharText, "_" as CharText, "`" as CharText,
    "a" as CharText, "b" as CharText, "c" as CharText, "d" as CharText,
    "e" as CharText, "f" as CharText, "g" as CharText, "h" as CharText,
    "i" as CharText, "j" as CharText, "k" as CharText, "l" as CharText,
    "m" as CharText, "n" as CharText, "o" as CharText, "p" as CharText,
    "q" as CharText, "r" as CharText, "s" as CharText, "t" as CharText,
    "u" as CharText, "v" as CharText, "w" as CharText, "x" as CharText,
    "y" as CharText, "z" as CharText, "{" as CharText, "|" as CharText,
    "}" as CharText, "~" as CharText
] as const;

export function isWhiteSpace(args: {char: CharText | Char}): boolean {
    return (typeof args.char === "string") ? args.char in WHITESPACE : args.char.char in WHITESPACE;
}

export function isBlank(args: {charArr: CharRow | CharCol}): boolean {
    return args.charArr.reduce((p: boolean, c: Char) => { return p && isWhiteSpace(c); }, true);
}

