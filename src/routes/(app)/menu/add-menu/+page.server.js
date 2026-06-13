import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '$env/static/private';
import { addProduct } from '$lib/server/products.js';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const name = data.get('name');
    const image = data.get('image');

    // Upload to Cloudinary
    const cf = new FormData();
    cf.append('file', image);
    cf.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    cf.append('public_id', name);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: cf }
    );
    const { secure_url } = await res.json();

    // Save to DB
    const product = await addProduct({ data, imageUrl: secure_url });

    return { success: true, id: product._id.toString() };
  }
};
