import { browser } from "$app/environment";

export function createSwr<T>(fetcher: () => PromiseLike<T>) {
  // raw: no deep proxying, so identity only changes when we assign
  let value = $state.raw<T | null>(null);
  let snapshot = "";
  let inflight: Promise<T> | null = null;

  const fetchFresh = () =>
    (inflight ??= Promise.resolve(fetcher())
      .then((v) => {
        const next = JSON.stringify(v);
        // identical data: keep the same object, so nothing re-renders
        if (next !== snapshot) {
          snapshot = next;
          value = v;
        }
        return value as T;
      })
      .finally(() => (inflight = null)));

  return {
    get value() {
      return value;
    },
    /** Instant when cached; revalidates in the background. */
    async load(): Promise<T> {
      if (!browser) return fetcher() as Promise<T>;
      if (value !== null) {
        fetchFresh().catch(() => {});
        return value as T;
      }
      return fetchFresh();
    },
    clear() {
      value = null;
      snapshot = "";
    },
  };
}
