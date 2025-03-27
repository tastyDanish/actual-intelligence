import { Sidebar, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import HeaderAuth from "./header-auth";
import { createClient } from "@/utils/supabase/server";
import { ConversationList } from "./conversation-list";
import { NewConversation } from "./conversation-list/new-conversation";

export async function AppSidebar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <></>;

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
