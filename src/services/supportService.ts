import api from "./api";

export interface CallbackPayload {
  alias?: string;
  phone: string;
  topic: string;
  safeTime: string;
  language: string;
  voicemailOk: boolean;
  message?: string;
}

export interface VolunteerPayload {
  name: string;
  email: string;
  phone?: string;
  district?: string;
  skills: string[];
  languages: string[];
  availability: string;
  motivation?: string;
  consent: boolean;
}

export const callbackService = {
  request: async (data: CallbackPayload) => (await api.post("/callbacks", data)).data,
  getAll: async () => (await api.get("/callbacks")).data,
  updateStatus: async (id: string, status: string) => (await api.put(`/callbacks/${id}/status`, { status })).data,
};

export const volunteerService = {
  apply: async (data: VolunteerPayload) => (await api.post("/volunteers", data)).data,
  getAll: async () => (await api.get("/volunteers")).data,
  updateStatus: async (id: string, status: string) => (await api.put(`/volunteers/${id}/status`, { status })).data,
};

/** Pulls the readable error message out of an API failure. */
export const apiError = (err: any, fallback: string): string =>
  err?.response?.status === 429
    ? "Too many submissions. Please wait a little and try again."
    : err?.response?.data?.error || (err?.request && !err?.response ? "Cannot reach the server. Please check your connection." : fallback);
