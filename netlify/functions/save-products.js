const { readFile, commitFiles, safeFilename, checkAdminAuth } = require('./_github.js');

const HEADER_MARKER = '\nexport const products';

// Se usa solo si el archivo aún no existe en el repo (caso extremo).
const FALLBACK_HEADER = `export type Category = 'swimwear' | 'casual' | 'dresses' | 'accessories';

export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  image: string;
  category: Category;
  sizes?: string[];
  stock?: number;
}

export const CATEGORY_LABELS: Record<Category | 'all', string> = {
  all: 'Todos los Productos',
  swimwear: 'Trajes de Baño',
  casual: 'Ropa Casual',
  dresses: 'Vestidos',
  accessories: 'Accesorios',
};`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    checkAdminAuth(event);

    const products = JSON.parse(event.body);
    if (!Array.isArray(products)) throw new Error('Formato inválido: se esperaba un array de productos');

    const files = [];

    // Extrae imágenes nuevas (base64) y las convierte en archivos reales del repo,
    // igual que hace el plugin de Vite en desarrollo local.
    const cleanProducts = products.map((p) => {
      if (typeof p.image === 'string' && p.image.startsWith('data:')) {
        const match = p.image.match(/^data:image\/(\w+);base64,/);
        const ext = (match ? match[1] : 'jpeg').replace('jpeg', 'jpg');
        const filename = safeFilename(p.id, ext);
        const base64Data = p.image.replace(/^data:image\/\w+;base64,/, '');
        files.push({ path: `public/product-images/${filename}`, contentBase64: base64Data });
        return { ...p, image: `/product-images/${filename}` };
      }
      return p;
    });

    // Conserva el encabezado actual del archivo (tipos, CATEGORY_LABELS, DISCOUNTS, etc.)
    const current = await readFile('src/data/products.ts');
    const headerEnd = current ? current.indexOf(HEADER_MARKER) : -1;
    const header = headerEnd !== -1 ? current.slice(0, headerEnd) : FALLBACK_HEADER;

    const ts = `${header}\nexport const products: Product[] = ${JSON.stringify(cleanProducts, null, 2)};\n`;
    files.push({ path: 'src/data/products.ts', content: ts });

    await commitFiles(files, `chore(admin): actualizar catálogo (${cleanProducts.length} productos)`);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, count: cleanProducts.length }),
    };
  } catch (e) {
    console.error('[save-products]', e);
    return {
      statusCode: e.statusCode || 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: String(e.message || e) }),
    };
  }
};
