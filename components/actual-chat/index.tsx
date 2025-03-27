"use client";
import { useConversation } from "@/hooks/conversations-provider";
import { ActualBubbles } from "./actual-bubbles";
import { ActualInput } from "./actual-input";
import { IntelligenceCallToAction } from "./intelligence-call-to-action";
import { ActualLoader } from "../actual-loader";
import { UserCallToAction } from "./user-call-to-action";

export const ActualChat = () => {
  const { mode, conversationId, loading, messages } = useConversation();

  return (
    <div className="flex flex-col flex-grow w-full min-h-0 overflow-hidden relative">
      {loading && !messages.length ? (
        <div className="flex-grow">
          <ActualLoader />
        </div>
      ) : mode === "intelligence" ? (
        conversationId == null ? (
          <IntelligenceCallToAction />
        ) : (
          <ActualBubbles />
        )
      ) : (
        <>
          <UserCallToAction
            visible={conversationId === null && mode === "user"}
          />
          <ActualBubbles />
        </>
      )}
      <ActualInput />
    </div>
  );
};
