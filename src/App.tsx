import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { downloadCV } from "./utils/pdfGenerator";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col transition-colors duration-300 relative overflow-hidden">
      {/* Immersive Theme Ambient Glow Elements */}
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-[50%] left-[30%] w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Top Navigation */}
      <Navbar onDownloadCV={downloadCV} />

      {/* Main Sections */}
      <main className="flex-grow pt-16 relative z-10">
        <Hero />
        <About />
        <Projects />
        <Certifications />
        <Experience />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

