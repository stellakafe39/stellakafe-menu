import { createFileRoute, Link } from "@tanstack/react-router";
import { useAdminItems, CATEGORY_OPTIONS, categoryTitle } from "@/lib/admin-store";
import { Package, CheckCircle2, AlertCircle, TrendingUp, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { items } = useAdminItems();
  const total = items.length;
  const available = items.filter((i) => i.available).length;
  const out = total - available;
  const avg = total ? Math.round(items.reduce((s, i) => s + i.price, 0) / total) : 0;

  const stats = [
    { label: "Toplam Ürün", value: total, icon: Package },
    { label: "Mevcut", value: available, icon: CheckCircle2 },
    { label: "Tükendi", value: out, icon: AlertCircle },
    { label: "Ort. Fiyat", value: `${avg} TL`, icon: TrendingUp },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="font-display text-3xl text-foreground tracking-wide">Kontrol Paneli</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Menü performansınızın ve envanterinizin özeti.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-xl border border-[rgba(212,175,55,0.12)] bg-[#0d0d0d] p-5 hover:border-[rgba(212,175,55,0.3)] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </span>
                <Icon className="h-4 w-4 text-gold" />
              </div>
              <div className="mt-3 font-display text-3xl text-foreground">{s.value}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-[rgba(212,175,55,0.12)] bg-[#0d0d0d] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg">Kategoriye Göre Ürünler</h2>
            <Link
              to="/admin/menu"
              className="text-xs text-gold inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              Yönet <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {CATEGORY_OPTIONS.map((c) => {
              const count = items.filter((i) => i.category === c.id).length;
              const pct = total ? (count / total) * 100 : 0;
              return (
                <div key={c.id}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-foreground">{c.title}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7a5b10] to-gold rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-[rgba(212,175,55,0.12)] bg-[#0d0d0d] p-6">
          <h2 className="font-display text-lg mb-4">Son Güncellenenler</h2>
          <ul className="space-y-3">
            {items.slice(0, 5).map((i) => (
              <li key={i.id} className="flex items-center gap-3">
                <img src={i.img} alt="" className="h-10 w-10 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm">{i.name}</div>
                  <div className="text-xs text-muted-foreground">{categoryTitle(i.category)}</div>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    i.available
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                      : "bg-red-500/10 text-red-300 border border-red-500/20"
                  }`}
                >
                  {i.available ? "Yayında" : "Tükendi"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
