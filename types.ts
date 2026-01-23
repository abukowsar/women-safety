
export interface NavItem {
  label: string;
  href: string;
}

export enum ReportType {
  Cyberbullying = "Cyberbullying",
  Deepfake = "Deepfake",
  ImageAbuse = "Image Abuse",
  Harassment = "Online Harassment",
  IdentityTheft = "Identity Theft"
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface Partner {
  name: string;
  logo: string;
}

export interface StatProps {
  number: string;
  label: string;
}

// Added codes for: Urdu (Pakistan), Nepali (Nepal), Sinhala (Sri Lanka), 
// Dhivehi (Maldives), Pashto (Afghanistan), Dzongkha (Bhutan)
export type Language = 'en' | 'bn' | 'hi' | 'ur' | 'ne' | 'si' | 'dv' | 'ps' | 'dz';

export type Page = 'home' | 'problems' | 'legal' | 'news' | 'report' | 'about' | 'privacy' | 'volunteer';

export interface Case {
  id: string;
  type: ReportType;
  description: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  date: string;
  isAnonymous: boolean;
  riskScore: number; // AI detected risk 0-100
  evidenceCount: number;
}
