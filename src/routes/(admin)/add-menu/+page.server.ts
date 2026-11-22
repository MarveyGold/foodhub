import type { Actions } from "./$types";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "$app/env/private";
import { addProduct } from "#lib/server/products.js";
import { requirePermission } from "#lib/server/permissions";

interface CloudinaryUploadResponse {
  secure_url?: string;
}

interface CloudinaryErrorResponse {
  error?: { message?: string };
}

export const actions = {
  default: async ({ request }) => {
    await requirePermission(request.headers, { product: ["create"] });

    const data = await request.formData();

    const name = data.get("name");
    const image = data.get("image");

    if (typeof name !== "string" || !name.trim()) {
      return { success: false, error: "Product name is required" };
    }
    if (!(image instanceof File) || image.size === 0) {
      return { success: false, error: "Product image is required" };
    }

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
      const errorBody: CloudinaryErrorResponse = await res.json();
      return {
        success: false,
        error: errorBody.error?.message || "Upload failed",
      };
    }

    const { secure_url }: CloudinaryUploadResponse = await res.json();

    if (!secure_url) {
      return { success: false, error: "No URL returned from Cloudinary" };
    }

    await addProduct({ data, imageUrl: secure_url });

    return { success: true };
  },
} satisfies Actions;
