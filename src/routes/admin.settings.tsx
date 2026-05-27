import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2, AlertTriangle, Database } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Toggle } from "@/components/admin/Toggle";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

type Settings = {
  venue_name: string;
  phone: string;
  instagram: string;
  address: string;
  hours_weekday: string;
  hours_weekend: string;
  maintenance_mode: string;
};

const defaults: Settings = {
  venue_name: "Stella Cafe & Lounge",
  phone: "+90 555 000 0000",
  instagram: "https://www.instagram.com/stella_cafe_lounge/",
  address: "Cumhuriyet Meydanı, No: 1, Kırklareli Merkez",
  hours_weekday: "09:00 – 00:00",
  hours_weekend: "09:00 – 02:00",
  maintenance_mode: "false",
};

function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const timer = setTimeout(() => {
      setError("Bağlantı zaman aşımı — varsayılan değerler kullanılıyor.");
      setLoading(false);
    }, 8000);
    supabase
      .from("settings")
      .select("key, value")
      .then(({ data, error }: { data: Array<{ key: string; value: string }> | null; error: { message: string } | null }) => {
        clearTimeout(timer);
        if (error) {
          setError(`Ayarlar yüklenemedi: ${error.message}`);
        } else if (data) {
          const map: Record<string, string> = {};
          data.forEach((r) => { map[r.key] = r.value; });
          setSettings((prev) => ({ ...prev, ...map } as Settings));
        }
        setLoading(false);
      })
      .catch((e: Error) => {
        clearTimeout(timer);
        setError(`Bağlantı hatası: ${e.message}`);
        setLoading(false);
      });
  }, []);

  const set = (key: keyof Settings, value: string) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const save = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    if (isSupabaseConfigured) {
      const rows = Object.entries(settings).map(([key, value]) => ({ key, value }));
      const { error: err } = await supabase
        .from("settings")
        .upsert(rows, { onConflict: "key" });
      if (err) { setError(err.message); setSaving(false); return; }
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-8 animate-fade-up">
      <div>
        <p className="font-sans text-[9px] tracking-[0.5em] uppercase text-primary/60 mb-1">Stella Lounge</p>
        <h1 className="font-display text-3xl sm:text-4xl text-foreground tracking-wide font-light">Ayarlar</h1>
        <p className="text-sm text-muted-foreground mt-1.5">İşletme bilgilerini ve tercihlerinizi yönetin.</p>
      </div>

      {!isSupabaseConfigured && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/8 p-4">
          <Database className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Supabase bağlantısı yok — değişiklikler bu oturumda kaydedilmez.
          </p>
        </div>
      )}

      <section className="rounded-xl border border-border bg-card p-6 space-y-5">
        <h2 className="font-display text-lg text-primary">İşletme Bilgileri</h2>
        <Field label="İşletme Adı">
          <Inp value={settings.venue_name} onChange={(v) => set("venue_name", v)} />
        </Field>
        <Field label="Telefon">
          <Inp value={settings.phone} onChange={(v) => set("phone", v)} placeholder="+90 555 000 0000" />
        </Field>
        <Field label="Instagram URL">
          <Inp value={settings.instagram} onChange={(v) => set("instagram", v)} />
        </Field>
        <Field label="Adres">
          <textarea
            value={settings.address}
            onChange={(e) => set("address", e.target.value)}
            rows={2}
            className="adm-input resize-none"
          />
        </Field>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 space-y-5">
        <h2 className="font-display text-lg text-primary">Çalışma Saatleri</h2>
        <Field label="Pazartesi – Perşembe">
          <Inp value={settings.hours_weekday} onChange={(v) => set("hours_weekday", v)} placeholder="09:00 – 00:00" />
        </Field>
        <Field label="Cuma – Pazar">
          <Inp value={settings.hours_weekend} onChange={(v) => set("hours_weekend", v)} placeholder="09:00 – 02:00" />
        </Field>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="font-display text-lg text-primary mb-5">Site Ayarları</h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-foreground">Bakım Modu</div>
            <div className="text-xs text-muted-foreground mt-0.5">Aktif edildiğinde site ziyaretçilere bakım mesajı gösterir.</div>
          </div>
          <Toggle
            checked={settings.maintenance_mode === "true"}
            onChange={(v) => set("maintenance_mode", String(v))}
          />
        </div>
      </section>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <button
        onClick={save}
        disabled={saving}
        className="inline-flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all disabled:opacity-60"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
        {saving ? "Kaydediliyor…" : saved ? "Kaydedildi!" : "Değişiklikleri Kaydet"}
      </button>

      <style>{`
        .adm-input {
          width: 100%;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          color: var(--foreground);
          transition: border-color 0.2s;
        }
        .adm-input:focus { outline: none; border-color: var(--primary); }
        .adm-input::placeholder { color: var(--muted-foreground); opacity: 0.6; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{label}</span>
      {children}
    </label>
  );
}

function Inp({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="adm-input"
    />
  );
}
