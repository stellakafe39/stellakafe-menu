import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  LayoutDashboard, UtensilsCrossed, Settings as Cog, FolderOpen,
  Menu as MenuIcon, X, LogOut, Eye, AlertTriangle, Loader2,
  Sun, Moon, ShieldCheck, Timer, Plus, Pencil, Trash2, Search,
  UploadCloud, Image as ImageIcon, Link2, Cloud, Save, CheckCircle2,
  Package, AlertCircle, TrendingUp, ArrowRight, Database,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useAdminItems, categoryTitle, isValidDbId, type AdminItem } from "@/lib/admin-store";
import { useLiveCategories, type AdminCategory } from "@/lib/categories-store";
import { Toggle } from "@/components/admin/Toggle";
import { ThemeProvider, useTheme } from "@/lib/theme";

type AdminView = "dashboard" | "menu" | "categories" | "settings";
const MAX_ATTEMPTS = 5;
const LOCKOUT_SECS = 60;

// ── Cloudinary ────────────────────────────────────────────────────────────────
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
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body: fd });
  if (!res.ok) throw new Error("Görsel yüklenemedi");
  const data = await res.json() as { secure_url: string };
  return data.secure_url;
}

// ── Theme Toggle ──────────────────────────────────────────────────────────────
function AdminThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  return (
    <button onClick={toggleTheme} aria-label="Temayı değiştir"
      className={`relative flex items-center h-6 w-11 rounded-full border transition-all duration-500 shrink-0 ${
        isLight ? "border-amber-300/70 bg-amber-50/80" : "border-white/10 bg-white/[0.07]"
      }`}>
      <Moon className={`absolute left-1.5 h-2.5 w-2.5 transition-opacity ${isLight ? "opacity-0" : "opacity-50 text-white/70"}`} />
      <Sun  className={`absolute right-1.5 h-2.5 w-2.5 transition-opacity ${isLight ? "opacity-70 text-amber-600" : "opacity-0"}`} />
      <span className={`absolute h-4 w-4 rounded-full transition-all duration-500 ${
        isLight ? "left-[calc(100%-18px)] bg-amber-400" : "left-[2px] bg-[#2c2c2c]"
      }`} />
    </button>
  );
}

// ── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (s: unknown) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const lockUntilRef = useRef(0);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (remaining <= 0) return;
    const id = setInterval(() => {
      const left = Math.max(0, Math.ceil((lockUntilRef.current - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) { setAttempts(0); setError(""); }
    }, 1000);
    return () => clearInterval(id);
  }, [remaining]);

  const locked = remaining > 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (locked || loading || !email || !password) return;
    setLoading(true); setError("");
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (err) {
        const next = attempts + 1; setAttempts(next);
        if (next >= MAX_ATTEMPTS) {
          lockUntilRef.current = Date.now() + LOCKOUT_SECS * 1000;
          setRemaining(LOCKOUT_SECS);
          setError(`Çok fazla deneme. ${LOCKOUT_SECS}s bekleyin.`);
        } else {
          setError(`Hatalı e-posta veya şifre. (${MAX_ATTEMPTS - next} hak)`);
        }
      } else { onLogin(data.session); }
    } catch { setError("Bağlantı hatası."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <img src="/stella-logo.png" alt="Stella" className="h-16 w-auto mb-4 opacity-90" loading="eager" />
          <p className="text-[9px] tracking-[0.5em] uppercase text-muted-foreground">Admin Panel</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl shadow-black/20">
          <div className="flex items-center gap-2.5 mb-6">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h1 className="font-display text-xl text-foreground">Güvenli Giriş</h1>
          </div>
          <form onSubmit={submit} className="space-y-4" noValidate>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">E-posta</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                autoFocus autoComplete="email" disabled={locked}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Şifre</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                autoComplete="current-password" disabled={locked}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50" />
            </div>
            {error && <p className="text-xs text-red-500 flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5 shrink-0" />{error}</p>}
            {locked && <p className="text-xs text-amber-500 flex items-center gap-1.5"><Timer className="h-3.5 w-3.5 shrink-0" />{remaining}s sonra tekrar deneyin</p>}
            <button type="submit" disabled={loading || locked || !email || !password}
              className="w-full bg-primary text-black font-bold text-[11px] uppercase tracking-widest rounded-lg py-3 hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Doğrulanıyor…</> : locked ? `Kilitli (${remaining}s)` : "Giriş Yap"}
            </button>
          </form>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <a href="/" className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">← Siteye Dön</a>
          <span className="text-muted-foreground/30">·</span>
          <AdminThemeToggle />
        </div>
      </div>
    </div>
  );
}

// ── Dashboard View ────────────────────────────────────────────────────────────
function DashboardView({ items, loading, categoryOptions, setView }: {
  items: AdminItem[];
  loading: boolean;
  categoryOptions: { id: string; title: string }[];
  setView: (v: AdminView) => void;
}) {
  if (loading) return <div className="flex items-center justify-center py-24"><Loader2 className="h-6 w-6 text-primary animate-spin" /></div>;

  const total = items.length;
  const available = items.filter(i => i.available).length;
  const out = total - available;

  const stats = [
    { label: "Toplam Ürün", value: total, icon: Package, color: "text-blue-500" },
    { label: "Mevcut", value: available, icon: CheckCircle2, color: "text-emerald-500" },
    { label: "Tükendi", value: out, icon: AlertCircle, color: "text-red-500" },
    { label: "Kategori", value: categoryOptions.length, icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="font-sans text-[9px] tracking-[0.5em] uppercase text-primary/60 mb-1">Stella Lounge</p>
        <h1 className="font-display text-3xl sm:text-4xl text-foreground font-light">Kontrol Paneli</h1>
        <p className="text-sm text-muted-foreground mt-1.5 flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${isSupabaseConfigured ? "bg-emerald-400" : "bg-amber-400"}`} />
          {isSupabaseConfigured ? "Veritabanı bağlı" : "Geliştirme modu"}
          <span className="text-muted-foreground/40">·</span>{total} ürün
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.label}</span>
                <div className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Icon className={`h-3.5 w-3.5 ${s.color}`} />
                </div>
              </div>
              <div className="font-display text-4xl text-foreground font-light">{s.value}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-light text-foreground">Kategoriye Göre</h2>
            <button onClick={() => setView("menu")}
              className="text-[10px] text-primary/70 hover:text-primary flex items-center gap-1.5 uppercase tracking-wider">
              Yönet <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-4">
            {categoryOptions.map(c => {
              const count = items.filter(i => i.category === c.id).length;
              const pct = total ? (count / total) * 100 : 0;
              const avail = items.filter(i => i.category === c.id && i.available).length;
              return (
                <div key={c.id}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-foreground/80">{c.title}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{avail}/{count}</span>
                  </div>
                  <div className="h-0.5 bg-muted/60 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#7a5b10] via-primary to-[#f5e06e] rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-xl font-light text-foreground mb-4">Son Eklenenler</h2>
          <ul className="space-y-3">
            {items.slice(0, 6).map(i => (
              <li key={i.id} className="flex items-center gap-3">
                {i.img
                  ? <img src={i.img} alt="" className="h-9 w-9 rounded-lg object-cover border border-border" loading="lazy" />
                  : <div className="h-9 w-9 rounded-lg bg-muted border border-border" />}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-foreground">{i.name}</div>
                  <div className="text-[10px] text-muted-foreground">{categoryTitle(i.category, categoryOptions)}</div>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full ${i.available ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-400"}`}>
                  {i.available ? "●" : "○"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── Menu View ─────────────────────────────────────────────────────────────────
type FormState = {
  id?: string; name: string; name_bg: string; name_gr: string;
  desc: string; desc_bg: string; desc_gr: string;
  category: string; price: string; img: string;
  available: boolean;
};
const emptyForm = (cat = ""): FormState => ({
  name: "", name_bg: "", name_gr: "", desc: "", desc_bg: "", desc_gr: "",
  category: cat, price: "", img: "", available: true,
});

function MenuView({ items, loading, categoryOptions, saveItem, deleteItem, toggleAvail }: ReturnType<typeof useAdminItems>) {
  const [query, setQuery] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [confirmDelete, setConfirmDelete] = useState<AdminItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [drag, setDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imgMode, setImgMode] = useState<"upload" | "url">("upload");

  const filtered = useMemo(() =>
    items.filter(i =>
      (filterCat === "all" || i.category === filterCat) &&
      i.name.toLowerCase().includes(query.toLowerCase())
    ), [items, query, filterCat]);

  const openNew = () => {
    setForm(emptyForm(categoryOptions[0]?.id ?? ""));
    setDrawerOpen(true);
  };
  const openEdit = (it: AdminItem) => {
    // id is required for update — it must be a real Supabase UUID
    setForm({
      id: it.id,
      name: it.name, name_bg: it.name_bg, name_gr: it.name_gr,
      desc: it.desc, desc_bg: it.desc_bg, desc_gr: it.desc_gr,
      category: it.category, price: it.price, img: it.img, available: it.available,
    });
    setDrawerOpen(true);
  };
  const closeDrawer = () => { setDrawerOpen(false); setSaveError(""); };

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm(f => ({ ...f, img: url }));
    } catch (e) { setSaveError(e instanceof Error ? e.message : "Yükleme hatası"); }
    finally { setUploading(false); }
  };

  const submit = async () => {
    if (!form.name.trim() || !form.price.trim()) return;
    setSaving(true); setSaveError("");

    // form.id is ONLY set by openEdit — it is always a real Supabase UUID.
    // If form.id is undefined we are creating a brand-new item.
    const isNew = !form.id;

    const item: AdminItem = {
      id: form.id ?? "",      // empty string for new items; saveItem(isNew=true) ignores this
      name:    form.name,
      name_bg: form.name_bg || form.name,
      name_gr: form.name_gr || form.name,
      desc:    form.desc,
      desc_bg: form.desc_bg || form.desc,
      desc_gr: form.desc_gr || form.desc,
      category: form.category,
      price:    form.price,
      img:      form.img,
      available: form.available,
    };

    const res = await saveItem(item, isNew);
    if (res.error) setSaveError(res.error); else closeDrawer();
    setSaving(false);
  };

  const handleDelete = useCallback(async (id: string) => {
    const res = await deleteItem(id);
    if (res?.error) { setSaveError(res.error); }
    setConfirmDelete(null);
  }, [deleteItem]);

  const set = (patch: Partial<FormState>) => setForm(f => ({ ...f, ...patch }));

  if (loading) return <div className="flex items-center justify-center py-24"><Loader2 className="h-6 w-6 text-primary animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="font-sans text-[9px] tracking-[0.5em] uppercase text-primary/60 mb-1">Stella Lounge</p>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-foreground">Menü Yönetimi</h1>
          <p className="text-sm text-muted-foreground mt-1">{items.length} ürün · {filtered.length} görüntüleniyor</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-primary text-black px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-all">
          <Plus className="h-4 w-4" /> Yeni Ürün
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Ürünlerde ara…"
            className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/60" />
        </div>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors">
          <option value="all">Tüm Kategoriler</option>
          {categoryOptions.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="px-5 py-4 font-medium">Görsel</th>
                <th className="px-5 py-4 font-medium">Ürün</th>
                <th className="px-5 py-4 font-medium hidden md:table-cell">Kategori</th>
                <th className="px-5 py-4 font-medium">Fiyat</th>
                <th className="px-5 py-4 font-medium">Durum</th>
                <th className="px-5 py-4 font-medium text-right">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(i => {
                const canMutate = isValidDbId(i.id);
                return (
                <tr key={i.id || i.name} className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3">
                    {i.img
                      ? <img src={i.img} alt={i.name} loading="lazy" className="h-12 w-12 rounded-lg object-cover border border-border" />
                      : <div className="h-12 w-12 rounded-lg bg-muted/30 flex items-center justify-center border border-border"><ImageIcon className="h-4 w-4 text-muted-foreground" /></div>}
                  </td>
                  <td className="px-5 py-3 font-medium text-foreground">
                    {i.name}
                    {!canMutate && <span className="ml-2 text-[9px] uppercase tracking-widest text-muted-foreground/40">statik</span>}
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-muted-foreground text-xs">{categoryTitle(i.category, categoryOptions)}</td>
                  <td className="px-5 py-3 text-primary font-medium whitespace-nowrap">{i.price}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Toggle checked={i.available} onChange={() => canMutate && toggleAvail(i.id)} size="sm" />
                      <span className={`text-xs ${i.available ? "text-emerald-500" : "text-red-400"}`}>{i.available ? "Mevcut" : "Tükendi"}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => canMutate && openEdit(i)} disabled={!canMutate}
                        className={`p-2 rounded-lg transition-colors ${canMutate ? "hover:bg-primary/10 hover:text-primary text-muted-foreground" : "opacity-25 cursor-not-allowed text-muted-foreground"}`}>
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => canMutate && setConfirmDelete(i)} disabled={!canMutate}
                        className={`p-2 rounded-lg transition-colors ${canMutate ? "hover:bg-red-500/10 hover:text-red-400 text-muted-foreground" : "opacity-25 cursor-not-allowed text-muted-foreground"}`}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-16 text-center text-sm text-muted-foreground">Ürün bulunamadı.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      <div className={`fixed inset-0 z-40 bg-black/65 transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={closeDrawer} />
      <aside className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[520px] bg-background border-l border-border shadow-2xl transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}>
        <div className="h-16 px-6 flex items-center justify-between border-b border-border shrink-0">
          <h2 className="font-display text-lg text-foreground">{form.id ? "Ürünü Düzenle" : "Yeni Ürün"}</h2>
          <button onClick={closeDrawer} className="p-2 rounded-lg hover:bg-muted/40 text-muted-foreground"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <FField label="Ürün Adı (TR)"><input value={form.name} onChange={e => set({ name: e.target.value })} placeholder="Stella Martini" className="adm-inp" autoFocus /></FField>
          <FField label="Açıklama (TR)"><textarea value={form.desc} onChange={e => set({ desc: e.target.value })} rows={2} className="adm-inp resize-none" /></FField>

          <div className="space-y-2">
            <div className="flex gap-2">
              <button onClick={() => setImgMode("upload")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${imgMode === "upload" ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground"}`}><Cloud className="h-3.5 w-3.5" />Yükle</button>
              <button onClick={() => setImgMode("url")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${imgMode === "url" ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground"}`}><Link2 className="h-3.5 w-3.5" />URL</button>
            </div>
            {imgMode === "upload" ? (
              <div onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
                onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files?.[0]); }}
                className={`rounded-xl border-2 border-dashed transition-all ${drag ? "border-primary bg-primary/5" : "border-border/60 bg-muted/20"}`}>
                {form.img
                  ? <div className="p-3 flex items-center gap-3"><img src={form.img} alt="" className="h-20 w-20 rounded-lg object-cover" /><button onClick={() => set({ img: "" })} className="text-xs text-red-400 hover:underline ml-auto">Kaldır</button></div>
                  : <label className="flex flex-col items-center py-8 cursor-pointer">
                      {uploading ? <Loader2 className="h-7 w-7 text-primary animate-spin mb-2" /> : <UploadCloud className="h-7 w-7 text-primary mb-2" />}
                      <span className="text-sm text-foreground">{uploading ? "Yükleniyor…" : <><span>Sürükleyin veya </span><span className="text-primary underline">göz atın</span></>}</span>
                      {!isCloudinaryConfigured && !uploading && <span className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">Cloudinary yok — base64</span>}
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files?.[0])} disabled={uploading} />
                    </label>}
              </div>
            ) : (
              <div>
                <input type="url" value={form.img} onChange={e => set({ img: e.target.value })} placeholder="https://..." className="adm-inp" />
                {form.img && <img src={form.img} alt="" className="mt-2 h-20 w-20 rounded-lg object-cover" onError={e => (e.currentTarget.style.display = "none")} />}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FField label="Ad (BG)"><input value={form.name_bg} onChange={e => set({ name_bg: e.target.value })} placeholder="Boş = TR" className="adm-inp" /></FField>
            <FField label="Ad (GR)"><input value={form.name_gr} onChange={e => set({ name_gr: e.target.value })} placeholder="Boş = TR" className="adm-inp" /></FField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FField label="Kategori">
              <select value={form.category} onChange={e => set({ category: e.target.value })} className="adm-inp">
                {categoryOptions.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </FField>
            <FField label="Fiyat"><input value={form.price} onChange={e => set({ price: e.target.value })} placeholder="200 ₺" className="adm-inp" /></FField>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border bg-muted/20 p-4">
            <div><div className="text-sm text-foreground">Durum</div><div className="text-xs text-muted-foreground mt-0.5">{form.available ? "Menüde görünür" : "Tükendi"}</div></div>
            <Toggle checked={form.available} onChange={v => set({ available: v })} />
          </div>
          {saveError && <p className="text-sm text-red-400 flex items-center gap-2"><AlertTriangle className="h-4 w-4" />{saveError}</p>}
          <style>{`.adm-inp{width:100%;background:var(--background);border:1px solid var(--border);border-radius:.5rem;padding:.5rem .75rem;font-size:.875rem;color:var(--foreground);transition:border-color .2s}.adm-inp:focus{outline:none;border-color:var(--primary)}.adm-inp::placeholder{color:var(--muted-foreground);opacity:.6}.adm-inp option{background:var(--card);color:var(--foreground)}`}</style>
        </div>
        <div className="p-6 border-t border-border flex gap-3 shrink-0">
          <button onClick={closeDrawer} className="flex-1 border border-border text-foreground rounded-lg py-2.5 text-sm hover:bg-muted/40 transition-colors">İptal</button>
          <button onClick={submit} disabled={saving || uploading} className="flex-1 bg-primary text-black rounded-lg py-2.5 text-sm font-bold hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}{saving ? "Kaydediliyor…" : form.id ? "Kaydet" : "Ekle"}
          </button>
        </div>
      </aside>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75" onClick={() => setConfirmDelete(null)}>
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-display text-lg text-foreground">Ürünü sil?</h3>
            <p className="text-sm text-muted-foreground mt-2">"{confirmDelete.name}" kalıcı silinecek.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 border border-border rounded-lg py-2.5 text-sm text-foreground hover:bg-muted/40 transition-colors">İptal</button>
              <button onClick={() => handleDelete(confirmDelete.id)} className="flex-1 bg-red-500/90 text-white rounded-lg py-2.5 text-sm font-bold hover:bg-red-500">Sil</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FField({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">{label}</span>{children}</label>;
}

// ── Category View ─────────────────────────────────────────────────────────────
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

const emptyCat = (): AdminCategory => ({
  id: '', title_tr: '', title_bg: '', title_gr: '',
  subtitle_tr: '', subtitle_bg: '', subtitle_gr: '',
  cover_img: '', sort_order: 0, active: true,
});

function CategoryView() {
  const { adminCats, loading, saveCategory, deleteCategory } = useLiveCategories();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState<AdminCategory>(emptyCat());
  const [isNew, setIsNew] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [drag, setDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<AdminCategory | null>(null);

  const openNew = () => {
    setForm(emptyCat());
    setIsNew(true);
    setSaveError('');
    setDrawerOpen(true);
  };

  const openEdit = (cat: AdminCategory) => {
    setForm({ ...cat });
    setIsNew(false);
    setSaveError('');
    setDrawerOpen(true);
  };

  const set = (patch: Partial<AdminCategory>) => setForm(f => ({ ...f, ...patch }));

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      set({ cover_img: url });
    } catch (e) { setSaveError(e instanceof Error ? e.message : 'Yükleme hatası'); }
    finally { setUploading(false); }
  };

  const submit = async () => {
    if (!form.title_tr.trim()) { setSaveError('Kategori adı zorunlu.'); return; }
    const id = isNew ? (form.id.trim() || slugify(form.title_tr)) : form.id;
    if (!id) { setSaveError('Kategori ID oluşturulamadı.'); return; }
    setSaving(true); setSaveError('');
    const res = await saveCategory({ ...form, id });
    if (res.error) setSaveError(res.error); else setDrawerOpen(false);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const res = await deleteCategory(id);
    if (res.error) setSaveError(res.error);
    setConfirmDelete(null);
  };

  if (loading) return <div className="flex items-center justify-center py-24"><Loader2 className="h-6 w-6 text-primary animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="font-sans text-[9px] tracking-[0.5em] uppercase text-primary/60 mb-1">Stella Lounge</p>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-foreground">Kategori Yönetimi</h1>
          <p className="text-sm text-muted-foreground mt-1">{adminCats.length} kayıtlı kategori</p>
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={openNew} className="inline-flex items-center gap-2 bg-primary text-black px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-all">
            <Plus className="h-4 w-4" /> Yeni Kategori
          </button>
          {!isSupabaseConfigured && (
            <p className="text-[10px] text-amber-500 text-center">Supabase bağlı değil — sadece görüntüleme</p>
          )}
        </div>
      </div>

      {adminCats.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/60 bg-muted/10 p-12 text-center">
          <p className="text-sm text-muted-foreground mb-2">Henüz kategori oluşturulmamış.</p>
          <p className="text-xs text-muted-foreground/60">
            Önce <code className="bg-muted px-1 rounded text-xs">supabase-categories-migration.sql</code> dosyasını Supabase SQL Editor'da çalıştırın.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminCats.map(cat => (
            <div key={cat.id} className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all group">
              <div className="relative h-32 overflow-hidden bg-muted">
                {cat.cover_img
                  ? <img src={cat.cover_img} alt={cat.title_tr} className="h-full w-full object-cover" loading="lazy" />
                  : <div className="h-full w-full flex items-center justify-center"><ImageIcon className="h-8 w-8 text-muted-foreground/30" /></div>}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className={`absolute top-2.5 right-2.5 h-2 w-2 rounded-full ${cat.active ? "bg-emerald-400" : "bg-red-400"}`} />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-display text-base text-foreground font-light leading-snug">{cat.title_tr}</h3>
                  <span className="font-mono text-[9px] text-muted-foreground/50 shrink-0">#{cat.sort_order}</span>
                </div>
                <p className="text-[10px] text-muted-foreground/60 mb-1 truncate">{cat.subtitle_tr}</p>
                <code className="text-[9px] text-primary/50 bg-muted/40 px-1.5 py-0.5 rounded">{cat.id}</code>
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => openEdit(cat)} className="flex-1 text-xs border border-border rounded-lg py-1.5 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center gap-1.5">
                    <Pencil className="h-3 w-3" /> Düzenle
                  </button>
                  <button onClick={() => setConfirmDelete(cat)} className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors border border-border">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drawer */}
      <div className={`fixed inset-0 z-40 bg-black/65 transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setDrawerOpen(false)} />
      <aside className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[520px] bg-background border-l border-border shadow-2xl transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}>
        <div className="h-16 px-6 flex items-center justify-between border-b border-border shrink-0">
          <h2 className="font-display text-lg text-foreground">{isNew ? "Yeni Kategori" : "Kategoriyi Düzenle"}</h2>
          <button onClick={() => setDrawerOpen(false)} className="p-2 rounded-lg hover:bg-muted/40 text-muted-foreground"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <FField label="Kategori Adı (TR) *">
            <input value={form.title_tr} onChange={e => {
              set({ title_tr: e.target.value, ...(isNew ? { id: slugify(e.target.value) } : {}) });
            }} placeholder="Soğuk İçecekler" className="adm-inp" autoFocus />
          </FField>

          {isNew && (
            <FField label="ID (otomatik — değiştirebilirsiniz)">
              <input value={form.id} onChange={e => set({ id: e.target.value })} placeholder="soguk_icecekler" className="adm-inp font-mono" />
            </FField>
          )}

          <FField label="Alt Başlık (TR)">
            <input value={form.subtitle_tr} onChange={e => set({ subtitle_tr: e.target.value })} placeholder="Serinletici içecekler" className="adm-inp" />
          </FField>

          <div className="grid grid-cols-2 gap-3">
            <FField label="Ad (BG)"><input value={form.title_bg} onChange={e => set({ title_bg: e.target.value })} placeholder="Boş = TR" className="adm-inp" /></FField>
            <FField label="Ad (GR)"><input value={form.title_gr} onChange={e => set({ title_gr: e.target.value })} placeholder="Boş = TR" className="adm-inp" /></FField>
          </div>

          <div className="space-y-2">
            <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">Kapak Görseli</span>
            <div onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
              onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files?.[0]); }}
              className={`rounded-xl border-2 border-dashed transition-all ${drag ? "border-primary bg-primary/5" : "border-border/60 bg-muted/20"}`}>
              {form.cover_img
                ? (
                  <div className="p-3 flex items-center gap-3">
                    <img src={form.cover_img} alt="" className="h-20 w-20 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground truncate">{form.cover_img.length > 50 ? form.cover_img.slice(0, 50) + '…' : form.cover_img}</p>
                    </div>
                    <button onClick={() => set({ cover_img: '' })} className="text-xs text-red-400 hover:underline shrink-0">Kaldır</button>
                  </div>
                )
                : (
                  <label className="flex flex-col items-center py-8 cursor-pointer">
                    {uploading ? <Loader2 className="h-7 w-7 text-primary animate-spin mb-2" /> : <UploadCloud className="h-7 w-7 text-primary mb-2" />}
                    <span className="text-sm text-foreground">{uploading ? "Yükleniyor…" : <><span>Sürükleyin veya </span><span className="text-primary underline">göz atın</span></>}</span>
                    {!isCloudinaryConfigured && !uploading && <span className="text-[10px] text-amber-500 mt-1">Cloudinary ayarlanmamış — .env dosyasına ekleyin</span>}
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files?.[0])} disabled={uploading} />
                  </label>
                )}
            </div>
            <input
              type="url"
              value={form.cover_img}
              onChange={e => set({ cover_img: e.target.value })}
              placeholder="veya doğrudan URL girin: https://..."
              className="adm-inp text-xs"
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-muted/20 p-4">
            <div><div className="text-sm text-foreground">Aktif</div><div className="text-xs text-muted-foreground mt-0.5">{form.active ? "Menüde görünür" : "Gizli"}</div></div>
            <Toggle checked={form.active} onChange={v => set({ active: v })} />
          </div>

          {saveError && <p className="text-sm text-red-400 flex items-center gap-2"><AlertTriangle className="h-4 w-4" />{saveError}</p>}
          <style>{`.adm-inp{width:100%;background:var(--background);border:1px solid var(--border);border-radius:.5rem;padding:.5rem .75rem;font-size:.875rem;color:var(--foreground);transition:border-color .2s}.adm-inp:focus{outline:none;border-color:var(--primary)}.adm-inp::placeholder{color:var(--muted-foreground);opacity:.6}.adm-inp option{background:var(--card);color:var(--foreground)}`}</style>
        </div>
        <div className="p-6 border-t border-border flex gap-3 shrink-0">
          <button onClick={() => setDrawerOpen(false)} className="flex-1 border border-border text-foreground rounded-lg py-2.5 text-sm hover:bg-muted/40 transition-colors">İptal</button>
          <button onClick={submit} disabled={saving || uploading} className="flex-1 bg-primary text-black rounded-lg py-2.5 text-sm font-bold hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}{saving ? "Kaydediliyor…" : isNew ? "Oluştur" : "Kaydet"}
          </button>
        </div>
      </aside>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75" onClick={() => setConfirmDelete(null)}>
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-display text-lg text-foreground">Kategoriyi sil?</h3>
            <p className="text-sm text-muted-foreground mt-2">"{confirmDelete.title_tr}" kategorisi Supabase'den silinecek. Ürünler etkilenmez.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 border border-border rounded-lg py-2.5 text-sm text-foreground hover:bg-muted/40 transition-colors">İptal</button>
              <button onClick={() => handleDelete(confirmDelete.id)} className="flex-1 bg-red-500/90 text-white rounded-lg py-2.5 text-sm font-bold hover:bg-red-500">Sil</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Settings View ─────────────────────────────────────────────────────────────
type SettingsMap = { venue_name: string; phone: string; instagram: string; address: string; hours_weekday: string; hours_weekend: string; maintenance_mode: string };
const settingsDefaults: SettingsMap = {
  venue_name: "Stella Cafe & Lounge", phone: "+90 555 000 0000",
  instagram: "https://www.instagram.com/stella_cafe_lounge/",
  address: "Cumhuriyet Meydanı, No: 1, Kırklareli Merkez",
  hours_weekday: "09:00 – 00:00", hours_weekend: "09:00 – 02:00", maintenance_mode: "false",
};

function SettingsView() {
  const [settings, setSettings] = useState<SettingsMap>(settingsDefaults);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const timer = setTimeout(() => { setError("Zaman aşımı."); setLoading(false); }, 8000);
    supabase.from("settings").select("key, value")
      .then(({ data, error: err }: { data: { key: string; value: string }[] | null; error: { message: string } | null }) => {
        clearTimeout(timer);
        if (err) { setError(err.message); }
        else if (data) {
          const map: Record<string, string> = {};
          data.forEach(r => { map[r.key] = r.value; });
          setSettings(p => ({ ...p, ...map } as SettingsMap));
        }
        setLoading(false);
      })
      .catch((e: Error) => { clearTimeout(timer); setError(e.message); setLoading(false); });
  }, []);

  const set = (k: keyof SettingsMap, v: string) => setSettings(p => ({ ...p, [k]: v }));

  const save = async () => {
    setSaving(true); setError(""); setSaved(false);
    try {
      if (isSupabaseConfigured) {
        const rows = Object.entries(settings).map(([key, value]) => ({ key, value }));
        const { error: err } = await supabase.from("settings").upsert(rows, { onConflict: "key" });
        if (err) { setError(err.message); setSaving(false); return; }
      }
      setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch (e) { setError(e instanceof Error ? e.message : "Hata"); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex items-center justify-center py-24"><Loader2 className="h-6 w-6 text-primary animate-spin" /></div>;

  const inp = "w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors";

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <p className="font-sans text-[9px] tracking-[0.5em] uppercase text-primary/60 mb-1">Stella Lounge</p>
        <h1 className="font-display text-3xl sm:text-4xl text-foreground font-light">Ayarlar</h1>
      </div>
      {!isSupabaseConfigured && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/8 p-4">
          <Database className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-700 dark:text-amber-300">Supabase bağlantısı yok — değişiklikler kaydedilmez.</p>
        </div>
      )}
      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        <h2 className="font-display text-lg text-primary">İşletme Bilgileri</h2>
        {(["venue_name", "phone", "instagram"] as const).map(k => (
          <label key={k} className="block">
            <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              {k === "venue_name" ? "İşletme Adı" : k === "phone" ? "Telefon" : "Instagram URL"}
            </span>
            <input value={settings[k]} onChange={e => set(k, e.target.value)} className={inp} />
          </label>
        ))}
        <label className="block">
          <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Adres</span>
          <textarea value={settings.address} onChange={e => set("address", e.target.value)} rows={2} className={`${inp} resize-none`} />
        </label>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        <h2 className="font-display text-lg text-primary">Çalışma Saatleri</h2>
        <label className="block">
          <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Pazartesi – Perşembe</span>
          <input value={settings.hours_weekday} onChange={e => set("hours_weekday", e.target.value)} placeholder="09:00 – 00:00" className={inp} />
        </label>
        <label className="block">
          <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Cuma – Pazar</span>
          <input value={settings.hours_weekend} onChange={e => set("hours_weekend", e.target.value)} placeholder="09:00 – 02:00" className={inp} />
        </label>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="font-display text-lg text-primary mb-5">Site Ayarları</h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-foreground">Bakım Modu</div>
            <div className="text-xs text-muted-foreground mt-0.5">Ziyaretçilere bakım mesajı gösterir.</div>
          </div>
          <Toggle checked={settings.maintenance_mode === "true"} onChange={v => set("maintenance_mode", String(v))} />
        </div>
      </div>
      {error && <p className="text-sm text-red-500 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"><AlertTriangle className="h-4 w-4" />{error}</p>}
      <button onClick={save} disabled={saving}
        className="inline-flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all disabled:opacity-60">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
        {saving ? "Kaydediliyor…" : saved ? "Kaydedildi!" : "Değişiklikleri Kaydet"}
      </button>
    </div>
  );
}

// ── Authed Admin ──────────────────────────────────────────────────────────────
function AuthedAdmin({ onSignOut }: { onSignOut: () => void }) {
  const [view, setView] = useState<AdminView>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const adminData = useAdminItems();

  const nav = [
    { id: "dashboard"  as AdminView, label: "Kontrol Paneli",    icon: LayoutDashboard },
    { id: "menu"       as AdminView, label: "Menü Yönetimi",     icon: UtensilsCrossed },
    { id: "categories" as AdminView, label: "Kategoriler",        icon: FolderOpen },
    { id: "settings"   as AdminView, label: "Ayarlar",           icon: Cog },
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 bg-card border-r border-border flex flex-col`}>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
        <div className="h-16 flex items-center gap-3 px-5 border-b border-border">
          <img src="/stella-logo.png" alt="Stella" className="h-10 w-auto object-contain" loading="eager" />
          <div className="h-4 w-px bg-primary/25" />
          <span className="font-display text-[11px] tracking-[0.4em] text-primary/50 italic">admin</span>
        </div>
        <nav className="flex-1 p-3 pt-4 space-y-0.5">
          {nav.map(n => {
            const active = view === n.id;
            const Icon = n.icon;
            return (
              <button key={n.id} onClick={() => { setView(n.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${active ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"}`}>
                <Icon className={`h-4 w-4 shrink-0 ${active ? "text-primary" : ""}`} />
                <span className={active ? "font-medium" : ""}>{n.label}</span>
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(212,175,55,0.8)]" />}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-0.5">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent transition-all">
            <Eye className="h-4 w-4 shrink-0" />Siteyi Görüntüle
          </a>
          {isSupabaseConfigured && (
            <button onClick={onSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-red-500 hover:bg-red-500/5 border border-transparent transition-all">
              <LogOut className="h-4 w-4 shrink-0" />Çıkış Yap
            </button>
          )}
          <div className="px-3 pt-2 pb-1">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/15 to-transparent mb-2" />
            <div className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${isSupabaseConfigured ? "bg-emerald-400" : "bg-amber-400"}`} />
              <p className="text-[10px] text-muted-foreground/40">{isSupabaseConfigured ? "Veritabanı bağlı" : "Geliştirme modu"}</p>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/70 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {!isSupabaseConfigured && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center gap-2 shrink-0">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span className="text-[11px] text-amber-600 dark:text-amber-300">Geliştirme modu — Supabase yapılandırılmamış.</span>
          </div>
        )}
        <header className="h-16 sticky top-0 z-20 bg-background/95 backdrop-blur-2xl border-b border-border flex items-center px-4 lg:px-8 gap-3 shrink-0">
          <button onClick={() => setSidebarOpen(v => !v)} className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors">
            {sidebarOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
          <div className="font-display text-base tracking-[0.25em] text-muted-foreground/60 select-none">
            Stella <span className="text-primary/80">·</span> <span className="text-primary font-medium">Admin</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-muted-foreground/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />Yayında
            </div>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <AdminThemeToggle />
            <div className="h-6 w-px bg-border" />
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-[#7a5b10] flex items-center justify-center text-black text-xs font-bold">S</div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden overflow-y-auto">
          {view === "dashboard"  && <DashboardView {...adminData} setView={setView} />}
          {view === "menu"       && <MenuView {...adminData} />}
          {view === "categories" && <CategoryView />}
          {view === "settings"   && <SettingsView />}
        </main>
      </div>
    </div>
  );
}

// ── Root: standalone app, no TanStack Router ──────────────────────────────────
function AdminRoot() {
  const [session, setSession] = useState<unknown>(null);
  const [authChecked, setAuthChecked] = useState(!isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;
    const timer = setTimeout(() => { if (active) setAuthChecked(true); }, 4000);
    supabase.auth.getSession()
      .then(({ data }: { data: { session: unknown } }) => { if (!active) return; clearTimeout(timer); setSession(data?.session ?? null); setAuthChecked(true); })
      .catch(() => { if (!active) return; clearTimeout(timer); setAuthChecked(true); });
    return () => { active = false; clearTimeout(timer); };
  }, []);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <img src="/stella-logo.png" alt="Stella" className="h-12 w-auto opacity-60" loading="eager" />
        <Loader2 className="h-6 w-6 text-primary animate-spin" />
        <p className="text-xs text-muted-foreground/50 tracking-widest uppercase">Doğrulanıyor…</p>
      </div>
    );
  }

  if (isSupabaseConfigured && !session) {
    return <LoginScreen onLogin={(s) => setSession(s)} />;
  }

  return <AuthedAdmin onSignOut={async () => {
    if (isSupabaseConfigured) try { await supabase.auth.signOut(); } catch { /* ignore */ }
    setSession(null);
  }} />;
}

export function AdminApp() {
  return (
    <ThemeProvider>
      <AdminRoot />
    </ThemeProvider>
  );
}
