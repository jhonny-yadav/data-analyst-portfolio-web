import React from "react";
import { Mail, LinkIcon, Code, Phone } from "./Icons";
import { motion } from "motion/react";

export default function Contact() {
  return (
    <section className="py-section-gap bg-transparent transition-colors duration-300 relative" id="contact">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
        
        <motion.h2 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-display-lg text-white mb-16 uppercase tracking-tighter select-none"
        >
          READY TO TALK?
        </motion.h2>

        {/* Dynamic Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/5 rounded-[2.5rem] bg-[#141417]/60 backdrop-blur-sm overflow-hidden transition-colors duration-300 select-none shadow-2xl"
        >
          
          {/* Email Card (direct mailto link) */}
          <a 
            href="mailto:aryan.yadav.working2007@gmail.com"
            className="p-12 border-b lg:border-b-0 sm:border-r border-white/5 hover:bg-white/5 transition-all flex flex-col items-center justify-center group text-center"
          >
            <Mail className="text-3xl mb-4 text-indigo-400 group-hover:scale-110 transition-transform duration-300" size={32} />
            <p className="font-mono text-label-caps uppercase text-gray-300 font-bold group-hover:text-indigo-400 transition-colors">
              Email
            </p>
            <p className="text-xs text-gray-400 mt-2 lowercase font-mono">aryan.yadav.working2007@gmail.com</p>
          </a>

          {/* Call Card */}
          <a 
            href="tel:+919315153687"
            className="p-12 border-b lg:border-b-0 lg:border-r border-white/5 hover:bg-white/5 transition-all flex flex-col items-center justify-center group text-center"
          >
            <Phone className="text-3xl mb-4 text-indigo-400 group-hover:scale-110 transition-transform duration-300" size={32} />
            <p className="font-mono text-label-caps uppercase text-gray-300 font-bold group-hover:text-indigo-400 transition-colors">
              Call Me
            </p>
            <p className="text-xs text-gray-400 mt-2 font-mono">+91 9315153687</p>
          </a>

          {/* LinkedIn Card */}
          <a 
            href="https://www.linkedin.com/in/aryan-yadav-87550127b?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-12 border-b sm:border-b-0 sm:border-r border-white/5 hover:bg-white/5 transition-all flex flex-col items-center justify-center group text-center"
          >
            <LinkIcon className="text-3xl mb-4 text-indigo-400 group-hover:scale-110 transition-transform duration-300" size={32} />
            <p className="font-mono text-label-caps uppercase text-gray-300 font-bold group-hover:text-indigo-400 transition-colors">
              LinkedIn
            </p>
            <p className="text-xs text-gray-400 mt-2 lowercase font-mono">aryan-yadav</p>
          </a>

          {/* GitHub Card */}
          <a 
            href="https://github.com/aryan-data-analytics" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-12 hover:bg-white/5 transition-all flex flex-col items-center justify-center group text-center"
          >
            <Code className="text-3xl mb-4 text-indigo-400 group-hover:scale-110 transition-transform duration-300" size={32} />
            <p className="font-mono text-label-caps uppercase text-gray-300 font-bold group-hover:text-indigo-400 transition-colors">
              GitHub
            </p>
            <p className="text-xs text-gray-400 mt-2 lowercase font-mono">aryan-data-analytics</p>
          </a>

        </motion.div>

      </div>
    </section>
  );
}
