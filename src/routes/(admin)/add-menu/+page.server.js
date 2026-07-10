import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "$env/static/private";
import { addProduct } from "$lib/server/products.js";

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const name = data.get("name");
    const image = data.get("image");

    // Upload to Cloudinary
    const cf = new FormData();
    cf.append("file", image);
    cf.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const publicId = `${name.trim().toLowerCase().replace(/\s+/g, "-")}-${crypto.randomUUID().slice(0, 8)}`;
    cf.append("public_id", publicId);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: cf },
    );

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.error?.message || "Upload failed" };
      console.log(error);
    }

    const { secure_url } = await res.json();

    if (!secure_url) {
      return { success: false, error: "No URL returned from Cloudinary" };
    }

    const product = await addProduct({ data, imageUrl: secure_url });

    return { success: true };
  },
};
