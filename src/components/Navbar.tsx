import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onDownloadCV: () => void;
}

export default function Navbar({ onDownloadCV }: NavbarProps) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const sections = ["hero", "about", "projects", "certifications", "experience", "contact"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 64;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navItems = [
    { label: "About Me", href: "about" },
    { label: "Projects", href: "projects" },
    { label: "Certifications", href: "certifications" },
    { label: "Experience", href: "experience" },
    { label: "Contact", href: "contact" },
  ];

  return (
    <>
      <header className="bg-[#0A0A0B]/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-white/10 transition-colors duration-300">
        <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
          <nav className="hidden md:flex flex-grow justify-between items-center">
            <div className="flex gap-8 items-center">
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  className={`font-mono text-label-caps uppercase transition-colors relative py-2 ${
                    activeSection === item.href 
                      ? "text-indigo-400 font-bold" 
                      : "text-gray-400 hover:text-white"
                  }`}
                  href={`#${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                  {activeSection === item.href && (
                    <motion.span 
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>
            
            <button 
              onClick={onDownloadCV}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-mono text-label-caps uppercase hover:opacity-90 transition-opacity flex items-center gap-2 rounded-xl shadow-lg shadow-indigo-500/20"
              id="download-cv-btn"
            >
              <Download size={12} />
              Download CV
            </button>
          </nav>

          <div className="flex items-center gap-4 md:hidden ml-auto">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white focus:outline-none p-1.5 border border-white/10 rounded"
              aria-label="Toggle Menu"
              id="hamburger-btn"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 w-full bg-[#0A0A0B]/95 backdrop-blur-md border-b border-white/10 z-40 md:hidden flex flex-col px-margin-mobile py-6 gap-4 shadow-lg"
          >
            {navItems.map((item, idx) => (
              <a
                key={idx}
                className={`font-mono text-label-caps uppercase py-2 border-b border-white/5 ${
                  activeSection === item.href ? "text-indigo-400 font-bold" : "text-gray-400"
                }`}
                href={`#${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                onDownloadCV();
              }}
              className="mt-2 w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-mono text-label-caps uppercase hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-2 rounded-xl"
            >
              <Download size={14} />
              Download CV
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
