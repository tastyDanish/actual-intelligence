"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useMemo, useState } from "react";
import { Conversation, useConversation } from "./conversations-provider";

type UseConversationsListProps = {
  userId: string;
};
export const useConversationsList = ({ userId }: UseConversationsListProps) => {
  const supabase = createClient();
  const { conversations, setConversations } = useConversation();
  const [channel, setChannel] = useState<any>(null);

  const organizedConversations = useMemo(() => {
    const today = new Date();
    const todayStr = today.toLocaleDateString();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString();

    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    return conversations.reduce((acc, curr) => {
      const updatedAt = curr.updatedAt;
      const updatedStr = updatedAt.toLocaleDateString();

      let category: string;

      if (updatedStr === todayStr) {
        category = "Today";
      } else if (updatedStr === yesterdayStr) {
        category = "Yesterday";
      } else if (updatedAt < oneMonthAgo) {
        category = "More than a Month Ago";
      } else {
        category = updatedStr;
      }

      acc.set(category, [...(acc.get(category) || []), curr]);
      return acc;
    }, new Map<string, Conversation[]>());
  }, [conversations]);

  const fetchConversations = async () => {
    const { data, error } = await supabase
      .from("conversations")
      .select("id, title, created_at, updated_at, new_message")
      .eq("owner_id", userId)
      .eq("archive", false)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching conversations:", error);
    } else {
      setConversations(
        data.map((d) => ({
          id: d.id,
          createdAt: new Date(d.created_at),
          updatedAt: new Date(d.updated_at),
          title: d.title ?? "missing title",
          newMessage: d.new_message,
        })) || []
      );
    }
  };

  const subscribe = () => {
    if (channel) channel.unsubscribe(); // Prevent duplicate subscriptions

    const newChannel = supabase
      .channel("conversations")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conversations" },
        async (payload) => {
          if (
            (payload.eventType === "INSERT" ||
              payload.eventType === "UPDATE") &&
            payload.new.owner_id === userId
          ) {
            await fetchConversations();
          }
        }
      )
      .subscribe();

    setChannel(newChannel);
  };

  useEffect(() => {
    fetchConversations();
    subscribe();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchConversations();
        subscribe();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (channel) channel.unsubscribe();
    };
  }, []);

  return { conversations, organizedConversations };
};
