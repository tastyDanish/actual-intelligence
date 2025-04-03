"use client";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { Avatar } from "./user-provider";

type ChatLeader = {
  displayName: string;
  chatCount: number;
  avatar: Avatar;
};

type LikeLeader = {
  displayName: string;
  likeCount: number;
  avatar: Avatar;
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
        .select("display_name, chat_count, avatar, hat")
        .order("chat_count", { ascending: false });

      const { data: likeCounts } = await supabase
        .from("author_likes")
        .select("display_name, like_count, avatar, hat")
        .order("like_count", { ascending: false });

      if (chatCounts) {
        setChatLeaders(
          chatCounts.map((d) => ({
            displayName: d.display_name,
            chatCount: d.chat_count,
            avatar: {
              name: d.avatar,
              hat: d.hat,
            },
          }))
        );
      }

      if (likeCounts) {
        setLikeLeaders(
          likeCounts.map((d) => ({
            displayName: d.display_name,
            likeCount: d.like_count,
            avatar: {
              name: d.avatar,
              hat: d.hat,
            },
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
