import { BigWord } from "./BigWord.tsx";

export function BigTextBlock({ text, delay_per = 5 }: { text: string, delay_per?: number }) {
    const lines = text.split(/\r?\n/);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            }}
        >
            {lines.map((line, i) => (
                <BigWord key={i} text={line} delay_per={delay_per} delay_offset={delay_per * i} />
            ))}
        </div>
    );
}