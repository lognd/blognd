import { GlitchLink } from "./GlitchLink";

export function HomeNavbar() {
    return (
        <nav style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
            <GlitchLink to="/about" delay={1000}>ABOUT</GlitchLink>
            <GlitchLink to="/projects" delay={1500}>PROJECTS</GlitchLink>
            <GlitchLink to="/contact" delay={2000}>CONTACT</GlitchLink>
            <GlitchLink to="/posts" delay={2500}>POSTS</GlitchLink>
        </nav>
    );
}