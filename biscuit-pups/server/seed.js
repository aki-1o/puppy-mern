import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import mongoose from 'mongoose';
import { Puppy, Family, Faq, Testimonial, Image } from './models.js';
import { pushImage } from './lib/images.js';

const data = JSON.parse(await readFile(new URL('./data/seed.json', import.meta.url)));
await mongoose.connect(process.env.MONGODB_URI);
await Promise.all([Puppy.deleteMany(), Family.deleteMany(), Image.deleteMany({ isDefault: true }), Faq.deleteMany(), Testimonial.deleteMany()]);
await Promise.all([
  Puppy.insertMany(data.puppies), Family.insertMany(data.families),
  Faq.insertMany(data.faqs), Testimonial.insertMany(data.testimonials),
]);

// Default photos (+ credits). Needs internet to look up photographers; offline it still seeds, with unverified credits.
const { images } = JSON.parse(await readFile(new URL('./data/images.json', import.meta.url)));
let pushed = 0;
for (const img of images) {
  try { await pushImage({ ...img, isDefault: true }); pushed++; }
  catch (e) { console.warn(`  skipped ${img.url}: ${e.message}`); }
}
console.log(`Seeded ${data.puppies.length} puppies, ${data.families.length} family photos, ${data.faqs.length} FAQs, ${pushed}/${images.length} default photos`);
await mongoose.disconnect();
