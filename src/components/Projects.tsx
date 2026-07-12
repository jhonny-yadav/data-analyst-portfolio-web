import React, { useState } from "react";
import { ArrowForward, OpenInNew, Close, ArrowRight } from "./Icons";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "sql-store-performance",
      category: "SQL Database Analysis",
      label: "Data Cleansing",
      title: "SaaS Billing & Subscriptions - Cleaning Script",
      description: "Robust MySQL data cleaning pipeline designed to cleanse customer profiles and transactional tables, standardizing schema anomalies and fixing multi-format date errors from messy raw exports.",
      tags: ["SQL", "Data Cleaning", "Data Standardisation", "DateTime Parsing", "Database Integrity"],
      image: "",
      sourceUrl: "https://github.com/aryan-data-analytics/SQL.git",
      details: {
        challenge: "The raw export database of a SaaS billing application ('saas_billing_practice') had severe integrity issues. The 'customers' table had inconsistent name casing, stray whitespaces, invalid email formatting, and multiple misspelled variations of country names. Meanwhile, the 'billing_transactions' table stored 'invoice_date' across six distinct messy text formats instead of true DATE types, stored financial amounts as non-numeric text with currency symbols, used mixed casing for status and payment methods, and contained duplicate 'invoice_id' records.",
        solution: "Designed a multi-phase, end-to-end MySQL cleaning script to generate clean production-ready tables ('customers_clean' and 'billing_transactions_clean'). The script normalizes name casings and trims spaces, flags invalid emails with pattern matching, standardizes country entries with a centralized mapping, parses 6 different text date structures into standard ANSI dates via dynamic string-to-date casting, strips non-numeric characters from transactions, and resolves duplicate 'invoice_id' entries by keeping only the earliest instance.",
        results: [
          "Cleaned and standardized the entire 'customers' table, achieving 100% spelling consistency for multi-region countries and identifying invalid emails.",
          "Transformed and parsed all messy 'invoice_date' text rows into true 'DATE' formats across six distinct string templates.",
          "Corrected inconsistent string states (status/payment casing) and successfully pruned duplicate transactional billing IDs, preserving only the first unique invoice records.",
          "Created optimized, clean view-ready tables ('customers_clean' and 'billing_transactions_clean') for reliable down-stream BI dashboards and analytical tools."
        ],
        metrics: [
          { label: "Date Formats Resolved", value: "6 Formats" },
          { label: "Data Quality", value: "100% Clean" },
          { label: "Database System", value: "MySQL" }
        ]
      }
    },
    {
      id: "excel-budget-automation",
      category: "Excel Data Analysis",
      label: "Data Analysis",
      title: "E-Commerce Conversion Funnel Analysis (Excel) — Device & Traffic Source Breakdown",
      description: "Comprehensive multi-funnel e-commerce conversion workbook mapping 50k+ raw session lines into clean, high-fidelity customer journey insights.",
      tags: ["Excel Formulas", "Pivot Tables", "GETPIVOTDATA", "Funnel Analysis", "Data Validation"],
      image: "",
      sourceUrl: "https://github.com/aryan-data-analytics/Excel-VBA.git",
      details: {
        challenge: "The raw web sessions dataset was extremely large and unstructured with over 50,000 transaction rows, making high-level trend spotting impossible. Additionally, creating standard cross-tabulations across Device Types and Traffic Sources was complex. Static cell referencing inside GETPIVOTDATA formulas also caused referencing bugs, failing to update metrics dynamically when copied across marketing channels (e.g. Google and Instagram).",
        solution: "Engineered dynamic Pivot Tables to group unstructured sessions, and designed a custom relative-referencing GETPIVOTDATA formula architecture (using dynamic, cell-relative references like $A2 rather than hardcoded text) to cleanly calculate conversion percentages at every stage of the funnel. Followed up with complex multi-dimensional cross-tabulations and rigid Grand Total sanity checks.",
        results: [
          "Summarized 50k+ raw transactional rows into structured device & traffic source datasets using Excel Pivot Tables.",
          "Combined COUNTIF and GETPIVOTDATA formulas to calculate exact conversion rates across multiple funnel stages (Cart %, Checkout %, Purchase %).",
          "Fixed GETPIVOTDATA formula copy bugs by migrating from static text values to dynamic row-relative cell references ($A2) for perfect accuracy across channels.",
          "Engineered interactive Pivot Charts cross-tabulating Device Types and Traffic Sources to uncover the highest converting revenue channels (e.g., Desktop + Google).",
          "Implemented comprehensive Grand Total validations and math sanity checks to guarantee 100% data integrity before final dashboard ingestion."
        ],
        metrics: [
          { label: "Unstructured Rows", value: "50,000+" },
          { label: "Formula Accuracy", value: "100% Dynamic" },
          { label: "Funnel Stages", value: "Cart/Checkout/Buy" }
        ]
      }
    },
    {
      id: "tableau-sales-retention",
      category: "Tableau Visualization",
      label: "BI Visualization",
      title: "HR Workforce & Attendance Analytics Dashboard (Tableau)",
      description: "Interactive HR workforce and attendance visualization dashboard connecting multiple data sources to track employee metrics, hiring trends, and department budgets.",
      tags: ["Tableau", "Data Relationships", "Tableau Extracts", "Calculated Fields", "Attendance Analytics"],
      image: "",
      sourceUrl: "https://github.com/aryan-data-analytics/Tableu.git",
      details: {
        challenge: "Connecting and analyzing three independent, disparate datasets (Attendance daily logs, Employees per-capita profiles, and Department budget lists) with completely different grains of detail, which caused row-duplication, incorrect measure aggregations, and sluggish live query rendering.",
        solution: "Leveraged Tableau's Data Model Relationships to join keys seamlessly, optimized query latency using high-performance Hyper Extracts, handled mismatched granularity measures by separating axes, parsed raw dates into year hierarchies, and built intuitive side-by-side budget comparison bars.",
        results: [
          "Established a robust Data Model using Tableau Relationships (Employees.DepartmentID = Departments.DepartmentID & Attendance.EmployeeID = Employees.EmployeeID) to prevent duplicate rows and ensure accurate aggregations.",
          "Accelerated dashboard performance and interactions on large datasets by converting slow live Excel connections into high-speed Tableau Extracts (.hyper files).",
          "Resolved wrong aggregation issues by separating mismatched granularity measures (Department Budget vs Employee Hourly Rate) into distinct visual axes and contexts.",
          "Transformed raw HireDate values into dynamic Year hierarchies (YEAR(HireDate)) to cleanly visualize and track annual headcount spikes and hiring trends.",
          "Designed a dedicated 'Department wise budget' bar-chart worksheet to instantly identify the highest and lowest spending divisions side-by-side."
        ],
        metrics: [
          { label: "Data Connections", value: "3 Tables" },
          { label: "Query Speed", value: "Hyper Extract" },
          { label: "Data Consistency", value: "100% Verified" }
        ]
      }
    },
    {
      id: "retail-sales-analysis",
      category: "Python Data Analysis",
      label: "Python Analysis",
      title: "Retail Sales Analysis",
      description: "Interactive Python pipeline executing group-wise imputation, outlier screening, and RFM customer segmentation on 50k+ raw transactions.",
      tags: ["Python", "Pandas", "NumPy", "RFM Segmentation", "Data Cleansing"],
      image: "",
      sourceUrl: "https://github.com/aryan-data-analytics/Python.git",
      details: {
        challenge: "Analyzing a massive, raw retail dataset riddled with missing feature entries, skewed purchase outlier values, biased flat discounts, and tricky quantile binning boundary issues.",
        solution: "Built a robust, step-by-step Python pipeline using Pandas and NumPy. Resolved category discount patterns, isolated outliers using Z-scores, calculated weighted statistics, and implemented rank-padded RFM segmentation.",
        results: [
          "Missing Values Imputation: Standardized missing data (~3% of discounts and ~2% of payment methods) using category-based median imputation (groupby('category')['discount_pct'].transform(median)) and mode-based imputation to preserve core trends.",
          "Outlier Detection: Isolated high-variance pricing anomalies safely by implementing Z-score based outliers (|Z| > 3) via pure NumPy without losing relevant data.",
          "Weighted Metrics: Built dynamic revenue-weighted averages (np.average using revenue as weights) to capture realistic margin compressions instead of flat, misleading averages.",
          "RFM Customer Segmentation: Applied quantile-based pd.qcut() to classify shoppers into 5 distinct groups (Champions, Loyal, At Risk, Potential, Lost) using Recency, Frequency, and Monetary scores.",
          "Boundary-Duplicate Safe Binning: Fixed pd.qcut() value-clustering crashes by applying pre-rank method first (.rank(method='first')) to guarantee clean bin stability.",
          "Time-Series Convolution: Implemented a 3-month rolling average via NumPy convolution to smooth out monthly trends and capture true sales cycles over seasonal spikes.",
          "Discount Sensitivity Matrix: Modeled margin-compression across custom percentage brackets (0%, 1-5%, 6-10%, 11-15%, 16-20%), revealing that discounts above 15% directly harm product margins."
        ],
        metrics: [
          { label: "Unstructured Rows", value: "50,000+" },
          { label: "Cleaning Coverage", value: "100%" },
          { label: "Analytics Pipeline", value: "Python" }
        ]
      }
    },
    {
      id: "healthcare-analysis",
      category: "Python Data Analysis",
      label: "Python Analysis",
      title: "Healthcare Analysis",
      description: "Leveraging Pandas filtering, multi-source feature imputation, and high-impact correlation matrices on medical datasets.",
      tags: ["Python", "NumPy", "Pandas", "Healthcare Analytics", "Statistical Inference"],
      image: "",
      sourceUrl: "https://github.com/aryan-data-analytics/Python.git",
      details: {
        challenge: "Handling unstructured medical datasets featuring severe entry errors (such as reverse discharge calendars), incomplete customer feedback/insurance metrics, and verifying whether outlier billing profiles truly skew top-line clinical revenue.",
        solution: "Engineered a localized Pandas and NumPy clean-up routine to isolate chronological date anomalies, deploy multi-condition risk categorization models, map patient satisfaction coefficients, and execute precise Z-score billing audits.",
        results: [
          "Data Cleaning (Discharge Anomalies): Identified and dropped 15 corrupt rows where discharge_date was logged prior to admission_date, ensuring dynamic transparency by reporting the affected sample counts.",
          "Strategic Feature Imputation: Solved 4% satisfaction_score nulls using category median profiles to counter outlier ratings, and resolved 2% missing insurance_covered rates by dynamically computing percentage ratios based on individual bills.",
          "City-Wise Insurance Auditing: Replaced flat absolute out-of-pocket metrics with normalized relative insurance ratios across regional clinics, confirming perfect policy alignment and attributing cost variances purely to bill magnitudes.",
          "Multi-Condition Risk Grading: Built an advanced patient segmentation engine using np.select(), consolidating age ranges, readmission histories, and length of stays into clinical High/Medium/Low Risk bands.",
          "Satisfaction Driver Diagnostics: Designed a NumPy correlation matrix to mathematically track patient satisfaction influences, proving Length of Stay as the strongest negative correlation driver compared to age or billing parameters.",
          "Billing Outliers Validation: Executed localized Z-score filtering (|Z| > 3) to evaluate extreme pricing spikes, proving billing outliers account for only ~4% of total revenue, which validates the general billing systems' reliability."
        ],
        insights: [
          "Cardiology yields the highest average billings, while the General department handles the absolute highest patient volume.",
          "ICU patients exhibit roughly twice (2x) the readmission frequency compared to patients in the General Ward.",
          "Relative insurance coverage percentages remain stable across all cities; regional out-of-pocket variations are purely driven by raw bill sizes.",
          "Length of stay stands as the single largest negative driver of patient satisfaction (outranking billing totals or age).",
          "Statistical pricing outliers represent a marginal ~4% of total clinic revenue, proving billing relies on stable pricing standards rather than extreme cases."
        ],
        metrics: [
          { label: "Anomalous Logs dropped", value: "15 Rows" },
          { label: "Outliers Revenue impact", value: "~4%" },
          { label: "Patient Risk Bands", value: "High/Med/Low" }
        ]
      }
    },
    {
      id: "sales-performance",
      category: "Power BI Dashboard",
      label: "Power BI",
      title: "Sales Performance Dashboard",
      description: "Interactive Power BI executive dashboard consolidating raw transaction records, dynamic DAX measures, and cross-filtered sales trends.",
      tags: ["Power BI", "DAX", "Data Modeling", "Interactive Slicers", "Business Intelligence"],
      image: "",
      sourceUrl: "https://github.com/aryan-data-analytics/Power-BI.git",
      details: {
        challenge: "Extracting and visualizing core high-level KPIs, avoiding misleading flat averages, and smoothing noisy daily timelines on unstructured retail transactions without cluttering the canvas for end-users.",
        solution: "Designed a multi-layered Power BI dashboard utilizing custom DAX measures, native Date Hierarchies for trendlines, 100% stacked percentage distribution bars, and multi-field slicers to enable seamless dynamic exploration.",
        results: [
          "Raw Data KPI Extraction: Solved pre-aggregated metrics limits on raw transactions (where each row was a single order) by formulating 4 robust DAX KPIs (Total Revenue, Total Orders, Average Order Value, and Average Review Rating) that update dynamically under active filters.",
          "Average Order Value Safety: Prevented skewed row-level average calculations by using a DIVIDE(Total Revenue, Total Orders) model, ensuring divide-by-zero scenarios are safely handled if slicers narrow down to zero rows.",
          "Date Timeline Noise reduction: Eliminated chaotic daily spikes in the line chart caused by fine OrderDate granularity by embedding a clean Month-level Date Hierarchy to reveal smooth underlying revenue trend movements.",
          "Proportional Category Comparison: Solved category scale visualization limits by deploying a 100% Stacked Bar Chart for Category-wise Revenue, perfectly illustrating relative market share contributions at a single glance.",
          "Interactive Payment Distributions: Replaced scanning-unfriendly flat tables with a highly intuitive Donut Chart representing Orders by Payment Method, transforming dry statistics into visual proportions.",
          "Clutter-Free Regional Split: Prevented canvas overload when displaying both country and product lists by separating them into distinct clean visuals (Revenue by Country, Revenue by Product) for smooth reading.",
          "Seamless Explorer Slicers: Granted non-technical users robust exploration capabilities without writing SQL query structures, adding 3 responsive slicers (OrderDate, Product Category, OrderStatus) that dynamically cross-filter the entire page."
        ],
        insights: [
          "Identifies exactly which product category contributes the largest relative percentage of top-line revenue.",
          "Highlights the absolute most preferred payment methods across the volume of completed transactions.",
          "Tracks month-over-month sales trends to instantly expose cyclic seasonality and key holiday transaction spikes.",
          "Pinpoints top-tier revenue-driving countries and individual items in seconds via integrated tables."
        ],
        metrics: [
          { label: "Core DAX KPIs", value: "4 Measures" },
          { label: "Interactive Slicers", value: "3 Fields" },
          { label: "Data Engine", value: "Power BI" }
        ]
      }
    },
    {
      id: "dax-star-schema",
      category: "Power BI Dashboard",
      label: "Power BI",
      title: "DAX Measures & Star Schema Practice",
      description: "Hands-on data modeling and database relational exercise implementing star-schema architectures and specialized DAX measures in Power BI.",
      tags: ["Power BI", "DAX", "Data Modeling", "Star Schema", "Analytical Functions"],
      image: "",
      sourceUrl: "https://github.com/aryan-data-analytics/Power-BI.git",
      details: {
        challenge: "Establishing best-practice star schema relationships across disjointed sales logs and lookups, transitioning row-by-row context into filter contexts, handling division-by-zero crashes on ratios, and referencing dimension attributes dynamically.",
        solution: "Configured clean one-to-many dimensional relationships, deployed CALCULATE() and context transitions, configured nested SUMX() iterators, and implemented zero-safe DIVIDE() functions alongside RELATED() dimensions.",
        results: [
          "Fact & Dimension Table Relations: Solved table isolation issues where the Sales table stored Customer and Product IDs without names/categories by establishing robust one-to-many relationships (Customers → Sales, Products → Sales) to follow star schema best practices and automate filter propagation.",
          "Row Context vs Filter Context: Solved initial confusion regarding calculated columns versus measure logic by practicing context transitions, learning how CALCULATE() converts active row context into filter context for precise dynamic metrics.",
          "Correct Aggregations Selection (SUM vs Iterator Functions): Solved row-by-row math challenges (such as multiplying per-row quantity by unit price prior to total aggregation) by replacing flat SUM() measures with dynamic SUMX() iterators.",
          "Divide-by-Zero Handling: Handled potential division-by-zero crashes on ratio and percentage measures (like margin % or average price) when slicers are filtered to zero records by utilizing the robust DIVIDE() function with built-in fallback values.",
          "Dimension Attribute Propagation (RELATED Queries): Resolved the challenge of calling product categories or customer locations directly from the fact table by using the RELATED() function to fetch lookup attributes on the fly without duplicating database rows."
        ],
        metrics: [
          { label: "Data Architecture", value: "Star Schema" },
          { label: "Core DAX Functions", value: "CALCULATE, SUMX" },
          { label: "Relational Mapping", value: "One-to-Many" }
        ]
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 15,
      },
    },
  };

  const featured = projects[0];
  const secondaries = projects.slice(1);

  return (
    <section className="py-section-gap border-b border-white/5 bg-transparent transition-colors duration-300 relative" id="projects">
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
            <p className="font-mono text-label-caps text-indigo-400 uppercase mb-2">Projects</p>
            <h2 className="text-headline-md text-white uppercase tracking-tight">Portfolio &amp; Dashboards</h2>
          </div>
        </motion.div>

        {/* Featured Project */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="border border-white/5 rounded-[2.5rem] p-8 md:p-10 transition-all duration-300 bg-[#141417]/60 backdrop-blur-sm group hover:border-white/20 hover:bg-[#18181B]/80">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4 select-none">
                <span className="font-mono text-xs text-indigo-400 uppercase tracking-wider">{featured.category}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight text-white group-hover:text-indigo-400 transition-colors">
                {featured.title}
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed font-sans text-base">
                {featured.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8 select-none">
                {featured.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg font-mono text-[11px] text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedProject(featured)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 font-mono text-xs uppercase hover:gap-4 transition-all rounded-xl shadow-lg shadow-indigo-500/25 focus:outline-none cursor-pointer"
              >
                Source Code 
                <ArrowForward className="text-sm ml-1" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Secondary Projects Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {secondaries.map((project) => (
            <motion.div 
              key={project.id} 
              variants={cardVariants}
              className="border border-white/5 p-8 rounded-[2rem] flex flex-col transition-all duration-300 bg-[#141417]/60 backdrop-blur-sm group hover:border-white/20 hover:bg-[#18181B]/80 hover:-translate-y-1"
            >
              <div className="flex-grow">
                <p className="font-mono text-[10px] text-indigo-400 uppercase mb-3 tracking-wider select-none">
                  {project.category}
                </p>
                <h4 
                  className="text-lg font-bold mb-4 text-white cursor-pointer hover:text-indigo-400 transition-colors leading-snug"
                  onClick={() => setSelectedProject(project)}
                >
                  {project.title}
                </h4>
                <p className="text-sm text-gray-400 mb-6 font-sans leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6 select-none">
                {project.tags.slice(0, 3).map((tag, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded-md font-mono text-[9px] text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedProject(project)}
                className="font-mono text-xs uppercase text-white font-bold flex items-center gap-2 hover:text-indigo-400 hover:translate-x-1 transition-all self-start mt-auto focus:outline-none cursor-pointer"
              >
                Explore 
                <OpenInNew className="text-sm" />
              </button>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Project details modal */}
      <AnimatePresence>
        {selectedProject && (
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
              className="bg-[#141417] text-white w-full max-w-2xl border border-white/10 p-6 md:p-8 max-h-[90vh] overflow-y-auto relative rounded-[2.5rem] shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-1.5 text-gray-400 hover:text-white transition-colors focus:outline-none bg-white/5 rounded-lg border border-white/5 cursor-pointer"
              >
                <Close size={18} />
              </button>

              <div className="mb-8">
                <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-400 font-bold select-none">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1 pr-10 leading-tight">
                  {selectedProject.title}
                </h3>
              </div>

              {selectedProject.details && (
                <div className="space-y-6">
                  {/* High-impact Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4 border-y border-white/5 py-5 select-none">
                    {selectedProject.details.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center sm:text-left">
                        <p className="font-mono text-[10px] text-gray-500 uppercase tracking-tight">{metric.label}</p>
                        <p className="text-base md:text-lg font-extrabold text-indigo-400 mt-1 font-headline">{metric.value}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] uppercase text-indigo-400 font-bold tracking-widest mb-2 select-none">Challenge</h4>
                    <p className="text-sm leading-relaxed text-gray-300 font-sans">
                      {selectedProject.details.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] uppercase text-indigo-400 font-bold tracking-widest mb-2 select-none">Solution Architecture</h4>
                    <p className="text-sm leading-relaxed text-gray-300 font-sans">
                      {selectedProject.details.solution}
                    </p>
                  </div>

                   <div>
                    <h4 className="font-mono text-[10px] uppercase text-indigo-400 font-bold tracking-widest mb-2 select-none">
                      {["sql-store-performance", "excel-budget-automation", "tableau-sales-retention", "retail-sales-analysis", "healthcare-analysis", "sales-performance", "dax-star-schema"].includes(selectedProject.id) 
                        ? "Problems Faced & How I Solved Them" 
                        : "Key Outcomes & Results"}
                    </h4>
                    <ul className="space-y-3 mt-3">
                      {selectedProject.details.results.map((result, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-gray-300 font-sans">
                          <span className="text-green-400 font-bold">✓</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedProject.details.insights && (
                    <div className="border-t border-white/5 pt-5">
                      <h4 className="font-mono text-[10px] uppercase text-indigo-400 font-bold tracking-widest mb-2 select-none">📈 Key Insights</h4>
                      <ul className="space-y-3 mt-3">
                        {selectedProject.details.insights.map((insight, idx) => (
                          <li key={idx} className="flex gap-3 text-sm text-gray-300 font-sans">
                            <span className="text-indigo-400 font-bold">📈</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/5">
                    <a
                      href={selectedProject.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-mono text-xs uppercase hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-2 rounded-xl shadow-lg shadow-indigo-500/20 cursor-pointer"
                    >
                      Browse Source Code
                      <ArrowRight size={14} />
                    </a>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="px-6 py-3 border border-white/10 font-mono text-xs uppercase hover:bg-white/5 transition-colors text-center text-white rounded-xl cursor-pointer"
                    >
                      Close Overview
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
