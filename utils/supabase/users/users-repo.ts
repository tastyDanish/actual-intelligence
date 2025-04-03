import { Database } from "@/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

type GetUserIdParams = {
  supabase: SupabaseClient<Database>;
};
export const getUserId = async ({ supabase }: GetUserIdParams) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id ?? null;
  if (!userId) throw new Error("missing user id");
  return userId;
};
