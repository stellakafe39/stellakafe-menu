import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  UploadCloud,
  Image as ImageIcon,
  Loader2,
  AlertTriangle,
  Link2,
  Cloud,
} from "lucide-react";
import { useAdminItems, CATEGORY_OPTIONS, categoryTitle, type AdminItem } from "@/lib/admin-store";
import { Toggle } from "@/components/admin/Toggle";
import { isSupabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/admin/menu")({
  component: MenuManagement,
});

// ── Cloudinary upload ────────────────────────────────────────────────────────
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;
const isCloudinaryConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET);

async function uploadImage(file: File): Promise<string> {
  if (!isCloudinaryConfigured) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.readAsDataURL(file);
    });
  }
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", UPLOAD_PRESET!);
  fd.append("folder", "stella-menu");
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: fd },
  );
  if (!res.ok) throw new Error("Görsel yüklenemedi");
  const data = await res.json() as { secure_url: string };
  return data.secure_url;
}

// ── Types ────────────────────────────────────────────────────────────────────
type FormState = {
  id?: string;
  name: string;
  name_bg: string;
  name_gr: string;
  desc: string;
  desc_bg: string;
  desc_gr: string;
  category: string;
  price: string;
  img: string;
  available: boolean;
  sort_order: number;
};

const emptyForm = (sort = 0): FormState => ({
  name: "",
  name_bg: "",
  name_gr: "",
  desc: "",
  desc_bg: "",
  desc_gr: "",
  category: CATEGORY_OPTIONS[0]?.id ?? "",
  price: "",
  img: "",
  available: true,
  sort_order: sort,
});

// ── Main component ────────────────────────────────────────────────────────────
function MenuManagement() {
  const { items, loading, saveItem, deleteItem, toggleAvail } = useAdminItems();
  const [query, setQuery] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [drawer, setDrawer] = useState<{ open: boolean; form: FormState }>({
    open: false,
    form: emptyForm(),
  });
  const [confirmDelete, setConfirmDelete] = useState<AdminItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const filtered = useMemo(
    () =>
      items.filter((i) => {
        const matchQ = i.name.toLowerCase().includes(query.toLowerCase());
        const matchC = filterCat === "all" || i.category === filterCat;
        return matchQ && matchC;
      }),
    [items, query, filterCat],
  );

  const openNew = () =>
    setDrawer({ open: true, form: emptyForm(items.length * 10) });

  const openEdit = (it: AdminItem) =>
    setDrawer({
      open: true,
      form: {
        id: it.id,
        name: it.name,
        name_bg: it.name_bg,
        name_gr: it.name_gr,
        desc: it.desc,
        desc_bg: it.desc_bg,
        desc_gr: it.desc_gr,
        category: it.category,
        price: it.price,
        img: it.img,
        available: it.available,
        sort_order: it.sort_order,
      },
    });

  const close = () => setDrawer((d) => ({ ...d, open: false }));

  const submit = async () => {
    const f = drawer.form;
    if (!f.name.trim() || !f.price.trim()) return;
    setSaving(true);
    setSaveError("");
    const item: AdminItem = {
      id: f.id ?? `new-${Date.now()}`,
      name: f.name,
      name_bg: f.name_bg || f.name,
      name_gr: f.name_gr || f.name,
      desc: f.desc,
      desc_bg: f.desc_bg || f.desc,
      desc_gr: f.desc_gr || f.desc,
      category: f.category,
      price: f.price,
      img: f.img,
      available: f.available,
      sort_order: f.sort_order,
    };
    const res = await saveItem(item);
    if (res.error) {
      setSaveError(res.error);
    } else {
      close();
    }
    setSaving(false);
  };

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteItem(id);
      setConfirmDelete(null);
    },
    [deleteItem],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 text-[#d4af37] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-wide">Menü Yönetimi</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {items.length} ürün · {filtered.length} görüntüleniyor
            {isSupabaseConfigured && <span className="ml-2 text-emerald-400">● Supabase</span>}
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 bg-[#d4af37] text-black px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-[#e8cf85] hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all"
        >
          <Plus className="h-4 w-4" /> Yeni Ürün Ekle
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ürünlerde ara…"
            className="w-full bg-[#0d0d0d] border border-[rgba(212,175,55,0.15)] rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="bg-[#0d0d0d] border border-[rgba(212,175,55,0.15)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
        >
          <option value="all">Tüm Kategoriler</option>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[rgba(212,175,55,0.10)] bg-[#0d0d0d] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground border-b border-[rgba(212,175,55,0.08)]">
                <th className="px-5 py-4 font-medium">Görsel</th>
                <th className="px-5 py-4 font-medium">Ürün</th>
                <th className="px-5 py-4 font-medium hidden md:table-cell">Kategori</th>
                <th className="px-5 py-4 font-medium">Fiyat</th>
                <th className="px-5 py-4 font-medium">Durum</th>
                <th className="px-5 py-4 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((i) => (
                <tr
                  key={i.id}
                  className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.015] transition-colors"
                >
                  <td className="px-5 py-3">
                    {i.img ? (
                      <img
                        src={i.img}
                        alt={i.name}
                        loading="lazy"
                        decoding="async"
                        className="h-12 w-12 rounded-lg object-cover border border-[rgba(212,175,55,0.12)]"
                        width={48}
                        height={48}
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-white/[0.03] flex items-center justify-center border border-[rgba(212,175,55,0.08)]">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="font-medium">{i.name}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1 md:hidden mt-0.5">
                      {categoryTitle(i.category)}
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-muted-foreground text-xs">
                    {categoryTitle(i.category)}
                  </td>
                  <td className="px-5 py-3 text-[#d4af37] whitespace-nowrap font-medium">{i.price}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Toggle checked={i.available} onChange={() => toggleAvail(i.id)} size="sm" />
                      <span className={`text-xs ${i.available ? "text-emerald-300" : "text-red-300"}`}>
                        {i.available ? "Mevcut" : "Tükendi"}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(i)}
                        className="p-2 rounded-lg hover:bg-[#d4af37]/10 hover:text-[#d4af37] text-muted-foreground transition-colors"
                        aria-label="Düzenle"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(i)}
                        className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-muted-foreground transition-colors"
                        aria-label="Sil"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center text-sm text-muted-foreground">
                    Arama kriterlerine uyan ürün bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductDrawer
        open={drawer.open}
        form={drawer.form}
        saving={saving}
        saveError={saveError}
        onClose={close}
        onChange={(form) => setDrawer((d) => ({ ...d, form }))}
        onSubmit={submit}
      />

      {confirmDelete && (
        <Confirm
          title="Ürünü sil?"
          message={`"${confirmDelete.name}" kalıcı olarak silinecek.`}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete.id)}
        />
      )}
    </div>
  );
}

// ── Product Drawer ────────────────────────────────────────────────────────────
function ProductDrawer({
  open,
  form,
  saving,
  saveError,
  onClose,
  onChange,
  onSubmit,
}: {
  open: boolean;
  form: FormState;
  saving: boolean;
  saveError: string;
  onClose: () => void;
  onChange: (f: FormState) => void;
  onSubmit: () => void;
}) {
  const [drag, setDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [imgMode, setImgMode] = useState<"upload" | "url">("upload");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const url = await uploadImage(file);
      onChange({ ...form, img: url });
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Yükleme hatası");
    }
    setUploading(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/65 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[520px] bg-[#0a0a0a] border-l border-[rgba(212,175,55,0.15)] shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-[rgba(212,175,55,0.10)] shrink-0">
          <h2 className="font-display text-lg">{form.id ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Kapat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Image section */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <button
                onClick={() => setImgMode("upload")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${imgMode === "upload" ? "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Cloud className="h-3.5 w-3.5" /> Görsel Yükle
              </button>
              <button
                onClick={() => setImgMode("url")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${imgMode === "url" ? "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Link2 className="h-3.5 w-3.5" /> URL Gir
              </button>
            </div>

            {imgMode === "upload" ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files?.[0]); }}
                className={`rounded-xl border-2 border-dashed transition-all ${drag ? "border-[#d4af37] bg-[#d4af37]/5" : "border-[rgba(212,175,55,0.2)] bg-black/30"}`}
              >
                {form.img ? (
                  <div className="p-3 flex items-center gap-3">
                    <img src={form.img} alt="" className="h-20 w-20 rounded-lg object-cover" />
                    <div className="flex-1 text-xs text-muted-foreground">Görsel hazır</div>
                    <button onClick={() => onChange({ ...form, img: "" })} className="text-xs text-red-400 hover:underline">Kaldır</button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center py-10 cursor-pointer">
                    {uploading ? (
                      <Loader2 className="h-7 w-7 text-[#d4af37] animate-spin mb-2" />
                    ) : (
                      <UploadCloud className="h-7 w-7 text-[#d4af37] mb-2" />
                    )}
                    <div className="text-sm">
                      {uploading ? "Yükleniyor…" : <>Sürükleyin veya <span className="text-[#d4af37] underline">göz atın</span></>}
                    </div>
                    {!isCloudinaryConfigured && !uploading && (
                      <div className="text-[10px] text-amber-400 mt-1.5">Cloudinary yapılandırılmamış — base64 kullanılacak</div>
                    )}
                    <div className="text-xs text-muted-foreground mt-1">PNG, JPG maks 5MB</div>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} disabled={uploading} />
                  </label>
                )}
              </div>
            ) : (
              <div>
                <input
                  type="url"
                  value={form.img}
                  onChange={(e) => onChange({ ...form, img: e.target.value })}
                  placeholder="https://..."
                  className="adm-inp"
                />
                {form.img && (
                  <img src={form.img} alt="" className="mt-2 h-20 w-20 rounded-lg object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
                )}
              </div>
            )}

            {uploadError && (
              <p className="text-xs text-red-400 flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" /> {uploadError}
              </p>
            )}
          </div>

          {/* Turkish name + desc */}
          <Field label="Ürün Adı (TR)">
            <input value={form.name} onChange={(e) => onChange({ ...form, name: e.target.value })} placeholder="Örn. Stella Martini" className="adm-inp" />
          </Field>
          <Field label="Açıklama (TR)">
            <textarea value={form.desc} onChange={(e) => onChange({ ...form, desc: e.target.value })} rows={2} placeholder="Türkçe açıklama…" className="adm-inp resize-none" />
          </Field>

          {/* BG / GR */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Ad (BG)">
              <input value={form.name_bg} onChange={(e) => onChange({ ...form, name_bg: e.target.value })} placeholder="Boş = TR" className="adm-inp" />
            </Field>
            <Field label="Ad (GR)">
              <input value={form.name_gr} onChange={(e) => onChange({ ...form, name_gr: e.target.value })} placeholder="Boş = TR" className="adm-inp" />
            </Field>
          </div>

          {/* Category + price */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Kategori">
              <select value={form.category} onChange={(e) => onChange({ ...form, category: e.target.value })} className="adm-inp">
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </Field>
            <Field label="Fiyat">
              <input value={form.price} onChange={(e) => onChange({ ...form, price: e.target.value })} placeholder="200 ₺" className="adm-inp" />
            </Field>
          </div>

          {/* Sort order */}
          <Field label="Sıra">
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => onChange({ ...form, sort_order: Number(e.target.value) })}
              className="adm-inp"
            />
          </Field>

          {/* Status toggle */}
          <div className="flex items-center justify-between rounded-xl border border-[rgba(212,175,55,0.12)] bg-black/30 p-4">
            <div>
              <div className="text-sm">Durum</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {form.available ? "Menüde görünür" : "Tükendi olarak işaretli"}
              </div>
            </div>
            <Toggle checked={form.available} onChange={(v) => onChange({ ...form, available: v })} />
          </div>

          {saveError && (
            <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {saveError}
            </div>
          )}

          <style>{`
            .adm-inp {
              width: 100%;
              background: rgba(0,0,0,0.6);
              border: 1px solid rgba(212,175,55,0.15);
              border-radius: 0.5rem;
              padding: 0.5rem 0.75rem;
              font-size: 0.875rem;
              color: var(--foreground);
              transition: border-color 0.2s;
            }
            .adm-inp:focus { outline: none; border-color: #d4af37; }
          `}</style>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[rgba(212,175,55,0.10)] flex gap-3 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 border border-[rgba(212,175,55,0.20)] text-foreground rounded-lg py-2.5 text-sm hover:bg-white/5 transition-colors"
          >
            İptal
          </button>
          <button
            onClick={onSubmit}
            disabled={saving || uploading}
            className="flex-1 bg-[#d4af37] text-black rounded-lg py-2.5 text-sm font-bold hover:bg-[#e8cf85] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {saving ? "Kaydediliyor…" : form.id ? "Kaydet" : "Ekle"}
          </button>
        </div>
      </aside>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function Confirm({
  title,
  message,
  onCancel,
  onConfirm,
}: {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-[rgba(212,175,55,0.18)] bg-[#0d0d0d] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground mt-2">{message}</p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 border border-[rgba(212,175,55,0.20)] rounded-lg py-2.5 text-sm hover:bg-white/5 transition-colors"
          >
            İptal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500/90 text-white rounded-lg py-2.5 text-sm font-bold hover:bg-red-500 transition-colors"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}
