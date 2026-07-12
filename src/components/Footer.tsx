import React from "react";
import { motion } from "motion/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (id.startsWith("#")) {
      e.preventDefault();
      const target = document.getElementById(id.substring(1));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 64,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <footer className="bg-[#0A0A0B]/90 border-t border-white/5 backdrop-blur-md transition-colors duration-300 relative z-10 select-none">
      <div className="flex flex-col md:flex-row justify-between items-center py-8 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-4">
        
        {/* Copyright */}
        <p className="font-mono text-[11px] text-gray-500 text-center md:text-left tracking-wide">
          &copy; {currentYear} Aryan Yadav // Data Analyst.
        </p>

        {/* Links & Stack info */}
        <div className="flex flex-wrap gap-6 items-center justify-center">
          <a 
            className="font-mono text-[11px] uppercase text-gray-400 hover:text-indigo-400 transition-colors" 
            href="https://github.com/aryan-data-analytics"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a 
            className="font-mono text-[11px] uppercase text-gray-400 hover:text-indigo-400 transition-colors" 
            href="https://www.linkedin.com/in/aryan-yadav-87550127b?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  );
}
