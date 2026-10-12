import { Router } from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import Content from '../models/Content.js';
import { protect, requireRole } from '../middleware/auth.js';
import { imageUpload } from '../middleware/upload.js';
import { str, oneOf, firstError } from '../utils/validate.js';

export const MEDIA_DIR = path.resolve('uploads', 'media');
const EXT = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };

const list = (kind) => async (req, res) => {
  const items = await Content.find({ kind }).sort({ createdAt: -1 }).limit(100);
  res.json({ success: true, data: items });
};

const validate = (b, { creating }) =>
  firstError({
    title: str(b.title, { required: creating, max: 200 }),
    content: str(b.content, { max: 10000 }),
    category: str(b.category, { max: 60 }),
    lang: oneOf(b.lang, ['bn', 'en']),
  });

const saveImage = async (file) => {
  if (!file) return undefined;
  await fs.mkdir(MEDIA_DIR, { recursive: true });
  const name = `${crypto.randomUUID()}${EXT[file.mimetype]}`;
  await fs.writeFile(path.join(MEDIA_DIR, name), file.buffer);
  return `/uploads/media/${name}`;
};

const removeImage = (image) =>
  image ? fs.rm(path.join(MEDIA_DIR, path.basename(image)), { force: true }) : Promise.resolve();

const create = (kind) => async (req, res) => {
  const b = req.body || {};
  const error = validate(b, { creating: true });
  if (error) return res.status(400).json({ success: false, error });

  const item = await Content.create({
    kind,
    title: b.title.trim(),
    content: b.content,
    category: b.category,
    lang: b.lang || 'bn',
    image: await saveImage(req.file),
  });
  res.status(201).json({ success: true, data: item });
};

const update = (kind) => async (req, res) => {
  const b = req.body || {};
  const error = validate(b, { creating: false });
  if (error) return res.status(400).json({ success: false, error });

  const item = await Content.findOne({ _id: req.params.id, kind }).catch(() => null);
  if (!item) return res.status(404).json({ success: false, error: 'Item not found' });

  for (const key of ['title', 'content', 'category', 'lang']) if (b[key] !== undefined) item[key] = b[key];
  if (req.file || b.removeImage === 'true') {
    await removeImage(item.image);
    item.image = await saveImage(req.file);
  }
  await item.save();
  res.json({ success: true, data: item });
};

const remove = (kind) => async (req, res) => {
  const item = await Content.findOneAndDelete({ _id: req.params.id, kind }).catch(() => null);
  if (!item) return res.status(404).json({ success: false, error: 'Item not found' });
  await removeImage(item.image);
  res.json({ success: true });
};

const editors = [protect, requireRole('admin', 'ngo_support')];

const mount = (router, kinds) => {
  for (const kind of kinds) {
    router.get(`/${kind}`, list(kind));
    router.post(`/${kind}`, ...editors, imageUpload, create(kind));
    router.put(`/${kind}/:id`, ...editors, imageUpload, update(kind));
    router.delete(`/${kind}/:id`, ...editors, remove(kind));
  }
};

// /content/legal, /content/awareness, /content/help
export const contentRouter = Router();
mount(contentRouter, ['legal', 'awareness', 'help']);

// /media/news, /media/gallery, /media/campaigns (public images)
export const mediaRouter = Router();
mount(mediaRouter, ['news', 'gallery', 'campaigns']);
