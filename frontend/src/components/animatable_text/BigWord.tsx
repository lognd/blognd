import React from "react";
import { BigCharComponent } from "./BigChar.tsx";

interface BigWordProps {
    text: string;
    interval?: number;
    delay_offset?: number;
    delay_per?: number;
}

export function BigWord({ text, interval = 25, delay_offset = 0, delay_per = 100 }: BigWordProps) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center", // horizontally center
                gap: "0.5ch", // space between letters
            }}
        >
            {text.split("").map((char, i) => (
                <BigCharComponent key={i} char={char} interval={interval} delay={delay_offset + i*delay_per} />
            ))}
        </div>
    );
}