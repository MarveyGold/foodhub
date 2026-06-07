import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export function getCart() {
  if (!browser) return []
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
export const cartStore = writable(getCart())
export function saveCart(cart: any) {
  if (!browser) return;
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function syncCart() {
  cartStore.set(getCart())
}
export function addToCart(item: any) {
  const cart = getCart();
  cart.push(item);
  saveCart(cart)
}
export function removeItem(item: any) {
  cartStore.update(cart => {
    const updated = cart.filter((id) => {
     // console.log(id.imageUrl + " vs " + item.imageUrl);
      return id.id !== item.id;
    });
    saveCart(updated);
    return updated;
  })
}
