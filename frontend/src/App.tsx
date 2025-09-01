import { InteractiveMatrixRain } from "./components/animatable_text/InteractiveMatrixRain.tsx";

export default function App() {
    return (
        <div
            style={{
                backgroundColor: "#10121C",
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: 0,
                padding: 0,
            }}
        >
            <InteractiveMatrixRain speed={75} />
        </div>
    );
}