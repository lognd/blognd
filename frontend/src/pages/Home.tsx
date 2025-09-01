import { BigTextBlock } from "../components/animatable_text/BigTextBlock.tsx";
import { InteractiveMatrixRain } from "../components/animatable_text/InteractiveMatrixRain.tsx";
import { HomeNavbar } from "../components/animatable_text/HomeNavbar.tsx"

export default function Home() {
    return (
        <div
            style={{
                backgroundColor: "#10121C",
                height: "100vh",
                width: "100vw",
                margin: 0,
                padding: 0,
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* Matrix Rain as background */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <InteractiveMatrixRain speed={75} />
            </div>

            {/* Navbar floats at the very top */}
            <div
                style={{
                    position: "absolute",
                    top: "calc(50% - 13rem)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 3,
                    fontSize: "24px",
                    pointerEvents: "auto",
                }}
            >
                <HomeNavbar />
            </div>

            {/* Big text always centered in the screen */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2,
                    pointerEvents: "none", // ensures clicks pass through
                }}
            >
                <BigTextBlock text={"LOGAN\nDAPP"} />
            </div>
        </div>
    );
}