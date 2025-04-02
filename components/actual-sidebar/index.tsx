import { createClient } from "@/utils/supabase/server";
import { SidebarDataWrapper } from "./sidebar-data-wrapper";

export async function ActualSidebar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return <SidebarDataWrapper userId={user.id} />;
}
