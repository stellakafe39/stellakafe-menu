import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Settings,
  Sparkles,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Stella Lounge — Admin" }] }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Kontrol Paneli", icon: LayoutDashboard, exact: true },
  { to: "/admin/menu", label: "Menü Yönetimi", icon: UtensilsCrossed },
  { to: "/admin/settings", label: "Ayarlar", icon: Settings },
];

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 bg-[#070707] border-r border-[rgba(212,175,55,0.12)] flex flex-col`}
      >
        <div className="h-16 flex items-center gap-2 px-6 border-b border-[rgba(212,175,55,0.12)]">
          <Sparkles className="h-5 w-5 text-gold" />
          <span className="font-display text-lg tracking-widest text-gold">STELLA</span>
          <span className="text-xs text-muted-foreground ml-1">admin</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((n) => {
            const active = isActive(n.to, n.exact);
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all ${
                  active
                    ? "bg-[rgba(212,175,55,0.10)] text-gold border border-[rgba(212,175,55,0.25)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-gold" : ""}`} />
                <span>{n.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[rgba(212,175,55,0.12)] text-[11px] text-muted-foreground">
          v1.0 · Sadece şirket içi kullanım
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 sticky top-0 z-20 bg-[#0a0a0a]/80 backdrop-blur border-b border-[rgba(212,175,55,0.10)] flex items-center px-4 lg:px-8 gap-3">
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md hover:bg-white/5"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
          <div className="font-display tracking-widest text-sm text-muted-foreground">
            STELLA LOUNGE / <span className="text-gold">ADMIN</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
              Yayında
            </div>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gold to-[#7a5b10] flex items-center justify-center text-black text-sm font-semibold">
              S
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
