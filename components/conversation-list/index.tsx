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
} from "../ui/sidebar";
import { useConversationsList } from "@/hooks/use-conversations-list";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type ConversationsListProps = {
  userId: string;
};
export const ConversationList = ({ userId }: ConversationsListProps) => {
  const { organizedConversations } = useConversationsList({ userId });
  const { setConversationId } = useConversation();
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
                  onClick={() => setConversationId(c.id)}>
                  <div>
                    <svg
                      width="12"
                      height="12"
                      className={cn(
                        "fill-accent",
                        c.newMessage ? "opacity-100" : "opacity-0"
                      )}>
                      <circle
                        cx="6"
                        cy="6"
                        r="6"
                      />
                    </svg>
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
