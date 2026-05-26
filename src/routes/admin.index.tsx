import { createFileRoute, Link } from "@tanstack/react-router";
import { useAdminItems, CATEGORY_OPTIONS, categoryTitle } from "@/lib/admin-store";
import { Package, CheckCircle2, AlertCircle, TrendingUp, ArrowRight, Loader2 } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { items, loading } = useAdminItems();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 text-[#d4af37] animate-spin" />
      </div>
    );
  }

  const total = items.length;
  const available = items.filter((i) => i.available).length;
  const out = total - available;
  const catCount = CATEGORY_OPTIONS.length;

  const stats = [
    { label: "Toplam Ürün", value: total, icon: Package, color: "text-blue-400" },
    { label: "Mevcut", value: available, icon: CheckCircle2, color: "text-emerald-400" },
    { label: "Tükendi", value: out, icon: AlertCircle, color: "text-red-400" },
    { label: "Kategori", value: catCount, icon: TrendingUp, color: "text-[#d4af37]" },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-sans text-[9px] tracking-[0.5em] uppercase text-[#d4af37]/60 mb-1">Stella Lounge</p>
          <h1 className="font-display text-3xl sm:text-4xl text-foreground tracking-wide font-light">Kontrol Paneli</h1>
          <p className="text-sm text-muted-foreground mt-1.5 flex items-center gap-2">
            {isSupabaseConfigured ? (
              <><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" /> Veritabanı bağlı</>
            ) : (
              <><span className="h-1.5 w-1.5 rounded-full bg-amber-400 inline-block" /> Geliştirme modu</>
            )}
            <span className="text-muted-foreground/40">·</span>
            {total} ürün yönetilyor
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="relative rounded-xl border border-[rgba(212,175,55,0.10)] bg-[#0d0d0d] p-5 hover:border-[rgba(212,175,55,0.28)] transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,175,55,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center justify-between mb-4 relative">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">{s.label}</span>
                <div className={`h-7 w-7 rounded-lg bg-white/[0.03] flex items-center justify-center`}>
                  <Icon className={`h-3.5 w-3.5 ${s.color}`} />
                </div>
              </div>
              <div className="font-display text-4xl sm:text-5xl text-foreground font-light relative">{s.value}</div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.15)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          );
        })}
      </div>

      {/* Category breakdown + recent items */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-[rgba(212,175,55,0.10)] bg-[#0d0d0d] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl font-light">Kategoriye Göre</h2>
              <p className="text-[10px] text-muted-foreground/60 tracking-wider mt-0.5 uppercase">Ürün dağılımı</p>
            </div>
            <Link
              to="/admin/menu"
              className="text-[10px] text-[#d4af37]/70 hover:text-[#d4af37] inline-flex items-center gap-1.5 hover:gap-2 transition-all tracking-wider uppercase"
            >
              Yönet <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {CATEGORY_OPTIONS.map((c) => {
              const count = items.filter((i) => i.category === c.id).length;
              const pct = total ? (count / total) * 100 : 0;
              const availC = items.filter((i) => i.category === c.id && i.available).length;
              return (
                <div key={c.id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-foreground/80">{c.title}</span>
                    <span className="text-[10px] text-muted-foreground font-mono tracking-wider">
                      {availC}<span className="text-muted-foreground/40">/{count}</span>
                    </span>
                  </div>
                  <div className="h-0.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7a5b10] via-[#d4af37] to-[#f5e06e] rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-[rgba(212,175,55,0.10)] bg-[#0d0d0d] p-6">
          <div className="mb-5">
            <h2 className="font-display text-xl font-light">Son Eklenenler</h2>
            <p className="text-[10px] text-muted-foreground/60 tracking-wider mt-0.5 uppercase">İlk 6 kayıt</p>
          </div>
          <ul className="space-y-3">
            {items.slice(0, 6).map((i) => (
              <li key={i.id} className="flex items-center gap-3 group">
                {i.img ? (
                  <img src={i.img} alt="" className="h-9 w-9 rounded-lg object-cover shrink-0 border border-[rgba(212,175,55,0.08)] group-hover:border-[rgba(212,175,55,0.2)] transition-colors" loading="lazy" decoding="async" />
                ) : (
                  <div className="h-9 w-9 rounded-lg bg-white/5 shrink-0 border border-white/[0.04]" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{i.name}</div>
                  <div className="text-[10px] text-muted-foreground/60">{categoryTitle(i.category)}</div>
                </div>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-full shrink-0 ${
                    i.available
                      ? "bg-emerald-500/8 text-emerald-400 border border-emerald-500/20"
                      : "bg-red-500/8 text-red-400 border border-red-500/20"
                  }`}
                >
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
