import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '$env/static/private';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const name = data.get('name');
    const image = data.get('image');

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('public_id', name);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    );

    const result = await res.json();

    return { success: true, url: result.secure_url };
  }
};
