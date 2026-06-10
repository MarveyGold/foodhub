import { writeFile, mkdir } from 'fs/promises';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const name = data.get('name');
    const image = data.get('image');

    const buffer = Buffer.from(await image.arrayBuffer());

    await mkdir('/static', { recursive: true });
    await writeFile(`/static/${name}.png`, buffer);

    return { success: true };
  }
};
