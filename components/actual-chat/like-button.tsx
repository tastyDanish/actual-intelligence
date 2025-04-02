"use client";
import { createClient } from "@/utils/supabase/client";
import { ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

type LikeButtonProps = {
  like: boolean | null;
  chatId: string;
};

export const LikeButton = ({ like, chatId }: LikeButtonProps) => {
  const supabase = createClient();
  const [liked, setLiked] = useState(like);

  const handleClick = async () => {
    setLiked(!liked);
    const { error } = await supabase
      .from("chats")
      .update({ like: !liked })
      .eq("id", chatId);

    if (error) {
      console.log("we had an error in liking chat: ", error.message);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="h-6 w-6 px-2 py-2 hover:bg-gray-700">
      {liked ? (
        <svg
          className="w-24 h-24"
          fill="grey"
          viewBox="0 0 8 8"
          xmlns="http://www.w3.org/2000/svg">
          <g
            id="SVGRepo_bgCarrier"
            strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path d="M4.47 0c-.19.02-.37.15-.47.34-.13.26-1.09 2.19-1.28 2.38-.19.19-.44.28-.72.28v4h3.5c.21 0 .39-.13.47-.31 0 0 1.03-2.91 1.03-3.19 0-.28-.22-.5-.5-.5h-1.5c-.28 0-.5-.25-.5-.5s.39-1.58.47-1.84c.08-.26-.05-.54-.31-.63-.07-.02-.12-.04-.19-.03zm-4.47 3v4h1v-4h-1z"></path>{" "}
          </g>
        </svg>
      ) : (
        <ThumbsUp
          color="grey"
          size={18}
        />
      )}
    </Button>
  );
};
