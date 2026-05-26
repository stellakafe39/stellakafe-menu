import { useEffect, useState } from "react";
import { categories } from "./menu-data";

export type AdminItem = {
  id: string;
  name: string;
  desc: string;
  price: number; // in TL
  category: string;
  img: string;
  available: boolean;
};

export const CATEGORY_OPTIONS = categories.map((c) => ({ id: c.id, title: c.title["TR"] }));

const seed: AdminItem[] = categories.flatMap((c) =>
  c.items.map((it, idx) => ({
    id: `${c.id}-${idx}`,
    name: it.name["TR"],
    desc: it.desc["TR"],
    price: parseInt(it.price.replace(/\D/g, ""), 10) || 0,
    category: c.id,
    img: it.img,
    available: true,
  })),
);

const KEY = "stella-admin-items-v1";

export function useAdminItems() {
  const [items, setItems] = useState<AdminItem[]>(seed);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed: AdminItem[] = JSON.parse(raw);
        // merge images by id from seed (data URIs not persisted reliably; seed assets are imports)
        const map = new Map(seed.map((s) => [s.id, s.img]));
        setItems(parsed.map((p) => ({ ...p, img: p.img || map.get(p.id) || "" })));
      }
    } catch (e) {
      // ignore
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items, loaded]);

  return { items, setItems };
}

export function categoryTitle(id: string) {
  return CATEGORY_OPTIONS.find((c) => c.id === id)?.title ?? id;
}
