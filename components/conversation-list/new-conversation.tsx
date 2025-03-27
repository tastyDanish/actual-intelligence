"use client";
import { useConversation } from "@/hooks/conversations-provider";
import { Button } from "../ui/button";

export const NewConversation = () => {
  const { setConversationId } = useConversation();
  return (
    <Button
      className="w-full"
      onClick={() => setConversationId(null)}>
      new conversation
    </Button>
  );
};
