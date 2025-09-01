import { GlitchLink } from "./GlitchLink";

export function DefaultNavbar() {
    return (
        <nav style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
            <GlitchLink to="/" duration={400}>HOME</GlitchLink>
            <GlitchLink to="/about" duration={400}>ABOUT</GlitchLink>
            <GlitchLink to="/projects" duration={400}>PROJECTS</GlitchLink>
            <GlitchLink to="/contact" duration={400}>CONTACT</GlitchLink>
            <GlitchLink to="/posts" duration={400}>POSTS</GlitchLink>
        </nav>
    );
}