import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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

// ── ID validation ─────────────────────────────────────────────────────────────
// Returns true if the ID is safe to use in a Supabase .eq("id", ...) call.
// Blocks empty string, the literal string "null"/"undefined", and local-only IDs.
export function isValidDbId(id: unknown): id is string {
  if (!id || typeof id !== "string") return false;
  if (id === "null" || id === "undefined" || id === "") return false;
  if (id.startsWith("local-") || id.startsWith("new-")) return false;
  return true;
}

// ── Row mapping ───────────────────────────────────────────────────────────────
// Returns null for rows with missing/null IDs so they are filtered before
// entering state — prevents "null" strings from ever reaching mutation guards.
function mapRow(r: Record<string, unknown>): AdminItem | null {
  const rawId = r.id;
  if (!isValidDbId(rawId)) return null;
  return {
    id: String(rawId),
    name:    String(r.name_tr  ?? ""),
    name_bg: String(r.name_bg  ?? ""),
    name_gr: String(r.name_gr  ?? ""),
    desc:    String(r.desc_tr  ?? ""),
    desc_bg: String(r.desc_bg  ?? ""),
    desc_gr: String(r.desc_gr  ?? ""),
    price:    String(r.price   ?? ""),
    category: String(r.category ?? ""),
    img:      String(r.img_url ?? ""),
    available: Boolean(r.available ?? true),
  };
}

function applyRows(data: Array<Record<string, unknown>>): AdminItem[] {
  return data.map(mapRow).filter((i): i is AdminItem => i !== null);
}

export function useAdminItems() {
  const [items, setItems] = useState<AdminItem[]>([]);
  const [loading, setLoading] = useState(true);
  // Guard against concurrent fetchFromDB calls
  const fetchingRef = useRef(false);

  // ── Fresh fetch from Supabase ─────────────────────────────────────────────
  // Safe to call after a successful mutation. Will no-op if a fetch is already
  // in flight to prevent cascading re-fetches.
  const fetchFromDB = useCallback(async () => {
    if (!isSupabaseConfigured || fetchingRef.current) return;
    fetchingRef.current = true;
    try {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("created_at", { ascending: false }) as {
          data: Array<Record<string, unknown>> | null;
          error: { message: string } | null;
        };
      if (!error && data) {
        const valid = applyRows(data);
        if (valid.length > 0) setItems(valid);
        // Do NOT wipe to [] on empty — RLS may restrict SELECT after a write.
        // deleteItem removes items via direct prev.filter, not via fetchFromDB.
      }
    } finally {
      fetchingRef.current = false;
    }
  }, []);

  // ── Initial load — fires ONCE on mount ────────────────────────────────────
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
            setItems(applyRows(data));
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── localStorage sync (offline mode only) ─────────────────────────────────
  useEffect(() => {
    if (!isSupabaseConfigured && !loading) {
      try { localStorage.setItem(LS_KEY, JSON.stringify(items)); } catch { /* ignore */ }
    }
  }, [items, loading]);

  // ── saveItem ──────────────────────────────────────────────────────────────
  // isNew = true  → INSERT a new row, then re-fetch to sync IDs
  // isNew = false → UPDATE the existing row; optimistic local update only
  const saveItem = useCallback(
    async (item: AdminItem, isNew: boolean): Promise<{ error?: string }> => {

      // ── Offline (no Supabase) ──────────────────────────────────────────────
      if (!isSupabaseConfigured) {
        setItems((prev) => {
          if (isNew) return [{ ...item, id: `local-${Date.now()}` }, ...prev];
          return prev.map((i) => (i.id === item.id ? item : i));
        });
        return {};
      }

      // ── INSERT ───────────────────────────────────────────────────────────
      // isNew=true: no database UUID yet — isValidDbId is NOT applied here.
      if (isNew) {
        const { error } = await supabase
          .from("menu_items")
          .insert([{
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
          }]);
        if (error) return { error: error.message };
        await fetchFromDB();
        return {};
      }

      // ── UPDATE ───────────────────────────────────────────────────────────
      // isNew=false: the form MUST hold a real DB UUID. Block anything that
      // isn't a valid identifier so we never fire id=eq.null requests.
      if (!isValidDbId(item.id)) {
        console.error("saveItem UPDATE blocked: invalid id", item.id);
        return { error: "Geçersiz ürün ID'si — güncellenemez." };
      }
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
          updated_at:   new Date().toISOString(),
        })
        .eq("id", item.id);
      if (error) return { error: error.message };
      // Optimistic local update — no re-fetch to avoid cascading requests
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
      return {};
    },
    [fetchFromDB],
  );

  // ── deleteItem ────────────────────────────────────────────────────────────
  const deleteItem = useCallback(async (id: string): Promise<{ error?: string }> => {
    if (!isValidDbId(id)) {
      console.error("deleteItem blocked: invalid id", id);
      return { error: "Geçersiz ürün ID'si — silinemez." };
    }
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
  // The Supabase call is OUTSIDE the setItems updater on purpose.
  // React StrictMode invokes state updaters twice, which would fire duplicate
  // network requests if the call were inside the updater function.
  const toggleAvail = useCallback(async (id: string): Promise<void> => {
    if (!isValidDbId(id)) {
      console.error("toggleAvail blocked: invalid id", id);
      return;
    }

    let nextAvail: boolean | undefined;
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      nextAvail = !item.available;
      return prev.map((i) => (i.id === id ? { ...i, available: nextAvail! } : i));
    });

    if (isSupabaseConfigured && nextAvail !== undefined) {
      supabase
        .from("menu_items")
        .update({ available: nextAvail, updated_at: new Date().toISOString() })
        .eq("id", id)
        .then(() => {})
        .catch(() => {});
    }
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
