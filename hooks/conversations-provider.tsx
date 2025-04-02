"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { ActualMessage, useChat } from "./use-chat";

export type ActualRole = "user" | "intelligence";

export type Conversation = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  newMessage: boolean;
};

interface ConversationContextType {
  conversationId: string | null;
  setConversationId: (id: string | null) => void;
  mode: ActualRole;
  loading: boolean;
  toggleMode: () => void;
  messages: ActualMessage[];
  setMessages: (messages: ActualMessage[]) => void;
  getMessages: () => Promise<void>;
  addMessage: (message: string) => Promise<void>;
  newMessage: boolean;
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
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
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [mode, setMode] = useState<"user" | "intelligence">("user");

  const {
    loading,
    messages,
    addMessage,
    setMessages,
    getRandomConversation,
    getMessages,
  } = useChat({
    conversationId,
    setConversationId,
    mode,
  });

  const newMessage = useMemo(() => {
    return conversations.some((c) => c.newMessage);
  }, [conversations]);

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
        newMessage,
        getMessages,
        conversations,
        setConversations,
      }}>
      {children}
    </ConversationContext.Provider>
  );
};
