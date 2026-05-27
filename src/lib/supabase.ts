import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && key);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase = isSupabaseConfigured
  ? createClient(url!, key!, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : (null as any);

export type MenuItemRow = {
  id: string;
  name_tr: string;
  name_bg: string;
  name_gr: string;
  desc_tr: string;
  desc_bg: string;
  desc_gr: string;
  category: string;
  price: string;
  img_url: string;
  available: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type SettingRow = {
  key: string;
  value: string;
  updated_at: string;
};
