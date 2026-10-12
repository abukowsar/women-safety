import multer from 'multer';

const EVIDENCE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'video/mp4', 'audio/mpeg', 'audio/mp4'];
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const fileFilter = (allowed) => (req, file, cb) =>
  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(Object.assign(new Error('This file type is not allowed'), { status: 400 }));

// Kept in memory so evidence can be encrypted before it touches the disk.
export const evidenceUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024, files: 5 },
  fileFilter: fileFilter(EVIDENCE_TYPES),
}).array('evidence', 5);

export const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: fileFilter(IMAGE_TYPES),
}).single('image');
