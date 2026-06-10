import { writeFile, mkdir } from 'fs/promises';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const name = data.get('name');
    const image = data.get('image');

    if (!image || !name) {
      return { success: false, error: 'Missing fields' };
    }

    const buffer = Buffer.from(await image.arrayBuffer());

    const uploadDir = '/workspace/app/static';
    await mkdir(uploadDir, { recursive: true });
    await writeFile(`${uploadDir}/${name}.png`, buffer);

    return { success: true };
  }
};
