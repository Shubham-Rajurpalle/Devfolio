export type DemoType = "appetize" | "snack" | "youtube" | "none";

export interface Demo {
  type: DemoType;
  url?: string;
}

export interface Project {
  _id?: string;
  title: string;
  slug: string;
  role?: string;
  short: string;
  description?: string;
  tech: string[];
  highlights?: string[];
  cover: string;
  demo: Demo;
  repo?: string;
  liveUrl?: string;
  featured?: boolean;
  duration?: string;
  createdAt?: Date;
}

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
  phone: string;
}

export interface Resume {
  url: string;
  filename: string;
  uploadedAt: Date;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  cgpa: string;
  year: string;
}

export interface Stats {
  gfgProblems: string;
  maxRating: string;
  rank: string;
  youtubeSubscribers: string;
}

export interface Profile {
  _id?: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  contact: Contact;
  resume: Resume;
  skills: string[];
  experience: Experience[];
  education: Education[];
  achievements: string[];
  stats: Stats;
  updatedAt?: Date;
}

export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
