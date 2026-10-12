import api from "./api";

export const complaintService = {
  submit: async (formData: FormData) => {
    const res = await api.post("/complaints", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
  track: async (trackingId: string) => {
    const res = await api.get(`/complaints/track/${trackingId}`);
    return res.data;
  },
  getAll: async () => {
    const res = await api.get("/complaints");
    return res.data;
  },
  updateStatus: async (id: string, status: string) => {
    const res = await api.put(`/complaints/${id}/status`, { status });
    return res.data;
  },
  /** Evidence is served only to staff, so it is fetched with the auth header and shown as a blob URL. */
  getEvidence: async (path: string) => {
    const res = await api.get(path, { responseType: "blob" });
    return URL.createObjectURL(res.data);
  },
  assign: async (id: string, userId: string) => {
    const res = await api.put(`/complaints/${id}/assign`, { userId });
    return res.data;
  },
};
