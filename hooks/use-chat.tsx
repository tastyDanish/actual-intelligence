import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActualRole } from "./conversations-provider";
import {
  createNewMessage,
  getConversationMessages,
} from "@/utils/supabase/conversations/message-repo";
import {
  getRandomConversationToAnswer,
  markRead,
} from "@/utils/supabase/conversations/conversations-repo";

export type ActualMessage = {
  id: number;
  content: string;
  author: ActualRole;
};
type UseChatProps = {
  conversationId: number | null;
  setConversationId: (conversationId: number | null) => void;
  mode: ActualRole;
};
export const useChat = ({
  conversationId,
  setConversationId,
  mode,
}: UseChatProps) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ActualMessage[]>([]);
  const loadingRandom = useRef(false);

  const getMessages = useCallback(async () => {
    try {
      if (!conversationId) {
        setLoading(false);
        return [];
      }
      setLoading(true);

      const data = await getConversationMessages({ conversationId, supabase });

      if (data) {
        setMessages(
          data.map((s) => ({
            id: s.id,
            content: s.message,
            author: s.is_intelligence ? "intelligence" : "user",
          }))
        );
        if (mode === "user") {
          await markRead({ conversationId, supabase });
        }
      }
    } catch (error) {
      alert("Error loading conversation!");
    } finally {
      if (!loadingRandom.current) setLoading(false);
    }
  }, [conversationId, supabase]);

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
