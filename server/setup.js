import mongoose from 'mongoose';
import { createInterface } from 'node:readline/promises';
import { Writable } from 'node:stream';
import { Admin, connect } from './data.js';
import { hashPassword } from './auth.js';
import { seed } from './seed.js';

async function createAdmin() {
  let mute = false;
  const output = new Writable({ write(chunk, encoding, done) {
    if (!mute) process.stdout.write(chunk);
    done();
  } });
  output.isTTY = process.stdout.isTTY;
  const readline = createInterface({ input: process.stdin, output, terminal: Boolean(process.stdin.isTTY) });
  let email, password;
  try {
    email = (await readline.question('Email quản trị: ')).trim().toLowerCase();
    process.stdout.write('Mật khẩu (12–128 ký tự, không hiển thị): ');
    mute = true;
    password = await readline.question('');
    process.stdout.write('\n');
  } finally { readline.close(); }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || password.length < 12 || password.length > 128)
    throw new Error('Email hoặc mật khẩu không hợp lệ.');
  await Admin.create({ email, passwordHash: await hashPassword(password) });
  console.log('Đã tạo tài khoản quản trị.');
}
try {
  await connect();
  if (process.argv[2] === 'seed') {
    await seed();
    console.log('Đã bổ sung nội dung khởi tạo.');
  } else if (process.argv[2] === 'admin') await createAdmin();
  else throw new Error('Chọn lệnh seed hoặc admin.');
} catch (error) {
  console.error(error.code === 11000 ? 'Email quản trị đã tồn tại.' : error.message);
  process.exitCode = 1;
} finally { await mongoose.disconnect(); }
