import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
  WHATSAPP_NUMBER: { static: true },
  CLOUDINARY_CLOUD_NAME: { static: true },
  CLOUDINARY_UPLOAD_PRESET: { static: true },
  ORIGIN: { static: true },
  MONGODB_URI: { static: true },
});
