export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  label: string;
  tags: string[];
  image: string;
  sourceUrl?: string;
  demoUrl?: string;
  details?: {
    challenge: string;
    solution: string;
    results: string[];
    metrics: { label: string; value: string }[];
    insights?: string[];
  };
}

export interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  description: string[];
}

export interface SkillCategory {
  number: string;
  title: string;
  skills: string[];
}

export interface Certificate {
  id: string;
  company: string;
  title: string;
  category: string;
  description: string;
  skills: string[];
  pdfName: string;
  verificationId: string;
  issueDate: string;
  tasks?: string[];
  signatoryName?: string;
  signatoryTitle?: string;
}

