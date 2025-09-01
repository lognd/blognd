import { BigTextBlock } from "./components/animatable_text/BigTextBlock.tsx";
import { InteractiveMatrixRain } from "./components/animatable_text/InteractiveMatrixRain.tsx";

export default function App() {
    return (
        <div
            style={{
                backgroundColor: "#10121C",
                height: "100vh",
                width: "100vw",
                margin: 0,
                padding: 0,
                overflow: "hidden",
                position: "relative", // key for layering
            }}
        >
            {/* Matrix Rain as background */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                <InteractiveMatrixRain speed={75} />
            </div>

            {/* Big Text in the foreground */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1, // ensure it’s above rain
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    pointerEvents: "none",
                }}
            >
                <BigTextBlock text={"LOGAN\nDAPP"} />
            </div>
        </div>
    );
}