export interface NavItem {
  label: string;
  href: string;
}

// Keep in sync with COMPLAINT_TYPES in server/src/constants.js.
export enum ReportType {
  SexualViolence = "Sexual Violence",
  DomesticViolence = "Domestic Violence",
  DowryAbuse = "Dowry Abuse",
  ChildMarriage = "Child Marriage",
  SexualHarassment = "Sexual Harassment",
  Cyberstalking = "Cyberstalking",
  Deepfake = "Deepfake",
  ImageAbuse = "Image-Based Abuse",
  Harassment = "Online Harassment",
  IdentityTheft = "Identity Theft",
  OnlineThreats = "Online Threats",
  Other = "Other",
}

export interface ChatMessage {
  role: "user" | "model";
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
export type Language =
  | "en"
  | "bn"
  | "hi"
  | "ur"
  | "ne"
  | "si"
  | "dv"
  | "ps"
  | "dz";

export type Page =
  | "home"
  | "problems"
  | "legal"
  | "news"
  | "report"
  | "about"
  | "privacy"
  | "volunteer"
  | "help"
  | "topic"
  | "tools"
  | "helplines"
  | "track"
  | "callback";

/** Navigate to a page; `topic` selects the guide shown on the "topic" page. */
export type Navigate = (page: Page, topic?: import("@/data/topics").TopicId) => void;

export interface Case {
  id: string;
  type: ReportType;
  description: string;
  status: "pending" | "investigating" | "resolved" | "dismissed";
  date: string;
  isAnonymous: boolean;
  victimName?: string;
  victimPhone?: string;
  evidence?: string[];
  riskScore: number; // AI detected risk 0-100
  evidenceCount: number;
}
