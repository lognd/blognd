import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface GlitchLinkProps {
    to: string;
    children: string; // the link text
    duration?: number; // ms glitch lasts
    glitchSpeed?: number; // ms between character swaps
    delay?: number; // optional ms before obfuscation starts
}

const GLITCH_CHARS = "!@#$%&*()+[]<>?/";
const GLITCH_COLORS = [
    "#FF0000", "#FFFF00", "#00FF00", "#00FFFF",
    "#0000FF", "#FF00FF", "#FFFFFF", "#000000",
];

const BASE_CHAR_STYLE: React.CSSProperties = {
    display: "inline",   // fixed box per char
    width: "1ch",              // exactly one monospace cell
    height: "1em",             // align with font size
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "inherit",
    lineHeight: "1em",         // no taller lines
    verticalAlign: "baseline",
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
};

export function GlitchLink({
                               to,
                               children,
                               duration = 800,
                               glitchSpeed = 50,
                               delay = 0,
                           }: GlitchLinkProps) {
    const [display, setDisplay] = useState<(string | JSX.Element)[]>(children.split(""));
    const [isGlitching, setIsGlitching] = useState(false);

    function randomChar() {
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    }

    function randomColor() {
        return GLITCH_COLORS[Math.floor(Math.random() * GLITCH_COLORS.length)];
    }

    function randomStyle() {
        if (Math.random() < 0.5) return { color: randomColor() };
        return { color: randomColor(), backgroundColor: randomColor() };
    }

    function runGlitch() {
        if (isGlitching) return;
        setIsGlitching(true);

        const original = children.split("");
        const interval = setInterval(() => {
            setDisplay(
                original.map((ch, i) =>
                        Math.random() < 0.25
                            ? (
                                <span key={i} style={{...randomStyle(), ...BASE_CHAR_STYLE}}>
                {randomChar()}
              </span>
                            )
                            : <span style={BASE_CHAR_STYLE}>{ch}</span>
                )
            );
        }, glitchSpeed);

        setTimeout(() => {
            clearInterval(interval);
            setDisplay(original); // restore text
            setIsGlitching(false);
        }, duration);
    }

    // 👇 Trigger once at mount (after optional delay)
    useEffect(() => {
        if (delay != 0)
        {
            setDisplay(children.split("").map(() => "\u00A0"));
            const timer = setTimeout(() => runGlitch(), delay);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <Link
            to={to}
            onMouseEnter={runGlitch}
            style={{
                width: "auto",
                color: "#FFFFFF",
                fontFamily: "'JetBrains Mono', monospace",
                textDecoration: "none",
                cursor: "pointer",
                display: "inline-block",
                whiteSpace: "nowrap",
                transition: "color 0.2s ease",
            }}
        >
            {display}
        </Link>
    );
}