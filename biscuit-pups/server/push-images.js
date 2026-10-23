// Push picsum images (with credits) into MongoDB.
//   npm run images                                   → push everything in data/images.json
//   npm run images -- https://picsum.photos/200/300 --assign puppy:max --alt "Max on the sofa"
import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import mongoose from 'mongoose';
import { pushImage } from './lib/images.js';

const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(`--${n}`); return i > -1 ? args[i + 1] : undefined; };
const url = args.find((a) => a.startsWith('http'));

await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/biscuitpups');
const jobs = url
  ? [{ url, assign: flag('assign'), alt: flag('alt') }]
  : JSON.parse(await readFile(new URL(flag('file') || './data/images.json', import.meta.url))).images;

let ok = 0;
for (const job of jobs) {
  try {
    const d = await pushImage({ ...job, isDefault: !url });
    console.log(`✓ ${d.url}  ${d.credit?.verified ? `by ${d.credit.author}` : '(credit not verified — offline?)'}${d.assignedTo ? `  → ${d.assignedTo}` : ''}`);
    ok++;
  } catch (e) { console.warn(`✗ ${job.url}: ${e.message}`); }
}
console.log(`${ok}/${jobs.length} images pushed`);
await mongoose.disconnect();
