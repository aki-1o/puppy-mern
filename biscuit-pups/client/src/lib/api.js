const BASE = `${import.meta.env.VITE_API_BASE_URL || ''}/api`;

/** Tiny fetch wrapper: JSON in/out, throws Error(message) on non-2xx. */
export async function api(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...opts.headers },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
  return body;
}
