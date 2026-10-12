import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import multer from 'multer';
import { config } from './config.js';
import authRoutes from './routes/auth.js';
import complaintRoutes from './routes/complaints.js';
import callbackRoutes from './routes/callbacks.js';
import volunteerRoutes from './routes/volunteers.js';
import { contentRouter, mediaRouter, MEDIA_DIR } from './routes/content.js';
import userRoutes from './routes/users.js';
import statsRoutes from './routes/stats.js';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: config.clientOrigins }));
app.use(express.json({ limit: '100kb' }));

// Only public media is served statically. Evidence lives in uploads/evidence, encrypted, behind auth.
app.use('/uploads/media', express.static(MEDIA_DIR, { fallthrough: false }));

const api = express.Router();
api.get('/health', (req, res) =>
  res.json({ success: true, db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }),
);
api.use('/auth', authRoutes);
api.use('/complaints', complaintRoutes);
api.use('/callbacks', callbackRoutes);
api.use('/volunteers', volunteerRoutes);
api.use('/content', contentRouter);
api.use('/media', mediaRouter);
api.use('/users', userRoutes);
api.use('/stats', statsRoutes);
app.use('/api/v1', api);

app.use((req, res) => res.status(404).json({ success: false, error: 'Not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const message = err.code === 'LIMIT_FILE_SIZE' ? 'A file is too large' : err.code === 'LIMIT_FILE_COUNT' ? 'Too many files (max 5)' : err.message;
    return res.status(400).json({ success: false, error: message });
  }
  if (err.status && err.status < 500) return res.status(err.status).json({ success: false, error: err.message });
  console.error(err);
  res.status(500).json({ success: false, error: 'Something went wrong. Please try again.' });
});

console.log('Connecting to MongoDB...');
mongoose
  .connect(config.mongoUri, { dbName: config.mongoDb, serverSelectionTimeoutMS: 15000 })
  .then(() => {
    console.log(`MongoDB connected (database: ${config.mongoDb})`);
    app.listen(config.port, () => console.log(`API listening on http://localhost:${config.port}/api/v1`));
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err.message);
    process.exit(1);
  });
