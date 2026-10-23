import { Image, Puppy, Family } from '../models.js';
import { resolvePicsum } from './picsum.js';

// Sizes picked to suit each place the image is shown (door frames 4:5, polaroids 1:1)
const SIZE = { puppy: [600, 720], family: [600, 600] };
export const ASSIGN_RE = /^(puppy:[a-z0-9-]{1,60}|family:\d{1,3})$/;

/**
 * Resolve a picsum URL, save it (with credit) in the Image library, and optionally
 * set it as the photo of a puppy ("puppy:max") or a family polaroid ("family:3" = order 3).
 */
export async function pushImage({ url, alt, assign, isDefault = false, width, height }) {
  if (assign && !ASSIGN_RE.test(assign)) throw new Error('assign must look like "puppy:max" or "family:3"');
  const [kind, key] = assign ? assign.split(':') : [];
  const [dw, dh] = SIZE[kind] ?? [600, 600];

  const target = kind === 'puppy' ? await Puppy.findOne({ slug: key })
    : kind === 'family' ? await Family.findOne({ order: Number(key) }) : null;
  if (assign && !target) throw new Error(`Nothing to assign to: no ${kind} "${key}" (seed the database first)`);

  const r = await resolvePicsum(url, { width: width ?? dw, height: height ?? dh });
  const label = kind === 'puppy' ? target.name : kind === 'family' ? 'a happy family' : null;
  const finalAlt = alt || (label ? `Placeholder photo for ${label}` : 'Placeholder photo');

  const doc = await Image.findOneAndUpdate(
    { url: r.url, assignedTo: assign ?? null },
    { $set: { picsumId: r.picsumId, width: r.width, height: r.height, grayscale: r.grayscale, alt: finalAlt, credit: r.credit, isDefault } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  if (target) { target.image = r.url; target.alt = finalAlt; target.credit = r.credit; await target.save(); }
  return doc;
}
