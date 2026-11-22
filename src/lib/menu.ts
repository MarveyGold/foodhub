const norm = (s?: string | null) => s?.toLowerCase().replace(/s$/, "") ?? "";

export function filterMenu<T extends { category?: string | null }>(
  all: T[],
  category: string | null,
): T[] {
  return category ? all.filter((m) => norm(m.category) === norm(category)) : all;
}
