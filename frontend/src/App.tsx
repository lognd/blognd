import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Posts from "./pages/Posts";

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Standalone Home without DefaultLayout */}
                <Route path="/" element={<Home />} />

                {/* All other pages share DefaultLayout */}
                <Route element={<DefaultLayout />}>
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/posts" element={<Posts />} />
                </Route>
            </Routes>
        </Router>
    );
}