import { randomBytes, scrypt, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { Admin, Session } from './data.js';
const derive = promisify(scrypt);
const maxAge = 8 * 60 * 60 * 1000;
const cookieName = 'platinum_session';
const cookieOptions = { httpOnly: true, sameSite: 'strict', secure: process.env.COOKIE_SECURE === 'true', path: '/api/admin' };
const hash = token => createHash('sha256').update(token).digest('hex');
const tokenFrom = req => req.headers.cookie?.match(/(?:^|;\s*)platinum_session=([a-f0-9]{64})(?:;|$)/)?.[1];

export async function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const key = await derive(password, salt, 64);
  return salt + ':' + key.toString('hex');
}
export async function login(req, res) {
  const { email, password } = req.body || {};
  if (typeof email !== 'string' || typeof password !== 'string' || email.length > 254 || password.length > 128)
    return res.status(400).json({ error: 'Thông tin đăng nhập không hợp lệ.' });
  const admin = await Admin.findOne({ email: email.trim().toLowerCase() }).lean();
  const stored = admin?.passwordHash || '00000000000000000000000000000000:' + '00'.repeat(64);
  const actual = await hashPassword(password, stored.split(':')[0]);
  if (!timingSafeEqual(Buffer.from(actual), Buffer.from(stored)) || !admin)
    return res.status(401).json({ error: 'Email hoặc mật khẩu không đúng.' });
  const previous = tokenFrom(req);
  if (previous) await Session.deleteOne({ tokenHash: hash(previous) });
  const token = randomBytes(32).toString('hex');
  await Session.create({ tokenHash: hash(token), admin: admin._id, expiresAt: new Date(Date.now() + maxAge) });
  res.cookie(cookieName, token, { ...cookieOptions, maxAge }).json({ email: admin.email });
}
export async function authorize(req, res, next) {
  const token = tokenFrom(req);
  const session = token && await Session.findOne({ tokenHash: hash(token), expiresAt: { $gt: new Date() } }).lean();
  const admin = session && await Admin.findById(session.admin).select('email').lean();
  if (!admin) return res.status(401).json({ error: 'Vui lòng đăng nhập.' });
  req.admin = admin;
  req.sessionId = session._id;
  next();
}
export async function logout(req, res) {
  await Session.deleteOne({ _id: req.sessionId });
  res.clearCookie(cookieName, cookieOptions).json({ ok: true });
}
