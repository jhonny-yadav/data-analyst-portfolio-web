import { motion } from "motion/react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="py-24 border-b border-white/5 bg-transparent transition-colors duration-300 relative" id="hero">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg items-center"
        >
          <div className="lg:col-span-10">
            {/* Professional Status Pill */}
            <motion.div 
              variants={itemVariants}
              className="mb-8 inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs uppercase font-semibold rounded-full border border-indigo-500/20 select-none"
            >
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
              Data Analyst Portfolio
            </motion.div>

            {/* Title with Gradient */}
            <motion.h1 
              variants={itemVariants}
              className="text-display-lg mb-6 tracking-tighter bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent font-extrabold select-none"
            >
              ARYAN YADAV
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl font-medium text-gray-300 mb-10 max-w-3xl leading-relaxed font-sans"
            >
              Detail-oriented Data Analyst with hands-on experience in Excel, SQL, Power BI, Python, statistics, and dashboarding. Passionate about turning raw data into clear, actionable insights that drive smarter decisions.
            </motion.p>

            {/* Removed Education & Experience Block */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
