import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { MongoMemoryServer } from 'mongodb-memory-server';

const dbPath = resolve('.local/data');
await mkdir(dbPath, { recursive: true });
process.env.MONGOMS_DOWNLOAD_DIR ||= resolve('.local/mongodb');
const mongo = await MongoMemoryServer.create({
  instance: { port: 27017, ip: '127.0.0.1', dbPath, storageEngine: 'wiredTiger' },
});
if (new URL(mongo.getUri()).port !== '27017') {
  await mongo.stop();
  throw new Error('Cổng 27017 đang bận. Hãy dùng MongoDB đang chạy hoặc giải phóng cổng.');
}
console.log('MongoDB đang chạy tại mongodb://127.0.0.1:27017/platinum');
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, async () => { await mongo.stop(); process.exit(0); });
}
