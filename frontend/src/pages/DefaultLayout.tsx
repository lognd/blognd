import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DefaultNavbar } from "../components/animatable_text/DefaultNavbar.tsx";
import { InteractiveMatrixRain } from "../components/animatable_text/InteractiveMatrixRain.tsx";

export default function DefaultLayout() {
    const [darkMode, setDarkMode] = useState(true);

    const colors = {
        dark: {
            bg: "#10121C",
            panel: "rgba(44, 30, 49, 0.85)",
            text: "#E0E0E0",
            border: "#E0E0E0",
        },
        light: {
            bg: "#F9F9F9",
            panel: "rgba(255, 255, 255, 0.9)",
            text: "#10121C",
            border: "#10121C",
        },
    };

    const theme = darkMode ? colors.dark : colors.light;

    return (
        <div
            style={{
                position: "relative",
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
                fontFamily: "'JetBrains Mono', monospace",
                backgroundColor: theme.bg,
                color: theme.text,
                transition: "background 0.3s ease, color 0.3s ease",
            }}
        >
            {/* Matrix Rain Background */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                }}
            >
                <InteractiveMatrixRain speed={75} />
            </div>

            {/* Navbar */}
            <header
                style={{
                    position: "absolute",
                    top: "1rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    fontSize: "clamp(18px, 2.5vw, 24px)",
                    pointerEvents: "auto",
                }}
            >
                <DefaultNavbar />
            </header>

            {/* Theme Toggle */}
            <button
                onClick={() => setDarkMode(!darkMode)}
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "transparent",
                    border: `1px solid ${theme.border}`,
                    color: colors.dark.text,
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    zIndex: 3,
                }}
            >
                {darkMode ? "☀ Light" : "☽ Dark"}
            </button>

            {/* Scrollable inner content */}
            <main
                style={{
                    fontSize: "clamp(16px, 1.4vw, 15px)",
                    lineHeight: 1.6,
                    position: "absolute",
                    top: "4rem",
                    bottom: "1rem",

                    // keep centered and never touching edges
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "clamp(320px, 90%, 900px)", // min 320px, up to 900px

                    overflowY: "auto",
                    background: theme.panel,
                    borderRadius: "12px",
                    boxShadow: darkMode
                        ? "0 8px 32px rgba(0,0,0,0.6)"
                        : "0 8px 32px rgba(0,0,0,0.15)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    padding: "1.5rem",
                }}
                className="content-scroll"
            >
                <Outlet />
            </main>
        </div>
    );
}