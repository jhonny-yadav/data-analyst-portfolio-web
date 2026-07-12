import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, 
  Download, 
  ShieldCheck,
  Eye,
  X
} from "lucide-react";
import { Certificate } from "../types";
import { certificates } from "../data/certificates";
import { downloadCertificate, generateCertPdf } from "../utils/certPdfGenerator";

export default function Certifications() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handleViewCertificate = (cert: Certificate) => {
    setSelectedCert(cert);
    try {
      const doc = generateCertPdf(cert);
      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch (error) {
      console.error("Error generating preview URL:", error);
    }
  };

  const handleClosePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedCert(null);
  };

  // Framer Motion configuration matching existing sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Helper to render custom corporate logo monograms beautifully
  const renderCompanyLogo = (company: string) => {
    if (company.toLowerCase().includes("british")) {
      return (
        <div className="w-12 h-12 rounded-xl bg-[#071D49] flex items-center justify-center relative overflow-hidden shadow-lg border border-white/5 select-none">
          {/* Stylized Crimson Swoop */}
          <div className="absolute top-0 right-0 w-8 h-8 bg-[#C1171F] rounded-full translate-x-3 -translate-y-3 opacity-80" />
          <span className="font-headline text-lg font-extrabold text-white relative z-10 tracking-tight">BA</span>
        </div>
      );
    } else if (company.toLowerCase().includes("deloitte")) {
      return (
        <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center relative overflow-hidden shadow-lg border border-white/10 select-none">
          <div className="flex items-baseline gap-0.5">
            <span className="font-sans text-xs font-bold text-white tracking-tighter">Deloitte</span>
            <div className="w-2 h-2 rounded-full bg-[#86BC25] shadow-[0_0_8px_rgba(134,188,37,0.8)]" />
          </div>
        </div>
      );
    } else if (company.toLowerCase().includes("tata")) {
      return (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#005A9C] to-[#004B82] flex items-center justify-center relative overflow-hidden shadow-lg border border-white/5 select-none">
          {/* Subtle geometric circle overlay */}
          <div className="absolute -inset-1 border border-white/10 rounded-full opacity-30" />
          <span className="font-headline text-xl font-black text-white italic tracking-widest">T</span>
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
        <Award className="text-indigo-400" size={24} />
      </div>
    );
  };

  return (
    <section className="py-section-gap border-b border-white/5 bg-transparent transition-colors duration-300 relative" id="certifications">
      {/* Background glow to integrate with the layout */}
      <div className="absolute top-[40%] right-[-5%] w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-16 select-none"
        >
          <div>
            <p className="font-mono text-label-caps text-indigo-400 uppercase mb-2 flex items-center gap-2">
              <span>🏆</span> Certifications
            </p>
            <h2 className="text-headline-md text-white uppercase tracking-tight">Industry Certifications</h2>
            <p className="text-sm text-gray-400 mt-3 max-w-2xl font-sans leading-relaxed">
              Hands-on virtual experience programs demonstrating practical data analytics, business intelligence, and problem-solving skills.
            </p>
          </div>
        </motion.div>

        {/* Dynamic Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              variants={cardVariants}
              onClick={() => handleViewCertificate(cert)}
              className="border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between transition-all duration-300 bg-[#141417]/60 backdrop-blur-sm group hover:border-indigo-500/20 hover:bg-[#18181B]/80 hover:-translate-y-1 relative cursor-pointer"
              title="Click to View Certificate Preview"
            >
              {/* Card Header Info */}
              <div>
                <div className="flex items-start justify-between mb-6">
                  {renderCompanyLogo(cert.company)}
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-indigo-500/10 text-indigo-400 font-mono text-[9px] uppercase font-bold rounded-lg border border-indigo-500/20 select-none">
                    <ShieldCheck size={10} className="text-indigo-400" />
                    Verified Completion
                  </span>
                </div>

                {cert.category && (
                  <p className="font-mono text-[10px] text-indigo-400 uppercase mb-2 tracking-wider select-none">
                    {cert.category}
                  </p>
                )}
                
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors leading-snug">
                  {cert.title}
                </h3>
                
                {cert.description && (
                  <p className="text-sm text-gray-400 mb-6 font-sans leading-relaxed">
                    {cert.description}
                  </p>
                )}
              </div>

              {/* Card Footer Section */}
              <div>
                {/* Skill Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6 select-none">
                  {cert.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-md font-mono text-[9px] text-gray-400 group-hover:text-gray-300 group-hover:bg-white/10 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Dual View & Download Actions */}
                <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card onClick trigger
                      handleViewCertificate(cert);
                    }}
                    className="flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase text-indigo-400 font-bold py-3 px-2 rounded-xl border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/15 hover:border-indigo-500/40 hover:text-indigo-300 transition-all text-center focus:outline-none cursor-pointer select-none"
                    title="View Certificate PDF Online"
                  >
                    <Eye size={13} />
                    View
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card onClick trigger
                      downloadCertificate(cert);
                    }}
                    className="flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase text-white font-bold py-3 px-2 rounded-xl border border-white/10 bg-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-400 transition-all text-center focus:outline-none cursor-pointer select-none"
                    title="Download Certificate PDF File"
                  >
                    <Download size={13} />
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {previewUrl && selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6"
            onClick={handleClosePreview}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-[#0B0B0C] border border-white/10 rounded-[2rem] w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#141417]/80">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-indigo-400 uppercase tracking-widest">
                      {selectedCert.company}
                    </span>
                    {selectedCert.category && (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/40" />
                        <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                          {selectedCert.category}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
                    {selectedCert.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => downloadCertificate(selectedCert)}
                    className="flex items-center gap-2 font-mono text-[10px] uppercase text-white font-bold py-2.5 px-4 rounded-xl border border-white/10 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-400 transition-all cursor-pointer"
                  >
                    <Download size={12} />
                    <span className="hidden sm:inline">Download PDF</span>
                  </button>
                  <button
                    onClick={handleClosePreview}
                    className="p-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all focus:outline-none cursor-pointer"
                    aria-label="Close Preview"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* PDF Preview Content */}
              <div className="flex-1 bg-[#101012] p-4 flex flex-col justify-center items-center relative overflow-auto">
                {selectedCert.id === "british-airways" ? (
                  /* High Fidelity HTML/CSS/SVG British Airways Certificate Replica matching the uploaded image */
                  <div className="w-full max-w-4xl min-w-[280px] aspect-[1.414/1] bg-white border-l-[16px] sm:border-l-[24px] border-r-[16px] sm:border-r-[24px] border-[#C11B17] p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between text-[#1E293B] shadow-2xl rounded-sm my-auto select-none overflow-hidden relative">
                    {/* Top Header */}
                    <div className="flex justify-between items-start">
                      {/* British Airways Logo */}
                      <div className="flex flex-col items-start w-[70%]">
                        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-wrap">
                          <span className="font-serif font-extrabold text-[#00205B] tracking-[0.18em] text-sm sm:text-base md:text-xl lg:text-2xl">
                            BRITISH AIRWAYS
                          </span>
                          <svg className="h-5 sm:h-7 md:h-9 lg:h-11" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 24 C40 24, 90 12, 115 5 C90 12, 50 20, 5 24" fill="#C11B17" />
                            <path d="M55 17 C80 13, 100 8, 115 5 C95 9, 80 14, 55 17" fill="#00205B" />
                          </svg>
                        </div>
                        <div className="w-full h-[1px] bg-gray-100 mt-2 sm:mt-4 md:mt-6" />
                      </div>

                      {/* Forage Banner Flag hanging from top-right edge */}
                      <div 
                        className="absolute right-[8%] -top-1 bg-[#C11B17] text-white px-2.5 py-3.5 sm:px-3 sm:py-5 md:px-4 md:py-6 w-20 sm:w-26 md:w-32 lg:w-36 flex flex-col items-center shadow-lg"
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 88%, 0 100%)" }}
                      >
                        <div className="flex items-center gap-1 mb-1 sm:mb-1.5">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
                          </svg>
                          <span className="font-sans font-extrabold text-[10px] sm:text-xs md:text-sm tracking-tight">Forage</span>
                        </div>
                        <p className="text-[5px] sm:text-[7px] md:text-[9px] text-center leading-normal opacity-90 font-sans tracking-wide max-w-[90%] font-medium">
                          Inspiring and empowering future professionals
                        </p>
                      </div>
                    </div>

                    {/* Main Certificate Content */}
                    <div className="my-auto py-2 sm:py-4">
                      <h1 className="font-sans font-extrabold text-gray-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-1 sm:mb-2">
                        Aryan Yadav
                      </h1>
                      <h2 className="font-sans font-extrabold text-gray-800 text-base sm:text-lg md:text-2xl lg:text-3xl tracking-tight leading-tight mb-2 sm:mb-3">
                        Data Science Job Simulation
                      </h2>
                      <p className="font-serif italic text-[11px] sm:text-xs md:text-base lg:text-lg text-gray-500">
                        Certificate of Completion
                      </p>
                      <p className="font-sans text-[9px] sm:text-[10px] md:text-xs text-gray-400 mt-0.5 font-medium">
                        April 27th, 2026
                      </p>
                    </div>

                    {/* Footer Task List & Signatory */}
                    <div className="pt-3 sm:pt-4 md:pt-5 border-t border-gray-100 flex justify-between items-end gap-2">
                      {/* Left: Task lists */}
                      <div className="max-w-[65%] text-[7px] sm:text-[9px] md:text-[11px] text-gray-500 leading-relaxed font-sans font-medium text-left">
                        <p className="mb-1 text-gray-600 font-bold">
                          Over the period of April 2026, Aryan Yadav has completed practical tasks in:
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 opacity-90 pl-1">
                          <li>Modeling lounge eligibility at Heathrow Terminal 3</li>
                          <li>Predicting customer buying behaviour</li>
                        </ul>
                      </div>

                      {/* Right: Signature */}
                      <div className="flex flex-col items-end text-right min-w-[25%]">
                        {/* Real signature SVG path representation */}
                        <div className="h-6 sm:h-10 md:h-12 w-20 sm:w-28 md:w-32 flex justify-end items-center mb-1 text-slate-700/80">
                          <svg className="w-full h-full" viewBox="0 0 120 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M10 25 C 20 10, 25 15, 30 25 C 35 35, 40 10, 45 20 C 50 30, 55 5, 60 25 C 65 35, 70 15, 75 22 C 80 30, 85 20, 95 15 C 105 10, 110 30, 115 25" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="w-20 sm:w-28 md:w-32 h-[1px] bg-gray-200 my-0.5 sm:my-1" />
                        <p className="font-sans font-extrabold text-[8px] sm:text-[10px] text-gray-800">
                          Tom Brunskill
                        </p>
                        <p className="font-sans text-[7px] sm:text-[9px] text-gray-400 font-semibold leading-tight">
                          Co-Founder of Forage
                        </p>
                      </div>
                    </div>
                  </div>
                ) : selectedCert.id === "tata" ? (
                  /* High Fidelity HTML/CSS/SVG TATA Certificate Replica matching the uploaded image */
                  <div className="w-full max-w-4xl min-w-[280px] aspect-[1.414/1] bg-white border-l-[16px] sm:border-l-[24px] border-r-[16px] sm:border-r-[24px] border-[#3B62A4] p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between text-[#1E293B] shadow-2xl rounded-sm my-auto select-none overflow-hidden relative">
                    {/* Top Header */}
                    <div className="flex justify-between items-start">
                      {/* TATA Logo */}
                      <div className="flex flex-col items-start w-[70%]">
                        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-wrap">
                          <svg className="h-10 sm:h-14 w-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="40" r="28" stroke="#1F4E96" strokeWidth="6.5" fill="none" />
                            <path d="M50 20 L50 52" stroke="#1F4E96" strokeWidth="6.5" strokeLinecap="round" />
                            <path d="M50 28 C42 28, 32 38, 30 48" stroke="#1F4E96" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                            <path d="M50 28 C58 28, 68 38, 70 48" stroke="#1F4E96" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                            <text x="50" y="88" textAnchor="middle" fill="#1F4E96" className="font-sans font-black tracking-[0.1em] text-[18px]">TATA</text>
                          </svg>
                        </div>
                        <div className="w-full h-[1px] bg-gray-100 mt-2 sm:mt-4 md:mt-6" />
                      </div>

                      {/* Forage Banner Flag hanging from top-right edge in Blue */}
                      <div 
                        className="absolute right-[8%] -top-1 bg-[#3B62A4] text-white px-2.5 py-3.5 sm:px-3 sm:py-5 md:px-4 md:py-6 w-20 sm:w-26 md:w-32 lg:w-36 flex flex-col items-center shadow-lg"
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 88%, 0 100%)" }}
                      >
                        <div className="flex items-center gap-1 mb-1 sm:mb-1.5">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
                          </svg>
                          <span className="font-sans font-extrabold text-[10px] sm:text-xs md:text-sm tracking-tight">Forage</span>
                        </div>
                        <p className="text-[5px] sm:text-[7px] md:text-[9px] text-center leading-normal opacity-90 font-sans tracking-wide max-w-[90%] font-medium">
                          Inspiring and empowering future professionals
                        </p>
                      </div>
                    </div>

                    {/* Main Certificate Content */}
                    <div className="my-auto py-2 sm:py-4">
                      <h1 className="font-sans font-extrabold text-gray-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-1 sm:mb-2">
                        Aryan Yadav
                      </h1>
                      <h2 className="font-sans font-extrabold text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-tight leading-tight max-w-[90%] mb-2 sm:mb-3">
                        Data Visualisation: Empowering Business with Effective Insights
                      </h2>
                      <p className="font-serif italic text-[11px] sm:text-xs md:text-base lg:text-lg text-gray-500">
                        Certificate of Completion
                      </p>
                      <p className="font-sans text-[9px] sm:text-[10px] md:text-xs text-gray-400 mt-0.5 font-medium">
                        April 23rd, 2026
                      </p>
                    </div>

                    {/* Footer Task List & Signatory */}
                    <div className="pt-3 sm:pt-4 md:pt-5 border-t border-gray-100 flex justify-between items-end gap-2">
                      {/* Left: Task lists */}
                      <div className="max-w-[65%] text-[7px] sm:text-[9px] md:text-[10px] text-gray-500 leading-normal font-sans font-medium text-left">
                        <p className="mb-1 text-gray-600 font-bold">
                          Over the period of April 2026, Aryan Yadav has completed practical tasks in:
                        </p>
                        <ul className="space-y-0.5 opacity-90 pl-1 text-left">
                          <li>Framing the Business Scenario</li>
                          <li>Choosing the Right Visuals</li>
                          <li>Creating Effective Visuals</li>
                          <li>Communicating Insights and Analysis</li>
                        </ul>
                      </div>

                      {/* Right: Signature */}
                      <div className="flex flex-col items-end text-right min-w-[25%]">
                        {/* Real signature SVG path representation */}
                        <div className="h-6 sm:h-10 md:h-12 w-20 sm:w-28 md:w-32 flex justify-end items-center mb-1 text-slate-700/80">
                          <svg className="w-full h-full" viewBox="0 0 120 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M10 25 C 20 10, 25 15, 30 25 C 35 35, 40 10, 45 20 C 50 30, 55 5, 60 25 C 65 35, 70 15, 75 22 C 80 30, 85 20, 95 15 C 105 10, 110 30, 115 25" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="w-20 sm:w-28 md:w-32 h-[1px] bg-gray-200 my-0.5 sm:my-1" />
                        <p className="font-sans font-extrabold text-[8px] sm:text-[10px] text-gray-800">
                          Tom Brunskill
                        </p>
                        <p className="font-sans text-[7px] sm:text-[9px] text-gray-400 font-semibold leading-tight">
                          Co-Founder of Forage
                        </p>
                      </div>
                    </div>
                  </div>
                ) : selectedCert.id === "deloitte" ? (
                  /* High Fidelity HTML/CSS/SVG Deloitte Certificate Replica matching the uploaded image */
                  <div className="w-full max-w-4xl min-w-[280px] aspect-[1.414/1] bg-white border-l-[16px] sm:border-l-[24px] border-r-[16px] sm:border-r-[24px] border-black p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between text-[#1E293B] shadow-2xl rounded-sm my-auto select-none overflow-hidden relative">
                    {/* Top Header */}
                    <div className="flex justify-between items-start">
                      {/* Deloitte Logo */}
                      <div className="flex flex-col items-start w-[70%]">
                        <div className="flex items-baseline gap-0.5 flex-wrap">
                          <span className="font-sans font-black text-black tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                            Deloitte
                          </span>
                          <span className="text-[#86BC25] font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-none">.</span>
                        </div>
                        <div className="w-full h-[1px] bg-gray-100 mt-2 sm:mt-4 md:mt-6" />
                      </div>

                      {/* Forage Banner Flag hanging from top-right edge in Deloitte Green/Dark Theme */}
                      <div 
                        className="absolute right-[8%] -top-1 bg-[#1F4E96] text-white px-2.5 py-3.5 sm:px-3 sm:py-5 md:px-4 md:py-6 w-20 sm:w-26 md:w-32 lg:w-36 flex flex-col items-center shadow-lg"
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 88%, 0 100%)" }}
                      >
                        <div className="flex items-center gap-1 mb-1 sm:mb-1.5">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
                          </svg>
                          <span className="font-sans font-extrabold text-[10px] sm:text-xs md:text-sm tracking-tight">Forage</span>
                        </div>
                        <p className="text-[5px] sm:text-[7px] md:text-[9px] text-center leading-normal opacity-90 font-sans tracking-wide max-w-[90%] font-medium">
                          Inspiring and empowering future professionals
                        </p>
                      </div>
                    </div>

                    {/* Main Certificate Content */}
                    <div className="my-auto py-2 sm:py-4">
                      <h1 className="font-sans font-extrabold text-gray-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-1 sm:mb-2">
                        Aryan Yadav
                      </h1>
                      <h2 className="font-sans font-extrabold text-gray-800 text-base sm:text-lg md:text-2xl lg:text-3xl tracking-tight leading-tight mb-2 sm:mb-3">
                        Data Analytics Job Simulation
                      </h2>
                      <p className="font-serif italic text-[11px] sm:text-xs md:text-base lg:text-lg text-gray-500">
                        Certificate of Completion
                      </p>
                      <p className="font-sans text-[9px] sm:text-[10px] md:text-xs text-gray-400 mt-0.5 font-medium">
                        April 23rd, 2026
                      </p>
                    </div>

                    {/* Footer Task List & Signatory */}
                    <div className="pt-3 sm:pt-4 md:pt-5 border-t border-gray-100 flex justify-between items-end gap-2">
                      {/* Left: Task lists */}
                      <div className="max-w-[65%] text-[7px] sm:text-[9px] md:text-[11px] text-gray-500 leading-relaxed font-sans font-medium text-left">
                        <p className="mb-1 text-gray-600 font-bold">
                          Over the period of April 2026, Aryan Yadav has completed practical tasks in:
                        </p>
                        <ul className="space-y-0.5 opacity-90 pl-1 text-left">
                          <li>Data analysis</li>
                          <li>Forensic technology</li>
                        </ul>
                      </div>

                      {/* Right: Signature */}
                      <div className="flex flex-col items-end text-right min-w-[25%]">
                        {/* Real signature SVG path representation */}
                        <div className="h-6 sm:h-10 md:h-12 w-20 sm:w-28 md:w-32 flex justify-end items-center mb-1 text-slate-700/80">
                          <svg className="w-full h-full" viewBox="0 0 120 40" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <path d="M12 25 C20 12, 28 8, 32 20 C36 32, 40 18, 45 22 C50 26, 52 14, 55 30 C58 42, 62 25, 68 28 C74 31, 82 22, 90 20 C98 18, 105 24, 112 22" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="w-20 sm:w-28 md:w-32 h-[1px] bg-gray-200 my-0.5 sm:my-1" />
                        <p className="font-sans font-extrabold text-[8px] sm:text-[10px] text-gray-800">
                          Tina McCreery
                        </p>
                        <p className="font-sans text-[7px] sm:text-[9px] text-gray-400 font-semibold leading-tight">
                          Chief Human Resources Officer, Deloitte
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Embedded PDF iframe for other certificates */
                  <iframe
                    src={`${previewUrl}#toolbar=0&navpanes=0`}
                    className="w-full h-full rounded-xl border border-white/5 shadow-2xl bg-white"
                    title={`${selectedCert.title} Certificate Preview`}
                  />
                )}
                
                {/* Helpful Mobile Tip overlay at bottom of iframe */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 border border-white/5 rounded-full text-[10px] text-gray-400 font-mono tracking-wide backdrop-blur-sm select-none pointer-events-none md:hidden">
                  💡 Not loading? Tap 'Download PDF' above to save.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
