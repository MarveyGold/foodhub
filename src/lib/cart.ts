import { browser } from "$app/env";
import { writable } from "svelte/store";

export type Flavour =
  | "Vanilla"
  | "Chocolate"
  | "Red Velvet"
  | "Coconut"
  | "Carrot"
  | "Cookies & Cream"
  | "Strawberry"
  | "Banana";

export type CartItem = {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
  category?: string;
  size?: number;
  layers?: number;
  price?: number;
  flavour?: Flavour;
  quantity: number;
  cost: number; // line total (price * quantity)
};

function isCartItem(x: unknown): x is CartItem {
  return (
    typeof x === "object" &&
    x !== null &&
    typeof (x as CartItem).id === "string" &&
    typeof (x as CartItem).name === "string" &&
    typeof (x as CartItem).quantity === "number" &&
    typeof (x as CartItem).cost === "number"
  );
}

export function getCart(): CartItem[] {
  if (!browser) return [];
  const raw = localStorage.getItem("cart");
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartItem);
  } catch {
    // corrupt or older-format data — start clean rather than crash
    return [];
  }
}

export const cartStore = writable<CartItem[]>(getCart());

export function saveCart(cart: CartItem[]): void {
  if (!browser) return;
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function syncCart(): void {
  cartStore.set(getCart());
}

export function addToCart(item: CartItem): void {
  cartStore.update((cart) => {
    const updated = [...cart, item];
    saveCart(updated);
    return updated;
  });
}

export function removeItem(item: Pick<CartItem, "id">): void {
  cartStore.update((cart) => {
    const updated = cart.filter((i) => i.id !== item.id);
    saveCart(updated);
    return updated;
  });
}

export function clearCart(): void {
  cartStore.set([]);
  saveCart([]);
}
