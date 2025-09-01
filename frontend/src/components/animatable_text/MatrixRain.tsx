import { useEffect, useRef, useState } from "react";
import {TextBuffer} from "./TextBuffer.tsx"
import { MatrixRain as MatrixRainBackend } from "../../lib/animatable_text/matrix_rain";

interface MatrixRainProps {
    width: number;   // number of columns
    height: number;  // number of rows
    speed?: number;  // ms per frame
}

export function MatrixRain({ width, height, speed = 75 }: MatrixRainProps) {
    // Hold the backend instance
    const rainRef = useRef<MatrixRainBackend | null>(null);

    // Dummy state just to trigger React re-renders
    const [, forceRender] = useState({});

    useEffect(() => {
        // Initialize backend once
        rainRef.current = new MatrixRainBackend({ colCount: width, rowCount: height });

        // Animation loop
        const interval = setInterval(() => {
            rainRef.current!.update();
            forceRender({}); // force React to re-render
        }, speed);

        return () => clearInterval(interval);
    }, [width, height, speed]);

    if (!rainRef.current) return null;

    return (
        <pre style={{ color: "lime", margin: 0, padding: 0 }}>
            <TextBuffer text={rainRef.current["text_buffer"]} />
        </pre>
    );
}