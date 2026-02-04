import api from "./api";

export const mediaService = {
  getNews: async () => {
    const res = await api.get("/media/news");
    return res.data;
  },
  getGallery: async () => {
    const res = await api.get("/media/gallery");
    return res.data;
  },
  getCampaigns: async () => {
    const res = await api.get("/media/campaigns");
    return res.data;
  },
  createNews: async (formData: FormData) => {
    const res = await api.post("/media/news", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  uploadMedia: async (formData: FormData) => {
    const res = await api.post("/media/gallery", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
};
