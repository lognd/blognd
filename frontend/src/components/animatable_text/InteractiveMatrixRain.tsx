import { useEffect, useRef, useState } from "react";
import { TextBuffer } from "./TextBuffer";
import { MatrixRain as MatrixRainBackend } from "../../lib/animatable_text/matrix_rain";
import { useWindowSize } from "../../hooks/window_hooks.ts";

interface InteractiveMatrixRainProps {
    speed?: number;
    spawnAtCursor?: boolean; // toggle behavior
}



export function InteractiveMatrixRain({ speed = 100, spawnAtCursor = true }: InteractiveMatrixRainProps) {
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const rainRef = useRef<MatrixRainBackend | null>(null);
    const [, forceRender] = useState({});
    const [charSize, ] = useState({ width: 14, height: 24 });

    const colCount = Math.round(windowWidth / charSize.width);
    const rowCount = Math.round(windowHeight / charSize.height);

    useEffect(() => {
        if (colCount <= 0 || rowCount <= 0) return;
        rainRef.current = new MatrixRainBackend({ colCount, rowCount });

        const interval = setInterval(() => {
            rainRef.current!.update();
            forceRender({});
        }, speed);

        return () => clearInterval(interval);
    }, [colCount, rowCount, speed]);

    // Unified spawn handler
    function spawnDropAt(x: number, y: number) {
        if (!rainRef.current) return;
        const col = Math.round(x / charSize.width);
        const row = Math.round(y / charSize.height);
        if (col >= 0 && col < colCount) {
            if (spawnAtCursor) {
                rainRef.current.spawnDrop({col: col, row: row, colorSelect: 1}); // blue drop at cursor row
            } else {
                rainRef.current.spawnDrop({col: col, colorSelect: 1}); // blue drop from top
            }
        }
    }

    function handleMouseMove(e: React.MouseEvent) {
        spawnDropAt(e.clientX, e.clientY);
    }

    function handleTouchStart(e: React.TouchEvent) {
        if (e.touches.length > 0) {
            spawnDropAt(e.touches[0].clientX, e.touches[0].clientY);
        }
    }

    if (!rainRef.current) return null;

    return (
        <pre
            style={{
                background: "#10121C",
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
            }}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
        >
            <TextBuffer text={rainRef.current["text_buffer"]} />
        </pre>
    );
}