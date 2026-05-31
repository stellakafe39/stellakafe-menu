import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase, isSupabaseConfigured } from "./supabase";
import { categories as staticCategories, type Category } from "./menu-data";

export type AdminCategory = {
  id: string;
  title_tr: string;
  title_bg: string;
  title_gr: string;
  subtitle_tr: string;
  subtitle_bg: string;
  subtitle_gr: string;
  cover_img: string;
  sort_order: number;
  active: boolean;
};

function toCategory(row: AdminCategory): Category {
  return {
    id: row.id,
    title:    { TR: row.title_tr,    BG: row.title_bg    || row.title_tr,    GR: row.title_gr    || row.title_tr },
    subtitle: { TR: row.subtitle_tr, BG: row.subtitle_bg || row.subtitle_tr, GR: row.subtitle_gr || row.subtitle_tr },
    cover_img: row.cover_img || undefined,
    items: [],
  };
}

export function useLiveCategories() {
  const [adminCats, setAdminCats] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) { setLoading(false); return; }

    const timer = setTimeout(() => setLoading(false), 6000);

    supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data, error }: { data: AdminCategory[] | null; error: { message: string } | null }) => {
        clearTimeout(timer);
        if (!error && data && data.length > 0) setAdminCats(data);
        setLoading(false);
      })
      .catch(() => { clearTimeout(timer); setLoading(false); });

    return () => clearTimeout(timer);
  }, []);

  // Merge: DB categories override matching static ones; static fills the rest
  const liveCategories = useMemo((): Category[] => {
    if (!adminCats.length) return staticCategories;

    const dbConverted = adminCats.filter(c => c.active).map(toCategory);
    const dbIds = new Set(adminCats.map(c => c.id));
    const staticExtra = staticCategories.filter(c => !dbIds.has(c.id));

    // For static categories that exist in DB: use DB metadata but keep static items array
    const merged = dbConverted.map(dbCat => {
      const staticMatch = staticCategories.find(s => s.id === dbCat.id);
      return staticMatch
        ? { ...staticMatch, title: dbCat.title, subtitle: dbCat.subtitle, cover_img: dbCat.cover_img }
        : dbCat;
    });

    return [...merged, ...staticExtra];
  }, [adminCats]);

  const saveCategory = useCallback(async (cat: AdminCategory): Promise<{ error?: string }> => {
    if (!isSupabaseConfigured) return { error: "Supabase yapılandırılmamış." };
    const payload = {
      id: cat.id,
      title_tr: cat.title_tr, title_bg: cat.title_bg, title_gr: cat.title_gr,
      subtitle_tr: cat.subtitle_tr, subtitle_bg: cat.subtitle_bg, subtitle_gr: cat.subtitle_gr,
      cover_img: cat.cover_img,
      sort_order: cat.sort_order,
      active: cat.active,
    };
    const { error } = await supabase.from("categories").upsert(payload, { onConflict: "id" });
    if (error) return { error: error.message };
    setAdminCats(prev => {
      const exists = prev.find(c => c.id === cat.id);
      return exists ? prev.map(c => c.id === cat.id ? cat : c) : [...prev, cat];
    });
    return {};
  }, []);

  const deleteCategory = useCallback(async (id: string): Promise<{ error?: string }> => {
    if (!isSupabaseConfigured) return { error: "Supabase yapılandırılmamış." };
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) return { error: error.message };
    setAdminCats(prev => prev.filter(c => c.id !== id));
    return {};
  }, []);

  return { adminCats, liveCategories, loading, saveCategory, deleteCategory };
}
