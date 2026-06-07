
import { connectDB } from "$lib/server/db"
import { Menu } from "$lib/server/models/Menu"

export async function getProducts(category) {
  await connectDB()
  const menu = await Menu.find(category ? { category } : {}).lean()
  return menu
}
