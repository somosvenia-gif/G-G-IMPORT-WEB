import { useState, useRef } from 'react';
import React from 'react';
import { X, Plus, Pencil, Trash2, RotateCcw, Check, ShieldAlert, Upload, Link, Save, CheckCircle, AlertCircle, Loader, Images } from 'lucide-react';
import { useProductStore, type Product, type Category } from '../store/useProducts';
import { useHeroStore } from '../store/useHero';

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'swimwear', label: 'Trajes de Baño' },
  { id: 'casual', label: 'Ropa Casual' },
  { id: 'dresses', label: 'Vestidos' },
  { id: 'accessories', label: 'Accesorios' },
];

const DISCOUNT_OPTIONS = [
  '-10% OFF', '-15% OFF', '-20% OFF', '-22% OFF', '-25% OFF',
  '-30% OFF', '-33% OFF', '-35% OFF', '-40% OFF', '-50% OFF',
];

const STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

const emptyForm = {
  name: '', price: '', brand: 'SHEIN',
  category: 'swimwear' as Category,
  image: '', discount: '-20% OFF',
  sizes: [] as string[],
  stock: '',
};

type FormData = typeof emptyForm;

// ─── Product Form Modal ──────────────────────────────────────────────────────
function ProductForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<FormData & { id: string }>;
  onSave: (data: FormData) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<FormData>({
    name: initial?.name ?? '',
    price: initial?.price?.toString() ?? '',
    brand: initial?.brand ?? 'SHEIN',
    category: (initial?.category as Category) ?? 'swimwear',
    image: initial?.image ?? '',
    discount: initial?.discount ?? '-20% OFF',
    sizes: (initial as any)?.sizes ?? [],
    stock: (initial as any)?.stock?.toString() ?? '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [imageTab, setImageTab] = useState<'upload' | 'url'>('upload');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof FormData, v: string | string[]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleSize = (size: string) => {
    setForm(f => ({
      ...f,
      sizes: f.sizes.includes(size) ? f.sizes.filter(s => s !== size) : [...f.sizes, size],
    }));
  };

  // Convert selected file to base64 data URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida (JPG, PNG, WEBP)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen es demasiado grande. Máximo 5MB.');
      return;
    }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      set('image', ev.target?.result as string);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Requerido';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = 'Precio inválido';
    if (!form.image.trim()) e.image = 'Requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (validate()) onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
          <h3 className="font-bold text-deepBlack uppercase tracking-wide text-sm">
            {initial?.name ? 'Editar Producto' : 'Agregar Producto'}
          </h3>
          <button
            onClick={onCancel}
            className="px-6 py-4 bg-white text-gray-500 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
        </div>

        <div className="px-6 py-6 space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-lightGray mb-1">
              Nombre del producto *
            </label>
            <input
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Ej: Vestido Floral Midi"
              className={`w-full border px-3 py-2.5 text-sm focus:outline-none focus:border-neonPink rounded-sm ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Precio */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-lightGray mb-1">
                Precio (USD) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lightGray text-sm font-bold">$</span>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => set('price', e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={`w-full border pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:border-neonPink rounded-sm ${errors.price ? 'border-red-400' : 'border-gray-200'}`}
                />
              </div>
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-lightGray mb-1">
                Descuento
              </label>
              <select
                value={form.discount}
                onChange={(e) => set('discount', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-neonPink rounded-sm bg-white"
              >
                {DISCOUNT_OPTIONS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Marca y Categoría */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-lightGray mb-1">
                Marca
              </label>
              <input
                value={form.brand}
                onChange={(e) => set('brand', e.target.value)}
                placeholder="SHEIN"
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-neonPink rounded-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-lightGray mb-1">
                Categoría
              </label>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value as Category)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-neonPink rounded-sm bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tallas y Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-lightGray mb-2">
                Tallas disponibles
              </label>
              <div className="flex flex-wrap gap-1.5">
                {STANDARD_SIZES.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-2.5 py-1.5 text-xs font-bold border transition-colors ${
                      form.sizes.includes(size)
                        ? 'bg-brandDark text-white border-brandDark'
                        : 'bg-white text-lightGray border-gray-200 hover:border-brandDark'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-lightGray mt-1">
                {form.sizes.length === 0 ? 'Sin tallas (talla única)' : form.sizes.join(', ')}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-lightGray mb-1">
                Stock disponible
              </label>
              <input
                type="number"
                value={form.stock}
                onChange={e => set('stock', e.target.value)}
                placeholder="Ej: 10"
                min="0"
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-neonPink rounded-sm"
              />
              <p className="text-[10px] text-lightGray mt-1">Deja vacío si no quieres mostrar stock</p>
            </div>
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-lightGray mb-2">
              Imagen del producto *
            </label>

            {/* Tabs */}
            <div className="flex border border-gray-200 rounded-sm overflow-hidden mb-3">
              <button
                type="button"
                onClick={() => setImageTab('upload')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors ${
                  imageTab === 'upload' ? 'bg-brandDark text-white' : 'bg-white text-lightGray hover:bg-gray-50'
                }`}
              >
                <Upload size={12} /> Subir foto
              </button>
              <button
                type="button"
                onClick={() => setImageTab('url')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors ${
                  imageTab === 'url' ? 'bg-brandDark text-white' : 'bg-white text-lightGray hover:bg-gray-50'
                }`}
              >
                <Link size={12} /> Pegar URL
              </button>
            </div>

            {imageTab === 'upload' ? (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full border-2 border-dashed border-gray-200 rounded-sm py-6 flex flex-col items-center gap-2 hover:border-neonPink hover:bg-pink-50/30 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Upload size={24} className="text-lightGray" />
                  <span className="text-xs text-lightGray font-medium">
                    {uploading ? 'Cargando...' : 'Haz clic para seleccionar imagen'}
                  </span>
                  <span className="text-[10px] text-lightGray/60">JPG, PNG, WEBP · Máx. 5MB</span>
                </button>
                {form.image?.startsWith('data:') && (
                  <p className="text-[10px] text-green-600 mt-1.5 font-medium">✓ Imagen cargada correctamente</p>
                )}
              </div>
            ) : (
              <div>
                <input
                  value={form.image?.startsWith('data:') ? '' : form.image}
                  onChange={(e) => set('image', e.target.value)}
                  placeholder="https://ejemplo.com/foto.jpg"
                  className={`w-full border px-3 py-2.5 text-sm focus:outline-none focus:border-neonPink rounded-sm ${errors.image ? 'border-red-400' : 'border-gray-200'}`}
                />
                <p className="text-[10px] text-lightGray mt-1">
                  Pega el enlace directo de la imagen (imgbb, unsplash, etc.)
                </p>
              </div>
            )}

            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}

            {/* Preview */}
            {form.image && (
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={form.image}
                  alt="preview"
                  className="h-20 w-20 object-cover rounded-sm border border-gray-100 bg-gray-50"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <div>
                  <p className="text-xs font-medium text-deepBlack">Vista previa</p>
                  <button
                    type="button"
                    onClick={() => { set('image', ''); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                    className="text-[10px] text-neonPink hover:underline mt-0.5"
                  >
                    Quitar imagen
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 bg-brandDark text-white py-3 font-bold uppercase tracking-widest text-xs hover:bg-neonPink transition-colors flex items-center justify-center gap-2"
          >
            <Check size={16} />
            {initial?.name ? 'Guardar Cambios' : 'Agregar Producto'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-200 text-deepBlack text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

type AdminPanelProps = { onClose: () => void };
export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [pwd, setPwd] = useState('');
  const correctPwd = 'admin123'; // TODO: cambiar clave según necesidad

  const { products, addProduct, updateProduct, deleteProduct, resetToDefaults } = useProductStore();
  const { images: heroImgs, addImage, removeImage, setImages } = useHeroStore();
  const [activeTab, setActiveTab] = useState<'products' | 'hero'>('products');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [filterCat, setFilterCat] = useState<'all' | Category>('all');
  const [search, setSearch] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [heroSaveStatus, setHeroSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [heroUploading, setHeroUploading] = useState(false);
  const heroFileRef = useRef<HTMLInputElement>(null);

  // Render login screen if not authenticated
  if (!isAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-deepBlack/60 backdrop-blur-sm">
        <div className="bg-white rounded-[2rem] p-8 shadow-lg max-w-sm w-full">
          <h2 className="text-xl font-bold mb-4">Acceso Administrador</h2>
          <input
            type="password"
            placeholder="Clave"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            className="w-full border border-gray-200 rounded px-3 py-2 mb-4"
          />
          <button
            onClick={() => {
              if (pwd === correctPwd) setIsAuth(true);
              else alert('Clave incorrecta');
            }}
            className="w-full bg-brandDark text-white py-2 rounded hover:bg-neonPink transition"
          >
            Entrar
          </button>
          <button
            onClick={onClose}
            className="mt-2 w-full text-center text-gray-500 hover:underline"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  // Guarda en archivo sin recargar la página
  const saveToFile = async (productList: typeof products) => {
    const res = await fetch('/api/save-products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productList),
    });
    if (!res.ok) throw new Error('Error al guardar');
  };

  const handleSavePermanent = async () => {
    setSaveStatus('saving');
    try {
      await saveToFile(products);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3500);
    }
  };

  const filtered = products.filter((p) => {
    const matchCat = filterCat === 'all' || p.category === filterCat;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSaveNew = async (data: typeof emptyForm) => {
    addProduct({
      name: data.name,
      price: Number(data.price),
      brand: data.brand,
      category: data.category,
      image: data.image,
      sizes: data.sizes.length > 0 ? data.sizes : undefined,
      stock: data.stock !== '' ? Number(data.stock) : undefined,
    } as any);
    setShowForm(false);
    // Guardar automáticamente en archivo
    const updated = useProductStore.getState().products;
    setSaveStatus('saving');
    try {
      await saveToFile(updated);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3500);
    }
  };

  const handleSaveEdit = async (data: typeof emptyForm) => {
    if (!editingProduct) return;
    updateProduct(editingProduct.id, {
      name: data.name,
      price: Number(data.price),
      brand: data.brand,
      category: data.category,
      image: data.image,
      sizes: data.sizes.length > 0 ? data.sizes : undefined,
      stock: data.stock !== '' ? Number(data.stock) : undefined,
    } as any);
    setEditingProduct(null);
    // Guardar automáticamente en archivo
    const updated = useProductStore.getState().products;
    setSaveStatus('saving');
    try {
      await saveToFile(updated);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3500);
    }
  };

  const handleDelete = async (id: string) => {
    deleteProduct(id);
    // Guardar automáticamente en archivo
    const updated = useProductStore.getState().products.filter(p => p.id !== id);
    try {
      await saveToFile(updated);
    } catch {
      console.error('Error auto-guardando tras eliminar');
    }
  };

  const handleReset = () => {
    resetToDefaults();
    setConfirmReset(false);
  };

  const catLabel = (c: string) =>
    CATEGORIES.find((x) => x.id === c)?.label ?? c;

  // ── Hero carousel handlers ──────────────────────────
  const saveHeroToFile = async (imgs: typeof heroImgs) => {
    const res = await fetch('/api/save-hero-images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(imgs),
    });
    if (!res.ok) throw new Error('Error al guardar');
    const data = await res.json();
    // Actualizar store con paths limpios devueltos por el servidor
    if (data.images) setImages(data.images);
  };

  const handleHeroFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Selecciona una imagen válida'); return; }
    if (file.size > 8 * 1024 * 1024) { alert('Máximo 8MB'); return; }
    setHeroUploading(true);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const src = ev.target?.result as string;
      const newImg = { id: `hero-${Date.now()}`, src, alt: file.name.replace(/\.[^.]+$/, '') };
      const updated = [...useHeroStore.getState().images, newImg];
      addImage(newImg);
      setHeroUploading(false);
      setHeroSaveStatus('saving');
      try {
        await saveHeroToFile(updated);
        setHeroSaveStatus('success');
        setTimeout(() => setHeroSaveStatus('idle'), 2000);
      } catch {
        setHeroSaveStatus('error');
        setTimeout(() => setHeroSaveStatus('idle'), 3000);
      }
    };
    reader.readAsDataURL(file);
    // reset input
    if (heroFileRef.current) heroFileRef.current.value = '';
  };

  const handleHeroRemove = async (id: string) => {
    removeImage(id);
    const updated = useHeroStore.getState().images.filter(i => i.id !== id);
    try { await saveHeroToFile(updated); } catch { /* silent */ }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[150] bg-deepBlack/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="fixed inset-0 z-[151] flex flex-col bg-white overflow-hidden">

        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-5 bg-deepBlack text-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <ShieldAlert size={20} className="text-neonPink" />
            <h2 className="font-bold text-lg uppercase tracking-widest">Panel de Administración</h2>
            <span className="bg-neonPink text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              {products.length} productos
            </span>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 bg-white flex-shrink-0">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors ${
              activeTab === 'products' ? 'border-brandDark text-brandDark' : 'border-transparent text-lightGray hover:text-deepBlack'
            }`}
          >
            <ShieldAlert size={14} /> Catálogo
          </button>
          <button
            onClick={() => setActiveTab('hero')}
            className={`flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors ${
              activeTab === 'hero' ? 'border-brandDark text-brandDark' : 'border-transparent text-lightGray hover:text-deepBlack'
            }`}
          >
            <Images size={14} /> Carrusel del Hero
            <span className="bg-gray-100 text-lightGray text-[10px] font-bold px-1.5 py-0.5 rounded-full">{heroImgs.length}</span>
          </button>
        </div>

        {/* Toolbar — solo para catálogo */}
        {activeTab === 'products' && <div className="flex flex-wrap items-center gap-3 px-8 py-4 border-b border-gray-100 flex-shrink-0 bg-gray-50">
          <button
            onClick={() => setShowForm(true)}
            className="bg-brandDark text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-neonPink transition-colors flex items-center gap-2 rounded-sm"
          >
            <Plus size={14} /> Agregar Producto
          </button>

          {/* Botón Guardar catálogo */}
          <button
            onClick={handleSavePermanent}
            disabled={saveStatus === 'saving'}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 rounded-sm transition-colors border ${
              saveStatus === 'success'
                ? 'bg-green-50 border-green-400 text-green-700'
                : saveStatus === 'error'
                ? 'bg-red-50 border-red-400 text-red-700'
                : 'bg-white border-gray-300 text-deepBlack hover:border-neonPink hover:text-neonPink'
            } disabled:opacity-60`}
          >
            {saveStatus === 'saving' && <Loader size={14} className="animate-spin" />}
            {saveStatus === 'success' && <CheckCircle size={14} />}
            {saveStatus === 'error' && <AlertCircle size={14} />}
            {saveStatus === 'idle' && <Save size={14} />}
            {saveStatus === 'saving' ? 'Guardando...' : saveStatus === 'success' ? '¡Guardado!' : saveStatus === 'error' ? 'Error al guardar' : 'Guardar catálogo'}
          </button>

          <div className="flex items-center gap-2 ml-auto">
            {/* Filter by category */}
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value as 'all' | Category)}
              className="border border-gray-200 px-3 py-2 text-xs rounded-sm bg-white focus:outline-none"
            >
              <option value="all">Todas las categorías</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>

            {/* Search */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar producto..."
              className="border border-gray-200 px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-neonPink w-44"
            />

            {/* Reset */}
            {confirmReset ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-500 font-medium">¿Confirmar?</span>
                <button onClick={handleReset} className="bg-red-500 text-white px-3 py-2 text-xs font-bold rounded-sm hover:bg-red-600">Sí, resetear</button>
                <button onClick={() => setConfirmReset(false)} className="border border-gray-200 px-3 py-2 text-xs rounded-sm hover:bg-gray-100">No</button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmReset(true)}
                className="border border-gray-200 text-lightGray px-3 py-2 text-xs rounded-sm hover:bg-gray-100 flex items-center gap-1.5"
              >
                <RotateCcw size={12} /> Restablecer
              </button>
            )}
          </div>
        </div>}

        {/* ── Sección Carrusel del Hero ─────────────── */}
        {activeTab === 'hero' && (
          <div className="flex-1 overflow-y-auto px-8 py-8">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs text-lightGray mb-6">
                Estas imágenes aparecen en el carrusel de la sección principal. Se guardan automáticamente al subir o eliminar.
              </p>

              {/* Subir imagen */}
              <input ref={heroFileRef} type="file" accept="image/*" onChange={handleHeroFileChange} className="hidden" />
              <button
                onClick={() => heroFileRef.current?.click()}
                disabled={heroUploading || heroSaveStatus === 'saving'}
                className="w-full border-2 border-dashed border-gray-200 rounded-sm py-8 flex flex-col items-center gap-3 hover:border-brandDark hover:bg-brandDark/5 transition-colors disabled:opacity-50 mb-8 cursor-pointer"
              >
                {heroUploading || heroSaveStatus === 'saving' ? (
                  <><Loader size={28} className="text-lightGray animate-spin" /><span className="text-xs text-lightGray font-medium">Guardando imagen...</span></>
                ) : heroSaveStatus === 'success' ? (
                  <><CheckCircle size={28} className="text-green-500" /><span className="text-xs text-green-600 font-medium">¡Imagen guardada!</span></>
                ) : (
                  <><Upload size={28} className="text-lightGray" /><span className="text-xs text-lightGray font-medium">Haz clic para subir una foto al carrusel</span><span className="text-[10px] text-lightGray/60">JPG, PNG, WEBP · Máx. 8MB</span></>
                )}
              </button>

              {/* Grid de imágenes actuales */}
              {heroImgs.length === 0 ? (
                <p className="text-center text-sm text-lightGray py-12">No hay imágenes en el carrusel.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {heroImgs.map((img, i) => (
                    <div key={img.id} className="relative group aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm">
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/300x400/f5f5f5/999?text=Error'; }} />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => handleHeroRemove(img.id)}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        #{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Product Table ─────────────────────────── */}
        {activeTab === 'products' && <div className="flex-1 overflow-y-auto px-8 py-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-lightGray gap-3">
              <p className="text-sm">No hay productos que coincidan.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-widest text-lightGray w-16">Img</th>
                  <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-widest text-lightGray">Nombre</th>
                  <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-widest text-lightGray">Precio</th>
                  <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-widest text-lightGray">Tallas</th>
                  <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-widest text-lightGray">Stock</th>
                  <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-widest text-lightGray">Categoría</th>
                  <th className="text-right py-3 px-3 text-xs font-bold uppercase tracking-widest text-lightGray">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                    <td className="py-3 px-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-14 object-cover bg-gray-100 rounded-sm"
                      />
                    </td>
                    <td className="py-3 px-3 font-medium text-deepBlack max-w-[200px]">
                      <p className="truncate">{p.name}</p>
                      <p className="text-[10px] text-lightGray mt-0.5">ID: {p.id}</p>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-brandDark">${p.price}</span>
                      <span className="text-lightGray text-xs ml-1 line-through">${(p.price * 1.25).toFixed(0)}</span>
                    </td>
                    {/* Tallas */}
                    <td className="py-3 px-3">
                      {(p as any).sizes?.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {(p as any).sizes.map((s: string) => (
                            <span key={s} className="bg-gray-100 text-deepBlack text-[9px] font-bold px-1.5 py-0.5 uppercase">{s}</span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-lightGray text-[10px]">Única</span>
                      )}
                    </td>
                    {/* Stock */}
                    <td className="py-3 px-3">
                      {(p as any).stock !== undefined ? (
                        <span className={`text-xs font-bold ${(p as any).stock === 0 ? 'text-red-500' : (p as any).stock <= 5 ? 'text-amber-500' : 'text-green-600'}`}>
                          {(p as any).stock === 0 ? 'Agotado' : `${(p as any).stock} uds`}
                        </span>
                      ) : (
                        <span className="text-lightGray text-[10px]">—</span>
                      )}
                    </td>
                    {/* Categoría */}
                    <td className="py-3 px-3">
                      <span className="bg-gray-100 text-deepBlack text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                        {catLabel(p.category)}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-2 text-lightGray hover:text-brandDark hover:bg-gray-100 rounded-sm transition-colors"
                          title="Editar"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 text-lightGray hover:text-neonPink hover:bg-red-50 rounded-sm transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>}

        {/* Status bar */}
        <div className="px-8 py-3 bg-gray-50 border-t border-gray-100 flex-shrink-0">
          <p className="text-xs text-lightGray">
            {activeTab === 'products'
              ? <>Mostrando <strong>{filtered.length}</strong> de <strong>{products.length}</strong> productos · Los cambios se guardan automáticamente</>
              : <><strong>{heroImgs.length}</strong> {heroImgs.length === 1 ? 'imagen' : 'imágenes'} en el carrusel · Los cambios se guardan automáticamente</>
            }
          </p>
        </div>
      </div>

      {/* Form modals */}
      {showForm && (
        <ProductForm onSave={handleSaveNew} onCancel={() => setShowForm(false)} />
      )}
      {editingProduct && (
        <ProductForm
          initial={{
            ...editingProduct,
            price: editingProduct.price.toString(),
            stock: editingProduct.stock !== undefined ? editingProduct.stock.toString() : ''
          }}
          onSave={handleSaveEdit}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </>
  );
};
