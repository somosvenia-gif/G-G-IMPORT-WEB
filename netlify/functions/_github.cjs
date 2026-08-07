// Helper compartido: lee y escribe archivos del repo de GitHub usando la Git Data API,
// para que el admin panel pueda guardar cambios de forma permanente en producción
// (Netlify sirve un sitio estático, así que "guardar" = hacer commit al repo).

const OWNER = 'somosvenia-gif';
const REPO = 'G-G-IMPORT-WEB';
const BRANCH = 'main';
const API = `https://api.github.com/repos/${OWNER}/${REPO}`;

function authHeaders() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('Falta configurar la variable de entorno GITHUB_TOKEN en Netlify');
  }
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

async function gh(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: { ...authHeaders(), ...(options.headers || {}) },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`GitHub API ${path} -> ${res.status}: ${text}`);
    err.status = res.status;
    throw err;
  }
  return res.status === 204 ? null : res.json();
}

// Lee un archivo de texto del repo. Devuelve null si no existe.
async function readFile(path) {
  try {
    const data = await gh(`/contents/${encodeURIComponent(path)}?ref=${BRANCH}`);
    return Buffer.from(data.content, 'base64').toString('utf-8');
  } catch (e) {
    if (e.status === 404) return null;
    throw e;
  }
}

// Sube varios archivos (texto o binario) en un único commit atómico.
// files: [{ path, content? (texto utf-8), contentBase64? (binario) }]
async function commitFiles(files, message) {
  const ref = await gh(`/git/refs/heads/${BRANCH}`);
  const baseCommitSha = ref.object.sha;
  const baseCommit = await gh(`/git/commits/${baseCommitSha}`);
  const baseTreeSha = baseCommit.tree.sha;

  const treeItems = [];
  for (const f of files) {
    const content = f.contentBase64 ?? Buffer.from(f.content, 'utf-8').toString('base64');
    const blob = await gh('/git/blobs', {
      method: 'POST',
      body: JSON.stringify({ content, encoding: 'base64' }),
    });
    treeItems.push({ path: f.path, mode: '100644', type: 'blob', sha: blob.sha });
  }

  const newTree = await gh('/git/trees', {
    method: 'POST',
    body: JSON.stringify({ base_tree: baseTreeSha, tree: treeItems }),
  });

  const newCommit = await gh('/git/commits', {
    method: 'POST',
    body: JSON.stringify({ message, tree: newTree.sha, parents: [baseCommitSha] }),
  });

  await gh(`/git/refs/heads/${BRANCH}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: newCommit.sha, force: false }),
  });

  return newCommit.sha;
}

// Convierte un id en un nombre de archivo seguro — evita path traversal
// (el id puede venir de datos enviados por el navegador, nunca hay que
// confiar en él directamente para construir una ruta dentro del repo).
function safeFilename(id, ext) {
  const clean = String(id).replace(/[^a-zA-Z0-9_-]/g, '');
  if (!clean) throw new Error('ID inválido');
  const cleanExt = String(ext).replace(/[^a-zA-Z0-9]/g, '') || 'jpg';
  return `${clean}.${cleanExt}`;
}

// Puerta mínima: exige la misma clave que ya usa el login del admin panel,
// para que estos endpoints no queden abiertos a cualquiera que los descubra.
function checkAdminAuth(event) {
  const expected = process.env.ADMIN_PASSWORD || 'admin123';
  const provided = event.headers && (event.headers['x-admin-password'] || event.headers['X-Admin-Password']);
  if (provided !== expected) {
    const err = new Error('No autorizado');
    err.statusCode = 401;
    throw err;
  }
}

module.exports = { readFile, commitFiles, safeFilename, checkAdminAuth };
