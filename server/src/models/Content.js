import mongoose from 'mongoose';

/** Editable site content: legal info, awareness topics, help resources, news and gallery items. */
const contentSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ['legal', 'awareness', 'help', 'news', 'gallery', 'campaigns'], required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    content: { type: String, maxlength: 10000 },
    category: { type: String, trim: true, maxlength: 60 },
    lang: { type: String, default: 'bn' },
    image: String, // public path, e.g. /uploads/media/abc.jpg
  },
  { timestamps: true },
);

export default mongoose.model('Content', contentSchema);
