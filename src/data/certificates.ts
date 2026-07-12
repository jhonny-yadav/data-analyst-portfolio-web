import { Certificate } from "../types";

export const certificates: Certificate[] = [
  {
    id: "british-airways",
    company: "British Airways",
    title: "Data Science Job Simulation",
    category: "",
    description: "",
    skills: ["Python", "Data Analysis", "Predictive Modelling", "Customer Insights", "Machine Learning"],
    pdfName: "British Airways Certificate.pdf",
    verificationId: "FORAGE-BA-DS-2026",
    issueDate: "April 27th, 2026",
    tasks: [
      "Modeling lounge eligibility at Heathrow Terminal 3",
      "Predicting customer buying behaviour"
    ],
    signatoryName: "Tom Brunskill",
    signatoryTitle: "Co-Founder of Forage"
  },
  {
    id: "tata",
    company: "TATA",
    title: "Data Visualisation: Empowering Business with Effective Insights",
    category: "",
    description: "",
    skills: ["Power BI", "Dashboard Design", "Data Visualization", "Storytelling", "Business Analysis"],
    pdfName: "TATA Forage Certificate.pdf",
    verificationId: "FORAGE-TATA-DV-2026",
    issueDate: "April 23rd, 2026",
    tasks: [
      "Framing the Business Scenario",
      "Choosing the Right Visuals",
      "Creating Effective Visuals",
      "Communicating Insights and Analysis"
    ],
    signatoryName: "Tom Brunskill",
    signatoryTitle: "Co-Founder of Forage"
  },
  {
    id: "deloitte",
    company: "Deloitte",
    title: "Data Analytics Job Simulation",
    category: "",
    description: "",
    skills: ["Excel", "Power BI", "Data Cleaning", "Data Analysis", "Forensic Technology"],
    pdfName: "Deloitte certificate.pdf",
    verificationId: "FORAGE-DEL-DA-2026",
    issueDate: "April 23rd, 2026",
    tasks: [
      "Data analysis",
      "Forensic technology"
    ],
    signatoryName: "Tina McCreery",
    signatoryTitle: "Chief Human Resources Officer, Deloitte"
  }
];
