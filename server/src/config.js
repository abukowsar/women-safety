import 'dotenv/config';

const required = ['MONGODB_URI', 'JWT_SECRET', 'ENCRYPTION_KEY'];
for (const name of required) {
  if (!process.env[name]) {
    console.error(`Missing ${name} in server/.env (see .env.example)`);
    process.exit(1);
  }
}

const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');
if (encryptionKey.length !== 32) {
  console.error('ENCRYPTION_KEY must be 32 bytes, base64-encoded');
  process.exit(1);
}

export const config = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI,
  mongoDb: process.env.MONGODB_DB || 'nirapad',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: '8h',
  encryptionKey,
  clientOrigins: (process.env.CLIENT_ORIGIN || 'http://localhost:3000').split(',').map((s) => s.trim()),
};
