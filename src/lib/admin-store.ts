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
  sort_order: number;
};

export const CATEGORY_OPTIONS = categories.map((c) => ({ id: c.id, title: c.title["TR"] }));

const seed: AdminItem[] = categories.flatMap((c, ci) =>
  c.items.map((it, idx) => ({
    id: `${c.id}-${idx}`,
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
    sort_order: ci * 100 + idx,
  })),
);

const LS_KEY = "stella-admin-v2";

const isUUID = (id: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id);

export function useAdminItems() {
  const [items, setItems] = useState<AdminItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured) {
      const abortTimer = setTimeout(() => {
        setItems(seed);
        setLoading(false);
      }, 10000);
      supabase
        .from("menu_items")
        .select("*")
        .order("sort_order", { ascending: true })
        .then(({ data, error }: { data: null | Array<Record<string, unknown>>; error: null | { message: string } }) => {
          clearTimeout(abortTimer);
          if (!error && data && data.length > 0) {
            setItems(
              data.map((r) => ({
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
                sort_order: Number(r.sort_order ?? 0),
              })),
            );
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
      try {
        const raw = localStorage.getItem(LS_KEY);
        if (raw) {
          const parsed: AdminItem[] = JSON.parse(raw);
          const imgMap = new Map(seed.map((s) => [s.id, s.img]));
          setItems(parsed.map((p) => ({ ...p, img: p.img || imgMap.get(p.id) || "" })));
        } else {
          setItems(seed);
        }
      } catch {
        setItems(seed);
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured && !loading) {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(items));
      } catch {
        // ignore
      }
    }
  }, [items, loading]);

  const saveItem = useCallback(
    async (item: AdminItem): Promise<{ error?: string }> => {
      if (!isSupabaseConfigured) {
        setItems((prev) => {
          const exists = prev.find((i) => i.id === item.id);
          if (exists) return prev.map((i) => (i.id === item.id ? item : i));
          return [{ ...item, id: `custom-${Date.now()}` }, ...prev];
        });
        return {};
      }

      if (!isUUID(item.id)) {
        // New item
        const { data, error } = await supabase
          .from("menu_items")
          .insert({
            name_tr: item.name,
            name_bg: item.name_bg || item.name,
            name_gr: item.name_gr || item.name,
            desc_tr: item.desc,
            desc_bg: item.desc_bg || item.desc,
            desc_gr: item.desc_gr || item.desc,
            category: item.category,
            price: item.price,
            img_url: item.img,
            available: item.available,
            sort_order: item.sort_order,
          })
          .select()
          .single();
        if (error) return { error: error.message };
        const newId = (data as Record<string, unknown>).id as string;
        setItems((prev) => [{ ...item, id: newId }, ...prev]);
        return {};
      }

      // Update existing
      const { error } = await supabase
        .from("menu_items")
        .update({
          name_tr: item.name,
          name_bg: item.name_bg,
          name_gr: item.name_gr,
          desc_tr: item.desc,
          desc_bg: item.desc_bg,
          desc_gr: item.desc_gr,
          category: item.category,
          price: item.price,
          img_url: item.img,
          available: item.available,
          sort_order: item.sort_order,
          updated_at: new Date().toISOString(),
        })
        .eq("id", item.id);
      if (error) return { error: error.message };
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
      return {};
    },
    [],
  );

  const deleteItem = useCallback(async (id: string): Promise<void> => {
    if (isSupabaseConfigured) {
      await supabase.from("menu_items").delete().eq("id", id);
    }
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggleAvail = useCallback(
    async (id: string): Promise<void> => {
      setItems((prev) => {
        const item = prev.find((i) => i.id === id);
        if (!item) return prev;
        const next = !item.available;
        if (isSupabaseConfigured && isUUID(id)) {
          supabase
            .from("menu_items")
            .update({ available: next, updated_at: new Date().toISOString() })
            .eq("id", id)
            .then(() => {});
        }
        return prev.map((i) => (i.id === id ? { ...i, available: next } : i));
      });
    },
    [],
  );

  // Yüklenen itemlardan dinamik kategori listesi türet.
  // Supabase'deki kategori ID'leri Türkçe ise onları göster;
  // kod'daki hardcoded ID'lerle eşleşirse o başlığı kullan.
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
