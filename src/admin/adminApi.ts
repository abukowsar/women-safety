import api from "@/services/api";
import { User } from "@/context/AuthContext";

export type Role = User["role"];
export type Section = "overview" | "reports" | "callbacks" | "volunteers" | "content" | "staff" | "account";
/** Go to a section; `query` is an optional "?key=value" filter string. */
export type AdminNavigate = (section: Section, query?: string) => void;

/** Props every management section receives from the shell. */
export interface SectionProps {
  role: Role;
  user: User;
  onNavigate: AdminNavigate;
  /** Call after a change so sidebar counts refresh. */
  onChange: () => void;
}
export type ReportStatus = "pending" | "investigating" | "resolved" | "dismissed";
export type CallbackStatus = "new" | "contacted" | "closed";
export type VolunteerStatus = "new" | "approved" | "declined";
export type ContentKind = "legal" | "awareness" | "help" | "news" | "gallery" | "campaigns";

export interface Report {
  _id: string;
  trackingId: string;
  type: string;
  description: string;
  incidentDate?: string;
  incidentLocation?: string;
  district?: string;
  isAnonymous: boolean;
  victimName?: string;
  victimPhone?: string;
  canContact: boolean;
  safeTime?: string;
  inDanger: boolean;
  evidence: string[];
  evidenceMeta: { name: string; type: string; size: number }[];
  status: ReportStatus;
  statusHistory: { status: string; at: string; by?: string }[];
  assignedTo: string | null;
  notes: { _id: string; text: string; byName: string; at: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface Callback {
  _id: string;
  alias?: string;
  phone: string;
  topic: string;
  safeTime: string;
  language: string;
  voicemailOk: boolean;
  message?: string;
  status: CallbackStatus;
  createdAt: string;
}

export interface Volunteer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  district?: string;
  skills: string[];
  languages: string[];
  availability: string;
  motivation?: string;
  status: VolunteerStatus;
  createdAt: string;
}

export interface ContentItem {
  _id: string;
  kind: ContentKind;
  title: string;
  content?: string;
  category?: string;
  lang: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

type Daily = { date: string; count: number }[];
type Ranked = { label: string; count: number }[];

export interface Stats {
  days: number;
  reports: { daily: Daily; prevDaily: Daily; total: number; prevTotal: number };
  callbacks: { daily: Daily; total: number; prevTotal: number };
  volunteers: { daily: Daily; total: number; prevTotal: number };
  byStatus: Partial<Record<ReportStatus, number>>;
  byType: Ranked;
  byDistrict: Ranked;
  heatmap: { day: number; hour: number; count: number }[];
  workload: { label: string; count: number; urgent: number; unassigned: boolean }[];
  callbacksByTopic: Ranked;
  volunteersBySkill: Ranked;
  response: { medianHours: number | null; measured: number; resolved: number; inRange: number };
  urgentOpen: number;
  unassignedOpen: number;
  callbacksNew: number;
  volunteersNew: number;
  recent: { kind: "report" | "callback" | "volunteer"; at: string; title: string; detail: string; urgent?: boolean; status: string }[];
}

const data = <T>(p: Promise<{ data: { data: T } }>) => p.then((r) => r.data.data);
const contentBase = (kind: ContentKind) => (["news", "gallery", "campaigns"].includes(kind) ? `/media/${kind}` : `/content/${kind}`);

export const adminApi = {
  stats: (days = 30) => data<Stats>(api.get("/stats", { params: { days } })),

  reports: () => data<Report[]>(api.get("/complaints")),
  setReportStatus: (id: string, status: ReportStatus) => data<Report>(api.put(`/complaints/${id}/status`, { status })),
  assignReport: (id: string, userId: string) => data<Report>(api.put(`/complaints/${id}/assign`, { userId })),
  addNote: (id: string, text: string) => data<Report>(api.post(`/complaints/${id}/notes`, { text })),
  deleteReport: (id: string) => api.delete(`/complaints/${id}`),
  evidenceUrl: async (path: string) => URL.createObjectURL((await api.get(path, { responseType: "blob" })).data),

  callbacks: () => data<Callback[]>(api.get("/callbacks")),
  setCallbackStatus: (id: string, status: CallbackStatus) => data<Callback>(api.put(`/callbacks/${id}/status`, { status })),
  deleteCallback: (id: string) => api.delete(`/callbacks/${id}`),

  volunteers: () => data<Volunteer[]>(api.get("/volunteers")),
  setVolunteerStatus: (id: string, status: VolunteerStatus) => data<Volunteer>(api.put(`/volunteers/${id}/status`, { status })),
  deleteVolunteer: (id: string) => api.delete(`/volunteers/${id}`),

  content: (kind: ContentKind) => data<ContentItem[]>(api.get(contentBase(kind))),
  saveContent: (kind: ContentKind, form: FormData, id?: string) =>
    data<ContentItem>(
      id
        ? api.put(`${contentBase(kind)}/${id}`, form, { headers: { "Content-Type": "multipart/form-data" } })
        : api.post(contentBase(kind), form, { headers: { "Content-Type": "multipart/form-data" } }),
    ),
  deleteContent: (kind: ContentKind, id: string) => api.delete(`${contentBase(kind)}/${id}`),

  staffPicker: () => data<Pick<User, "_id" | "name" | "role">[]>(api.get("/users/staff")),
  users: () => data<User[]>(api.get("/users")),
  createUser: (body: { name: string; email: string; role: Role }) =>
    api.post("/users", body).then((r) => ({ user: r.data.data as User, tempPassword: r.data.tempPassword as string })),
  updateUser: (id: string, body: Partial<{ name: string; role: Role; active: boolean }>) => data<User>(api.put(`/users/${id}`, body)),
  resetPassword: (id: string) => api.post(`/users/${id}/reset-password`).then((r) => r.data.tempPassword as string),

  changePassword: (currentPassword: string, newPassword: string) => api.put("/auth/password", { currentPassword, newPassword }),
};

export const errorMessage = (err: any, fallback = "Something went wrong") =>
  err?.response?.data?.error || (err?.request && !err?.response ? "Cannot reach the server" : fallback);

export const can = {
  manageStaff: (role?: Role) => role === "admin",
  delete: (role?: Role) => role === "admin",
  editContent: (role?: Role) => role === "admin" || role === "ngo_support",
  handleRequests: (role?: Role) => role === "admin" || role === "ngo_support",
  assign: (role?: Role) => role === "admin" || role === "ngo_support",
};

export const roleLabel: Record<Role, string> = {
  admin: "Administrator",
  ngo_support: "Support worker",
  law_enforcement: "Law enforcement",
};
