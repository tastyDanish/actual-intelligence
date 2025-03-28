import { useConversation } from "@/hooks/conversations-provider";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "../ui/chat/chat-bubble";
import { ChatMessageList } from "../ui/chat/chat-message-list";

export const ActualBubbles = () => {
  const { mode, messages } = useConversation();

  return (
    <ChatMessageList className="flex-grow min-h-0 md:px-20">
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            className={cn(
              "w-full flex",
              message.author === mode ? "flex-row-reverse" : ""
            )}
            key={message.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ease: ["easeOut"], duration: 0.3 }}>
            <ChatBubble variant={message.author === mode ? "sent" : "received"}>
              <ChatBubbleAvatar
                fallback={message.author === "intelligence" ? "AI" : "US"}
              />
              <ChatBubbleMessage
                variant={message.author === mode ? "sent" : "received"}>
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          </motion.div>
        ))}
      </AnimatePresence>
    </ChatMessageList>
  );
};
