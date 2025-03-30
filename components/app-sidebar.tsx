import { Sidebar, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import HeaderAuth from "./header-auth";
import { createClient } from "@/utils/supabase/server";
import { ConversationList } from "./conversation-list";
import { NewConversation } from "./conversation-list/new-conversation";
import { headers } from "next/headers";

export async function AppSidebar() {
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") || "/";
  console.log("pathname: ", pathname);

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const allowedRoutes = ["/protected"];
  if (!user || !allowedRoutes.some((route) => pathname.startsWith(route)))
    return null;

  return (
    <Sidebar>
      <SidebarHeader>
        <HeaderAuth />
        <div className="px-4 py-2 w-full">
          <NewConversation />
        </div>
      </SidebarHeader>
      <ConversationList userId={user.id} />
      <SidebarFooter />
    </Sidebar>
  );
}
