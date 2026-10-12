// Creates a staff account. Usage:
//   npm run create-admin -- --email you@org.bd --name "Your Name" [--role admin|ngo_support|law_enforcement]
// A strong random password is generated and printed once; change it after first login.
import crypto from 'node:crypto';
import mongoose from 'mongoose';
import { config } from '../config.js';
import User from '../models/User.js';
import { ROLES } from '../constants.js';

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
};

const email = arg('email');
const name = arg('name') || 'Administrator';
const role = arg('role') || 'admin';

if (!email || !ROLES.includes(role)) {
  console.error('Usage: npm run create-admin -- --email you@org.bd --name "Your Name" [--role admin|ngo_support|law_enforcement]');
  process.exit(1);
}

await mongoose.connect(config.mongoUri, { dbName: config.mongoDb, serverSelectionTimeoutMS: 15000 });

if (await User.exists({ email: email.toLowerCase() })) {
  console.error(`A user with email ${email} already exists.`);
  await mongoose.disconnect();
  process.exit(1);
}

const password = crypto.randomBytes(12).toString('base64url');
await User.create({ name, email, password, role });
console.log(`Created ${role} account\n  email:    ${email}\n  password: ${password}\nChange this password after first login.`);
await mongoose.disconnect();
