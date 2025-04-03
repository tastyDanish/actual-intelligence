import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActualRole } from "./conversations-provider";
import {
  createNewMessage,
  getConversationMessages,
} from "@/utils/supabase/conversations/message-repo";
import {
  getRandomConversationToAnswer,
  markRead,
} from "@/utils/supabase/conversations/conversations-repo";
import { useAppSettings } from "./app-settings-provider";

export type Author = {
  id: string;
  name: string;
  role: ActualRole;
  avatar: string | null;
  hat: string | null;
};

export type ActualMessage = {
  id: string;
  content: string;
  author: Author;
  like: boolean | null;
  isLastInGroup: boolean;
  isFirstInGroup: boolean;
};
type UseChatProps = {
  conversationId: string | null;
  setConversationId: (conversationId: string | null) => void;
  mode: ActualRole;
};
export const useChat = ({
  conversationId,
  setConversationId,
  mode,
}: UseChatProps) => {
  const supabase = createClient();
  const { settings } = useAppSettings();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ActualMessage[]>([]);
  const loadingRandom = useRef(false);

  const getMessages = useCallback(async () => {
    try {
      if (!conversationId) {
        setLoading(false);
        return;
      }
      setLoading(true);

      const data = await getConversationMessages({ conversationId, supabase });

      if (data && data.length > 0) {
        const groupedMessages: ActualMessage[] = [];
        const first = data[0];
        let prevMessage: ActualMessage = {
          id: first.id,
          content: first.message,
          like: first.like,
          author: {
            id: first.author.id,
            name: first.author.display_name,
            role: first.is_intelligence ? "intelligence" : "user",
            avatar: first.author.avatar,
            hat: first.author.hat,
          },
          isLastInGroup: true,
          isFirstInGroup: true,
        };
        data.slice(1).forEach((d) => {
          if (prevMessage.author.id === d.author.id) {
            prevMessage.isLastInGroup = false;
          }
          const message: ActualMessage = {
            id: d.id,
            content: d.message,
            like: d.like,
            author: {
              id: d.author.id,
              name: d.author.display_name,
              role: d.is_intelligence ? "intelligence" : "user",
              avatar: d.author.avatar,
              hat: d.author.hat,
            },
            isLastInGroup: true,
            isFirstInGroup: prevMessage.author.id !== d.author.id,
          };

          groupedMessages.push(prevMessage);
          prevMessage = message;
        });
        groupedMessages.push(prevMessage);
        setMessages(groupedMessages);
        if (mode === "user") {
          await markRead({ conversationId, supabase });
        }
      }
    } catch (error) {
      alert("Error loading conversation!");
    } finally {
      if (!loadingRandom.current) setLoading(false);
    }
  }, [conversationId, supabase, setMessages]);

  useEffect(() => {
    if (conversationId) {
      getMessages();
    } else {
      setLoading(false);
      setMessages([]);
    }
  }, [conversationId, getMessages]);

  const addMessage = useCallback(
    async (message: string) => {
      try {
        setLoading(true);
        const actualConversationId = await createNewMessage({
          conversationId,
          message,
          supabase,
          mode,
        });
        if (mode === "intelligence") {
          const randomConversationId = await getRandomConversationToAnswer({
            supabase,
            talkToSelf: settings.talkToSelf,
          });
          loadingRandom.current = true;
          setTimeout(() => {
            loadingRandom.current = false;

            if (mode === "intelligence") {
              setMessages([]);
              setConversationId(randomConversationId);
            } else {
              setLoading(false);
            }
          }, 1000);
        } else {
          setConversationId(actualConversationId);
        }
      } catch (error) {
        alert("Error adding message!");
      } finally {
        getMessages();
      }
    },
    [conversationId, supabase, getMessages, mode]
  );

  const getRandomConversation = async () => {
    try {
      setLoading(true);
      const randomConversationId = await getRandomConversationToAnswer({
        supabase,
        talkToSelf: settings.talkToSelf,
      });

      if (mode === "intelligence") {
        setConversationId(randomConversationId);
      }
    } catch (error) {
      console.error("Error fetching random conversation:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    messages,
    getMessages,
    addMessage,
    setMessages,
    getRandomConversation,
  };
};
