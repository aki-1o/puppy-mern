// Helpers for Picsum Photos (https://picsum.photos) — parse a URL, pin it to a fixed image id, and look up the photographer.
// Picsum serves Unsplash photos, so each image has a real author we can credit.

const HOST = 'picsum.photos';
const TIMEOUT = 10_000;

/** Accepts every URL form Picsum offers: /200/300, /seed/puppy/400/300, /id/237/400/300, ?grayscale, ?blur=2 */
export function parsePicsumUrl(input) {
  let u;
  try { u = new URL(String(input)); } catch { throw new Error('Not a valid URL'); }
  if (u.protocol !== 'https:' || u.hostname !== HOST) throw new Error(`Only https://${HOST}/ URLs are accepted`); // SSRF guard

  const parts = u.pathname.split('/').filter(Boolean);
  let id, seed;
  if (parts[0] === 'id') { id = parts[1]; parts.splice(0, 2); }
  else if (parts[0] === 'seed') { seed = parts[1]; parts.splice(0, 2); }
  if (id && !/^\d{1,5}$/.test(id)) throw new Error('Bad picsum id');
  if (seed && !/^[\w-]{1,60}$/.test(seed)) throw new Error('Bad picsum seed');

  const nums = parts.map((p) => parseInt(p, 10)).filter(Number.isFinite);
  const [width, height = width] = nums;
  const blur = u.searchParams.get('blur');
  return { id, seed, width, height, grayscale: u.searchParams.has('grayscale'), blur: /^(10|[1-9])$/.test(blur ?? '') ? blur : undefined };
}

const query = ({ grayscale, blur }) => {
  const q = [grayscale && 'grayscale', blur && `blur=${blur}`].filter(Boolean).join('&');
  return q ? `?${q}` : '';
};
const buildUrl = ({ id, seed, width, height, ...fx }) =>
  `https://${HOST}/${id ? `id/${id}` : `seed/${seed}`}/${width}/${height}${query(fx)}`;

const get = (url) => fetch(url, { signal: AbortSignal.timeout(TIMEOUT), headers: { 'User-Agent': 'biscuit-pups-demo' } });

/** Random and seed URLs redirect to a concrete image; Picsum reports which one in the `picsum-id` header. */
async function lookupId({ seed, width, height }) {
  const res = await get(`https://${HOST}/${seed ? `seed/${seed}/` : ''}${width}/${height}`);
  res.body?.cancel();
  if (!res.ok) throw new Error(`Picsum answered ${res.status}`);
  const id = res.headers.get('picsum-id') ?? res.url.match(/\/id\/(\d+)\//)?.[1];
  if (!id) throw new Error('Picsum did not say which image it served');
  return id;
}

/** https://picsum.photos/id/237/info → { id, author, url (Unsplash page), ... } */
async function lookupInfo(id) {
  const res = await get(`https://${HOST}/id/${id}/info`);
  if (!res.ok) throw new Error(`Picsum info answered ${res.status}`);
  const info = await res.json();
  if (typeof info.author !== 'string') throw new Error('Unexpected picsum info');
  return info;
}

/**
 * Turns any picsum URL into a stable, id-pinned URL plus credit.
 * Offline: seed/id URLs still work (credit marked unverified); a random URL can't be pinned, so it throws.
 */
export async function resolvePicsum(input, { width = 600, height = 600 } = {}) {
  const p = parsePicsumUrl(input);
  const size = { width, height };               // we choose sizes to suit the site, not the ones in the pasted URL
  let id = p.id;
  if (!id) {
    try { id = await lookupId({ ...p, ...size }); }
    catch (e) {
      if (!p.seed) throw new Error(`Couldn't pin a random picsum image (${e.message}). Run online, or use a /seed/ or /id/ URL.`);
    }
  }
  let info = null;
  if (id) { try { info = await lookupInfo(id); } catch { /* credit stays unverified */ } }

  return {
    url: buildUrl({ id, seed: p.seed, ...size, grayscale: p.grayscale, blur: p.blur }),
    picsumId: id ?? null,
    ...size,
    grayscale: p.grayscale,
    credit: info
      ? { author: info.author, sourceUrl: info.url, verified: true }
      : { verified: false },
  };
}
