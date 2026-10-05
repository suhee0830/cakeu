import { createClient } from "@supabase/supabase-js";

const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, "");

const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey,
  {
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
);