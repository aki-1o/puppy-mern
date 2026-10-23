import { useEffect, useState } from 'react';
import { api } from '../lib/api';

/** GET helper with loading/error state; aborts in-flight requests on path change/unmount. */
export function useFetch(path) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    const ac = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    api(path, { signal: ac.signal })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((e) => e.name !== 'AbortError' && setState({ data: null, loading: false, error: e.message }));
    return () => ac.abort();
  }, [path]);
  return state;
}
