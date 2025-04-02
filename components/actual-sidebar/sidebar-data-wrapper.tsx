"use client";
import { useConversationsList } from "@/hooks/use-conversations-list";
import { ConversationList } from "../conversation-list";
import { NewConversation } from "../conversation-list/new-conversation";
import { SidebarHeader, SidebarFooter, Sidebar } from "../ui/sidebar";
import { usePathname } from "next/navigation";

type SidebarDataWrapperProps = {
  userId: string;
};
export const SidebarDataWrapper = ({ userId }: SidebarDataWrapperProps) => {
  const pathname = usePathname();
  const { organizedConversations } = useConversationsList({ userId });

  const allowedRoutes = ["/protected"];
  if (!allowedRoutes.some((route) => pathname.startsWith(route))) return null;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-2 w-full">
          <NewConversation />
        </div>
      </SidebarHeader>
      <ConversationList organizedConversations={organizedConversations} />
      <SidebarFooter />
    </Sidebar>
  );
};
