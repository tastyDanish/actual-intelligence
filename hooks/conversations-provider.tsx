"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { ActualMessage, useChat } from "./use-chat";
import { getRandomConversationToAnswer } from "@/utils/supabase/conversations/conversations-repo";

export type ActualRole = "user" | "intelligence";

interface ConversationContextType {
  conversationId: number | null;
  setConversationId: (id: number | null) => void;
  mode: ActualRole;
  loading: boolean;
  toggleMode: () => void;
  messages: ActualMessage[];
  setMessages: (messages: ActualMessage[]) => void;
  addMessage: (message: string) => Promise<void>;
}

const ConversationContext = createContext<ConversationContextType | undefined>(
  undefined
);

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversation must be used within a ConversationProvider"
    );
  }
  return context;
};

interface ConversationProviderProps {
  children: ReactNode;
}

export const ConversationProvider = ({
  children,
}: ConversationProviderProps) => {
  const supabase = createClient();
  const { setOpen } = useSidebar();
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [mode, setMode] = useState<"user" | "intelligence">("user");

  const { loading, messages, addMessage, setMessages, getRandomConversation } =
    useChat({
      conversationId,
      setConversationId,
      mode,
    });

  const toggleMode = () => {
    setMessages([]);
    setConversationId(null);
    if (mode === "user") {
      setMode("intelligence");
    } else {
      setMode("user");
    }
  };

  useEffect(() => {
    if (mode === "intelligence") {
      getRandomConversation();
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [mode, supabase]);

  return (
    <ConversationContext.Provider
      value={{
        conversationId,
        setConversationId,
        mode,
        loading,
        toggleMode,
        messages,
        setMessages,
        addMessage,
      }}>
      {children}
    </ConversationContext.Provider>
  );
};
