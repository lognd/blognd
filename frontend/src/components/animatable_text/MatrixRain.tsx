import { useEffect, useRef, useState } from "react";
import {TextBuffer} from "./TextBuffer.tsx"
import { MatrixRain as MatrixRainBackend } from "../../lib/animatable_text/matrix_rain";
import { useWindowSize } from "../../hooks/window_hooks.ts";
import { getCharSize } from "../../lib/utils/text_utils.ts"

interface MatrixRainProps {
    width: number;   // number of columns
    height: number;  // number of rows
    speed?: number;  // ms per frame
}

export function MatrixRain({ speed = 75 }: MatrixRainProps) {
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const [charSize, setCharSize] = useState({ width: 10, height: 18 });
    const rainRef = useRef<MatrixRainBackend | null>(null);
    const [, forceRender] = useState({});

    // Measure character size once
    useEffect(() => {
        setCharSize(getCharSize("'JetBrains Mono', monospace"));
    }, []);

    const colCount = Math.floor(windowWidth / charSize.width);
    const rowCount = Math.floor(windowHeight / charSize.height);

    useEffect(() => {
        if (colCount <= 0 || rowCount <= 0) return;
        rainRef.current = new MatrixRainBackend({ colCount, rowCount });

        const interval = setInterval(() => {
            rainRef.current!.update();
            forceRender({});
        }, speed);

        return () => clearInterval(interval);
    }, [colCount, rowCount, speed]);

    if (!rainRef.current) return null;

    return (
        <pre style={{
            height: "100dvh",
            width: "100dvw",
            overflow: "hidden"
        }}>
            <TextBuffer text={rainRef.current["text_buffer"]} />
        </pre>
    );
}