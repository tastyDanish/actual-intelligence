"use client";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

type ChatLeader = {
  displayName: string;
  chatCount: number;
};

type LikeLeader = {
  displayName: string;
  likeCount: number;
};

export const UseLeaderboard = () => {
  const supabase = createClient();
  const [chatLeaders, setChatLeaders] = useState<ChatLeader[]>([]);
  const [likeLeaders, setLikeLeaders] = useState<LikeLeader[]>([]);
  const [loading, setLoading] = useState(false);
  const getLeaderboard = useCallback(async () => {
    try {
      setLoading(true);
      const { data: chatCounts } = await supabase
        .from("author_counts")
        .select("display_name, chat_count")
        .order("chat_count", { ascending: false });

      const { data: likeCounts } = await supabase
        .from("author_likes")
        .select("display_name, like_count")
        .order("like_count", { ascending: false });

      if (chatCounts) {
        setChatLeaders(
          chatCounts.map((d) => ({
            displayName: d.display_name,
            chatCount: d.chat_count,
          }))
        );
      }

      if (likeCounts) {
        setLikeLeaders(
          likeCounts.map((d) => ({
            displayName: d.display_name,
            likeCount: d.like_count,
          }))
        );
      }
    } catch (error) {
      alert("Error loading leaderboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getLeaderboard();
  }, []);

  return { chatLeaders, likeLeaders, loading };
};
