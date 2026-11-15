import express from 'express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { connect, content, locales, Contact, publicFields } from './data.js';
import { authorize, login, logout } from './auth.js';
import { chat } from './chat.js';

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(express.json({ limit: '24kb' }));
app.use('/api', (_, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
const limit = (count, windowMs) => rateLimit({
  limit: count, windowMs, standardHeaders: 'draft-8', legacyHeaders: false,
  message: { error: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.' },
});
const bad = (res, error = 'Dữ liệu không hợp lệ.') => res.status(400).json({ error });
const missing = res => res.status(404).json({ error: 'Không tìm thấy nội dung.' });
const pickGroup = name => Object.hasOwn(content, name) ? content[name] : null;
const slugValid = slug => typeof slug === 'string' && slug.length <= 100 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
const idValid = id => /^[a-f0-9]{24}$/i.test(id);
const emailValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const cleanFields = (input, lengths) => {
  const result = {};
  for (const [key, length] of Object.entries(lengths)) {
    const value = input?.[key] ?? '';
    if (typeof value !== 'string' || value.length > length) return null;
    result[key] = value.trim();
  }
  return result;
};
const safeWrite = (req, res, next) => {
  if (!['GET', 'HEAD'].includes(req.method) &&
    (!req.is('application/json') || req.get('sec-fetch-site') === 'cross-site'))
    return res.status(403).json({ error: 'Yêu cầu không hợp lệ.' });
  next();
};

app.get('/api/health', (_, res) => res.json({ ok: true }));
app.get('/api/content/:group', async (req, res) => {
  const model = pickGroup(req.params.group);
  if (!model) return missing(res);
  const locale = req.query.locale || 'vi';
  if (!locales.includes(locale)) return bad(res);
  const fields = req.params.group === 'pages' || req.params.group === 'faqs' ? publicFields : 'title slug locale summary order';
  res.json(await model.find({ status: 'published', locale }).select(fields).sort({ order: 1, title: 1 }).lean());
});
app.get('/api/content/:group/:slug', async (req, res) => {
  const model = pickGroup(req.params.group);
  const locale = req.query.locale || 'vi';
  if (!model || !slugValid(req.params.slug)) return missing(res);
  if (!locales.includes(locale)) return bad(res);
  const entry = await model.findOne({ slug: req.params.slug, locale, status: 'published' }).select(publicFields).lean();
  if (!entry) return missing(res);
  res.json(entry);
});
app.post('/api/contact', limit(6, 15 * 60 * 1000), async (req, res) => {
  const values = cleanFields(req.body, { name: 100, email: 254, company: 160, phone: 32, message: 3000 });
  if (!values || values.name.length < 2 || !emailValid(values.email) || values.message.length < 10 ||
    (values.phone && !/^\+?[0-9().\s-]{6,32}$/.test(values.phone)))
    return bad(res, 'Kiểm tra họ tên, email, số điện thoại và nội dung từ 10 ký tự.');
  const entry = await Contact.create({ ...values, email: values.email.toLowerCase() });
  res.status(201).json({ id: entry.id, ok: true });
});
app.post('/api/chat', limit(12, 60 * 1000), chat);

const admin = express.Router();
admin.use(safeWrite);
admin.post('/login', limit(10, 15 * 60 * 1000), login);
admin.use(authorize);
admin.get('/session', (req, res) => res.json({ email: req.admin.email }));
admin.post('/logout', logout);
admin.get('/contacts', async (req, res) => {
  const page = Number(req.query.page || 1);
  if (!Number.isInteger(page) || page < 1 || page > 10000) return bad(res);
  const [entries, total] = await Promise.all([
    Contact.find().sort({ createdAt: -1 }).skip((page - 1) * 25).limit(25).lean(), Contact.countDocuments(),
  ]);
  res.json({ entries, total });
});
admin.patch('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const status = req.body?.status;
  if (!idValid(id) || !['new', 'reviewing', 'closed'].includes(status)) return bad(res);
  const entry = await Contact.findByIdAndUpdate(id, { status }, { new: true }).lean();
  if (!entry) return missing(res);
  res.json(entry);
});
admin.get('/content/:group', async (req, res) => {
  const model = pickGroup(req.params.group);
  if (!model) return missing(res);
  res.json(await model.find().sort({ order: 1, updatedAt: -1 }).lean());
});
function contentInput(input) {
  const fields = cleanFields(input, { slug: 100, title: 160, summary: 480, body: 12000, source: 500 });
  const { locale, order } = input || {};
  if (!fields?.title || !slugValid(fields.slug) || !locales.includes(locale) ||
    !Number.isInteger(order) || order < 0 || order > 9999) return null;
  return { ...fields, locale, order };
}
admin.post('/content/:group', async (req, res) => {
  const model = pickGroup(req.params.group);
  if (!model) return missing(res);
  const fields = contentInput(req.body);
  if (!fields) return bad(res, 'Kiểm tra tiêu đề, slug, ngôn ngữ và thứ tự.');
  res.status(201).json(await model.create(fields));
});
admin.put('/content/:group/:id', async (req, res) => {
  const model = pickGroup(req.params.group);
  const { id } = req.params;
  if (!model || !idValid(id)) return missing(res);
  const fields = contentInput(req.body);
  if (!fields) return bad(res, 'Kiểm tra tiêu đề, slug, ngôn ngữ và thứ tự.');
  const entry = await model.findOneAndUpdate({ _id: id, status: 'draft' }, fields, { new: true, runValidators: true }).lean();
  if (!entry) return res.status(409).json({ error: 'Hãy gỡ xuất bản trước khi chỉnh sửa mục này.' });
  res.json(entry);
});
admin.patch('/content/:group/:id/status', async (req, res) => {
  const model = pickGroup(req.params.group);
  const { id } = req.params;
  const status = req.body?.status;
  if (!model || !idValid(id)) return missing(res);
  if (!['draft', 'published'].includes(status)) return bad(res);
  const query = { _id: id };
  if (status === 'published') {
    query.source = { $ne: '' };
    if (req.params.group !== 'products') query.$or = [{ summary: { $ne: '' } }, { body: { $ne: '' } }];
  }
  const entry = await model.findOneAndUpdate(query, { status }, { new: true }).lean();
  if (!entry) return res.status(400).json({ error: 'Cần nhập nguồn và nội dung trước khi xuất bản.' });
  res.json(entry);
});
app.use('/api/admin', admin);
app.use('/api', (_, res) => missing(res));

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const html = fileURLToPath(new URL('../dist/index.html', import.meta.url));
if (existsSync(html)) {
  app.use(express.static(dist));
  app.get(/.*/, (_, res) => res.sendFile(html));
}
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error.code === 11000) return res.status(409).json({ error: 'Slug đã tồn tại trong ngôn ngữ này.' });
  if (error.status === 400 || error.status === 413) return res.status(error.status).json({ error: 'Dữ liệu gửi lên không hợp lệ hoặc quá lớn.' });
  console.error(error.name, error.code || '');
  res.status(500).json({ error: 'Máy chủ gặp lỗi. Vui lòng thử lại sau.' });
});

try {
  await connect();
  const port = Number(process.env.PORT || 3001);
  const listener = app.listen(port, '127.0.0.1', () => console.log('Platinum API http://127.0.0.1:' + listener.address().port));
} catch (error) {
  console.error('Không kết nối được MongoDB. Kiểm tra MONGODB_URI trong server/.env.', error.name);
  process.exitCode = 1;
}
