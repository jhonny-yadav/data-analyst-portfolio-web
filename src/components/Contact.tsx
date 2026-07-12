import React, { useState } from "react";
import { Mail, LinkIcon, Code, Close, ArrowRight, Phone } from "./Icons";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Client-side validations
    if (!formData.name.trim()) {
      setSubmitError("Please enter your name.");
      return;
    }
    if (!formData.email.trim()) {
      setSubmitError("Please enter your email address.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      setSubmitError("Please enter your message.");
      return;
    }

    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitError("EmailJS credentials are not configured in settings.");
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        organization: formData.company,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (err: any) {
      console.error("EmailJS Error:", err);
      setSubmitError(err?.text || err?.message || "Failed to send message. Please try again later.");
      setIsSubmitting(false);
    }
  };

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
          
          {/* Email Card (triggers custom popup modal) */}
          <button 
            onClick={() => {
              setIsFormOpen(true);
            }}
            className="p-12 border-b lg:border-b-0 sm:border-r border-white/5 hover:bg-white/5 transition-all flex flex-col items-center justify-center cursor-pointer group text-center focus:outline-none w-full"
          >
            <Mail className="text-3xl mb-4 text-indigo-400 group-hover:scale-110 transition-transform duration-300" size={32} />
            <p className="font-mono text-label-caps uppercase text-gray-300 font-bold group-hover:text-indigo-400 transition-colors">
              Email Me
            </p>
            <p className="text-xs text-gray-400 mt-2 lowercase font-mono">aryan.yadav.working2007@gmail.com</p>
          </button>

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

      {/* Interactive Contact Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0A0A0B]/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#141417] text-white w-full max-w-md border border-white/10 p-6 md:p-8 relative rounded-[2.5rem] shadow-2xl"
            >
              <button 
                onClick={() => {
                  setIsFormOpen(false);
                  setSubmitError(null);
                }}
                className="absolute top-6 right-6 p-1.5 text-gray-400 hover:text-white transition-colors focus:outline-none bg-white/5 rounded-lg border border-white/5 cursor-pointer"
              >
                <Close size={18} />
              </button>

              <div className="mb-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-400 font-bold select-none">
                  Transmission Secure
                </span>
                <h3 className="text-2xl font-bold text-white mt-1 pr-6 leading-tight">
                  Send Data Inquiry
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="contact-form"
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <label className="block font-mono text-[10px] uppercase text-gray-400 mb-1.5 font-bold select-none">
                        Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="E.g., Jane Doe"
                        className="w-full bg-[#1c1c22] text-white border border-white/10 px-4 py-3 rounded-xl font-sans text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-gray-400 mb-1.5 font-bold select-none">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="E.g., jane@company.com"
                        className="w-full bg-[#1c1c22] text-white border border-white/10 px-4 py-3 rounded-xl font-sans text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-gray-400 mb-1.5 font-bold select-none">
                        Organization
                      </label>
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        placeholder="E.g., McKinsey &amp; Co"
                        className="w-full bg-[#1c1c22] text-white border border-white/10 px-4 py-3 rounded-xl font-sans text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-gray-400 mb-1.5 font-bold select-none">
                        Message *
                      </label>
                      <textarea 
                        required
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail your operational or data pipeline requirements..."
                        className="w-full bg-[#1c1c22] text-white border border-white/10 px-4 py-3 rounded-xl font-sans text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                      />
                    </div>

                    {submitError && (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl text-center select-none font-sans">
                        {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-mono text-xs uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-bold rounded-xl cursor-pointer disabled:opacity-50 shadow-lg shadow-indigo-500/20"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      {!isSubmitting && <ArrowRight size={14} />}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success-screen"
                    className="text-center py-8 space-y-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-500 mb-2">
                      ✓
                    </div>
                    <h4 className="text-xl font-bold text-white">Transmission Succeeded</h4>
                    <p className="text-sm text-gray-400 font-sans max-w-sm mx-auto">
                      Your operational inquiry has been successfully dispatched. Aryan will review your request and get back to you within 24 operational hours.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setIsFormOpen(false);
                        setSubmitError(null);
                      }}
                      className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-mono text-xs uppercase hover:opacity-90 transition-opacity mt-4 rounded-xl"
                    >
                      Return to Page
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
