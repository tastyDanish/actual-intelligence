"use client";
import { useConversation } from "@/hooks/conversations-provider";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

export const NewConversation = () => {
  const { setOpenMobile, isMobile } = useSidebar();
  const { setConversationId } = useConversation();

  const onClickHandler = (conversationId: string | null) => {
    setConversationId(conversationId);
    if (isMobile) setOpenMobile(false);
  };
  return (
    <Button
      className="w-full"
      onClick={() => onClickHandler(null)}>
      new conversation
    </Button>
  );
};
