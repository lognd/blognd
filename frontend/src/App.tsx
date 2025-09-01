import { MatrixRain } from "./components/animatable_text/MatrixRain";

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
            <MatrixRain width={80} height={30} speed={75} />
        </div>
    );
}