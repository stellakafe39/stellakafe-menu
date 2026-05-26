import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, X, UploadCloud, Image as ImageIcon } from "lucide-react";
import { useAdminItems, CATEGORY_OPTIONS, categoryTitle, type AdminItem } from "@/lib/admin-store";
import { Toggle } from "@/components/admin/Toggle";

export const Route = createFileRoute("/admin/menu")({
  component: MenuManagement,
});

type FormState = {
  id?: string;
  name: string;
  desc: string;
  category: string;
  price: string;
  img: string;
  available: boolean;
};

const emptyForm: FormState = {
  name: "",
  desc: "",
  category: CATEGORY_OPTIONS[0]?.id ?? "",
  price: "",
  img: "",
  available: true,
};

function MenuManagement() {
  const { items, setItems } = useAdminItems();
  const [query, setQuery] = useState("");
  const [filterCat, setFilterCat] = useState<string>("all");
  const [drawer, setDrawer] = useState<{ open: boolean; form: FormState }>({
    open: false,
    form: emptyForm,
  });
  const [confirmDelete, setConfirmDelete] = useState<AdminItem | null>(null);

  const filtered = useMemo(
    () =>
      items.filter((i) => {
        const matchQ = i.name.toLowerCase().includes(query.toLowerCase());
        const matchC = filterCat === "all" || i.category === filterCat;
        return matchQ && matchC;
      }),
    [items, query, filterCat],
  );

  const openNew = () => setDrawer({ open: true, form: emptyForm });
  const openEdit = (it: AdminItem) =>
    setDrawer({
      open: true,
      form: {
        id: it.id,
        name: it.name,
        desc: it.desc,
        category: it.category,
        price: String(it.price),
        img: it.img,
        available: it.available,
      },
    });
  const close = () => setDrawer((d) => ({ ...d, open: false }));

  const submit = () => {
    const f = drawer.form;
    if (!f.name.trim() || !f.price) return;
    const priceNum = parseInt(f.price, 10) || 0;
    if (f.id) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === f.id
            ? {
                ...i,
                name: f.name,
                desc: f.desc,
                category: f.category,
                price: priceNum,
                img: f.img || i.img,
                available: f.available,
              }
            : i,
        ),
      );
    } else {
      const id = `${f.category}-${Date.now()}`;
      setItems((prev) => [
        {
          id,
          name: f.name,
          desc: f.desc,
          category: f.category,
          price: priceNum,
          img: f.img || "",
          available: f.available,
        },
        ...prev,
      ]);
    }
    close();
  };

  const toggleAvail = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, available: !i.available } : i)));

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setConfirmDelete(null);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-wide">Menü Yönetimi</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {items.length} üründen {filtered.length} tanesi gösteriliyor
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 bg-gold text-black px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#e8cf85] hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all"
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
            placeholder="Ürünlerde ara..."
            className="w-full bg-[#0d0d0d] border border-[rgba(212,175,55,0.15)] rounded-md pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="bg-[#0d0d0d] border border-[rgba(212,175,55,0.15)] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
        >
          <option value="all">Tüm Kategoriler</option>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[rgba(212,175,55,0.12)] bg-[#0d0d0d] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-[rgba(212,175,55,0.10)]">
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
                  className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3">
                    {i.img ? (
                      <img
                        src={i.img}
                        alt={i.name}
                        className="h-12 w-12 rounded-md object-cover border border-[rgba(212,175,55,0.15)]"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-md bg-white/[0.03] flex items-center justify-center">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="font-medium">{i.name}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1 max-w-md md:hidden">
                      {categoryTitle(i.category)}
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-muted-foreground">
                    {categoryTitle(i.category)}
                  </td>
                  <td className="px-5 py-3 text-gold whitespace-nowrap">{i.price} TL</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Toggle checked={i.available} onChange={() => toggleAvail(i.id)} size="sm" />
                      <span
                        className={`text-xs ${i.available ? "text-emerald-300" : "text-red-300"}`}
                      >
                        {i.available ? "Mevcut" : "Tükendi"}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(i)}
                        className="p-2 rounded-md hover:bg-gold/10 hover:text-gold text-muted-foreground transition-colors"
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(i)}
                        className="p-2 rounded-md hover:bg-red-500/10 hover:text-red-400 text-muted-foreground transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-muted-foreground">
                    Arama kriterlerinize uyan ürün bulunamadı.
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
        onClose={close}
        onChange={(form) => setDrawer((d) => ({ ...d, form }))}
        onSubmit={submit}
      />

      {confirmDelete && (
        <Confirm
          title="Ürünü sil?"
          message={`"${confirmDelete.name}" menüden kalıcı olarak silinecek.`}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => remove(confirmDelete.id)}
        />
      )}
    </div>
  );
}

function ProductDrawer({
  open,
  form,
  onClose,
  onChange,
  onSubmit,
}: {
  open: boolean;
  form: FormState;
  onClose: () => void;
  onChange: (f: FormState) => void;
  onSubmit: () => void;
}) {
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleFile = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ ...form, img: String(reader.result) });
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#0a0a0a] border-l border-[rgba(212,175,55,0.18)] shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="h-16 px-6 flex items-center justify-between border-b border-[rgba(212,175,55,0.12)]">
          <h2 className="font-display text-lg">{form.id ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-white/5 transition-colors"
            aria-label="Kapat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Image upload */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            className={`relative rounded-lg border-2 border-dashed transition-colors ${
              drag ? "border-gold bg-gold/5" : "border-[rgba(212,175,55,0.25)] bg-black/40"
            }`}
          >
            {form.img ? (
              <div className="p-3 flex items-center gap-3">
                <img src={form.img} alt="" className="h-20 w-20 rounded-md object-cover" />
                <div className="flex-1 text-xs text-muted-foreground">Görsel eklendi</div>
                <button
                  onClick={() => onChange({ ...form, img: "" })}
                  className="text-xs text-red-400 hover:underline"
                >
                  Kaldır
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center py-10 cursor-pointer">
                <UploadCloud className="h-8 w-8 text-gold mb-2" />
                <div className="text-sm">
                  Görseli sürükleyin veya <span className="text-gold underline">göz atın</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">PNG, JPG maks 5MB</div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </label>
            )}
          </div>

          <Field label="Ürün Adı">
            <input
              value={form.name}
              onChange={(e) => onChange({ ...form, name: e.target.value })}
              placeholder="Örn. Stella Martini"
              className="input"
            />
          </Field>

          <Field label="Açıklama">
            <textarea
              value={form.desc}
              onChange={(e) => onChange({ ...form, desc: e.target.value })}
              rows={3}
              placeholder="Ürün açıklaması..."
              className="input resize-none"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Kategori">
              <select
                value={form.category}
                onChange={(e) => onChange({ ...form, category: e.target.value })}
                className="input"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Fiyat (TL)">
              <input
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => onChange({ ...form, price: e.target.value })}
                placeholder="0"
                className="input"
              />
            </Field>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-[rgba(212,175,55,0.15)] bg-black/40 p-4">
            <div>
              <div className="text-sm">Durum</div>
              <div className="text-xs text-muted-foreground">
                {form.available ? "Menüde görünür" : "Tükendi olarak işaretli"}
              </div>
            </div>
            <Toggle
              checked={form.available}
              onChange={(v) => onChange({ ...form, available: v })}
            />
          </div>

          <style>{`
            .input {
              width: 100%;
              background: rgba(0,0,0,0.6);
              border: 1px solid rgba(212,175,55,0.15);
              border-radius: 0.375rem;
              padding: 0.625rem 0.75rem;
              font-size: 0.875rem;
              color: var(--foreground);
              transition: border-color 0.2s;
            }
            .input:focus { outline: none; border-color: var(--gold); }
          `}</style>
        </div>

        <div className="p-6 border-t border-[rgba(212,175,55,0.12)] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-[rgba(212,175,55,0.25)] text-foreground rounded-md py-2.5 text-sm hover:bg-white/5 transition-colors"
          >
            İptal
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 bg-gold text-black rounded-md py-2.5 text-sm font-medium hover:bg-[#e8cf85] transition-colors"
          >
            {form.id ? "Değişiklikleri Kaydet" : "Ürün Ekle"}
          </button>
        </div>
      </aside>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </span>
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-xl border border-[rgba(212,175,55,0.2)] bg-[#0d0d0d] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground mt-2">{message}</p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 border border-[rgba(212,175,55,0.25)] rounded-md py-2 text-sm hover:bg-white/5 transition-colors"
          >
            İptal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500/90 text-white rounded-md py-2 text-sm font-medium hover:bg-red-500 transition-colors"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}
