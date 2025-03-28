"use client";
import { useConversation } from "@/hooks/conversations-provider";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { useConversationsList } from "@/hooks/use-conversations-list";
import { NotificationCircle } from "../notification-circle";

type ConversationsListProps = {
  userId: string;
};
export const ConversationList = ({ userId }: ConversationsListProps) => {
  const { organizedConversations } = useConversationsList({ userId });
  const { setOpenMobile, isMobile } = useSidebar();
  const { setConversationId } = useConversation();

  const onClickHandler = (conversationId: string) => {
    setConversationId(conversationId);
    if (isMobile) setOpenMobile(false);
  };

  return (
    <SidebarContent className="gap-0">
      {Array.from(organizedConversations).map((k, v) => (
        <SidebarGroup
          key={v}
          className="px-2 py-1">
          <SidebarGroupLabel>{k[0]}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {k[1].map((c) => (
                <SidebarMenuButton
                  className="flex"
                  key={c.id}
                  onClick={() => onClickHandler(c.id)}>
                  <div>
                    <NotificationCircle visible={c.newMessage} />
                  </div>

                  <div>{c.title}</div>
                </SidebarMenuButton>
              ))}
              <SidebarMenuItem></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
};
