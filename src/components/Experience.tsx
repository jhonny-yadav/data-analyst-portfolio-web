import { motion } from "motion/react";
import { ExperienceEntry } from "../types";

export default function Experience() {
  const experiences: ExperienceEntry[] = [
    {
      period: "6 MONTHS",
      role: "Data Analyst Intern",
      company: "Data Analytics Project",
      description: [
        "Analyzed datasets using Excel, SQL and Power BI to generate actionable business insights.",
        "Built interactive dashboards to visualize key metrics and support data-driven decision-making.",
        "Applied Python and statistical methods for data cleaning, analysis and basic predictive modelling.",
        "Collaborated on real-world data problems, translating raw data into clear, presentable reports."
      ]
    }
  ];

  return (
    <section className="py-section-gap border-b border-white/5 bg-transparent transition-colors duration-300" id="experience">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative z-10">
        
        {/* Left: Experience Timeline */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-label-caps text-indigo-400 uppercase mb-4">Background</p>
            <h2 className="text-headline-md text-white uppercase mb-0">Professional Experience</h2>
          </motion.div>
          
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 border-l-2 border-indigo-500/30"
              >
                {/* Glowing Dot */}
                <span className="absolute -left-[6px] top-1.5 w-[10px] h-[10px] bg-indigo-500 border border-white/20 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                
                <p className="font-mono text-xs text-gray-500 mb-2">{exp.period}</p>
                <h3 className="text-xl font-bold mb-1 text-white">{exp.role}</h3>
                <p className="text-indigo-400 font-semibold mb-4">{exp.company}</p>
                
                <ul className="text-sm text-gray-400 space-y-3 font-sans">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Architectural Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="font-mono text-label-caps text-indigo-400 uppercase mb-4">Philosophy</p>
          <h2 className="text-headline-md text-white uppercase mb-12">Architectural Approach</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8 font-sans">
            I treat data as the raw material of modern architecture. My process focuses on <strong>structural integrity</strong>—ensuring every data point is valid and every visualization serves a concrete business objective.
          </p>
          <div className="p-8 border border-white/5 bg-[#141417]/60 backdrop-blur-sm rounded-[2rem] italic text-gray-300 border-l-4 border-l-indigo-500 font-sans transition-colors duration-300">
            &ldquo;In data analysis, precision is the difference between a guess and a strategy.&rdquo;
          </div>
        </motion.div>

      </div>
    </section>
  );
}
