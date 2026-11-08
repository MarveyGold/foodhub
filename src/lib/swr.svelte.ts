import { browser } from "$app/environment";

export function createSwr<T>(fetcher: () => PromiseLike<T>) {
  let value = $state<T | null>(null);
  let inflight: Promise<T> | null = null;

  const fetchFresh = () =>
    (inflight ??= Promise.resolve(fetcher())
      .then((v) => (value = v) as T)
      .finally(() => (inflight = null)));

  return {
    get value() {
      return value;
    },
    /** Instant when cached; always revalidates in the background. */
    async load(): Promise<T> {
      // never keep (per-user) data in server memory
      if (!browser) return fetcher() as Promise<T>;
      if (value !== null) {
        fetchFresh().catch(() => {});
        return value as T;
      }
      return fetchFresh();
    },
    clear() {
      value = null;
    },
  };
}
