"use client";
import { useConversation } from "@/hooks/conversations-provider";
import { Button } from "./ui/button";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { NotificationCircle } from "./notification-circle";

export const AppTopBar = () => {
  const { mode, toggleMode, loading, newMessage } = useConversation();
  const { isMobile } = useSidebar();

  return (
    <div className="grid w-full pt-4 grid-cols-3 justify-self-start">
      {mode === "user" ? (
        <div className="justify-self-start flex relative">
          <SidebarTrigger className="justify-self-start" />
          <div className="absolute right-0">
            <NotificationCircle visible={newMessage && isMobile} />
          </div>
        </div>
      ) : (
        <div />
      )}
      <Button
        className="justify-self-center"
        disabled={loading}
        onClick={() => toggleMode()}>
        switch modes
      </Button>
    </div>
  );
};
