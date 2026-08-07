const { commitFiles, safeFilename, checkAdminAuth } = require('./_github.js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    checkAdminAuth(event);

    const images = JSON.parse(event.body);
    if (!Array.isArray(images)) throw new Error('Formato inválido: se esperaba un array de imágenes');

    const files = [];

    const cleanImages = images.map((img) => {
      if (typeof img.src === 'string' && img.src.startsWith('data:')) {
        const match = img.src.match(/^data:image\/(\w+);base64,/);
        const ext = (match ? match[1] : 'jpeg').replace('jpeg', 'jpg');
        const filename = safeFilename(img.id, ext);
        const base64Data = img.src.replace(/^data:image\/\w+;base64,/, '');
        files.push({ path: `public/hero-images/${filename}`, contentBase64: base64Data });
        return { ...img, src: `/hero-images/${filename}` };
      }
      return img;
    });

    const ts = `export interface HeroImage {\n  id: string;\n  src: string;\n  alt?: string;\n}\n\nexport const heroImages: HeroImage[] = ${JSON.stringify(cleanImages, null, 2)};\n`;
    files.push({ path: 'src/data/heroImages.ts', content: ts });

    await commitFiles(files, `chore(admin): actualizar carrusel del hero (${cleanImages.length} imágenes)`);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, images: cleanImages }),
    };
  } catch (e) {
    console.error('[save-hero-images]', e);
    return {
      statusCode: e.statusCode || 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: String(e.message || e) }),
    };
  }
};
