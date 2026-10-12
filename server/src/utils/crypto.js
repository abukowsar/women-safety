import crypto from 'node:crypto';
import { config } from '../config.js';

// AES-256-GCM for survivor data at rest. Format: v1:<iv>:<tag>:<ciphertext> (base64).
const ALGO = 'aes-256-gcm';

export const encrypt = (plain) => {
  if (plain === undefined || plain === null || plain === '') return plain;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, config.encryptionKey, iv);
  const data = Buffer.concat([cipher.update(String(plain), 'utf8'), cipher.final()]);
  return ['v1', iv.toString('base64'), cipher.getAuthTag().toString('base64'), data.toString('base64')].join(':');
};

export const decrypt = (value) => {
  if (typeof value !== 'string' || !value.startsWith('v1:')) return value;
  const [, iv, tag, data] = value.split(':');
  const decipher = crypto.createDecipheriv(ALGO, config.encryptionKey, Buffer.from(iv, 'base64'));
  decipher.setAuthTag(Buffer.from(tag, 'base64'));
  return Buffer.concat([decipher.update(Buffer.from(data, 'base64')), decipher.final()]).toString('utf8');
};

// Files: <iv 12 bytes><tag 16 bytes><ciphertext>
export const encryptBuffer = (buffer) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, config.encryptionKey, iv);
  const data = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), data]);
};

export const decryptBuffer = (buffer) => {
  const decipher = crypto.createDecipheriv(ALGO, config.encryptionKey, buffer.subarray(0, 12));
  decipher.setAuthTag(buffer.subarray(12, 28));
  return Buffer.concat([decipher.update(buffer.subarray(28)), decipher.final()]);
};

/** Unguessable, easy to read aloud: NP-7KQ4-M2XD (no 0/O/1/I). */
export const trackingId = () => {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.randomBytes(8);
  const chars = [...bytes].map((b) => alphabet[b % alphabet.length]).join('');
  return `NP-${chars.slice(0, 4)}-${chars.slice(4)}`;
};
