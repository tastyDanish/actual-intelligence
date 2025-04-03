import { useConversation } from "@/hooks/conversations-provider";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { ChatBubble, ChatBubbleMessage } from "../ui/chat/chat-bubble";
import { ChatMessageList } from "../ui/chat/chat-message-list";
import { useUser } from "@/hooks/user-provider";
import { LikeButton } from "./like-button";
import { ActualAvatar } from "./actual-avatar";

export const ActualBubbles = () => {
  const { user } = useUser();
  const { mode, messages } = useConversation();

  return (
    <ChatMessageList className="flex-grow min-h-0 md:px-10 lg:px-20">
      <AnimatePresence mode="sync">
        {messages.map((message) => {
          return (
            <motion.div
              className="w-full flex flex-col"
              key={message.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}>
              <ChatBubble
                className={cn(
                  message.isFirstInGroup ? "pt-4" : "pt-2",
                  message.author.role === mode ? "flex-row-reverse" : ""
                )}
                variant={message.author.role === mode ? "sent" : "received"}>
                <ActualAvatar
                  hat={message.author.hat}
                  avatar={message.author.avatar}
                  visible={message.isLastInGroup}
                  fallback={
                    message.author.role === "intelligence" ? "AI" : "US"
                  }
                />
                <div className="flex flex-col">
                  {message.isFirstInGroup && message.author.id !== user?.id && (
                    <div
                      className={cn(
                        "text-sm",
                        message.author.role === mode ? "self-end" : "self-start"
                      )}>
                      {message.author.name}
                    </div>
                  )}
                  <ChatBubbleMessage
                    className="py-2 px-4"
                    variant={
                      message.author.role === mode ? "sent" : "received"
                    }>
                    {message.content}
                  </ChatBubbleMessage>
                </div>
                {mode === "user" && message.author.role === "intelligence" && (
                  <LikeButton
                    chatId={message.id}
                    like={message.like}
                  />
                )}
              </ChatBubble>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </ChatMessageList>
  );
};
