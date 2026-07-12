import React from "react";
import { motion } from "motion/react";
import { User, BookOpen, Wrench, Briefcase } from "lucide-react";

export default function About() {
  return (
    <section className="py-section-gap border-b border-white/5 bg-transparent transition-colors duration-300 relative" id="about">
      {/* Subtle ambient light source */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12 md:mb-16 select-none"
        >
          <div>
            <p className="font-mono text-label-caps text-indigo-400 uppercase mb-2 flex items-center gap-2">
              <span><User size={14} /></span> Profile
            </p>
            <h2 className="text-headline-md text-white uppercase tracking-tight">About Me</h2>
          </div>
        </motion.div>

        {/* Two-Column Professional Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Core Narrative */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-gray-300 text-base md:text-lg leading-relaxed font-sans"
            >
              I'm a data analyst enthusiast pursuing a <strong>BA in Programming & Computer Applications (Major)</strong> with <strong>Mathematics (Minor)</strong> via SOL, currently in my 3rd semester. My toolkit includes Excel (VBA), SQL, Python (Pandas & NumPy), Tableau, and Power BI — and I enjoy turning messy raw data into clear, decision-ready insights.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-gray-300 text-base md:text-lg leading-relaxed font-sans"
            >
              I've worked on projects across e-commerce, HR, retail, and healthcare analytics, learning that good analysis is as much about asking the right questions as it is about the right formula. Currently looking for Data Analyst opportunities (internships/entry-level roles) where I can keep learning and grow through real-world data challenges. Let's connect!
            </motion.p>
          </div>

          {/* Right Column: Key Details & Highlights Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-5 p-6 md:p-8 rounded-[1.5rem] border border-white/5 bg-[#141417]/40 backdrop-blur-sm hover:border-white/10 transition-all duration-300 space-y-6 md:space-y-8"
          >
            {/* Academic Info */}
            <div className="flex gap-4 items-start">
              <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/10 rounded-xl text-indigo-400 shrink-0">
                <BookOpen size={18} />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-1">Education & Focus</h4>
                <p className="text-sm text-white font-bold leading-snug">
                  BA in Programming & Computer Applications
                </p>
                <p className="text-xs text-gray-400 mt-1 leading-normal">
                  Mathematics (Minor) • SOL (3rd Semester)
                </p>
              </div>
            </div>

            {/* Core Toolkit */}
            <div className="flex gap-4 items-start">
              <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/10 rounded-xl text-indigo-400 shrink-0">
                <Wrench size={18} />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Technical Toolkit</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Excel (VBA)", "SQL", "Python (Pandas/NumPy)", "Tableau", "Power BI"].map((skill) => (
                    <span 
                      key={skill} 
                      className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/[0.03] border border-white/[0.06] text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Domain Projects */}
            <div className="flex gap-4 items-start">
              <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/10 rounded-xl text-indigo-400 shrink-0">
                <Briefcase size={18} />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Domain Experience</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["E-commerce", "HR", "Retail", "Healthcare"].map((domain) => (
                    <span 
                      key={domain} 
                      className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/[0.03] border border-white/[0.06] text-gray-300"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
