import { useState, useEffect, useCallback, useMemo } from "react";
import { categories } from "./menu-data";
import { supabase, isSupabaseConfigured } from "./supabase";

export type AdminItem = {
  id: string;
  name: string;
  name_bg: string;
  name_gr: string;
  desc: string;
  desc_bg: string;
  desc_gr: string;
  price: string;
  category: string;
  img: string;
  available: boolean;
};

export const CATEGORY_OPTIONS = categories.map((c) => ({ id: c.id, title: c.title["TR"] }));

const seed: AdminItem[] = categories.flatMap((c) =>
  c.items.map((it) => ({
    id: "",            // sentinel: seed items have no DB id
    name: it.name["TR"] ?? "",
    name_bg: it.name["BG"] ?? it.name["TR"] ?? "",
    name_gr: it.name["GR"] ?? it.name["TR"] ?? "",
    desc: it.desc["TR"] ?? "",
    desc_bg: it.desc["BG"] ?? it.desc["TR"] ?? "",
    desc_gr: it.desc["GR"] ?? it.desc["TR"] ?? "",
    price: it.price,
    category: c.id,
    img: it.img,
    available: true,
  })),
);

const LS_KEY = "stella-admin-v2";

function mapRow(r: Record<string, unknown>): AdminItem {
  return {
    id: String(r.id),
    name: String(r.name_tr ?? ""),
    name_bg: String(r.name_bg ?? ""),
    name_gr: String(r.name_gr ?? ""),
    desc: String(r.desc_tr ?? ""),
    desc_bg: String(r.desc_bg ?? ""),
    desc_gr: String(r.desc_gr ?? ""),
    price: String(r.price ?? ""),
    category: String(r.category ?? ""),
    img: String(r.img_url ?? ""),
    available: Boolean(r.available ?? true),
  };
}

export function useAdminItems() {
  const [items, setItems] = useState<AdminItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ── Fresh fetch from Supabase ─────────────────────────────────────────────
  const fetchFromDB = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("created_at", { ascending: false }) as { data: Array<Record<string, unknown>> | null; error: { message: string } | null };
    if (!error && data && data.length > 0) {
      setItems(data.map(mapRow));
    } else if (!error) {
      // table is empty — show nothing (no seeds in DB mode)
      setItems([]);
    }
  }, []);

  // ── Initial load ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (isSupabaseConfigured) {
      const abortTimer = setTimeout(() => {
        setItems(seed);
        setLoading(false);
      }, 6000);

      supabase
        .from("menu_items")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data, error }: { data: null | Array<Record<string, unknown>>; error: null | { message: string } }) => {
          clearTimeout(abortTimer);
          if (!error && data && data.length > 0) {
            setItems(data.map(mapRow));
          } else {
            setItems(seed);
          }
          setLoading(false);
        })
        .catch(() => {
          clearTimeout(abortTimer);
          setItems(seed);
          setLoading(false);
        });
    } else {
      const tid = setTimeout(() => {
        try {
          const raw = localStorage.getItem(LS_KEY);
          if (raw && raw.length < 5_000_000) {
            setItems(JSON.parse(raw) as AdminItem[]);
          } else {
            if (raw) localStorage.removeItem(LS_KEY);
            setItems(seed);
          }
        } catch {
          localStorage.removeItem(LS_KEY);
          setItems(seed);
        }
        setLoading(false);
      }, 0);
      return () => clearTimeout(tid);
    }
  }, []);

  // ── localStorage sync (offline mode) ─────────────────────────────────────
  useEffect(() => {
    if (!isSupabaseConfigured && !loading) {
      try { localStorage.setItem(LS_KEY, JSON.stringify(items)); } catch { /* ignore */ }
    }
  }, [items, loading]);

  // ── saveItem ──────────────────────────────────────────────────────────────
  // isNew = true  → always INSERT a new row
  // isNew = false → always UPDATE the existing row identified by item.id
  const saveItem = useCallback(
    async (item: AdminItem, isNew: boolean): Promise<{ error?: string }> => {
      // ── Offline (no Supabase) ────────────────────────────────────────────
      if (!isSupabaseConfigured) {
        setItems((prev) => {
          if (isNew) return [{ ...item, id: `local-${Date.now()}` }, ...prev];
          return prev.map((i) => (i.id === item.id ? item : i));
        });
        return {};
      }

      // ── INSERT ────────────────────────────────────────────────────────────
      if (isNew) {
        const { error } = await supabase.from("menu_items").insert({
          name_tr:      item.name,
          name_bg:      item.name_bg  || item.name,
          name_gr:      item.name_gr  || item.name,
          desc_tr:      item.desc,
          desc_bg:      item.desc_bg  || item.desc,
          desc_gr:      item.desc_gr  || item.desc,
          category:     item.category,
          price:        item.price,
          img_url:      item.img,
          available:    true,
          is_available: true,
        });
        if (error) return { error: error.message };
        // Re-fetch so state = exact DB state (no stale seeds)
        await fetchFromDB();
        return {};
      }

      // ── UPDATE ────────────────────────────────────────────────────────────
      const { error } = await supabase
        .from("menu_items")
        .update({
          name_tr:      item.name,
          name_bg:      item.name_bg  || item.name,
          name_gr:      item.name_gr  || item.name,
          desc_tr:      item.desc,
          desc_bg:      item.desc_bg  || item.desc,
          desc_gr:      item.desc_gr  || item.desc,
          category:     item.category,
          price:        item.price,
          img_url:      item.img,
          available:    item.available,
          is_available: item.available,
          updated_at:   new Date().toISOString(),
        })
        .eq("id", item.id);
      if (error) return { error: error.message };
      // Optimistic local update then sync with DB for accuracy
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
      await fetchFromDB();
      return {};
    },
    [fetchFromDB],
  );

  // ── deleteItem ────────────────────────────────────────────────────────────
  const deleteItem = useCallback(async (id: string): Promise<{ error?: string }> => {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from("menu_items")
        .delete()
        .eq("id", id);
      if (error) return { error: error.message };
    }
    // Only remove from local state AFTER confirmed DB delete
    setItems((prev) => prev.filter((i) => i.id !== id));
    return {};
  }, []);

  // ── toggleAvail ───────────────────────────────────────────────────────────
  const toggleAvail = useCallback(async (id: string): Promise<void> => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      const next = !item.available;
      if (isSupabaseConfigured) {
        supabase
          .from("menu_items")
          .update({ available: next, updated_at: new Date().toISOString() })
          .eq("id", id)
          .then(() => {})
          .catch(() => {});
      }
      return prev.map((i) => (i.id === id ? { ...i, available: next } : i));
    });
  }, []);

  // ── categoryOptions ───────────────────────────────────────────────────────
  const categoryOptions = useMemo<{ id: string; title: string }[]>(() => {
    if (items.length === 0) return CATEGORY_OPTIONS;
    const seen = new Map<string, string>();
    items.forEach((i) => {
      if (i.category && !seen.has(i.category)) {
        const match = CATEGORY_OPTIONS.find((c) => c.id === i.category);
        seen.set(i.category, match?.title ?? i.category);
      }
    });
    return [...seen.entries()].map(([id, title]) => ({ id, title }));
  }, [items]);

  return { items, setItems, loading, categoryOptions, saveItem, deleteItem, toggleAvail };
}

export function categoryTitle(id: string, options?: { id: string; title: string }[]) {
  const list = options ?? CATEGORY_OPTIONS;
  return list.find((c) => c.id === id)?.title ?? id;
}
