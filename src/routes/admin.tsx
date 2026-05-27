import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Settings,
  Menu as MenuIcon,
  X,
  LogOut,
  Eye,
  AlertTriangle,
  Loader2,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Stella Lounge — Admin Panel" }] }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Kontrol Paneli", icon: LayoutDashboard, exact: true },
  { to: "/admin/menu", label: "Menü Yönetimi", icon: UtensilsCrossed },
  { to: "/admin/settings", label: "Ayarlar", icon: Settings },
];

// ── Theme toggle (aynı Navbar'daki gibi) ─────────────────────────────────────
function AdminThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  return (
    <button
      onClick={toggleTheme}
      aria-label={isLight ? "Karanlık moda geç" : "Aydınlık moda geç"}
      title={isLight ? "Karanlık mod" : "Aydınlık mod"}
      className={`relative flex items-center h-6 w-11 rounded-full border transition-all duration-500 shrink-0 ${
        isLight
          ? "border-amber-300/70 bg-amber-50/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)]"
          : "border-white/10 bg-white/[0.07] shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]"
      }`}
    >
      <Moon className={`absolute left-1.5 h-2.5 w-2.5 transition-all duration-300 ${isLight ? "opacity-0 scale-50" : "opacity-50 scale-100 text-white/70"}`} />
      <Sun  className={`absolute right-1.5 h-2.5 w-2.5 transition-all duration-300 ${isLight ? "opacity-70 scale-100 text-amber-600" : "opacity-0 scale-50"}`} />
      <span className={`absolute h-4 w-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isLight
          ? "left-[calc(100%-18px)] bg-amber-400 shadow-[0_0_8px_rgba(212,175,55,0.5),0_1px_3px_rgba(0,0,0,0.2)]"
          : "left-[2px] bg-[#2c2c2c] shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
      }`} />
    </button>
  );
}

// ── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (session: unknown) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError("E-posta veya şifre hatalı.");
      setLoading(false);
    } else {
      onLogin(data.session);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-fade-up">
        <div className="flex flex-col items-center mb-10">
          <img src="/stella-logo.png" alt="Stella Cafe & Lounge" className="h-14 w-auto object-contain mb-4 opacity-90" loading="eager" />
          <p className="text-[9px] tracking-[0.5em] uppercase text-muted-foreground">Admin Panel</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
          <h1 className="font-display text-2xl text-foreground mb-1">Giriş Yap</h1>
          <p className="text-xs text-muted-foreground mb-7">Devam etmek için kimliğinizi doğrulayın.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">E-posta</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </label>

            <label className="block">
              <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Şifre</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </label>

            {error && (
              <div className="flex items-center gap-2 text-xs text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-primary text-black font-bold tracking-[0.2em] text-[11px] uppercase rounded-lg py-3 hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
            </button>
          </form>
        </div>

        <div className="mt-5 text-center flex items-center justify-center gap-4">
          <Link to="/" className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            ← Siteye Dön
          </Link>
          <span className="text-muted-foreground/30">·</span>
          <AdminThemeToggle />
        </div>
      </div>
    </div>
  );
}

function DevBanner() {
  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center gap-2 shrink-0">
      <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
      <span className="text-[11px] text-amber-600 dark:text-amber-300">
        Geliştirme modu — Supabase yapılandırılmamış. Veriler yalnızca bu oturumda kaydedilir.
      </span>
    </div>
  );
}

// ── Admin Layout ──────────────────────────────────────────────────────────────
function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>(null);
  const [checking, setChecking] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let done = false;
    const timer = setTimeout(() => {
      if (!done) { done = true; setChecking(false); }
    }, 6000);
    supabase.auth.getSession()
      .then(({ data }: { data: { session: unknown } }) => {
        if (!done) { done = true; clearTimeout(timer); setSession(data.session); setChecking(false); }
      })
      .catch(() => { if (!done) { done = true; clearTimeout(timer); setChecking(false); } });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: string, s: unknown) => setSession(s),
    );
    return () => { clearTimeout(timer); subscription.unsubscribe(); };
  }, []);

  if (isSupabaseConfigured && !checking && !session) {
    return <LoginScreen onLogin={(s) => setSession(s)} />;
  }

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  const handleSignOut = async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* ── Sidebar ── */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 bg-card border-r border-border flex flex-col`}
      >
        {/* Gold accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

        <div className="h-16 flex items-center gap-3 px-5 border-b border-border">
          <img src="/stella-logo.png" alt="Stella" className="h-10 w-auto object-contain" loading="eager" />
          <div className="h-4 w-px bg-primary/25" />
          <span className="font-display text-[11px] tracking-[0.4em] text-primary/50 italic">admin</span>
        </div>

        <nav className="flex-1 p-3 pt-4 space-y-0.5">
          {nav.map((n) => {
            const active = isActive(n.to, n.exact);
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  active
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 transition-colors ${active ? "text-primary" : "group-hover:text-foreground"}`} />
                <span className={active ? "font-medium" : ""}>{n.label}</span>
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(212,175,55,0.8)]" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border space-y-0.5">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent transition-all"
          >
            <Eye className="h-4 w-4 shrink-0" />
            Siteyi Görüntüle
          </Link>
          {isSupabaseConfigured && session && (
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-red-500 hover:bg-red-500/5 border border-transparent transition-all"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Çıkış Yap
            </button>
          )}
          <div className="px-3 pt-2 pb-1">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/15 to-transparent mb-2" />
            <p className="text-[10px] text-muted-foreground/35">v1.0 · Şirket içi kullanım</p>
          </div>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-30 bg-black/70 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* ── Main ── */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {!isSupabaseConfigured && <DevBanner />}

        <header className="h-16 sticky top-0 z-20 bg-background/95 backdrop-blur-2xl border-b border-border flex items-center px-4 lg:px-8 gap-3 shrink-0">
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Menüyü aç"
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
          <div className="font-display text-base tracking-[0.25em] text-muted-foreground/60 select-none">
            Stella <span className="text-primary/80">·</span> <span className="text-primary font-medium">Admin</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-muted-foreground/60 tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              Yayında
            </div>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <AdminThemeToggle />
            <div className="h-6 w-px bg-border" />
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-[#7a5b10] flex items-center justify-center text-black text-xs font-bold shadow-[0_0_12px_rgba(212,175,55,0.25)]">
              S
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden overflow-y-auto">
          {checking ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
}
