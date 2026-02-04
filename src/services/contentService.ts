import api from "./api";

export const contentService = {
  getLegal: async () => {
    const res = await api.get("/content/legal");
    return res.data;
  },
  getAwareness: async () => {
    const res = await api.get("/content/awareness");
    return res.data;
  },
  getHelp: async () => {
    const res = await api.get("/content/help");
    return res.data;
  },
  createLegal: async (data: any) => {
    const res = await api.post("/content/legal", data);
    return res.data;
  },
  createAwareness: async (data: any) => {
    const res = await api.post("/content/awareness", data);
    return res.data;
  },
  createHelp: async (data: any) => {
    const res = await api.post("/content/help", data);
    return res.data;
  },
};
