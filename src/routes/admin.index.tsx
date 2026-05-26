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
      <div>
        <h1 className="font-display text-3xl text-foreground tracking-wide">Kontrol Paneli</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {isSupabaseConfigured ? "Veritabanı bağlı ·" : "Geliştirme modu ·"} {total} ürün yönetilyor
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-xl border border-[rgba(212,175,55,0.10)] bg-[#0d0d0d] p-5 hover:border-[rgba(212,175,55,0.25)] transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</span>
                <Icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div className="font-display text-4xl text-foreground">{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Category breakdown + recent items */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-[rgba(212,175,55,0.10)] bg-[#0d0d0d] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg">Kategoriye Göre Ürünler</h2>
            <Link
              to="/admin/menu"
              className="text-xs text-[#d4af37] inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              Yönet <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {CATEGORY_OPTIONS.map((c) => {
              const count = items.filter((i) => i.category === c.id).length;
              const pct = total ? (count / total) * 100 : 0;
              const availC = items.filter((i) => i.category === c.id && i.available).length;
              return (
                <div key={c.id}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-foreground">{c.title}</span>
                    <span className="text-muted-foreground text-xs">
                      {availC}/{count}
                    </span>
                  </div>
                  <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7a5b10] to-[#d4af37] rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-[rgba(212,175,55,0.10)] bg-[#0d0d0d] p-6">
          <h2 className="font-display text-lg mb-4">Son Eklenenler</h2>
          <ul className="space-y-3">
            {items.slice(0, 6).map((i) => (
              <li key={i.id} className="flex items-center gap-3">
                {i.img ? (
                  <img src={i.img} alt="" className="h-9 w-9 rounded-lg object-cover shrink-0" loading="lazy" decoding="async" />
                ) : (
                  <div className="h-9 w-9 rounded-lg bg-white/5 shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm">{i.name}</div>
                  <div className="text-[10px] text-muted-foreground">{categoryTitle(i.category)}</div>
                </div>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-full shrink-0 ${
                    i.available
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                      : "bg-red-500/10 text-red-300 border border-red-500/20"
                  }`}
                >
                  {i.available ? "Mevcut" : "Tükendi"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
