import { jsPDF } from "jspdf";

export function downloadCV(): void {
  // Create jsPDF instance with A4 format (210mm x 297mm)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const marginX = 15;
  let y = 18;

  // 1. HEADER section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(26, 82, 118); // Elegant dark blue/indigo
  doc.text("ARYAN YADAV", marginX, y);
  y += 7;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(80, 80, 80);
  doc.text("Data Analyst", marginX, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(100, 100, 100);
  doc.text("Delhi, India  |  +91 93151 53687  |  aryan.yadav.working2007@gmail.com", marginX, y);
  y += 4;

  // Divider line
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.4);
  doc.line(marginX, y, 195, y);
  y += 8;

  // Helper for section headers
  const drawSectionHeader = (title: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(26, 82, 118);
    doc.text(title, marginX, y);
    y += 2.5;
    doc.setDrawColor(26, 82, 118);
    doc.setLineWidth(0.3);
    doc.line(marginX, y, 195, y);
    y += 5.5;
  };

  // 2. PROFILE SUMMARY
  drawSectionHeader("PROFILE SUMMARY");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  
  const summaryText = 
    "Detail-oriented Data Analyst with hands-on experience in Excel, SQL, Power BI, Python, " +
    "statistics and dashboarding, complemented by a strong background in web development and " +
    "digital client acquisition. Skilled at using AI tools and data-driven insights to support " +
    "social media strategy, audience analysis and content performance tracking. Proven track record " +
    "of independently closing and managing high-value clients through Instagram, Upwork and LinkedIn. " +
    "Comfortable working in Linux-based environments, with a curious, growth-oriented mindset and a " +
    "genuine drive to go the extra mile and contribute to a company's growth.";

  const summaryLines = doc.splitTextToSize(summaryText, 180);
  doc.text(summaryLines, marginX, y, { lineHeightFactor: 1.35 });
  y += (summaryLines.length * 4.5) + 4;

  // 3. CORE SKILLS
  drawSectionHeader("CORE SKILLS");
  doc.setFontSize(9);

  const skills = [
    { label: "Data Analysis & Visualization", val: "Excel (Advanced), SQL, Power BI, Dashboard Design" },
    { label: "Programming & Analytics", val: "Python, Statistics, Machine Learning, AI Tools" },
    { label: "Platforms", val: "Linux-based Project Work, Web Development" },
    { label: "Digital & Social Media", val: "Client Acquisition & Management (Instagram, Upwork, LinkedIn), Content & Audience Insights" },
    { label: "Soft Skills", val: "Client Communication, Self-Management, Fast Learner, Problem Solving" }
  ];

  skills.forEach(skill => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text(`•  ${skill.label}: `, marginX, y);
    const labelWidth = doc.getTextWidth(`•  ${skill.label}: `);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);

    const valLines = doc.splitTextToSize(skill.val, 180 - labelWidth);
    doc.text(valLines, marginX + labelWidth, y, { lineHeightFactor: 1.25 });
    y += (valLines.length * 4) + 1.5;
  });
  y += 4;

  // 4. EXPERIENCE
  drawSectionHeader("EXPERIENCE");

  // Experience 1
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(30, 30, 30);
  doc.text("Data Analyst Intern", marginX, y);
  
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  const period1 = "6 Months";
  const period1Width = doc.getTextWidth(period1);
  doc.text(period1, 195 - period1Width, y);
  y += 5;

  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  const exp1Bullets = [
    "Analyzed datasets using Excel, SQL and Power BI to generate actionable business insights.",
    "Built interactive dashboards to visualize key metrics and support data-driven decision-making.",
    "Applied Python and statistical methods for data cleaning, analysis and basic predictive modelling.",
    "Collaborated on real-world data problems, translating raw data into clear, presentable reports."
  ];
  exp1Bullets.forEach(b => {
    doc.setFont("helvetica", "bold");
    doc.text("•", marginX + 3, y);
    doc.setFont("helvetica", "normal");
    const bLines = doc.splitTextToSize(b, 172);
    doc.text(bLines, marginX + 7, y, { lineHeightFactor: 1.25 });
    y += (bLines.length * 4) + 1.2;
  });
  y += 3;

  // Experience 2
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(30, 30, 30);
  doc.text("Freelance Web Developer & Digital Consultant", marginX, y);
  
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  const period2 = "Self-Employed";
  const period2Width = doc.getTextWidth(period2);
  doc.text(period2, 195 - period2Width, y);
  y += 5;

  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  const exp2Bullets = [
    "Independently sourced and closed multiple client projects via Instagram, Upwork and LinkedIn.",
    "Delivered end-to-end web development solutions, managing client communication, scope and delivery.",
    "Built strong client relationships resulting in repeat business and referrals."
  ];
  exp2Bullets.forEach(b => {
    doc.setFont("helvetica", "bold");
    doc.text("•", marginX + 3, y);
    doc.setFont("helvetica", "normal");
    const bLines = doc.splitTextToSize(b, 172);
    doc.text(bLines, marginX + 7, y, { lineHeightFactor: 1.25 });
    y += (bLines.length * 4) + 1.2;
  });
  y += 4;

  // 5. EDUCATION
  drawSectionHeader("EDUCATION");

  // Ed 1
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(30, 30, 30);
  doc.text("Bachelor of Arts (BA) — Computer Application & Mathematics", marginX, y);
  y += 4.5;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text("School of Open Learning (SOL), University of Delhi", marginX, y);
  const statusEd1 = "Currently Pursuing — 3rd Semester";
  const statusEd1Width = doc.getTextWidth(statusEd1);
  doc.text(statusEd1, 195 - statusEd1Width, y);
  y += 6;

  // Ed 2
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(30, 30, 30);
  doc.text("Senior Secondary (12th), CBSE Board", marginX, y);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  const streamEd2 = "Commerce with Mathematics";
  const streamEd2Width = doc.getTextWidth(streamEd2);
  doc.text(streamEd2, 195 - streamEd2Width, y);
  y += 6;

  // Ed 3
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(30, 30, 30);
  doc.text("Secondary (10th), CBSE Board", marginX, y);
  y += 8;

  // 6. HOBBIES & INTERESTS
  drawSectionHeader("HOBBIES & INTERESTS");
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);

  const hobbies = [
    "Exploring new AI tools and emerging technologies",
    "Security & penetration testing",
    "Enjoy tackling hard, challenging tasks — the tougher it gets, the more engaging and fun it becomes",
    "Curious, exploring mindset — always eager to learn and go the extra mile to help a company grow"
  ];
  hobbies.forEach(h => {
    doc.setFont("helvetica", "bold");
    doc.text("•", marginX + 3, y);
    doc.setFont("helvetica", "normal");
    const hLines = doc.splitTextToSize(h, 172);
    doc.text(hLines, marginX + 7, y, { lineHeightFactor: 1.25 });
    y += (hLines.length * 4) + 1.2;
  });

  // Save the generated PDF
  doc.save("Aryan_Yadav_Data_Analyst_Resume.pdf");
}
