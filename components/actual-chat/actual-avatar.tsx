import Image from "next/image";
import { ChatBubbleAvatar } from "../ui/chat/chat-bubble";
import { cn } from "@/lib/utils";

type ActualAvatarProps = {
  fallback: string;
  visible?: boolean;
  hat?: string | null | undefined;
  avatar?: string | null | undefined;
};

export const ActualAvatar = ({
  fallback,
  hat,
  avatar,
  visible = true,
}: ActualAvatarProps) => {
  return (
    <div className={cn("relative", visible ? "opacity-100" : "opacity-0")}>
      {hat && (
        <Image
          className="absolute bottom-[70%] z-20"
          src={`/hats/${hat}.png`}
          alt={`${hat} hat`}
          width={40}
          height={40}
        />
      )}
      {avatar ? (
        <ChatBubbleAvatar
          src={`/avatars/${avatar}.png`}
          fallback={fallback}
        />
      ) : (
        <ChatBubbleAvatar fallback={fallback} />
      )}
    </div>
  );
};
