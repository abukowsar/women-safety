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
  assign: async (id: string, userId: string) => {
    const res = await api.put(`/complaints/${id}/assign`, { userId });
    return res.data;
  },
};
