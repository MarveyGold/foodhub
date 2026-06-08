
import { error } from '@sveltejs/kit'

export async function load({ params }) {
  if (params.slug.includes('.')) {
    error(404, 'Not found')
  }
}
