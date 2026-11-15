import mongoose from 'mongoose';
import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';

config({ path: fileURLToPath(new URL('.env', import.meta.url)), quiet: true });
const { Schema } = mongoose;
export const locales = ['vi', 'en', 'ja', 'ko'];
export const sections = { pages: '', services: '/dich-vu', products: '/san-pham', projects: '/du-an', faqs: '/hoi-dap' };
const contentSchema = new Schema({
  title: { type: String, required: true }, slug: { type: String, required: true },
  locale: { type: String, enum: locales, default: 'vi' },
  summary: { type: String, default: '' }, body: { type: String, default: '' },
  source: { type: String, default: '' },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  order: { type: Number, default: 0 },
}, { timestamps: true });
contentSchema.index({ locale: 1, slug: 1 }, { unique: true });
contentSchema.index({ locale: 1, status: 1, order: 1 });
export const content = Object.fromEntries(Object.keys(sections).map(key =>
  [key, mongoose.model(key, contentSchema.clone(), key)]));
export const Contact = mongoose.model('Contact', new Schema({
  name: String, email: String, company: String, phone: String, message: String,
  status: { type: String, enum: ['new', 'reviewing', 'closed'], default: 'new' },
}, { timestamps: true }), 'contactRequests');
export const Admin = mongoose.model('Admin', new Schema({
  email: { type: String, unique: true, required: true }, passwordHash: { type: String, required: true },
}), 'adminUsers');
export const Session = mongoose.model('Session', new Schema({
  tokenHash: { type: String, unique: true }, admin: Schema.Types.ObjectId,
  expiresAt: { type: Date, index: { expires: 0 } },
}), 'adminSessions');

export async function connect() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/platinum', { serverSelectionTimeoutMS: 5000 });
  try {
    await Promise.all([...Object.values(content), Admin, Session].map(model => model.init()));
  } catch (error) {
    await mongoose.disconnect();
    throw error;
  }
}
export const publicFields = 'title slug locale summary body updatedAt order';
export function contentUrl(group, slug) {
  if (group === 'pages') return slug === 'trang-chu' ? '/' : '/' + slug;
  if (group === 'faqs') return '/hoi-dap#' + slug;
  return sections[group] + '/' + slug;
}
