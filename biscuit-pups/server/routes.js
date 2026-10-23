import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { createHash, timingSafeEqual } from 'node:crypto';
import { Puppy, Family, Faq, Testimonial, Enquiry, Image } from './models.js';
import { pushImage, ASSIGN_RE } from './lib/images.js';

const r = Router();
const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);
const str = (v) => (typeof v === 'string' ? v : undefined);     // blocks ?breed[$ne]=x NoSQL-injection objects
const pick = (v, allowed) => (allowed.includes(str(v)) ? str(v) : undefined);

r.get('/health', (_q, s) => s.json({ ok: true }));

// One round-trip for the whole home page
r.get('/home', wrap(async (_q, s) => {
  const [puppies, families, faqs, testimonial] = await Promise.all([
    Puppy.find({ status: 'available' }).sort('order').lean(),
    Family.find().sort('order').limit(8).lean(),
    Faq.find().sort('order').limit(3).lean(),
    Testimonial.findOne().lean(),
  ]);
  s.json({ puppies, families, faqs, testimonial });
}));

// /api/puppies?breed=maltipoo&origin=imported&gender=girl&status=available&page=1&limit=24
r.get('/puppies', wrap(async (q, s) => {
  const f = {};
  const breed = str(q.query.breed); if (breed && /^[a-z-]{2,20}$/.test(breed)) f.breeds = breed;
  const origin = pick(q.query.origin, ['local', 'imported']); if (origin) f.origin = origin;
  const gender = pick(q.query.gender, ['boy', 'girl']);       if (gender) f.gender = { $in: [gender, 'both'] };
  const status = pick(q.query.status, ['available', 'reserved', 'gone-home']) ?? 'available'; f.status = status;
  const limit = Math.min(Math.max(parseInt(q.query.limit) || 24, 1), 48);
  const page = Math.max(parseInt(q.query.page) || 1, 1);
  const [items, total] = await Promise.all([
    Puppy.find(f).sort('order').skip((page - 1) * limit).limit(limit).lean(),
    Puppy.countDocuments(f),
  ]);
  s.json({ items, total, page, pages: Math.ceil(total / limit) });
}));

r.get('/puppies/:slug', wrap(async (q, s) => {
  const p = await Puppy.findOne({ slug: String(q.params.slug) }).lean();
  p ? s.json(p) : s.status(404).json({ error: 'Puppy not found' });
}));

r.get('/families', wrap(async (_q, s) => s.json(await Family.find().sort('order').lean())));
r.get('/faqs', wrap(async (_q, s) => s.json(await Faq.find().sort('order').lean())));

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().max(30).regex(/^[+\d\s()-]*$/, 'Invalid phone').optional().or(z.literal('')),
  email: z.string().trim().email().max(120).optional().or(z.literal('')),
  city: z.string().trim().max(60).optional(),
  message: z.string().trim().min(5).max(1000),
  puppySlug: z.string().max(80).optional(),
  website: z.string().optional(),                                // honeypot — real users leave it empty
}).refine((d) => d.phone || d.email, { message: 'Add a phone number or an email', path: ['phone'] });

const enquiryLimiter = rateLimit({ windowMs: 60 * 60_000, limit: 8, message: { error: 'Too many enquiries, try again later.' } });

r.post('/enquiries', enquiryLimiter, wrap(async (q, s) => {
  const parsed = enquirySchema.safeParse(q.body);
  if (!parsed.success) return s.status(400).json({ error: parsed.error.issues[0].message });
  const { website, ...data } = parsed.data;
  if (!website) await Enquiry.create(data);                       // bots get a silent fake success
  s.status(201).json({ ok: true });
}));

// Every photo on the site with its credit (powers the /credits page)
r.get('/credits', wrap(async (_q, s) => s.json(await Image.find().sort({ assignedTo: 1, createdAt: 1 }).lean())));

// Push a picsum image into the database (optionally set it as a puppy / family photo). Needs the ADMIN_KEY header.
const sha = (v) => createHash('sha256').update(String(v)).digest();
const isAdmin = (req) => process.env.ADMIN_KEY && timingSafeEqual(sha(req.get('x-admin-key') ?? ''), sha(process.env.ADMIN_KEY));
const imageSchema = z.object({
  url: z.string().url().max(300),
  alt: z.string().trim().max(140).optional(),
  assign: z.string().regex(ASSIGN_RE, 'assign must look like "puppy:max" or "family:3"').optional(),
  width: z.number().int().min(50).max(2000).optional(),
  height: z.number().int().min(50).max(2000).optional(),
});
const imageLimiter = rateLimit({ windowMs: 60 * 60_000, limit: 30, message: { error: 'Too many image pushes, try again later.' } });

r.post('/images', imageLimiter, wrap(async (q, s) => {
  if (!process.env.ADMIN_KEY) return s.status(503).json({ error: 'Image pushing is disabled (set ADMIN_KEY on the server)' });
  if (!isAdmin(q)) return s.status(401).json({ error: 'Wrong or missing x-admin-key' });
  const parsed = imageSchema.safeParse(q.body);
  if (!parsed.success) return s.status(400).json({ error: parsed.error.issues[0].message });
  try { s.status(201).json(await pushImage(parsed.data)); }
  catch (e) { s.status(400).json({ error: e.message }); }
}));

export default r;
