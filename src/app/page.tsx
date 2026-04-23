import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";

export default function Home() {
    return (
        <div className="min-h-screen">
            <section id="home">
                <Hero />
            </section>
            <section id="about">
                <About />
            </section>
            <section id="education">
                <Education />
            </section>
            <section id="skills">
                <Skills />
            </section>
            <section id="projects">
                <Projects />
            </section>
            <section id="experience">
                <Experience />
            </section>
        </div>
    );
}
