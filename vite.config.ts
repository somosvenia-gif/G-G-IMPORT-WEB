import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Plugin que expone POST /api/save-products durante desarrollo.
 * - Extrae imágenes base64 y las guarda como archivos en public/product-images/
 * - Escribe src/data/products.ts con paths a esas imágenes (no base64)
 * - Resultado: archivo de código liviano, imágenes como archivos reales
 */
function saveProductsPlugin(): Plugin {
  return {
    name: 'save-products-api',
    configureServer(server) {
      server.middlewares.use('/api/save-products', (req, res, next) => {
        if (req.method !== 'POST') { next(); return; }

        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', () => {
          try {
            const products: any[] = JSON.parse(body);
            const imagesDir = path.resolve(process.cwd(), 'public/product-images');

            // Crear carpeta de imágenes si no existe
            if (!fs.existsSync(imagesDir)) {
              fs.mkdirSync(imagesDir, { recursive: true });
            }

            // Procesar productos: extraer base64 → archivo real
            const cleanProducts = products.map((p) => {
              if (typeof p.image === 'string' && p.image.startsWith('data:')) {
                // Detectar extensión desde el data URL
                const match = p.image.match(/^data:image\/(\w+);base64,/);
                const ext = match ? match[1].replace('jpeg', 'jpg') : 'jpg';
                const filename = `${p.id}.${ext}`;
                const filePath = path.join(imagesDir, filename);

                // Guardar imagen como archivo
                const base64Data = p.image.replace(/^data:image\/\w+;base64,/, '');
                fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

                return { ...p, image: `/product-images/${filename}` };
              }
              return p;
            });

            // Leer encabezado actual de products.ts (tipos, interfaces, etc.)
            const filePath = path.resolve(process.cwd(), 'src/data/products.ts');
            const existing = fs.readFileSync(filePath, 'utf-8');
            const headerEnd = existing.indexOf('\nexport const products');
            const header = headerEnd !== -1 ? existing.slice(0, headerEnd) : FALLBACK_HEADER;

            // Escribir products.ts con paths de imagen (no base64)
            const ts = `${header}\nexport const products: Product[] = ${JSON.stringify(cleanProducts, null, 2)};\n`;
            fs.writeFileSync(filePath, ts, 'utf-8');

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: true, count: cleanProducts.length }));
          } catch (e) {
            console.error('[save-products]', e);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: String(e) }));
          }
        });
      });
    },
  };
}

const FALLBACK_HEADER = `export type Category = 'swimwear' | 'casual' | 'dresses' | 'accessories';

export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  image: string;
  category: Category;
  discount?: string;
}

export const CATEGORY_LABELS: Record<Category | 'all', string> = {
  all: 'Todos los Productos',
  swimwear: 'Trajes de Baño',
  casual: 'Ropa Casual',
  dresses: 'Vestidos',
  accessories: 'Accesorios',
};`;

function saveHeroImagesPlugin(): Plugin {
  return {
    name: 'save-hero-images-api',
    configureServer(server) {
      server.middlewares.use('/api/save-hero-images', (req, res, next) => {
        if (req.method !== 'POST') { next(); return; }

        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', () => {
          try {
            const images: any[] = JSON.parse(body);
            const imagesDir = path.resolve(process.cwd(), 'public/hero-images');

            if (!fs.existsSync(imagesDir)) {
              fs.mkdirSync(imagesDir, { recursive: true });
            }

            // Extraer base64 → archivos reales
            const cleanImages = images.map((img) => {
              if (typeof img.src === 'string' && img.src.startsWith('data:')) {
                const match = img.src.match(/^data:image\/(\w+);base64,/);
                const ext = match ? match[1].replace('jpeg', 'jpg') : 'jpg';
                const filename = `${img.id}.${ext}`;
                const filePath = path.join(imagesDir, filename);
                const base64Data = img.src.replace(/^data:image\/\w+;base64,/, '');
                fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
                return { ...img, src: `/hero-images/${filename}` };
              }
              return img;
            });

            // Escribir heroImages.ts
            const filePath = path.resolve(process.cwd(), 'src/data/heroImages.ts');
            const ts = `export interface HeroImage {\n  id: string;\n  src: string;\n  alt?: string;\n}\n\nexport const heroImages: HeroImage[] = ${JSON.stringify(cleanImages, null, 2)};\n`;
            fs.writeFileSync(filePath, ts, 'utf-8');

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: true, images: cleanImages }));
          } catch (e) {
            console.error('[save-hero-images]', e);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: String(e) }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), saveProductsPlugin(), saveHeroImagesPlugin()],
})
