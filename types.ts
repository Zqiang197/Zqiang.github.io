export type Language = 'zh' | 'en';

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface ResumeData {
  name: string;
  age: number;
  role: string;
  contact: {
    phone: string;
    email: string;
    wechat: string;
  };
  summary: string[];
  experience: Experience[];
  skills: SkillCategory[];
  portfolioLink: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface UIContent {
  navPortfolio: string;
  available: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroDesc: string;
  viewPortfolio: string;
  downloadResume: string;
  experience: string;
  skills: string;
  contactTitle: string;
  contactDesc: string;
  chatWelcome: string;
  chatInput: string;
  builtWith: string;
  rights: string;
}