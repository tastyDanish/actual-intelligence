import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { SidebarDataWrapper } from "./sidebar-data-wrapper";

export async function ActualSidebar() {
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") || "/";
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const allowedRoutes = ["/protected"];
  console.log("here is our user: ", user);
  console.log("here is our route: ", pathname);
  if (!user || !allowedRoutes.some((route) => pathname.startsWith(route)))
    return null;

  return <SidebarDataWrapper userId={user.id} />;
}
