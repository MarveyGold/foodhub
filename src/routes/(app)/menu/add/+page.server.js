import { writeFile } from 'fs/promises';
import path from 'path';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const name = data.get('name');
    const image = data.get('image');

    const buffer = Buffer.from(
      await image.arrayBuffer()
    );
    console.log(name);
    console.log(image.name);
    await writeFile(
      path.join('static', `${name}.png`),
      buffer
    );

    return {
      success: true
    };
  }
};
