"use client";
import { useConversation } from "@/hooks/conversations-provider";
import { Button } from "./ui/button";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { NotificationCircle } from "./notification-circle";
import { useUser } from "@/hooks/user-provider";
import { AdminControls } from "./admin-controls";

export const AppTopBar = () => {
  const { mode, toggleMode, loading, newMessage } = useConversation();
  const { user } = useUser();
  const { isMobile, open } = useSidebar();

  return (
    <div className="grid w-full pt-4 grid-cols-3 justify-self-start">
      {mode === "user" ? (
        <div className="justify-self-start flex relative">
          <SidebarTrigger className="justify-self-start" />
          <div className="absolute right-0">
            <NotificationCircle visible={newMessage && (isMobile || !open)} />
          </div>
        </div>
      ) : (
        <div>{newMessage && <div className="text-accent">New Reply!</div>}</div>
      )}
      {user?.role === "admin" && <AdminControls />}

      <Button
        className="justify-self-end mr-4"
        disabled={loading}
        onClick={() => toggleMode()}>
        {mode === "intelligence" ? "Be a User" : "Be the AI"}
      </Button>
    </div>
  );
};
