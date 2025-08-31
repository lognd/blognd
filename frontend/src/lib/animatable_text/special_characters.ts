import type {CharText, Char, CharRow, CharCol} from "./text_interface.ts"

export const WHITESPACE: CharText[] = [
    " " as CharText,
    "\u00A0" as CharText,
    "\t" as CharText,
    "\n" as CharText
]

export function isWhiteSpace(args: {char: CharText | Char}): boolean {
    return (typeof args.char === "string") ? args.char in WHITESPACE : args.char.char in WHITESPACE;
}

export function isBlank(args: {charArr: CharRow | CharCol}): boolean {
    return args.charArr.reduce((p: boolean, c: Char) => { return p && isWhiteSpace(c); }, true);
}

