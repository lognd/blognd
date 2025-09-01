import React, { useEffect, useRef, useState } from "react";
import { BigChar } from "../../lib/animatable_text/large_text.ts";
import { TextBuffer } from "../../lib/animatable_text/text_buffer.ts";
import { TextBuffer as TextBufferComponent } from "./TextBuffer"; // React renderer

interface BigCharProps {
    char: string;
    interval?: number; // ms between frames
    delay?: number;
}

export function BigCharComponent({ char, interval = 5, delay = 0 }: BigCharProps) {
    const bigCharRef = useRef<BigChar | null>(null);
    const [, forceRender] = useState({});

    useEffect(() => {
        bigCharRef.current = new BigChar({ char: char, startDelay: delay});

        const id = setInterval(() => {
            bigCharRef.current!.update();
            forceRender({});
        }, interval);

        return () => clearInterval(id);
    }, [char, delay, interval]);

    if (!bigCharRef.current) return null;

    return (
        <div style={{ display: "inline-block", textAlign: "center" }}>
            <TextBufferComponent text={bigCharRef.current["text_buffer"] as TextBuffer} />
        </div>
    );
}